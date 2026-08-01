# 🎨 Design System & Developer Guidelines (`design.md`)
## 🏰 Spice Heritage - Design Tokens, Typography, Animations & Component Standards

> **Note for AI Agents & Developers**: 
> Is file me `Spice Heritage` project ka complete design system documented hai. Jab bhi koi naya page, component, feature, ya modal add karein, **strictly is document me diye gaye design standards, colors, typography, glassmorphic styles, aur motion animation references ko follow karein** so that UI/UX overall continuous aur regal luxury black-and-gold theme me render ho.

---

## 1. Core Visual Theme & Aesthetic Principles

- **Theme Identity**: **Obsidian Black & Luminous Royal Gold** (Royal Luxury Dark Aesthetic).
- **Primary Contrast Rule**: Deep obsidian pitch black (`#000000` / `#09090b`) background paired with high-contrast radiant gold text (`#facc15` / `#fef08a`) and pure white headings (`#ffffff`).
- **Surface Elevation**: Glassmorphic panels with soft yellow borders (`border-yellow-400/20`) and subtle gold ambient glows (`shadow-[0_0_30px_rgba(250,204,21,0.1)]`).
- **Interactive Polish**: Micro-animations on buttons, hover border highlights, staggered list transitions, smooth scrolling, and dark blur overlays.

---

## 2. Color Palette & Theme Tokens

### 2.1 CSS & Theme Color Tokens (`src/index.css`)

| Token Name | Color Hex / Value | Usage Description |
| :--- | :--- | :--- |
| `--color-gold-950` / Base | `#000000` | Absolute Obsidian Black (Page & Section Backgrounds) |
| `--color-gold-900` | `#09090b` | Zinc 950 / Card & Modal Surface Background |
| `--color-gold-800` | `#121214` | Deep Charcoal Element Surface & Input Background |
| `--color-gold-700` | `#a16207` | Deep Accent Gold for subtle borders |
| `--color-gold-600` | `#ca8a04` | Rich Gold for hover states & secondary accents |
| `--color-gold-500` / `--color-gold-300` | `#facc15` | **Signature Luminous Royal Gold** (Primary Accents, Active Buttons, Icons, Highlights) |
| `--color-gold-400` | `#eab308` | Hover state for Primary Gold Buttons |
| `--color-gold-200` | `#fcd34d` | Warm Gold Subtitles |
| `--color-gold-100` | `#fef08a` | High-contrast Luminous Yellow Text |
| `--color-gold-50` | `#ffffff` | High-visibility Pure White Headings |

### 2.2 Functional & Status Colors

| Purpose | Tailwind Class / Hex | Example Usage |
| :--- | :--- | :--- |
| **Success / Served / Confirmed** | `text-emerald-400`, `bg-emerald-950/40`, `border-emerald-500/40` | Table Confirmed tag, Served status, Payment Success |
| **Warning / Pending / Waitlist** | `text-amber-400`, `bg-amber-950/40`, `border-amber-500/40` | Pending Table Request, Kitchen Preparing badge |
| **Error / Alert / Cancelled** | `text-red-400`, `bg-red-950/40`, `border-red-500/40` | Cancelled order tag, Alert toast, Validation errors |
| **Vegetarian Badge** | `text-emerald-400`, `border-emerald-500/40` | Pure Veg leaf badge on food cards |
| **Non-Vegetarian Badge** | `text-red-400`, `border-red-500/40` | Non-Veg red circle badge on food cards |

---

## 3. Typography System

### 3.1 Font Families (`src/index.css`)

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Outfit:wght@300;400;500;600;700;800;900&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap');
```

1. **`Inter` (`var(--font-sans)`)**: Primary Body Font (used for descriptions, forms, modal texts, buttons, table items).
2. **`Outfit` (`var(--font-display)`)**: Display Font (used for main titles, numbers, price tags, section headers, badges).
3. **`Playfair Display` (`var(--font-serif)`)**: Luxury Serif Accent (used for italic brand subtitles, heritage callouts, dish origins).

### 3.2 Typography Scale & Style Classes

| Category | Tailwind Classes | Visual Purpose |
| :--- | :--- | :--- |
| **Hero Title** | `text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white` | Main Banner Headings |
| **Section Title** | `text-3xl md:text-5xl font-extrabold uppercase tracking-wide text-white` | Section Headings (`#about`, `#menu`, etc.) |
| **Luxury Subheading** | `text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-yellow-400` | Pre-header badges (e.g. `ROYAL LOUNGE NOTICE`) |
| **Card Title** | `text-lg md:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors` | Menu Dish Name, Chef Name, Feature Title |
| **Body Paragraph** | `text-sm md:text-base text-zinc-300 font-normal leading-relaxed` | Descriptions, About text, FAQ answers |
| **Price Tag** | `text-xl md:text-2xl font-black text-yellow-400 font-display` | Menu prices (`₹449`) |
| **Micro Badge / Tag** | `text-[10px] md:text-xs font-mono font-bold uppercase tracking-widest` | Category pills, coupon codes, table numbers |

---

## 4. Motion & Animation Standards (`motion/react`)

All smooth animations are built using Motion (`motion/react` / Framer Motion).

### 4.1 Reusable Motion Animation Variants

#### A. Fade Up Entrance (Sections & Cards)
```tsx
import { motion } from 'motion/react';

<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.5, ease: "easeOut" }}
>
  {/* Content */}
</motion.div>
```

#### B. Staggered List Items (Menu Cards & Grid Items)
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, delay: index * 0.05, ease: "easeOut" }}
>
  {/* Card Item */}
</motion.div>
```

#### C. Modal / Portal Entry & Exit (`AnimatePresence`)
```tsx
<AnimatePresence>
  {isOpen && (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
    >
      {/* Modal Container */}
    </motion.div>
  )}
</AnimatePresence>
```

#### D. Interactive Button Press & Hover
```tsx
<motion.button
  whileHover={{ scale: 1.04 }}
  whileTap={{ scale: 0.96 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  className="bg-yellow-400 text-black font-black px-6 py-3 rounded-xl uppercase"
>
  Action Button
</motion.button>
```

#### E. Alert Toast Entry Animation
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.8, y: -40 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.8, y: 40 }}
  transition={{ duration: 0.12, ease: "easeOut" }}
>
  {/* Toast Card */}
</motion.div>
```

---

## 5. UI Component Design Specifications

### 5.1 Buttons & Interactive Elements

- **Primary Gold Button (Solid Action)**:
  - Class: `bg-yellow-400 text-black font-black uppercase tracking-wider text-xs md:text-sm px-6 py-3 rounded-xl shadow-lg shadow-yellow-400/20 hover:bg-yellow-300 hover:scale-105 active:scale-95 transition-all cursor-pointer`
  - Usage: *Add to Basket*, *Book Table*, *Confirm Order*, *Login*, *Submit Inquiry*.

- **Secondary Ghost Gold Button (Outline)**:
  - Class: `border-2 border-yellow-400 text-yellow-400 bg-transparent font-bold uppercase tracking-wider text-xs md:text-sm px-6 py-3 rounded-xl hover:bg-yellow-400/10 hover:text-white transition-all cursor-pointer`
  - Usage: *Explore Menu*, *View Details*, *Cancel*, *Secondary CTAs*.

- **Dark Icon Action Button**:
  - Class: `w-9 h-9 rounded-xl bg-zinc-900 border border-yellow-400/30 text-yellow-400 flex items-center justify-center hover:bg-yellow-400 hover:text-black transition-all cursor-pointer`
  - Usage: *Quantity Plus/Minus*, *Close Modal (`X`)*, *Filter Button*, *Print Receipt*.

---

### 5.2 Cards, Glass Containers & Modals

- **Glassmorphic Surface**:
  - Class: `bg-zinc-950/90 backdrop-blur-md border border-yellow-400/20 rounded-2xl p-6 shadow-[0_0_40px_rgba(0,0,0,0.8)]`
  - Usage: *Menu Item Cards*, *Testimonial Cards*, *Dashboard Widgets*, *Auth Panels*.

- **Form Fields (Inputs, Textareas, Selects)**:
  - Class: `w-full bg-zinc-950 text-white border border-yellow-400/30 rounded-xl px-4 py-3 text-sm focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 placeholder:text-zinc-500 transition-all outline-none`
  - Usage: *Reservation form*, *Contact form*, *Search bar*, *Coupon input*.

- **Pill Badges & Tags**:
  - Gold Active Tag: `px-3 py-1 rounded-full text-xs font-mono font-bold bg-yellow-400/10 text-yellow-400 border border-yellow-400/30`
  - Veg Green Tag: `px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/40`
  - Non-Veg Red Tag: `px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-red-950/60 text-red-400 border border-red-500/40`

---

## 6. Comprehensive Component & File Reference Matrix

Follow this table when adding new pages or expanding existing features:

| File Location | Purpose & Function | Key Design Elements Used |
| :--- | :--- | :--- |
| **`src/index.css`** | Global Design System Tokens & Base Overrides | `@theme` font definitions, gold color mappings, scrollbar styling, black body override, dark inputs. |
| **`src/App.tsx`** | Layout Shell & Global State Container | Glass header overlay, portal modals (`CustomerDashboard`, `Dashboard`, `AuthModal`), toast notification manager. |
| **`src/components/Header.tsx`** | Top Navigation Bar | Sticky glass header (`backdrop-blur-md bg-black/80`), logo crest badge, cart counter badge, portal triggers. |
| **`src/components/Hero.tsx`** | Main Landing Section | Regal hero banner, Motion typography entrance, double CTAs, 4.7 rating badge with glowing star icons. |
| **`src/components/About.tsx`** | Brand History & Statistics | 4 stats counter cards, dual-tone gold typography, master chefs callout block. |
| **`src/components/Menu.tsx`** | Interactive Food Menu | Category pill tabs (`starters`, `main-course`, etc.), Veg/Non-Veg filter toggle, dish grid cards with price tags. |
| **`src/components/Chefs.tsx`** | Master Chefs Spotlight | Team member card layout, social media icons, culinary title badges. |
| **`src/components/Gallery.tsx`** | Visual Atmosphere Showcase | Filterable image grid, dark lightbox modal on image click. |
| **`src/components/Testimonials.tsx`**| Customer Review Cards | Star rating visualization, quote bubble styling, verified buyer badge. |
| **`src/components/Faq.tsx`** | Accordion FAQ | Accordion expand/collapse with Motion, border-yellow highlight on active question. |
| **`src/components/Contact.tsx`** | Contact & Location Info | Input forms with gold focus states, operating hours card, map visual block. |
| **`src/components/Footer.tsx`** | Bottom Site Footer | Multi-column footer, newsletter input box, social links, gold divider rule. |
| **`src/components/OrderDrawer.tsx`**| Sliding Cart Drawer | `fixed right-0 top-0 h-full w-full max-w-md bg-zinc-950 border-l border-yellow-400/20`, item quantity controls. |
| **`src/components/AuthModal.tsx`** | Customer & Staff Auth | Tabbed modal (Customer Login vs Kitchen Terminal Staff), pre-populated demo login buttons. |
| **`src/components/CustomerDashboard.tsx`**| Customer Royal Lounge Portal | 6-tab sidebar navigation, order progress tracker bar, table reservation manager, coupon card grid. |
| **`src/components/Dashboard.tsx`** | Admin POS & Kitchen Control | High-density admin tables, order status buttons, kitchen queue KDS timers, dish CRUD form modal. |

---

## 7. Guidelines for AI Agents & Developers Adding New Pages/Features

When creating a new component or page (e.g. `src/components/SpecialEvents.tsx` or `src/components/WinePairing.tsx`), strictly observe the following rules:

1. **Background Rule**: Always enclose section content in a dark container with `bg-black` or `bg-zinc-950` and `text-yellow-100` / `text-white`. Never use plain white (`bg-white`) backgrounds.
2. **Typography Rule**: Use `font-display` (`Outfit`) for titles, `font-serif` (`Playfair Display`) for italic accents, and `font-sans` (`Inter`) for body paragraphs.
3. **Accent Colors**: Always use `#facc15` (`text-yellow-400` / `bg-yellow-400`) for primary buttons, highlighted icons, active tabs, and prices.
4. **Border Rule**: Use subtle gold borders `border border-yellow-400/20` or `border-yellow-400/30` instead of plain gray borders (`border-gray-200`).
5. **Animation Rule**: Wrap interactive entry elements in `<motion.div>` with `opacity` and `y` offsets. Use `whileHover={{ scale: 1.03 }}` on clickable cards and buttons.
6. **Icons Rule**: Use icons from `lucide-react` with color `text-yellow-400` or `text-zinc-400`.
7. **Form Controls**: Use `bg-zinc-950 text-white border border-yellow-400/30 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 rounded-xl`.

---
*End of Design System Documentation*
