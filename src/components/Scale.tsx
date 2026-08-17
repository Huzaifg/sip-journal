type ScaleProps = {
  label: string
  value: number | null
  onChange?: (value: number) => void
  readOnly?: boolean
}

export function Scale({ label, value, onChange, readOnly }: ScaleProps) {
  return (
    <div className="scale">
      <div className="scale-head">
        <span className="scale-label">{label}</span>
        <span className="scale-ends">
          <em>Low</em>
          <em>High</em>
        </span>
      </div>
      <div className="scale-dots" role={readOnly ? 'img' : 'radiogroup'} aria-label={label}>
        {Array.from({ length: 8 }, (_, index) => {
          const n = index + 1
          const filled = value != null && n === value
          if (readOnly) {
            return <span key={n} className={filled ? 'dot on' : 'dot'} />
          }
          return (
            <button
              key={n}
              type="button"
              className={filled ? 'dot on' : 'dot'}
              aria-label={`${label} ${n} of 8`}
              aria-checked={filled}
              role="radio"
              onClick={() => onChange?.(n)}
            />
          )
        })}
      </div>
    </div>
  )
}
