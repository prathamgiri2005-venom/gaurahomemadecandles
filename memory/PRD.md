# Gaura Homemade Candles — PRD

## Original Problem Statement
Build a premium e-commerce website for "Gaura Homemade Candles" (originally "Gauri"). User later pivoted to a **static showcase/catalog website** — no backend, no auth, no cart/checkout. Just a beautiful product showcase with their real candle photos.

## Current Architecture
- **Frontend-only** static React site (no backend API calls)
- Product data hardcoded in `/app/frontend/src/data/products.js`
- Pages: Home, Collection, Care Guide, About, Shipping, Returns, Eco Commitment
- Styling: TailwindCSS with Playfair Display (headings) + Manrope (body) fonts
- Color palette: Warm neutrals, cream, sage green (#5D6E5E), gold (#D4AF37)

## What's Been Implemented
- [x] Static product showcase with 5 real user-provided candle photos
- [x] Hero section with Gaura Signature Jar background
- [x] Collection page with masonry grid layout + lightbox modal
- [x] Product lightbox showing name, description, burn time, wax type
- [x] Care Guide page with candle care tips
- [x] About/Our Story page with brand values
- [x] Shipping policy (3-5 days processing, free shipping)
- [x] Returns policy (mandatory unboxing video within 24 hours)
- [x] Eco Commitment page with "Recycle Your Jar" initiative
- [x] Responsive navigation with mobile hamburger menu
- [x] "Made with Emergent" badge removed
- [x] Brand name updated to "Gaura" everywhere
- [x] Page title & meta description updated

## 10 Products (User's Real Candles)
1. Pink Hearts Gel Candle — Gel Candles — 30+ hours
2. Heart Bowl Candle — Bowl Candles — 40+ hours
3. Gold Flake Terracotta — Bowl Candles — 35+ hours
4. Gaura Signature Jar — Jar Candles — 45+ hours
5. Royal Brass Bowl — Bowl Candles — 35+ hours
6. Rose Bloom Candle — Sculpted Candles — 30+ hours
7. Amber Heritage Jar — Jar Candles — 40+ hours
8. Ocean Star Candle — Decorative Candles — 25+ hours
9. Wooden Bowl Collection — Bowl Candles — 40+ hours
10. Lotus Garden Tin — Tin Candles — 35+ hours

## Backlog / Future Tasks
- P1: User mentioned "more photos coming" — add new products when provided
- P2: Razorpay integration if user wants e-commerce back
- P2: Contact form or WhatsApp link for customer inquiries
- P3: Instagram feed integration
