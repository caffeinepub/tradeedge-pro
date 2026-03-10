# TradeNikhil Universe Chain

## Current State
- Education page has ~20 free course cards with filter tabs and a membership CTA at bottom
- About page has Nikhil's CEO card with a gold-bordered premium style

## Requested Changes (Diff)

### Add
- New "Advanced Concepts" section on the Education page with 50+ locked concept cards
- Each concept card shows a shield badge indicating required membership tier (Advanced or Conqueror)
- Clicking any locked concept redirects to /membership page
- Concepts include: Liquidity Zones, Actual Market Structure, Order Blocks, FVG, SMC, AMD/Power of 3, ICT Kill Zones, Wyckoff, Elliott Wave, Harmonic Patterns, and 40+ more

### Modify
- Nikhil Singh CEO biography card on About page: elevate to ultra-premium golden finish with richer gold gradients, glowing borders, animated shimmer, more detailed biography text, achievement timeline, signature quote block

### Remove
- Nothing removed

## Implementation Plan
1. Update EducationPage.tsx — add AdvancedConceptsSection below the existing courses grid, before the membership CTA
2. Update AboutPage.tsx — redesign Nikhil's card with premium golden styling, shimmer effect, expanded bio, timeline, awards
