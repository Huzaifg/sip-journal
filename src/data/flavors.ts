export type FlavorGroup = {
  id: string
  label: string
  tags: string[]
}

export const FLAVOR_GROUPS: FlavorGroup[] = [
  {
    id: 'sweet',
    label: 'Sweet & roasted comfort',
    tags: ['baking spice', 'caramel', 'chocolate', 'nuts'],
  },
  {
    id: 'fruit',
    label: 'Fruit',
    tags: ['apple', 'berry', 'cherry', 'citrus', 'stone fruit', 'tropical fruit'],
  },
  {
    id: 'ground',
    label: 'Earth, herb & roast',
    tags: ['earthy', 'herby', 'roasty', 'savory'],
  },
  {
    id: 'extra',
    label: 'Also noticing',
    tags: ['floral', 'honey', 'vanilla', 'fermented'],
  },
]

export const ALL_FLAVORS = FLAVOR_GROUPS.flatMap((group) => group.tags)

export const BREW_METHODS = [
  'AeroPress',
  'V60',
  'Chemex',
  'Pour over',
  'French press',
  'Espresso',
  'Moka pot',
  'Cold brew',
  'Cupping',
  'Batch brew',
]

export type WheelCategory = {
  id: string
  name: string
  color: string
  hint: string
  notes: string[]
}

/** Simplified from the SCA / World Coffee Research Coffee Taster's Flavor Wheel. */
export const FLAVOR_WHEEL: WheelCategory[] = [
  {
    id: 'floral',
    name: 'Floral',
    color: '#d9a0c0',
    hint: 'Perfume more than fruit — often in washed African coffees.',
    notes: ['jasmine', 'rose', 'chamomile', 'black tea'],
  },
  {
    id: 'fruity',
    name: 'Fruity',
    color: '#e06b5a',
    hint: 'Start broad (berry vs citrus), then get specific.',
    notes: ['berry', 'citrus', 'stone fruit', 'tropical', 'dried fruit', 'apple'],
  },
  {
    id: 'sour',
    name: 'Sour / fermented',
    color: '#e2c15a',
    hint: 'Bright acidity can be lively; vinegar or overripe notes are different.',
    notes: ['citrus acidity', 'winey', 'fermented', 'acetic'],
  },
  {
    id: 'green',
    name: 'Green / vegetative',
    color: '#7aa56a',
    hint: 'Fresh, herbal, or underripe — not always a fault.',
    notes: ['fresh herb', 'pea pod', 'grassy', 'olive oil'],
  },
  {
    id: 'other',
    name: 'Other',
    color: '#8a7a6a',
    hint: 'Papery, musty, or chemical notes often point to age or a defect.',
    notes: ['papery', 'musty', 'woody', 'chemical'],
  },
  {
    id: 'roasted',
    name: 'Roasted',
    color: '#6b4a34',
    hint: 'From toast and cereal to smoke — intensity rises with roast.',
    notes: ['pipe tobacco', 'burnt sugar', 'cereal', 'smoky'],
  },
  {
    id: 'spices',
    name: 'Spices',
    color: '#b85c38',
    hint: 'Think baker’s cupboard, not chili heat.',
    notes: ['cinnamon', 'clove', 'anise', 'black pepper'],
  },
  {
    id: 'nutty',
    name: 'Nutty / cocoa',
    color: '#8b5a3c',
    hint: 'Comfort notes — common in Latin American and darker roasts.',
    notes: ['almond', 'hazelnut', 'chocolate', 'dark chocolate'],
  },
  {
    id: 'sweet',
    name: 'Sweet',
    color: '#c9a36a',
    hint: 'Not table sugar — caramelized, honeyed, or vanilla-like.',
    notes: ['brown sugar', 'honey', 'maple', 'vanilla', 'caramel'],
  },
]
