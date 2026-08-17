export type Tasting = {
  id: string
  createdAt: string
  coffee: string
  brewMethod: string
  roaster: string
  origin: string
  acidity: number | null
  bitterness: number | null
  body: number | null
  flavors: string[]
  notes: string
  photoIds: string[]
}

export type PhotoRecord = {
  id: string
  tastingId: string
  mime: string
  blob: Blob
}

export type BackupFile = {
  version: 1
  exportedAt: string
  tastings: Tasting[]
  photos: { id: string; tastingId: string; mime: string; dataUrl: string }[]
}
