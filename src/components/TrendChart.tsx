type Point = {
  id: string
  coffee: string
  date: string
  acidity: number | null
  bitterness: number | null
  body: number | null
}

export function TrendChart({ points }: { points: Point[] }) {
  if (points.length < 2) {
    return <p className="muted">Log at least two coffees to see a trend line.</p>
  }

  const w = 640
  const h = 220
  const pad = { l: 28, r: 16, t: 16, b: 28 }
  const innerW = w - pad.l - pad.r
  const innerH = h - pad.t - pad.b

  function series(key: 'acidity' | 'bitterness' | 'body') {
    return points
      .map((point, index) => {
        if (point[key] == null) return null
        const x = pad.l + (index / (points.length - 1)) * innerW
        const y = pad.t + (1 - (point[key]! - 1) / 7) * innerH
        return `${x},${y}`
      })
      .filter((value): value is string => value != null)
      .join(' ')
  }

  return (
    <svg className="trend" viewBox={`0 0 ${w} ${h}`} role="img" aria-label="Ratings over time">
      {[1, 3, 5, 8].map((level) => {
        const y = pad.t + (1 - (level - 1) / 7) * innerH
        return (
          <g key={level}>
            <line x1={pad.l} x2={w - pad.r} y1={y} y2={y} className="trend-grid" />
            <text x={4} y={y + 4} className="trend-tick">
              {level}
            </text>
          </g>
        )
      })}
      <polyline points={series('acidity')} className="trend-line acid" fill="none" />
      <polyline points={series('bitterness')} className="trend-line bitter" fill="none" />
      <polyline points={series('body')} className="trend-line body" fill="none" />
      <text x={pad.l} y={h - 6} className="trend-legend acid">
        acidity
      </text>
      <text x={pad.l + 90} y={h - 6} className="trend-legend bitter">
        bitterness
      </text>
      <text x={pad.l + 200} y={h - 6} className="trend-legend body">
        body
      </text>
    </svg>
  )
}
