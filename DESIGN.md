# BabyCorp — DESIGN.md

> Design system reference for AI agents and developers.
> BabyCorp is India's early childhood sports development marketplace.
> Stack: Next.js 15 (App Router) · Tailwind CSS · Framer Motion · Lucide React

---

## 1. Visual Theme & Atmosphere

BabyCorp feels like a **premium Indian sports brand built for ambitious parents** — energetic but not chaotic, warm but not childish, aspirational but accessible. The aesthetic blends the urgency of a sports academy with the warmth of a family product.

**Design personality:**
- Bold, confident typography that commands attention
- Warm orange and gold accents against deep navy — evoking trophies, stadiums, and achievement
- Cream backgrounds for light sections that feel like premium paper
- Aqua as a fresh, modern accent — trustworthy and clean
- Framer Motion animations that feel athletic: fast entries, spring physics, purposeful motion

**Mood:** A world-class sports academy brochure crossed with a modern Indian consumer app. The child is the hero; the parent is the decision-maker.

---

## 2. Color Palette & Roles

### Primary Colors
| Token | Hex | Role |
|-------|-----|------|
| `navy` | `#1A1A2E` | Primary background, dark sections, text on light |
| `navy-light` | `#252547` | Card backgrounds on dark sections, elevated surfaces |
| `orange` | `#FF6B35` | Primary CTA, active states, highlight color |
| `orange-hover` | `#FF8555` | Hover state for orange elements |
| `gold` | `#FFD700` | Accents, badges, gradient partner, score highlights |
| `aqua` | `#00C2CB` | Secondary accent, verified badges, success indicators |
| `cream` | `#FFF8F0` | Light section backgrounds, page base |
| `cream-dark` | `#F5EDE3` | Dividers, subtle borders on light backgrounds |

### Semantic Usage
- **CTAs / Primary actions** → `from-orange to-orange-hover` gradient, `rounded-full`, white text
- **Trust / Verification** → `aqua` (#00C2CB) with checkmark icons
- **Achievement / Premium** → `gold` (#FFD700), used for badges, star ratings, featured labels
- **Danger / Destructive** → `red-400` / `red-500` (Tailwind), only for logout/delete
- **Dark surfaces** → `navy` base with `navy-light` cards, `white/10` borders
- **Light surfaces** → `cream` base with `white` cards, `cream-dark` borders

### Gradients
- **Gradient text:** `bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent`
- **CTA buttons:** `bg-gradient-to-r from-orange to-orange-hover`
- **Scroll progress bar:** `linear-gradient(90deg, #FFD700, #FF6B35)`
- **Avatar circles:** sport-specific or role-specific gradient (e.g. `from-orange to-gold`, `from-aqua to-navy`)
- **Section top accents:** `h-1.5 bg-gradient-to-r from-[sport color] to-[sport color]`

### Overlays & Opacity Scale
- `white/5` → subtle hover states on dark
- `white/8` → slightly more visible surfaces on dark
- `white/10` → card borders and dividers on dark
- `white/20` → visible borders, image overlays
- `white/40–60` → secondary text on dark backgrounds
- `white/80` → primary text on dark (not quite full white)
- `navy/95` → navbar background when scrolled (with backdrop-blur)

---

## 3. Typography Rules

### Font Families
| Variable | Font | Use |
|----------|------|-----|
| `font-nunito` | Nunito (Black/ExtraBold) | Hero headings, section titles, logo wordmark |
| `font-poppins` | Poppins (400–700) | Body copy, nav links, buttons, labels, badges |
| `font-lato` | Lato (300–900) | Descriptive paragraphs, metadata, captions |
| `font-bebas` | Bebas Neue (400) | Display numbers, stat values, age labels |

### Type Scale
| Level | Font | Size | Weight | Usage |
|-------|------|------|--------|-------|
| Display | Nunito | 60–72px | Black (900) | Hero headline |
| H1 | Nunito | 48–60px | Black (900) | Page hero titles |
| H2 | Nunito | 32–48px | Black (900) | Section headings |
| H3 | Nunito | 24–32px | Black (900) | Card headings, sub-sections |
| Stat | Bebas Neue | 28–40px | 400 | Numbers, scores, metrics |
| Body Large | Lato | 18–20px | 400 | Section descriptions |
| Body | Lato | 15–16px | 400 | General copy |
| Body Small | Lato | 13–14px | 400 | Metadata, secondary info |
| Label | Poppins | 11–13px | 600 | Button text, nav links, tags |
| Caption | Poppins | 9–11px | 500–600 | Badges, timestamps, micro-labels |
| Mono | system-ui monospace | 10–12px | — | Test credentials, code, IDs |

### Typography Patterns
- Headings always use `font-nunito font-black` — never use lighter weights for headings
- Gradient text on dark backgrounds: `bg-gradient-to-r from-gold to-orange bg-clip-text text-transparent`
- Section badge labels: `font-poppins font-semibold text-sm`, pill-shaped `bg-orange/10 text-orange rounded-full px-4 py-1.5`
- All-caps tracking labels: `font-poppins text-[10px] uppercase tracking-widest text-white/50`
- Never mix Nunito and Bebas in the same heading

---

## 4. Component Stylings

### Buttons
```
Primary CTA (dark background):
  bg-gradient-to-r from-orange to-orange-hover
  text-white font-poppins font-semibold text-sm
  px-6–10 py-2.5–4 rounded-full
  hover:shadow-lg hover:shadow-orange/30 hover:scale-105
  active:scale-95 transition-all duration-300

Primary CTA (light background): same as above

Secondary / Outline:
  border border-white/20 text-white font-poppins font-semibold
  px-8 py-3.5 rounded-full hover:bg-white/5 transition-all

Ghost / Text link:
  text-aqua font-poppins text-sm hover:text-aqua/80
  flex items-center gap-1.5

Destructive:
  text-red-400 hover:text-red-300 hover:bg-red-500/8
  font-poppins text-sm flex items-center gap-3
```

### Cards — Dark Surface
```
bg-navy-light border border-white/10 rounded-2xl p-5–8
shadow-2xl shadow-navy/50 (for modals/elevated cards)

Hover state: hover:border-gold/40 hover:bg-white/5
```

### Cards — Light Surface
```
bg-white border border-cream-dark rounded-2xl p-5–7
hover:border-orange/30 hover:shadow-md transition-all duration-200
```

### Stat Cards
```
Dark variant: bg-navy-light border border-white/10 rounded-2xl p-5
  Value: font-nunito font-black text-3xl text-orange (or gold/aqua)
  Label: font-poppins text-white/50 text-xs uppercase tracking-wide

Light variant: bg-cream border border-cream-dark rounded-2xl p-5
  Value: font-nunito font-black text-3xl text-orange
  Label: font-lato text-navy/50 text-sm
```

### Badges / Chips
```
Verified badge:  bg-aqua/15 text-aqua font-poppins font-semibold text-xs px-2.5 py-0.5 rounded-full
Sport chip:      bg-white/8 text-white/70 border border-white/10 rounded-full px-3 py-1 text-xs
Category pill:   bg-orange/10 text-orange font-poppins font-semibold text-sm px-4 py-1.5 rounded-full
Gold feature:    bg-gold/10 border border-gold/30 rounded-full px-4 py-1.5 (gold label text)
Role badge:      bg-gradient-to-r from-[role-color] text-white text-[10px] font-bold px-2 py-0.5 rounded-full
Achievement:     bg-gradient-to-r from-gold to-orange rounded-2xl p-4 (earned badges)
Locked badge:    bg-white/5 border border-white/10 rounded-2xl p-4 opacity-50 (locked badges)
```

### Progress / Skill Bars
```
Container: bg-white/10 rounded-full h-2 (on dark) / bg-cream-dark rounded-full h-2.5 (on light)
Fill (strong ≥70): bg-gradient-to-r from-green-400 to-green-500
Fill (developing 40–69): bg-gradient-to-r from-amber-400 to-orange
Fill (attention <40): bg-gradient-to-r from-red-400 to-red-500
Delta badge: text-xs font-poppins font-bold — green-400 for positive, red-400 for negative
```

### Form Inputs
```
Dark surface:
  bg-white/5 border border-white/10 rounded-xl px-4 py-3
  text-white font-poppins text-sm placeholder:text-white/20
  focus:outline-none focus:border-orange/50 focus:bg-white/8 transition-all

Light surface:
  bg-cream border border-cream-dark rounded-xl px-4 py-3
  font-lato text-sm text-navy placeholder:text-navy/30
  focus:outline-none focus:border-orange/50 transition-all

Labels: font-poppins text-xs font-medium text-white/60 (dark) / text-navy/60 (light) mb-1.5
```

### Navigation
```
Navbar (scrolled): bg-navy/95 backdrop-blur-lg shadow-lg shadow-navy/20
Navbar (top): bg-transparent

Nav links: text-sm font-poppins font-medium text-white/80 hover:text-white
  Underline indicator: absolute -bottom-1 h-0.5 bg-gradient-to-r from-gold to-orange
  Animates width 0→100% on hover (transition-all duration-300)

Mobile nav: bg-navy/98 backdrop-blur-xl border-t border-white/10
  Links: text-base font-poppins font-medium, py-2.5 px-2 hover:text-gold hover:bg-white/5 rounded-xl
```

### Step Indicator (Multi-step wizard)
```
Active step:    w-8 h-8 bg-gradient-to-r from-orange to-gold rounded-full text-white font-bold
Completed step: w-8 h-8 bg-gradient-to-r from-orange to-gold rounded-full (check icon)
Inactive step:  w-8 h-8 bg-white/10 rounded-full text-white/40
Connector line: flex-1 h-0.5 bg-white/10 (inactive) / bg-gradient-to-r from-orange to-gold (completed)
```

### Profile Dropdown
```
Trigger: flex items-center gap-2.5 bg-white/8 border border-white/15 hover:border-white/30 rounded-full
Dropdown: bg-navy-light border border-white/10 rounded-2xl shadow-2xl shadow-navy/40
  Header section: px-4 py-3 border-b border-white/8
  Menu items: px-4 py-3 hover:bg-white/5 font-poppins text-sm text-white/70 hover:text-white
  Destructive item: text-red-400 hover:bg-red-500/8
```

### Academy Cards
```
Dark listing card:
  bg-navy-light border border-white/10 rounded-2xl overflow-hidden
  Photo area: h-44 bg-gradient-to-br [sport color] (placeholder)
  Verified badge: ✓ aqua, top-right absolute on photo
  Rating: gold stars + white score + white/30 review count
  Price: text-gold font-bebas text-xl
  CTA: full-width orange gradient rounded-full button
```

### School Cards — Featured (Promoted)
```
Outer border: border-2 border-gold/30
Top accent: h-1.5 bg-gradient-to-r from-[school color]
Badge: "Platinum/Gold Partner" pill — bg-gold text-navy or bg-orange/90 text-white
Perks list: CheckCircle icon (text-gold) + Lato text-sm text-white/70
bg-white/5 border border-white/10 rounded-2xl p-4 container for perks
```

### School Cards — Regular Partner
```
bg-white border border-cream-dark rounded-2xl p-5
Verified: CheckCircle aqua icon inline with name
Sport chips: bg-cream text-navy/60 rounded-full px-2.5 py-0.5 text-[11px]
hover: hover:border-orange/30 hover:shadow-md
```

---

## 5. Layout Principles

### Spacing Scale (base 4px)
| Token | Value | Use |
|-------|-------|-----|
| 1 | 4px | Micro gaps, inline spacing |
| 2 | 8px | Tight component spacing |
| 3 | 12px | Default gap between inline elements |
| 4 | 16px | Standard padding, card inner padding |
| 5 | 20px | Section inner spacing |
| 6 | 24px | Card padding (medium) |
| 7 | 28px | — |
| 8 | 32px | Card padding (large) |
| 12 | 48px | Section vertical padding (mobile) |
| 16 | 64px | Section vertical padding (desktop) |
| 20 | 80px | Large section vertical padding |
| 24 | 96px | — |

### Container
```
max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
```

### Grid Patterns
- 2-col feature: `grid md:grid-cols-2 gap-8`
- 3-col cards: `grid sm:grid-cols-2 lg:grid-cols-3 gap-5–6`
- 4-col stats: `grid grid-cols-2 lg:grid-cols-4 gap-4`
- Sidebar + content: `grid lg:grid-cols-[280px_1fr] gap-8`

### Border Radius Scale
| Usage | Value |
|-------|-------|
| Micro chips | `rounded-lg` (8px) |
| Input fields | `rounded-xl` (12px) |
| Cards | `rounded-2xl` (16px) |
| Large cards / modals | `rounded-3xl` (24px) |
| Pills / buttons / avatars | `rounded-full` |

### Section Alternation
- Dark sections: `bg-navy` with white text
- Light sections: `bg-cream` or `bg-white` with navy text
- Pages always start with a `bg-navy` hero (pt-20 to clear fixed navbar)

---

## 6. Depth & Elevation

| Level | CSS | Use |
|-------|-----|-----|
| 0 — Flat | no shadow | Inline chips, text elements |
| 1 — Surface | `shadow-sm` | Light mode cards at rest |
| 2 — Raised | `shadow-md` | Hovered light cards |
| 3 — Floating | `shadow-lg shadow-orange/30` | Hovered CTAs, active states |
| 4 — Modal | `shadow-2xl shadow-navy/50` | Modals, dropdowns, login card |
| 5 — Ambient | `blur-3xl` colored divs | Background atmosphere blobs |

### Ambient Background Blobs
```jsx
// Standard pattern for dark section backgrounds
<div className="absolute top-1/4 left-1/4 w-72 h-72 bg-orange/10 rounded-full blur-3xl animate-float-slow pointer-events-none" />
<div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-aqua/8 rounded-full blur-3xl animate-float-medium pointer-events-none" />
<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gold/5 rounded-full blur-3xl pointer-events-none" />
```

---

## 7. Motion & Animation

### Framer Motion Entrance Pattern
```jsx
// Standard section item entrance
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true }}
transition={{ duration: 0.6, ease: "easeOut" }}

// Staggered children (add delay: i * 0.1 per child)
transition={{ delay: i * 0.1 }}

// Scale entrance (cards, avatars, modals)
initial={{ opacity: 0, scale: 0.8 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.5, type: "spring", stiffness: 100 }}

// Dropdown
initial={{ opacity: 0, y: 8, scale: 0.95 }}
animate={{ opacity: 1, y: 0, scale: 1 }}
exit={{ opacity: 0, y: 8, scale: 0.95 }}
transition={{ duration: 0.15 }}
```

### Tailwind Animation Classes
| Class | Effect |
|-------|--------|
| `animate-float-slow` | 8s gentle float (y ±20px, rotation ±5°) |
| `animate-float-medium` | 6s float |
| `animate-float-fast` | 4s float |
| `animate-pulse-glow` | 2s orange box-shadow pulse |
| `animate-shimmer` | 2s shimmer sweep |
| `animate-bounce-soft` | 2s soft bounce (y ±10px) |
| `animate-spin-slow` | 10s full rotation |

### Interaction States
- Buttons: `hover:scale-105 active:scale-95 transition-all duration-300`
- Cards: `hover:shadow-md transition-all duration-200`
- Nav links: underline width 0→full on hover, `transition-all duration-300`
- CTA buttons: `hover:shadow-lg hover:shadow-orange/30 hover:scale-[1.02]`

---

## 8. Responsive Behavior

### Breakpoints
| Name | Min-width | Tailwind |
|------|-----------|---------|
| Mobile | 0px | default |
| Tablet | 640px | `sm:` |
| Tablet L | 768px | `md:` |
| Desktop S | 1024px | `lg:` |
| Desktop | 1280px | `xl:` |
| Desktop L | 1536px | `2xl:` |

### Mobile-First Rules
- All parent-facing screens are designed for 375px viewport first
- Touch targets minimum 44×44px
- Navbar collapses to hamburger at `lg` (1024px)
- Sidebar filters → bottom sheet on mobile
- Side-by-side grids → stacked single column on mobile
- Sticky bottom CTAs on mobile for booking flows
- Font sizes: reduce by 1 step on mobile (H1 at 36px mobile vs 56px desktop)

### Navbar Responsive
- Desktop (lg+): horizontal links + profile pill or CTA
- Mobile (<lg): hamburger → full-screen slide-down panel
- Logo always visible at both breakpoints

---

## 9. Sport Brand Colors

Each sport has its own gradient used on cards, banners, and tab indicators:

| Sport | Gradient | Primary Hex |
|-------|----------|-------------|
| Chess | `from-[#3E2723] via-[#5D4037] to-[#6D4C41]` | #5D4037 (warm brown) |
| Swimming | `from-[#006994] via-[#0891b2] to-[#00C2CB]` | #0891b2 (ocean blue) |
| Cricket | `from-[#1a3a1a] via-[#166534] to-[#15803d]` | #166534 (cricket green) |
| Badminton | `from-[#166534] via-[#15803d] to-[#22c55e]` | #15803d (court green) |
| Gymnastics | `from-[#6B2FA0] via-[#7c3aed] to-[#8B5CF6]` | #7c3aed (royal purple) |

---

## 10. Do's and Don'ts

### Do
- Use `font-nunito font-black` for ALL headings — never lighter weights
- Use `rounded-full` for all CTA buttons
- Add Framer Motion `whileInView` entrance animations on every new section
- Place ambient blur blobs in every dark hero section
- Use the gradient-text utility for emphasized words within headings
- Keep dark sections (`bg-navy`) and light sections (`bg-cream`) alternating
- Use `border border-white/10` on all cards placed on dark backgrounds
- Use `border border-cream-dark` on all cards placed on light backgrounds
- Add `hover:scale-105 active:scale-95` to every primary button
- Show sport emoji + name together in any sport reference
- Show ✓ verified badge in aqua for any academy or school with verified status
- Use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for all section containers
- Use gold stars for all rating displays

### Don't
- Don't use raw hex colors — always use the Tailwind color tokens (navy, orange, gold, aqua, cream)
- Don't use sharp corners on buttons — always `rounded-full` for CTAs, `rounded-xl` or `rounded-2xl` for cards
- Don't use heavy drop shadows on dark backgrounds — prefer `shadow-orange/30` glow shadows
- Don't mix Nunito and Bebas Neue in the same heading
- Don't use white as a background — use `cream` (#FFF8F0) on light sections
- Don't place navy-on-navy elements — always use `navy-light` for elevated dark surfaces
- Don't add sports that aren't in the platform: only Chess, Swimming, Cricket, Badminton, Gymnastics
- Don't use Lato for buttons or nav links — always Poppins
- Don't skip mobile-first design — design 375px first, then scale up
- Don't use `text-white` for secondary info on dark backgrounds — use `text-white/50` or `text-white/60`

---

## 11. Page Structure Patterns

### Landing Page Sections (in order)
```
<Navbar /> (fixed, z-50)
<Hero />         — dark (navy), full-viewport, ambient blobs, gradient text headline
<Problem />      — light (cream), emotional pain points
<Solution />     — dark (navy), BabyCorp's answer
<SportsShowcase />— light (cream), 5 sport panels alternating left/right
<Difference />   — dark (navy), comparison table or feature list
<JourneyTimeline />— light (cream), step-by-step flow
<Pricing />      — dark (navy), pricing cards
<TrustSafety />  — light (cream), safety badges
<Partners />     — dark (navy), partner logos
<Testimonials /> — light (cream), review cards
<FAQ />          — dark (navy), accordion
<CTASection />   — dark (navy), final enrollment CTA
<Footer />
```

### Dashboard Pages
```
pt-20 (clear navbar) + bg-cream min-h-screen
Hero greeting section: bg-navy py-12 (with user's name and role)
Content sections: bg-cream or bg-white cards
Stats row: grid of StatCards near top
Main content: white cards with cream-dark borders
```

### Auth Pages
```
min-h-screen bg-navy (full dark)
Centered card: bg-navy-light border border-white/10 rounded-3xl p-8 max-w-md
Ambient blobs in background
Logo centered at top of card
```

---

## 12. Agent Prompt Guide

### Quick Color Reference
```
Primary dark bg:     #1A1A2E  (navy)
Elevated dark:       #252547  (navy-light)
Primary CTA:         #FF6B35  (orange)
CTA hover:           #FF8555  (orange-hover)
Gold accent:         #FFD700  (gold)
Aqua accent:         #00C2CB  (aqua)
Light bg:            #FFF8F0  (cream)
Light border:        #F5EDE3  (cream-dark)
```

### Example Prompts for New Components
```
"Build a notification bell dropdown using BabyCorp's DESIGN.md:
 dark bg-navy-light, border border-white/10, rounded-2xl,
 unread badge in orange, notification items with white/70 text,
 Framer Motion slide-down animation"

"Build a batch capacity bar using DESIGN.md:
 label in font-poppins text-xs text-white/50,
 bar in bg-white/10 rounded-full,
 fill in bg-gradient-to-r from-orange to-gold,
 percentage text in font-bebas text-2xl text-white"

"Build a sport selector tab bar using DESIGN.md:
 active tab: bg-gradient-to-r from-[sport color] text-white rounded-full px-4 py-2,
 inactive tab: text-navy/50 hover:text-navy font-poppins text-sm"
```

### Iteration Checklist
When reviewing AI-generated UI against this DESIGN.md:
- [ ] Headings use `font-nunito font-black`?
- [ ] Buttons are `rounded-full` with orange gradient?
- [ ] Dark cards have `bg-navy-light border border-white/10`?
- [ ] Light cards have `bg-white border border-cream-dark`?
- [ ] Framer Motion entrance animations added?
- [ ] Ambient blobs present in dark hero sections?
- [ ] Mobile layout works at 375px?
- [ ] Sport list is only: Chess, Swimming, Cricket, Badminton, Gymnastics?
- [ ] No raw hex values — using Tailwind tokens?
- [ ] Gradient text used for heading emphasis?
