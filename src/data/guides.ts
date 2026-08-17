export type Guide = {
  slug: string
  title: string
  kicker: string
  minutes: string
  summary: string
  sections: { heading: string; body: string[] }[]
  sources: { label: string; href: string }[]
}

export const GUIDES: Guide[] = [
  {
    slug: 'before-you-sip',
    title: 'The 60-second primer',
    kicker: 'Skim this at the kettle',
    minutes: '1 min',
    summary:
      'A tiny ritual so the first sip is actually useful — smell, slurp, wait, then write.',
    sections: [
      {
        heading: 'Do this, in order',
        body: [
          'Smell the dry grounds, then the brew. Most of “flavor” is aroma; taste on the tongue is mostly sweet, sour, bitter, and salt.',
          'Let it cool off the scald. Around 70°C / 160°F you can slurp without numbing your palate.',
          'Slurp — a short, noisy pull that sprays coffee across the tongue and up into the nose. That retronasal path is how cuppers get fruit, chocolate, and florals from a single sip.',
          'Hold it a second. Notice acidity (brightness), bitterness, and body (weight). Then swallow or spit and notice what lingers.',
          'Taste again as it cools. Fruit and sweetness often show up later; roast and bitterness show up first.',
        ],
      },
      {
        heading: 'Then open the journal',
        body: [
          'Name the coffee and the brew method first, while you still remember.',
          'Mark acidity, bitterness, and body on the 8-dot scales — relative to coffees you already know, not to some perfect cup.',
          'Circle only what you actually tasted. Guessing trains the wrong memory.',
          'Write one honest sentence. “Thick, smooth, I love the smell” is a perfect note.',
        ],
      },
    ],
    sources: [
      {
        label: 'SCA Standard 102 — tasting mechanics',
        href: 'https://sca.coffee/cva-102',
      },
    ],
  },
  {
    slug: 'acidity-bitterness-body',
    title: 'Acidity, bitterness, and body',
    kicker: 'The three scales',
    minutes: '3 min',
    summary:
      'The same three words as the paper journal — with reference points you can actually use.',
    sections: [
      {
        heading: 'Acidity',
        body: [
          'Acidity is a sharp, lively taste. Pleasant acidity feels refreshing — citrus, berry, or apple-like brightness. Unpleasant acidity tastes sour, vinegary, or green.',
          'Reference for high acidity: lemon juice. You are not looking for lemon in the coffee; you are looking for that kind of sparkle on the sides of the tongue.',
          'Light roasts and washed African coffees often sit higher. Darker roasts and milk-heavy drinks often sit lower. Under-extracted coffee can taste sour without tasting complex.',
        ],
      },
      {
        heading: 'Bitterness',
        body: [
          'All coffee is a little bitter. Bitterness lives toward the back of the tongue. It can feel grown-up and cocoa-like, or harsh and ashy.',
          'Reference for high bitterness: unsweetened dark chocolate.',
          'You can often turn bitterness down by grinding coarser, brewing shorter, or using slightly cooler water — and turn it up the other way. Darker roasts also read more bitter.',
        ],
      },
      {
        heading: 'Body',
        body: [
          'Body is texture, not flavor. It is the weight of the coffee on your tongue.',
          'Light-bodied coffee feels more like tea. Heavy-bodied coffee can feel more like milk — syrupy, coating, “thick.”',
          'French press, espresso, and some natural-process coffees often feel heavier. Paper-filtered pour-overs often feel lighter and cleaner. Your journal example of loving “thickness” is a body note.',
        ],
      },
    ],
    sources: [
      {
        label: 'SCA Standard 103 — descriptive assessment',
        href: 'https://sca.coffee/cva-103',
      },
    ],
  },
  {
    slug: 'the-slurp',
    title: 'How to taste from a single sip',
    kicker: 'Technique',
    minutes: '3 min',
    summary:
      'Cuppers slurp on purpose. The noise is the method — it spreads the brew and lights up aroma.',
    sections: [
      {
        heading: 'What a slurp actually does',
        body: [
          'Flavor is taste plus retronasal aroma: molecules traveling from the mouth up to the olfactory bulb. A timid sip mostly hits the tip of the tongue. A slurp aerates the liquid and coats tongue and palate.',
          'Professionals liquor a coffee at least three times as it cools, because different compounds show up at different temperatures. You can do this with any mug — hot, warm, then almost room-temp.',
        ],
      },
      {
        heading: 'A home version of the SCA sequence',
        body: [
          'Smell dry grounds. Pour water just off boil. Smell the bloom or the crust.',
          'If you are cupping: at about four minutes, break the crust with a spoon and inhale. Skim the floating grounds.',
          'When it is cool enough, take a spoonful and slurp as if tasting hot soup you want to cool — short, sharp, across the whole mouth.',
          'Ask, in this order: What fruit or chocolate did I smell? Is it bright or soft? Bitter or cocoa? Thin or thick? What is left after I swallow?',
        ],
      },
      {
        heading: 'Aftertaste',
        body: [
          'Aftertaste is what remains once the sip is gone — sweet cocoa, dry citrus peel, smoke, or nothing. Long and pleasant is usually a good sign. Drying, papery, or harsh is worth a note even if you still like the coffee.',
        ],
      },
    ],
    sources: [
      {
        label: 'SCA Standard 102 — liquoring rounds',
        href: 'https://sca.coffee/cva-102',
      },
      {
        label: 'Nordic Approach — cupping guide',
        href: 'https://www.nordicapproach.no/post/guide-to-coffee-cupping-process-protocols-and-best-practices',
      },
    ],
  },
  {
    slug: 'flavor-wheel',
    title: 'How to use a flavor wheel',
    kicker: 'Vocabulary',
    minutes: '4 min',
    summary:
      'Work from the center out. Broad family first, then the specific word — the SCA / WCR wheel is built for that.',
    sections: [
      {
        heading: 'Center, then out',
        body: [
          'The Coffee Taster’s Flavor Wheel (SCA + World Coffee Research) has nine inner families: floral, fruity, sour/fermented, green/vegetative, other, roasted, spices, nutty/cocoa, and sweet.',
          'First sip: pick a family. “This is fruity and cocoa,” is already a real tasting note.',
          'Second sip: pick a sub-group. Fruity becomes berry, citrus, stone fruit, tropical, or dried fruit.',
          'Third sip: get specific only if it is obvious. Stone fruit might be peach. If it is not obvious, stop. Fake precision is worse than a honest “berry.”',
        ],
      },
      {
        heading: 'Your journal tags are a starter lexicon',
        body: [
          'The paper journal’s words — chocolate, citrus, roasty, baking spice — sit on that wheel. Circle them when they are true. Use the extra tags (floral, honey, vanilla, fermented) when the coffee asks for them.',
          'World Coffee Research’s Sensory Lexicon pairs many of these words with food references (for example, a specific strawberry or dark chocolate). You do not need the lab kit. You do need to taste real fruit, nuts, and chocolate on purpose so the words mean something.',
        ],
      },
    ],
    sources: [
      {
        label: 'World Coffee Research Sensory Lexicon',
        href: 'https://worldcoffeeresearch.org/resources/sensory-lexicon',
      },
      {
        label: 'SCA Coffee Taster’s Flavor Wheel',
        href: 'https://sca.coffee/research/coffee-tasters-flavor-wheel',
      },
    ],
  },
  {
    slug: 'home-cupping',
    title: 'A quiet home cupping',
    kicker: 'Practice',
    minutes: '5 min',
    summary:
      'You do not need bowls and a spittoon. Two mugs and a side-by-side taste will train you faster than any article.',
    sections: [
      {
        heading: 'Setup',
        body: [
          'Two coffees, same brew method, same ratio if you can. A kitchen scale helps; consistent scoops are fine.',
          'Grind just before brewing. Smell the dry grounds of each and write one word before you pour — that word is often the bag’s promise.',
          'Brew. Smell. Slurp both while they are hot, then again five minutes later.',
        ],
      },
      {
        heading: 'What to compare',
        body: [
          'Which is brighter? Which is heavier? Which is more chocolate vs more fruit?',
          'Cover the bags if you want to be honest with yourself. Subscription coffees are perfect for this — they arrive as a mystery until you decide what you taste.',
          'Log both in Sip Journal. The palate map only gets interesting after a handful of these comparisons.',
        ],
      },
    ],
    sources: [
      {
        label: 'SCA Coffee Value Assessment overview',
        href: 'https://sca.coffee/value-assessment',
      },
    ],
  },
  {
    slug: 'building-a-palate',
    title: 'How a palate actually forms',
    kicker: 'The long game',
    minutes: '3 min',
    summary:
      'You will not decode every coffee from sip one. You will get faster at noticing the same families — and that is the skill.',
    sections: [
      {
        heading: 'Calibration foods',
        body: [
          'Keep a few references around: a lemon, unsweetened cocoa or dark chocolate, black tea, whole milk, a handful of nuts, a piece of fruit. Taste the food, then the coffee. The journal’s own metaphors — lemon, dark chocolate, tea vs milk — are the right starting kit.',
        ],
      },
      {
        heading: 'Write poorly, then write better',
        body: [
          'Early notes will say “smooth” and “I like the smell.” Keep them. Later you will start writing “low acid, heavy body, chocolate and roast.” That is progress, not poetry.',
          'Look at the Palate page after five or six coffees. If everything clusters on chocolate and roast, try a washed Ethiopian or a Kenyan next and see whether citrus or floral finally shows up. The map is there to nudge the next bag, not to grade you.',
        ],
      },
    ],
    sources: [
      {
        label: 'World Coffee Research Sensory Lexicon',
        href: 'https://worldcoffeeresearch.org/resources/sensory-lexicon',
      },
    ],
  },
]

export function getGuide(slug: string) {
  return GUIDES.find((guide) => guide.slug === slug)
}
