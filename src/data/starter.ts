import type { Tasting } from '../types'

/** First cup from the paper journal — FEAST Pink & Gold on AeroPress. */
export const PAPER_JOURNAL_TASTING: Tasting = {
  id: 'paper-journal-feast-pink-gold',
  createdAt: '2026-08-16T18:00:00.000Z',
  coffee: 'FEAST Pink & Gold',
  brewMethod: 'AeroPress',
  roaster: '',
  origin: '',
  acidity: 3,
  bitterness: 4,
  body: 8,
  flavors: ['chocolate', 'roasty'],
  notes:
    "I love the thickness of the coffee and find it very smooth. I love the smell too.",
  photoIds: [],
}

export const PAPER_SEED_SKIP_KEY = 'sip-journal-skip-paper-seed'
