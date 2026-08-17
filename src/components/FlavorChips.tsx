import { FLAVOR_GROUPS } from '../data/flavors'

type FlavorChipsProps = {
  selected: string[]
  onToggle?: (tag: string) => void
  readOnly?: boolean
  compact?: boolean
}

export function FlavorChips({ selected, onToggle, readOnly, compact }: FlavorChipsProps) {
  const groups = compact
    ? [{ id: 'picked', label: '', tags: selected }]
    : FLAVOR_GROUPS

  return (
    <div className="flavor-block">
      {!compact && <p className="field-label">What’d you taste?</p>}
      {groups.map((group) => (
        <div key={group.id} className="chip-row">
          {group.tags.map((tag) => {
            const on = selected.includes(tag)
            if (readOnly) {
              return (
                <span key={tag} className={on ? 'chip on' : 'chip ghost'}>
                  {tag}
                </span>
              )
            }
            return (
              <button
                key={tag}
                type="button"
                className={on ? 'chip on' : 'chip'}
                aria-pressed={on}
                onClick={() => onToggle?.(tag)}
              >
                {tag}
              </button>
            )
          })}
        </div>
      ))}
    </div>
  )
}
