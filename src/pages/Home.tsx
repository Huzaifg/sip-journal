import { Link } from 'react-router-dom'
import { GUIDES } from '../data/guides'
import { FlavorWheel } from '../components/FlavorWheel'
import { useTastings } from '../lib/useTastings'

export function HomePage() {
  const { tastings } = useTastings()
  const latest = tastings[0]

  return (
    <div className="stack">
      <section className="hero sheet">
        <p className="kicker">A guide to getting to know your coffee</p>
        <h1>Taste on purpose.</h1>
        <p className="lede">
          This notebook is for dialing in a brew and figuring out what you actually like. Smell,
          slurp, mark the three scales, circle what you tasted, keep the bag photo. Over a few
          bags, a palate shows up.
        </p>
        <div className="hero-actions">
          <Link className="btn" to="/taste">
            Log a tasting
          </Link>
          <Link className="btn ghost" to="/learn/before-you-sip">
            Skim the 60-second primer
          </Link>
        </div>
      </section>

      <section className="defs">
        <article>
          <h2>Acidity</h2>
          <p>
            A sharp flavor — refreshing when it is citrusy or apple-bright, sour when it is not.
            For high acidity, think lemon juice.
          </p>
        </article>
        <article>
          <h2>Bitterness</h2>
          <p>
            Found in every coffee, and easy to move by changing extraction or roast. For high
            bitterness, think unsweetened dark chocolate.
          </p>
        </article>
        <article>
          <h2>Body</h2>
          <p>
            Texture. Light-bodied coffee feels more like tea. Heavy-bodied coffee can feel more
            like milk.
          </p>
        </article>
        <article>
          <h2>Tasting notes</h2>
          <p>
            Name the families you actually get — fruit, chocolate, nuts, florals, roast. Specific
            is good. Invented is not.
          </p>
        </article>
      </section>

      <FlavorWheel />

      <section className="split">
        <div className="sheet">
          <p className="kicker">Ready to taste?</p>
          <h2>Record the next bag</h2>
          <p>
            Same fields as the paper journal, plus photos of the packaging so you remember what
            you were drinking.
          </p>
          <Link className="btn" to="/taste">
            Open a blank page
          </Link>
        </div>
        <div className="sheet">
          <p className="kicker">Your notebook</p>
          {latest ? (
            <>
              <h2>{latest.coffee}</h2>
              <p className="muted">{latest.brewMethod || 'Brew method not set'}</p>
              <p>{latest.notes || 'No written note yet — the scales are still there.'}</p>
              <Link to={`/sip/${latest.id}`}>Open latest tasting</Link>
            </>
          ) : (
            <>
              <h2>Nothing logged yet</h2>
              <p>Your first coffee will live here, then on the palate map.</p>
              <Link to="/journal">See the journal</Link>
            </>
          )}
        </div>
      </section>

      <section>
        <div className="section-head">
          <h2>How-tos to skim</h2>
          <Link to="/learn">All guides</Link>
        </div>
        <div className="guide-grid">
          {GUIDES.map((guide) => (
            <Link key={guide.slug} className="guide-card" to={`/learn/${guide.slug}`}>
              <p className="kicker">
                {guide.kicker} · {guide.minutes}
              </p>
              <h3>{guide.title}</h3>
              <p>{guide.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
