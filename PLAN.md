# NovrGRC: "Sector Pulse" (Light-Green Edition)

## 1. Concept

**One idea:** NovrGRC is visibility over a whole national sector. The hero is a living, dotted Nigeria map with provider nodes pulsing around one regulator node. That same network persists and reorganizes as the visitor scrolls, so it feels like one continuous object rather than a stack of effects.

**Tone:** calm, sharp, trustworthy. Fresh mint and forest ink, with one dark-green band per page for contrast.

## 2. Visual language

**Palette**

| Role | Value | Use |
|---|---|---|
| Canvas | `#F3FBF6` | Main background |
| Mint surface | `#DFF5E8` | Cards, bands |
| Soft green | `#A8E6C3` | Glows, gradients, node halos |
| Brand green | `#16A46B` | Buttons, key shapes |
| Text green | `#0F7A50` | Small links and text |
| Forest ink | `#0A2E22` | Headlines, body, the dark band |
| Lime spark | `#C6FF4D` | Live dot and hover accents only |

Rule: never use light green for small text on a light background.

**Type**
- Display: Bricolage Grotesque or Clash Display, 80-140px on desktop, -0.04em tracking, fluid `clamp()` sizing
- Body: Plus Jakarta Sans
- Data labels and eyebrows: JetBrains Mono
- Self-host, subset, `font-display: swap`

**Surface and texture**
- White glass cards, 1px green border, soft green shadow, 20-24px radius
- Faint dot grid, radial green glows, a whisper of grain
- Product screenshots stay light and sit natively in this world

## 3. Sitemap (6 routes)

| Route | Purpose | Signature interaction |
|---|---|---|
| `/` Home | The manifesto | Network hero, marquee, pinned Sector/Provider/CSIRT story, outcomes bento with count-ups, magnetic CTA |
| `/platform` | 7 modules, one record | CSS `position: sticky` stacking cards, each with an animated mini UI mock; add-ons as glow toggles |
| `/demo` | Request access | 2-step "mission briefing" form (role cards, then details), 12-week go-live timeline, soft pulse on success |
| `/framework` | The 5 pillars | Pinned vertical sequence that swaps pillars 01-05 on scroll, with a progress rail; NCS-CRF and ISO/NIST/PCI chips as a filter |
| `/solutions` | Regulators vs providers | Two-sided split that expands on hover (desktop) and stacks with tap-to-expand (mobile); role table as interactive rows; comparison slider |
| `/security` | Built for regulated environments | Six vault tiles with a hover scan effect; animated SVG integration diagram (ERP, HR, ITSM, SIEM, IAM) |

**Shared shell:** fixed nav, footer, page transitions (short wipe or fade), scroll progress bar, toast, dark-styled lightbox.

## 4. Motion system

- Easing `[0.22, 1, 0.36, 1]`, durations 0.3-0.6s, stagger 0.06
- **Hero canvas:** 2D, about 40 provider nodes, connecting lines when near, gentle response to the pointer, paused when offscreen
- **Preloader:** first visit only, capped at about 1.2s, skipped on return visits
- **Cursor:** desktop only, small dot plus ring, never overriding the native cursor on text or forms
- **Lenis:** optional, disabled on mobile if it hurts native feel
- **Restraint budget:** text scramble on eyebrows only, magnetic effect on the primary CTA and one other spot, count-ups on the bento only
- **Demo data:** any live-looking numbers are labeled "sample data"

## 5. Tech plan

```
src/
  routes/      Home Platform Demo Framework Solutions Security
  components/  Shell Preloader Cursor NetworkCanvas Marquee
               StackCards Ticker MagneticButton Reveal
  styles/      tokens.css base.css effects.css pages/*.css
  data/        modules.js pillars.js nigeria-dots.json
```

1. Add `react-router-dom` and `lenis`; keep `framer-motion`.
2. Split the 638-line `App.jsx` into routes, reusing existing copy and images.
3. Create `tokens.css` for the light-green system; retire the old white/green sections.
4. Lazy-load routes and the canvas. Target under about 200kb initial JS.
5. Convert images to WebP/AVIF with explicit dimensions.
6. Generate the Nigeria dot map once as static JSON so nothing heavy runs at load.

## 6. Phases (each one shippable)

**Phase 1: Foundation**
Router, tokens, shell, Home hero with the network canvas, marquee, and outcomes bento. *Done when:* the look is judgeable and Lighthouse is healthy.

**Phase 2: Conversion path**
Platform sticky stack and Demo briefing form with timeline and success state. *Done when:* a visitor can go from landing to request submitted.

**Phase 3: Depth**
Framework pinned sequence and Solutions split. Wire the canvas to reorganize across Home sections.

**Phase 4: Polish**
Security vault and integration diagram, preloader, cursor, page transitions, and the full performance and accessibility pass.

## 7. Non-negotiables

- `prefers-reduced-motion`: static fallbacks for every animation
- Below 768px: static glow instead of canvas, reduced node count if kept
- Visible keyboard focus, AA contrast, no motion-only information
- Semantic HTML, real labels on form fields, proper route titles
- Pause canvas and animations offscreen
- Test on a mid-range Android over throttled 4G, since that is likely your real audience

## 8. Open decisions

1. Display font: Bricolage Grotesque (warmer) or Clash Display (sharper)?
2. Should the dark-green band appear on every page, or only Home and Security?
3. Do you have real logos and stats for the marquee and bento, or should we use clearly labeled placeholders?
