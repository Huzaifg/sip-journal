import { FLAVOR_MAP_LAYOUT } from '../data/flavors'

type FlavorMapProps = {
  counts: { tag: string; count: number }[]
}

export function FlavorMap({ counts }: FlavorMapProps) {
  const max = Math.max(1, ...counts.map((row) => row.count))
  return (
    <div className="flavor-map-wrap">
      <svg className="flavor-map" viewBox="0 0 640 420" role="img" aria-label="Flavor profile map">
        <text x="24" y="28" className="map-axis">
          roast & earth
        </text>
        <text x="616" y="28" className="map-axis" textAnchor="end">
          fruit & floral
        </text>
        <text x="24" y="404" className="map-axis">
          heavier / savory
        </text>
        <text x="616" y="404" className="map-axis" textAnchor="end">
          sweeter
        </text>
        {counts.map(({ tag, count }) => {
          const layout = FLAVOR_MAP_LAYOUT[tag]
          if (!layout) return null
          const x = 48 + layout.x * 544
          const y = 380 - layout.y * 340
          const r = count === 0 ? 10 : 12 + (count / max) * 22
          const opacity = count === 0 ? 0.28 : 0.55 + (count / max) * 0.45
          return (
            <g key={tag} transform={`translate(${x} ${y})`}>
              <circle r={r} className={count ? 'map-node on' : 'map-node'} style={{ opacity }} />
              <text y={r + 14} textAnchor="middle" className="map-tag">
                {tag}
              </text>
              {count > 0 && (
                <text y="4" textAnchor="middle" className="map-count">
                  {count}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}
