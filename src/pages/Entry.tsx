import { useEffect, useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { FlavorChips } from '../components/FlavorChips'
import { Scale } from '../components/Scale'
import { deleteTasting, getTasting } from '../lib/storage'
import { usePhotoUrls } from '../lib/photos'
import { formatDate } from '../lib/util'
import type { Tasting } from '../types'

export function EntryPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [tasting, setTasting] = useState<Tasting | null | undefined>(undefined)
  const urls = usePhotoUrls(tasting?.photoIds ?? [])

  useEffect(() => {
    if (!id) return
    void getTasting(id).then((row) => setTasting(row ?? null))
  }, [id])

  if (tasting === undefined) return <p className="muted">Loading tasting…</p>
  if (tasting === null) return <Navigate to="/journal" replace />

  async function remove() {
    if (!id) return
    if (!confirm('Delete this tasting and its photos from this browser?')) return
    await deleteTasting(id)
    navigate('/journal')
  }

  return (
    <div className="stack narrow">
      <p className="kicker">
        <Link to="/journal">Journal</Link> · {formatDate(tasting.createdAt)}
      </p>
      <article className="journal-card read">
        <div className="journal-head">
          <div className="line-field">
            <span>Coffee</span>
            <strong>{tasting.coffee}</strong>
          </div>
          <div className="line-field">
            <span>Brew method</span>
            <strong>{tasting.brewMethod || '—'}</strong>
          </div>
        </div>
        {(tasting.roaster || tasting.origin) && (
          <p className="muted">
            {[tasting.roaster, tasting.origin].filter(Boolean).join(' · ')}
          </p>
        )}
        <div className="journal-scales">
          <Scale label="Acidity" value={tasting.acidity} readOnly />
          <Scale label="Bitterness" value={tasting.bitterness} readOnly />
          <Scale label="Body" value={tasting.body} readOnly />
        </div>
        <FlavorChips selected={tasting.flavors} readOnly />
        {tasting.notes && (
          <div className="notes-field">
            <p className="field-label">Likes, dislikes, or thoughts</p>
            <p className="written">{tasting.notes}</p>
          </div>
        )}
        {tasting.photoIds.length > 0 && (
          <div className="photo-gallery">
            {tasting.photoIds.map((photoId) =>
              urls[photoId] ? (
                <img key={photoId} src={urls[photoId]} alt={`Packaging for ${tasting.coffee}`} />
              ) : null,
            )}
          </div>
        )}
      </article>
      <div className="form-actions">
        <Link className="btn" to={`/taste/${tasting.id}`}>
          Edit
        </Link>
        <button type="button" className="btn ghost danger" onClick={() => void remove()}>
          Delete
        </button>
      </div>
    </div>
  )
}
