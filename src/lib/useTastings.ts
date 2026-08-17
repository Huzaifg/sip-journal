import { useCallback, useEffect, useState } from 'react'
import type { Tasting } from '../types'
import { listTastings } from './storage'

export function useTastings() {
  const [tastings, setTastings] = useState<Tasting[]>([])
  const [ready, setReady] = useState(false)

  const reload = useCallback(async () => {
    const rows = await listTastings()
    setTastings(rows)
    setReady(true)
  }, [])

  useEffect(() => {
    void reload()
  }, [reload])

  return { tastings, ready, reload }
}
