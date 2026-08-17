import { Link } from 'react-router-dom'
import { GUIDES } from '../data/guides'

export function LearnPage() {
  return (
    <div className="stack narrow">
      <header className="page-head">
        <p className="kicker">Learn</p>
        <h1>How to taste, then how to write it down.</h1>
        <p className="lede">
          Skim a guide at the kettle. The language comes from specialty-coffee practice — SCA
          tasting mechanics, the Coffee Value Assessment, and the World Coffee Research Sensory
          Lexicon — rewritten for a kitchen counter.
        </p>
      </header>
      <div className="guide-list">
        {GUIDES.map((guide) => (
          <Link key={guide.slug} className="guide-row" to={`/learn/${guide.slug}`}>
            <div>
              <p className="kicker">{guide.kicker}</p>
              <h2>{guide.title}</h2>
              <p>{guide.summary}</p>
            </div>
            <span className="mins">{guide.minutes}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
