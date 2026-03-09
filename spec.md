# TradeNikhil Universe Chain

## Current State
- Membership page lists Basic, Advance, Conqueror tiers with features list
- Payment page with Bitcoin/UPI/PayPal
- No member-only content area exists yet
- No access control or content gating

## Requested Changes (Diff)

### Add
- `/member/basic` page: PDF resource library for basic trading education (candlesticks, support/resistance, risk management, forex basics, chart patterns, etc.) - gated behind membership access
- `/member/advance` page: Trading strategies library (trend following, breakout, scalping, swing trading, price action, Fibonacci, ichimoku, etc.) - gated behind membership access
- `/member/conqueror` page: Live meeting room with a Zoom/Google Meet link, upcoming session schedule - gated behind membership access
- MemberGate component: Shows a locked state with blurred preview when no access code is set; prompts user to enter their membership access code (stored in localStorage); on correct code, unlocks content
- Access codes: basic=BASIC2024, advance=ADVANCE2024, conqueror=CONQUEROR2024 (hardcoded for demo)
- PaymentPage: After simulated payment, show access code to the user

### Modify
- MembershipPage: Add "Access Member Area" button for each tier linking to their respective /member/* page
- App.tsx: Add three new routes for /member/basic, /member/advance, /member/conqueror
- PaymentPage: Show the membership access code after user selects a plan and completes payment steps

### Remove
- Nothing removed

## Implementation Plan
1. Create MemberGate component with localStorage-based lock/unlock
2. Create BasicMemberPage with 8+ PDF resource cards (title, description, category badge, download/view icon - no real PDFs, just well-designed cards with locked overlay if not member)
3. Create AdvanceMemberPage with 8+ strategy cards (name, description, difficulty, win rate stats)
4. Create ConquerorMemberPage with live meeting link section, schedule cards
5. Update App.tsx with new routes
6. Update MembershipPage to link each tier to its member area
7. Update PaymentPage to show access code after plan selection
