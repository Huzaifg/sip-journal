import { useCallback, useEffect, useState } from 'react'
import { getPhoto } from './storage'

export function usePhotoUrl(id: string | undefined) {
  const [url, setUrl] = useState<string | null>(null)

  useEffect(() => {
    if (!id) {
      setUrl(null)
      return
    }
    let active = true
    let objectUrl: string | null = null
    void getPhoto(id).then((photo) => {
      if (!active || !photo) return
      objectUrl = URL.createObjectURL(photo.blob)
      if (!active) {
        URL.revokeObjectURL(objectUrl)
        objectUrl = null
        return
      }
      setUrl(objectUrl)
    })
    return () => {
      active = false
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [id])

  return url
}

export function usePhotoUrls(ids: string[]) {
  const [urls, setUrls] = useState<Record<string, string>>({})

  const load = useCallback(async (photoIds: string[]) => {
    const next: Record<string, string> = {}
    await Promise.all(
      photoIds.map(async (id) => {
        const photo = await getPhoto(id)
        if (photo) next[id] = URL.createObjectURL(photo.blob)
      }),
    )
    return next
  }, [])

  const key = ids.join('|')

  useEffect(() => {
    const photoIds = key ? key.split('|') : []
    let active = true
    const created: string[] = []
    void load(photoIds).then((next) => {
      if (!active) {
        Object.values(next).forEach((url) => URL.revokeObjectURL(url))
        return
      }
      created.push(...Object.values(next))
      setUrls(next)
    })
    return () => {
      active = false
      created.forEach((url) => URL.revokeObjectURL(url))
    }
  }, [key, load])

  return urls
}
