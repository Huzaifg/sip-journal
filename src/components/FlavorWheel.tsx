import { useState } from 'react'
import { FLAVOR_WHEEL } from '../data/flavors'

export function FlavorWheel() {
  const [open, setOpen] = useState<string | null>(FLAVOR_WHEEL[1].id)
  const active = FLAVOR_WHEEL.find((item) => item.id === open) ?? FLAVOR_WHEEL[0]
  const cx = 160
  const cy = 160
  const r = 128
  const slice = (2 * Math.PI) / FLAVOR_WHEEL.length

  function arc(index: number) {
    const a0 = -Math.PI / 2 + index * slice
    const a1 = a0 + slice
    const x0 = cx + Math.cos(a0) * r
    const y0 = cy + Math.sin(a0) * r
    const x1 = cx + Math.cos(a1) * r
    const y1 = cy + Math.sin(a1) * r
    return `M ${cx} ${cy} L ${x0} ${y0} A ${r} ${r} 0 0 1 ${x1} ${y1} Z`
  }

  function labelPoint(index: number) {
    const a = -Math.PI / 2 + index * slice + slice / 2
    return [cx + Math.cos(a) * 78, cy + Math.sin(a) * 78] as const
  }

  return (
    <div className="wheel-panel">
      <svg className="wheel" viewBox="0 0 320 320" role="img" aria-label="Interactive flavor wheel">
        {FLAVOR_WHEEL.map((cat, index) => (
          <path
            key={cat.id}
            d={arc(index)}
            fill={cat.color}
            className={cat.id === open ? 'wedge on' : 'wedge'}
            onClick={() => setOpen(cat.id)}
          />
        ))}
        <circle cx={cx} cy={cy} r="42" className="wheel-hub" />
        <text x={cx} y={cy + 4} textAnchor="middle" className="wheel-hub-label">
          sip
        </text>
        {FLAVOR_WHEEL.map((cat, index) => {
          const [x, y] = labelPoint(index)
          return (
            <text
              key={`${cat.id}-label`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              className="wheel-mini"
              onClick={() => setOpen(cat.id)}
            >
              {cat.name.split(' / ')[0]}
            </text>
          )
        })}
      </svg>
      <div className="wheel-copy">
        <p className="kicker">Coffee Taster’s Flavor Wheel</p>
        <h3>{active.name}</h3>
        <p>{active.hint}</p>
        <ul className="note-list">
          {active.notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
        <p className="muted small">
          Work from the center out. Click a wedge, then ask whether that family is in the cup before
          chasing a specific word.
        </p>
      </div>
    </div>
  )
}
