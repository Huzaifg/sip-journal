import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { FlavorMap } from '../components/FlavorMap'
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

      {tastings.length === 0 ? (
        <div className="empty sheet">
          <h2>No map yet</h2>
          <p>Taste a few coffees from the subscription. The triangle, the map, and the trend line fill in from your own scores.</p>
          <Link className="btn" to="/taste">
            Log a coffee
          </Link>
        </div>
      ) : (
        <>
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
              <strong>{stats.brewFavorite}</strong>
            </div>
          </section>

          <section className="split charts">
            <div className="sheet">
              <h2>The three scales</h2>
              <p className="muted">Average of every logged cup, on the same 1–8 dots as the journal.</p>
              <RadarChart
                acidity={stats.acidity}
                bitterness={stats.bitterness}
                body={stats.body}
              />
            </div>
            <div className="sheet">
              <h2>Words you keep circling</h2>
              <ul className="top-flavors">
                {stats.topFlavors.length === 0 && <li>No flavor tags yet.</li>}
                {stats.topFlavors.map((row) => (
                  <li key={row.tag}>
                    <span>{row.tag}</span>
                    <b>{row.count}</b>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          <section className="sheet">
            <h2>Flavor profile map</h2>
            <p className="muted">
              Bigger circles are notes you use more. Left is roast and earth; right is fruit and
              floral. Bottom is heavier; top is sweeter.
            </p>
            <FlavorMap counts={counts} />
          </section>

          <section className="sheet">
            <h2>Across bags</h2>
            <TrendChart points={stats.timeline} />
          </section>
        </>
      )}

      <section className="sheet backup">
        <h2>Keep a copy</h2>
        <p>
          Tastings and photos are stored in this browser. Export a JSON backup before you switch
          machines — or after a good run of the subscription.
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
