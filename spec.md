# Nex Cartify

## Current State
New project — no existing application files.

## Requested Changes (Diff)

### Add
- Premium Indian eCommerce website with dark luxury theme
- Full homepage with: announcement bar, sticky header, hero, categories, best sellers, problem/solution, flash deal (countdown timer), trust section, social proof, why us section, footer
- Product detail page with image gallery, pricing (₹1999→₹799), urgency timer, sticky CTA, benefits, reviews, FAQ, upsell
- Collection/shop page with grid layout, filters (price, category, rating), quick view
- Cart page with product summary, trust badges, upsell item
- Checkout page with minimal fields, COD/UPI/Cards payment options
- Conversion features: live sales popup ("Rahul from Delhi just bought this"), exit intent popup (10% OFF), cart reservation timer
- Order tracking page
- Contact page
- React Router navigation

### Modify
N/A (new project)

### Remove
N/A (new project)

## Implementation Plan
1. Backend: store products, categories, cart items, orders with basic CRUD
2. Frontend pages: Home, Shop/Collection, Product, Cart, Checkout, Track Order, Contact
3. Global design system: OKLCH color tokens matching the specified palette
4. Conversion components: LiveSalesPopup, ExitPopup, CountdownTimer, UrgencyBar
5. Reusable: ProductCard, CategoryCard, TrustBadges, ReviewCard
6. Mobile-first responsive layout throughout
