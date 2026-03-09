# TradeNikhil Universe Chain

## Current State
The site has 5 pages: Home, About, Signals, Education, Contact. Navbar has links to all 5. App.tsx uses TanStack Router.

## Requested Changes (Diff)

### Add
- **Membership page** (`/membership`) with 3 pricing tiers: Basic, Advance, Conqueror — each with features list, price, and a "Get Started" CTA button linking to /payment
- **Payment page** (`/payment`) showing 3 payment method options: Bitcoin, UPI, PayPal — with relevant wallet addresses/IDs, copy-to-clipboard, and a confirmation note
- New routes in App.tsx for /membership and /payment
- Navbar links: add "Membership" and "Payment" to navLinks array

### Modify
- Navbar: add Membership and Payment links
- App.tsx: register new routes

### Remove
- Nothing removed

## Implementation Plan
1. Create MembershipPage.tsx with 3 tier cards (Basic, Advance, Conqueror), features, prices, CTA to /payment
2. Create PaymentPage.tsx with Bitcoin, UPI, PayPal payment info with copy-to-clipboard
3. Update App.tsx to import and register new routes
4. Update Navbar.tsx to include Membership and Payment nav links
