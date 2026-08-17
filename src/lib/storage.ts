import type { BackupFile, PhotoRecord, Tasting } from '../types'
import { blobToDataUrl, dataUrlToBlob, uid } from './util'

const DB_NAME = 'sip-journal'
const DB_VERSION = 1

function openDb() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)
    request.onupgradeneeded = () => {
      const db = request.result
      if (!db.objectStoreNames.contains('tastings')) {
        db.createObjectStore('tastings', { keyPath: 'id' })
      }
      if (!db.objectStoreNames.contains('photos')) {
        db.createObjectStore('photos', { keyPath: 'id' })
      }
    }
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function req<T>(request: IDBRequest<T>) {
  return new Promise<T>((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

export async function listTastings(): Promise<Tasting[]> {
  const db = await openDb()
  const rows = await req<Tasting[]>(
    db.transaction('tastings').objectStore('tastings').getAll(),
  )
  db.close()
  return rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt))
}

export async function getTasting(id: string) {
  const db = await openDb()
  const tasting = await req<Tasting | undefined>(
    db.transaction('tastings').objectStore('tastings').get(id),
  )
  db.close()
  return tasting
}

export async function saveTasting(tasting: Tasting) {
  const db = await openDb()
  await req(db.transaction('tastings', 'readwrite').objectStore('tastings').put(tasting))
  db.close()
}

export async function deleteTasting(id: string) {
  const photos = await listPhotosFor(id)
  const db = await openDb()
  const tx = db.transaction(['tastings', 'photos'], 'readwrite')
  tx.objectStore('tastings').delete(id)
  for (const photo of photos) tx.objectStore('photos').delete(photo.id)
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}

export async function savePhoto(photo: PhotoRecord) {
  const db = await openDb()
  await req(db.transaction('photos', 'readwrite').objectStore('photos').put(photo))
  db.close()
}

export async function getPhoto(id: string) {
  const db = await openDb()
  const photo = await req<PhotoRecord | undefined>(
    db.transaction('photos').objectStore('photos').get(id),
  )
  db.close()
  return photo
}

export async function deletePhoto(id: string) {
  const db = await openDb()
  await req(db.transaction('photos', 'readwrite').objectStore('photos').delete(id))
  db.close()
}

export async function listPhotosFor(tastingId: string) {
  const db = await openDb()
  const all = await req<PhotoRecord[]>(
    db.transaction('photos').objectStore('photos').getAll(),
  )
  db.close()
  return all.filter((photo) => photo.tastingId === tastingId)
}

export async function exportBackup(): Promise<BackupFile> {
  const tastings = await listTastings()
  const db = await openDb()
  const photos = await req<PhotoRecord[]>(
    db.transaction('photos').objectStore('photos').getAll(),
  )
  db.close()
  const encoded = await Promise.all(
    photos.map(async (photo) => ({
      id: photo.id,
      tastingId: photo.tastingId,
      mime: photo.mime,
      dataUrl: await blobToDataUrl(photo.blob),
    })),
  )
  return {
    version: 1,
    exportedAt: new Date().toISOString(),
    tastings,
    photos: encoded,
  }
}

export async function importBackup(backup: BackupFile) {
  const photos: PhotoRecord[] = await Promise.all(
    backup.photos.map(async (photo) => {
      const blob = await dataUrlToBlob(photo.dataUrl)
      return {
        id: photo.id,
        tastingId: photo.tastingId,
        mime: photo.mime || blob.type,
        blob,
      }
    }),
  )
  const db = await openDb()
  const tx = db.transaction(['tastings', 'photos'], 'readwrite')
  for (const tasting of backup.tastings) {
    tx.objectStore('tastings').put(tasting)
  }
  for (const photo of photos) {
    tx.objectStore('photos').put(photo)
  }
  await new Promise<void>((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
  })
  db.close()
}

export function emptyTasting(): Tasting {
  return {
    id: uid(),
    createdAt: new Date().toISOString(),
    coffee: '',
    brewMethod: '',
    roaster: '',
    origin: '',
    acidity: null,
    bitterness: null,
    body: null,
    flavors: [],
    notes: '',
    photoIds: [],
  }
}
