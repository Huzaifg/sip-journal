import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FlavorMap } from '../components/FlavorMap'
import { FlavorWheel } from '../components/FlavorWheel'
import { RadarChart } from '../components/RadarChart'
import { TrendChart } from '../components/TrendChart'
import { flavorCounts, leanCopy, palateStats, shiftCopy } from '../lib/stats'
import { exportBackup, importBackup } from '../lib/storage'
import { useTastings } from '../lib/useTastings'
import type { BackupFile } from '../types'

function fmt(value: number | null) {
  return value == null ? '—' : value.toFixed(1)
}

export function PalatePage() {
  const { tastings, ready, reload } = useTastings()
  const fileRef = useRef<HTMLInputElement>(null)
  const stats = palateStats(tastings)
  const counts = flavorCounts(tastings)
  const empty = tastings.length === 0

  async function onExport() {
    const backup = await exportBackup()
    const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `sip-journal-${new Date().toISOString().slice(0, 10)}.json`
    link.click()
    URL.revokeObjectURL(url)
  }

  async function onImport(file: File) {
    const parsed = JSON.parse(await file.text()) as BackupFile
    if (parsed.version !== 1 || !Array.isArray(parsed.tastings)) {
      alert('That file does not look like a Sip Journal backup.')
      return
    }
    await importBackup(parsed)
    await reload()
  }

  return (
    <div className="stack">
      <header className="page-head">
        <p className="kicker">Palate</p>
        <h1>Where your flavor profile is going.</h1>
        <p className="lede">
          {ready ? leanCopy(stats) : 'Gathering your notes…'} {ready ? shiftCopy(stats) : ''}
        </p>
      </header>

      {empty && (
        <aside className="primer">
          <div>
            <p className="kicker">This browser is empty</p>
            <p>
              The triangle, the flavor map, and the wheel are below. They stay faint until you log
              coffees here — or import a backup from another machine.
            </p>
          </div>
          <div className="primer-actions">
            <Link className="btn" to="/taste">
              Log a coffee
            </Link>
          </div>
        </aside>
      )}

      <section className="stat-row">
        <div className="stat">
          <span>Tastings</span>
          <strong>{stats.count}</strong>
        </div>
        <div className="stat">
          <span>Avg acidity</span>
          <strong>{fmt(stats.acidity)}</strong>
        </div>
        <div className="stat">
          <span>Avg bitterness</span>
          <strong>{fmt(stats.bitterness)}</strong>
        </div>
        <div className="stat">
          <span>Avg body</span>
          <strong>{fmt(stats.body)}</strong>
        </div>
        <div className="stat">
          <span>Favorite brew</span>
          <strong>{stats.brewFavorite ?? '—'}</strong>
        </div>
      </section>

      <section className="split charts">
        <div className="sheet">
          <h2>The three scales</h2>
          <p className="muted">
            Average acidity, bitterness, and body — the same 1–8 dots as the journal. The triangle
            fills in after the first scored cup.
          </p>
          <RadarChart
            acidity={stats.acidity}
            bitterness={stats.bitterness}
            body={stats.body}
          />
        </div>
        <div className="sheet">
          <h2>Words you keep circling</h2>
          {stats.topFlavors.length === 0 ? (
            <p className="muted">
              Chocolate, citrus, roasty, floral — whatever you circle on a tasting will rank here.
            </p>
          ) : (
            <ul className="top-flavors">
              {stats.topFlavors.map((row) => (
                <li key={row.tag}>
                  <span>{row.tag}</span>
                  <b>{row.count}</b>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="sheet">
        <h2>What you keep tasting</h2>
        <p className="muted">
          Same words as the journal. A filled, darker chip is a note you have actually circled —
          the number is how many cups. The bar at the top is the simple question: fruit-bright, or
          cocoa and roast?
        </p>
        <FlavorMap counts={counts} />
      </section>

      <FlavorWheel />

      <section className="sheet">
        <h2>Across bags</h2>
        <TrendChart points={stats.timeline} />
      </section>

      <section className="sheet backup">
        <h2>Keep a copy</h2>
        <p>
          Tastings and photos are stored in this browser, not on GitHub. Export a JSON backup
          before you switch machines — or after a good run of the subscription.
        </p>
        <div className="form-actions">
          <button type="button" className="btn" onClick={() => void onExport()}>
            Export journal
          </button>
          <button type="button" className="btn ghost" onClick={() => fileRef.current?.click()}>
            Import backup
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="application/json"
            hidden
            onChange={(event) => {
              const file = event.target.files?.[0]
              if (file) void onImport(file)
              event.target.value = ''
            }}
          />
        </div>
      </section>
    </div>
  )
}
