# TradeNikhil Universe Chain

## Current State
- Full trading platform with Homepage, About, Signals, Education, Membership, Payment, Contact, and Trading Analysis pages
- Gold/yellow primary color (oklch hue 85) used throughout branding, gradients, text, and glows
- Navbar has logo, nav links, and "Join Now" CTA; no login option for visitors
- Education page has 8 course cards with 4 difficulty filters; no intro/outro notes

## Requested Changes (Diff)

### Add
- **Login modal/button** in Navbar: a "Login" button that opens a simple modal with email+password fields (UI only, stores login state in localStorage for session)
- **Big intro note** at top of Education page (before courses): highlighted banner saying free content is available but deep/advance concepts require membership
- **Big outro note** at bottom of Education page: prominent CTA banner urging users to take membership for deep learning of advanced concepts, with a "Get Membership" button linking to /membership
- **New education topics/cards** added to Education page:
  - Support & Resistance (beginner)
  - Trend Lines & Channels (beginner)
  - Moving Averages (intermediate)
  - Bollinger Bands (intermediate)
  - RSI & MACD Indicators (intermediate)
  - Volume Analysis (intermediate)
  - Candlestick Types: 20+ types explained (Doji, Hammer, Hanging Man, Shooting Star, Inverted Hammer, Engulfing Bullish/Bearish, Morning Star, Evening Star, Harami, Pin Bar, Marubozu, Spinning Top, Three White Soldiers, Three Black Crows, etc.) (analysis)
  - Chart Patterns: Head & Shoulders, Double Top/Bottom, Triangles, Flags, Wedges, Cup & Handle, etc. (advanced)
  - Trading Tools Knowledge: MT4/MT5, TradingView, Order Types, Position Sizing Calculator, Economic Calendar (intermediate)
  - Fibonacci Retracement & Extensions (advanced)
  - Market Structure & Liquidity (advanced)
  - Psychology & Trading Mindset (intermediate)

### Modify
- **index.css**: Change primary/gold color from hue 85 (yellow/gold) to hue ~300 (purple) — update `--primary`, `--gold`, `--accent`, `--ring`, gold-gradient, gold-glow, glow-pulse, glass-card border, hero-grid, and all other gold references to purple oklch values (~oklch(0.65 0.25 300) for vivid purple)
- **Navbar**: Add "Login" button next to "Join Now" in desktop nav and mobile menu; clicking opens a login modal
- **Education page**: Add intro banner note and outro membership CTA banner; expand course cards list with the new topics listed above

### Remove
- Nothing removed

## Implementation Plan
1. Update index.css: replace all gold/yellow oklch(* * 85) references with purple oklch(* * 300) equivalents; rename gold-gradient to purple-gradient (but keep class name gold-gradient for compatibility); update glass-card borders, glow effects
2. Update Navbar.tsx: add Login button + LoginModal component (email/password, localStorage session, shows user initials when logged in with logout option)
3. Update EducationPage.tsx: add ~12 new sampleResources entries, add intro/outro note banners
