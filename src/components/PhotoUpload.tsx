import { useEffect, useMemo, useRef, useState } from 'react'
import { usePhotoUrls } from '../lib/photos'

function PendingThumb({ file }: { file: File }) {
  const url = useMemo(() => URL.createObjectURL(file), [file])
  useEffect(() => () => URL.revokeObjectURL(url), [url])
  return <img src={url} alt={file.name} />
}

type PhotoUploadProps = {
  photoIds: string[]
  pending: File[]
  onAddFiles: (files: File[]) => void
  onRemoveExisting: (id: string) => void
  onRemovePending: (index: number) => void
}

export function PhotoUpload({
  photoIds,
  pending,
  onAddFiles,
  onRemoveExisting,
  onRemovePending,
}: PhotoUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [drag, setDrag] = useState(false)
  const urls = usePhotoUrls(photoIds)

  function take(fileList: FileList | null) {
    if (!fileList?.length) return
    const images = [...fileList].filter((file) => file.type.startsWith('image/'))
    if (images.length) onAddFiles(images)
  }

  return (
    <div className="photos">
      <p className="field-label">Packaging & brew photos</p>
      <div
        className={drag ? 'dropzone on' : 'dropzone'}
        onDragOver={(event) => {
          event.preventDefault()
          setDrag(true)
        }}
        onDragLeave={() => setDrag(false)}
        onDrop={(event) => {
          event.preventDefault()
          setDrag(false)
          take(event.dataTransfer.files)
        }}
      >
        <p>Drop a bag shot here, or</p>
        <button type="button" className="text-btn" onClick={() => inputRef.current?.click()}>
          choose photos
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          multiple
          hidden
          onChange={(event) => {
            take(event.target.files)
            event.target.value = ''
          }}
        />
      </div>
      {(photoIds.length > 0 || pending.length > 0) && (
        <ul className="photo-strip">
          {photoIds.map((id) => (
            <li key={id}>
              {urls[id] ? <img src={urls[id]} alt="Coffee packaging" /> : <div className="ph" />}
              <button type="button" className="photo-x" onClick={() => onRemoveExisting(id)}>
                Remove
              </button>
            </li>
          ))}
          {pending.map((file, index) => (
            <li key={`${file.name}-${index}`}>
              <PendingThumb file={file} />
              <button type="button" className="photo-x" onClick={() => onRemovePending(index)}>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
