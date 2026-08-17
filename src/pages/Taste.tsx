import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { BREW_METHODS } from '../data/flavors'
import { FlavorChips } from '../components/FlavorChips'
import { PhotoUpload } from '../components/PhotoUpload'
import { Scale } from '../components/Scale'
import {
  deletePhoto,
  emptyTasting,
  getTasting,
  savePhoto,
  saveTasting,
} from '../lib/storage'
import { compressImage, uid } from '../lib/util'
import type { Tasting } from '../types'

export function TastePage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tasting, setTasting] = useState<Tasting>(() => emptyTasting())
  const [pending, setPending] = useState<File[]>([])
  const [primer, setPrimer] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const editing = Boolean(id)

  useEffect(() => {
    if (!id) {
      setTasting(emptyTasting())
      setPending([])
      return
    }
    void getTasting(id).then((row) => {
      if (row) setTasting(row)
    })
  }, [id])

  function patch<K extends keyof Tasting>(key: K, value: Tasting[K]) {
    setTasting((current) => ({ ...current, [key]: value }))
  }

  function toggleFlavor(tag: string) {
    setTasting((current) => ({
      ...current,
      flavors: current.flavors.includes(tag)
        ? current.flavors.filter((item) => item !== tag)
        : [...current.flavors, tag],
    }))
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError(null)
    try {
      const nextIds = [...tasting.photoIds]
      for (const file of pending) {
        const blob = await compressImage(file)
        const photoId = uid()
        await savePhoto({
          id: photoId,
          tastingId: tasting.id,
          mime: blob.type,
          blob,
        })
        nextIds.push(photoId)
      }
      const record: Tasting = {
        ...tasting,
        coffee: tasting.coffee.trim(),
        brewMethod: tasting.brewMethod.trim(),
        roaster: tasting.roaster.trim(),
        origin: tasting.origin.trim(),
        notes: tasting.notes.trim(),
        photoIds: nextIds,
      }
      await saveTasting(record)
      navigate(`/sip/${record.id}`)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not save this tasting.')
    } finally {
      setSaving(false)
    }
  }

  async function removeExisting(photoId: string) {
    await deletePhoto(photoId)
    patch(
      'photoIds',
      tasting.photoIds.filter((item) => item !== photoId),
    )
  }

  return (
    <div className="stack taste-layout">
      {primer && (
        <aside className="primer">
          <div>
            <p className="kicker">Before you write</p>
            <p>
              Smell. Slurp so it coats the tongue. Mark acidity, bitterness, body. Circle only
              what you tasted. Photos of the bag help later.
            </p>
          </div>
          <div className="primer-actions">
            <Link to="/learn/before-you-sip">Full primer</Link>
            <button type="button" className="text-btn" onClick={() => setPrimer(false)}>
              Hide
            </button>
          </div>
        </aside>
      )}

      <form className="journal-card" onSubmit={onSubmit}>
        <div className="journal-head">
          <label className="line-field">
            <span>Coffee</span>
            <input
              value={tasting.coffee}
              onChange={(event) => patch('coffee', event.target.value)}
              placeholder="FEAST Pink & Gold"
              required
            />
          </label>
          <label className="line-field">
            <span>Brew method</span>
            <input
              value={tasting.brewMethod}
              onChange={(event) => patch('brewMethod', event.target.value)}
              placeholder="AeroPress"
              list="brew-methods"
            />
            <datalist id="brew-methods">
              {BREW_METHODS.map((method) => (
                <option key={method} value={method} />
              ))}
            </datalist>
          </label>
        </div>

        <div className="journal-meta">
          <label className="line-field">
            <span>Roaster</span>
            <input
              value={tasting.roaster}
              onChange={(event) => patch('roaster', event.target.value)}
              placeholder="Optional"
            />
          </label>
          <label className="line-field">
            <span>Origin</span>
            <input
              value={tasting.origin}
              onChange={(event) => patch('origin', event.target.value)}
              placeholder="Optional"
            />
          </label>
        </div>

        <div className="journal-scales">
          <Scale
            label="Acidity"
            value={tasting.acidity}
            onChange={(value) => patch('acidity', value)}
          />
          <Scale
            label="Bitterness"
            value={tasting.bitterness}
            onChange={(value) => patch('bitterness', value)}
          />
          <Scale label="Body" value={tasting.body} onChange={(value) => patch('body', value)} />
        </div>

        <FlavorChips selected={tasting.flavors} onToggle={toggleFlavor} />

        <label className="notes-field">
          <span className="field-label">Likes, dislikes, or thoughts</span>
          <textarea
            rows={5}
            value={tasting.notes}
            onChange={(event) => patch('notes', event.target.value)}
            placeholder="I love the thickness of the coffee and find it very smooth."
          />
        </label>

        <PhotoUpload
          photoIds={tasting.photoIds}
          pending={pending}
          onAddFiles={(files) => setPending((current) => [...current, ...files])}
          onRemoveExisting={(photoId) => void removeExisting(photoId)}
          onRemovePending={(index) =>
            setPending((current) => current.filter((_, i) => i !== index))
          }
        />

        {error && <p className="form-error">{error}</p>}

        <div className="form-actions">
          <button className="btn" type="submit" disabled={saving}>
            {saving ? 'Saving…' : editing ? 'Update tasting' : 'Save tasting'}
          </button>
          <Link className="btn ghost" to={editing ? `/sip/${tasting.id}` : '/journal'}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  )
}
