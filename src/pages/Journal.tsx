import { Link } from 'react-router-dom'
import { TastingCard } from '../components/TastingCard'
import { useTastings } from '../lib/useTastings'

export function JournalPage() {
  const { tastings, ready } = useTastings()

  return (
    <div className="stack">
      <header className="page-head spread">
        <div>
          <p className="kicker">Journal</p>
          <h1>Every coffee you sat with.</h1>
        </div>
        <Link className="btn" to="/taste">
          New tasting
        </Link>
      </header>
      {!ready ? (
        <p className="muted">Opening the notebook…</p>
      ) : tastings.length === 0 ? (
        <div className="empty sheet">
          <h2>Blank pages</h2>
          <p>The first bag you log will look like the paper journal — scales, flavors, a note.</p>
          <Link className="btn" to="/taste">
            Write the first one
          </Link>
        </div>
      ) : (
        <div className="entry-list">
          {tastings.map((tasting) => (
            <TastingCard key={tasting.id} tasting={tasting} to={`/sip/${tasting.id}`} />
          ))}
        </div>
      )}
    </div>
  )
}
