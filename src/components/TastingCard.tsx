import { Link } from 'react-router-dom'
import type { Tasting } from '../types'
import { formatDate } from '../lib/util'
import { usePhotoUrl } from '../lib/photos'
import { Scale } from './Scale'
import { FlavorChips } from './FlavorChips'

export function TastingCard({ tasting, to }: { tasting: Tasting; to: string }) {
  const cover = usePhotoUrl(tasting.photoIds[0])
  return (
    <Link to={to} className="entry-card">
      <div className="entry-card-top">
        <div>
          <p className="kicker">{formatDate(tasting.createdAt)}</p>
          <h3>{tasting.coffee || 'Untitled coffee'}</h3>
          <p className="muted">
            {[tasting.brewMethod, tasting.roaster, tasting.origin].filter(Boolean).join(' · ') ||
              'No brew notes yet'}
          </p>
        </div>
        {cover && <img className="entry-thumb" src={cover} alt="" />}
      </div>
      <div className="mini-scales">
        <Scale label="Acidity" value={tasting.acidity} readOnly />
        <Scale label="Bitterness" value={tasting.bitterness} readOnly />
        <Scale label="Body" value={tasting.body} readOnly />
      </div>
      {tasting.flavors.length > 0 && (
        <FlavorChips selected={tasting.flavors} readOnly compact />
      )}
      {tasting.notes && <p className="entry-note">“{tasting.notes}”</p>}
    </Link>
  )
}
