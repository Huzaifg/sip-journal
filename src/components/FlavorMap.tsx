import type { CSSProperties } from 'react'
import { FLAVOR_GROUPS } from '../data/flavors'

const FRUIT = new Set([
  'apple',
  'berry',
  'cherry',
  'citrus',
  'stone fruit',
  'tropical fruit',
  'floral',
  'fermented',
])
const COMFORT = new Set([
  'baking spice',
  'caramel',
  'chocolate',
  'nuts',
  'honey',
  'vanilla',
  'roasty',
])

type FlavorMapProps = {
  counts: { tag: string; count: number }[]
}

export function FlavorMap({ counts }: FlavorMapProps) {
  const byTag = new Map(counts.map((row) => [row.tag, row.count]))
  const max = Math.max(1, ...counts.map((row) => row.count))
  const fruit = counts.reduce((sum, row) => sum + (FRUIT.has(row.tag) ? row.count : 0), 0)
  const comfort = counts.reduce((sum, row) => sum + (COMFORT.has(row.tag) ? row.count : 0), 0)
  const total = fruit + comfort
  const lean = total === 0 ? 0.5 : comfort / total

  const readout =
    total === 0
      ? 'Nothing circled yet. After a tasting, the words you marked fill in like the paper journal.'
      : fruit > comfort + 1
        ? 'So far you are circling more fruit and florals than cocoa and roast.'
        : comfort > fruit + 1
          ? 'So far you are circling more cocoa, caramel, nuts, and roast than fruit.'
          : 'Fruit-bright notes and cocoa/roast notes are showing up in about equal measure.'

  return (
    <div className="profile-board">
      <div className="balance">
        <div className="balance-labels">
          <span>Fruit & floral</span>
          <span>Cocoa & roast</span>
        </div>
        <div className="balance-track" role="img" aria-label="Balance between fruit notes and cocoa notes">
          <span className="balance-fill fruit" style={{ width: `${(1 - lean) * 100}%` }} />
          <span className="balance-fill comfort" style={{ width: `${lean * 100}%` }} />
          <span className="balance-knob" style={{ left: `${lean * 100}%` }} />
        </div>
        <p className="balance-readout">{readout}</p>
      </div>

      {FLAVOR_GROUPS.map((group) => {
        const groupTotal = group.tags.reduce((sum, tag) => sum + (byTag.get(tag) ?? 0), 0)
        return (
          <div key={group.id} className="profile-family">
            <div className="profile-family-head">
              <h3>{group.label}</h3>
              <span>{groupTotal === 0 ? 'none yet' : `${groupTotal} mark${groupTotal === 1 ? '' : 's'}`}</span>
            </div>
            <div className="profile-chips">
              {group.tags.map((tag) => {
                const count = byTag.get(tag) ?? 0
                const weight = count / max
                return (
                  <span
                    key={tag}
                    className={count ? 'profile-chip on' : 'profile-chip'}
                    style={{ '--weight': String(weight) } as CSSProperties}
                  >
                    <em>{tag}</em>
                    {count > 0 && <b>{count}</b>}
                  </span>
                )
              })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
