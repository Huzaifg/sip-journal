import { ALL_FLAVORS } from '../data/flavors'
import type { Tasting } from '../types'

function avg(values: number[]) {
  if (!values.length) return null
  return values.reduce((sum, value) => sum + value, 0) / values.length
}

export function numbered(tastings: Tasting[], key: 'acidity' | 'bitterness' | 'body') {
  return tastings
    .map((tasting) => tasting[key])
    .filter((value): value is number => value != null)
}

export function flavorCounts(tastings: Tasting[]) {
  const counts = new Map<string, number>()
  for (const tag of ALL_FLAVORS) counts.set(tag, 0)
  for (const tasting of tastings) {
    for (const tag of tasting.flavors) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1)
    }
  }
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

export function palateStats(tastings: Tasting[]) {
  const chronological = [...tastings].sort((a, b) =>
    a.createdAt.localeCompare(b.createdAt),
  )
  const recent = chronological.slice(-5)
  const earlier = chronological.slice(0, Math.max(0, chronological.length - 5))

  const fruitTags = new Set([
    'apple',
    'berry',
    'cherry',
    'citrus',
    'stone fruit',
    'tropical fruit',
    'floral',
    'fermented',
  ])
  const comfortTags = new Set([
    'baking spice',
    'caramel',
    'chocolate',
    'nuts',
    'honey',
    'vanilla',
    'roasty',
  ])

  const tagScore = (rows: Tasting[], set: Set<string>) =>
    rows.reduce(
      (sum, tasting) => sum + tasting.flavors.filter((tag) => set.has(tag)).length,
      0,
    )

  const topFlavors = flavorCounts(tastings).filter((row) => row.count > 0).slice(0, 5)
  const brewCounts = new Map<string, number>()
  for (const tasting of tastings) {
    const brew = tasting.brewMethod.trim() || 'Unspecified'
    brewCounts.set(brew, (brewCounts.get(brew) ?? 0) + 1)
  }

  return {
    count: tastings.length,
    acidity: avg(numbered(tastings, 'acidity')),
    bitterness: avg(numbered(tastings, 'bitterness')),
    body: avg(numbered(tastings, 'body')),
    recentAcidity: avg(numbered(recent, 'acidity')),
    recentBitterness: avg(numbered(recent, 'bitterness')),
    recentBody: avg(numbered(recent, 'body')),
    earlierAcidity: avg(numbered(earlier, 'acidity')),
    fruitHits: tagScore(tastings, fruitTags),
    comfortHits: tagScore(tastings, comfortTags),
    topFlavors,
    brewFavorite: [...brewCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? null,
    timeline: chronological.map((tasting) => ({
      id: tasting.id,
      coffee: tasting.coffee,
      date: tasting.createdAt,
      acidity: tasting.acidity,
      bitterness: tasting.bitterness,
      body: tasting.body,
    })),
  }
}

export function leanCopy(stats: ReturnType<typeof palateStats>) {
  if (stats.count === 0) {
    return 'The map and triangle are ready. Log coffees in this browser and they will start to cluster.'
  }
  if (stats.comfortHits > stats.fruitHits + 1) {
    return 'Your notes lean cocoa, caramel, nuts, and roast — the comfort side of the wheel.'
  }
  if (stats.fruitHits > stats.comfortHits + 1) {
    return 'Your notes lean fruit and florals — brighter, juicier coffees are catching your attention.'
  }
  return 'You are splitting time between fruit-bright cups and chocolatey, heavier ones. That range is useful.'
}

export function shiftCopy(stats: ReturnType<typeof palateStats>) {
  if (stats.count < 6 || stats.recentAcidity == null || stats.earlierAcidity == null) {
    return 'After about six tastings, this page can compare your last five cups to everything before them.'
  }
  const delta = stats.recentAcidity - stats.earlierAcidity
  if (delta >= 0.6) return 'Recent cups are tasting brighter than your earlier logs.'
  if (delta <= -0.6) return 'Recent cups are tasting softer and less acidic than your earlier logs.'
  return 'Acidity in your last five cups is close to your longer-run average — a steady palate, or a steady bag list.'
}
