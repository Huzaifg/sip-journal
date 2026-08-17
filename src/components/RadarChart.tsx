type RadarProps = {
  acidity: number | null
  bitterness: number | null
  body: number | null
}

export function RadarChart({ acidity, bitterness, body }: RadarProps) {
  const cx = 160
  const cy = 150
  const r = 108
  const axes = [
    { key: 'Acidity', value: acidity, angle: -Math.PI / 2 },
    { key: 'Bitterness', value: bitterness, angle: -Math.PI / 2 + (2 * Math.PI) / 3 },
    { key: 'Body', value: body, angle: -Math.PI / 2 + (4 * Math.PI) / 3 },
  ]

  function point(angle: number, value: number) {
    const rr = (value / 8) * r
    return [cx + Math.cos(angle) * rr, cy + Math.sin(angle) * rr] as const
  }

  const grid = [2, 4, 6, 8].map((level) => {
    const pts = axes.map((axis) => point(axis.angle, level).join(',')).join(' ')
    return <polygon key={level} points={pts} className="radar-grid" />
  })

  const filled = axes.every((axis) => axis.value != null)
  const shape = filled
    ? axes.map((axis) => point(axis.angle, axis.value ?? 0).join(',')).join(' ')
    : ''

  return (
    <svg className="radar" viewBox="0 0 320 300" role="img" aria-label="Average acidity, bitterness, and body">
      {grid}
      {axes.map((axis) => {
        const [x, y] = point(axis.angle, 8)
        const [lx, ly] = point(axis.angle, 9.35)
        return (
          <g key={axis.key}>
            <line x1={cx} y1={cy} x2={x} y2={y} className="radar-axis" />
            <text x={lx} y={ly} className="radar-label" textAnchor="middle" dominantBaseline="middle">
              {axis.key}
            </text>
          </g>
        )
      })}
      {filled && <polygon points={shape} className="radar-fill" />}
      {axes.map((axis) => {
        if (axis.value == null) return null
        const [x, y] = point(axis.angle, axis.value)
        return <circle key={axis.key} cx={x} cy={y} r="5" className="radar-dot" />
      })}
    </svg>
  )
}
