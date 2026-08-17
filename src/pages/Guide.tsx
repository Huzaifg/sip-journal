import { Link, Navigate, useParams } from 'react-router-dom'
import { getGuide } from '../data/guides'

export function GuidePage() {
  const { slug } = useParams()
  const guide = slug ? getGuide(slug) : undefined
  if (!guide) return <Navigate to="/learn" replace />

  return (
    <article className="stack narrow guide-article">
      <p className="kicker">
        <Link to="/learn">Learn</Link> · {guide.minutes}
      </p>
      <h1>{guide.title}</h1>
      <p className="lede">{guide.summary}</p>
      {guide.sections.map((section) => (
        <section key={section.heading}>
          <h2>{section.heading}</h2>
          {section.body.map((para) => (
            <p key={para}>{para}</p>
          ))}
        </section>
      ))}
      <aside className="sources">
        <p className="field-label">Sources to go deeper</p>
        <ul>
          {guide.sources.map((source) => (
            <li key={source.href}>
              <a href={source.href} target="_blank" rel="noreferrer">
                {source.label}
              </a>
            </li>
          ))}
        </ul>
      </aside>
      <Link className="btn" to="/taste">
        Ready — log this coffee
      </Link>
    </article>
  )
}
