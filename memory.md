# 🧠 Repository Memory Bank & Context Index (`memory.md`)
## 🏰 Spice Heritage - Complete Project Brief, Architecture, Data Schemas & Change Logbook

> **IMPORTANT FOR AI AGENTS & DEVELOPERS**: 
> Is file me `Spice Heritage` project ki complete architecture, data models, state flows, component breakdown, design rules, aur update logbook recorded hai. Is document ko padhne ke baad kisi bhi agent ko pure codebase ko rescan karne ki zarurat nahi padegi. **Jab bhi project me koi modification, naya feature, ya refactoring ho, sabse pehle is file ke Section 8 (Logbook / Revision History) me entry update karein.**

---

## 1. Quick Project Overview

- **Project Name**: Spice Heritage (`spice-heritage_final`)
- **Brand Tagline**: *"Authentic Indian Flavors, Crafted with Tradition"*
- **Type**: Luxury Digital Restaurant Platform & Management System
- **Core Technology Stack**:
  - **Framework**: React `19.0.1` (TypeScript)
  - **Build Tool / Dev Server**: Vite `6.2.3` (Port `3000`, Host `0.0.0.0`)
  - **Styling Engine**: Tailwind CSS `4.1.14` (`@tailwindcss/vite`)
  - **Animations**: Motion / Framer Motion `12.23.24` (`motion/react`)
  - **Icons**: Lucide React `0.546.0`
  - **Backend Capabilities**: Express `4.21.2`, TSX `4.21.0`
  - **AI Capabilities**: Google GenAI SDK `@google/genai` `2.4.0`
- **Active Dev Command**: `npm run dev` (Runs locally at `http://localhost:3000`)
- **Verification Command**: `npm run lint` (`tsc --noEmit` check)

---

## 2. System Architecture & Core Workflows

The application is built as a **Single Page Application (SPA)** with dynamic overlay portals and state-driven modals.

```
                    ┌─────────────────────────────────────────┐
                    │               App.tsx                   │
                    │   (Global State, Cart, Auth, Toast)     │
                    └────────────────────┬────────────────────┘
                                         │
        ┌────────────────────────────────┼────────────────────────────────┐
        ▼                                ▼                                ▼
┌───────────────┐               ┌─────────────────┐             ┌──────────────────┐
│  Public Web   │               │ Customer Lounge │             │ Kitchen / Staff  │
│  Experience   │               │     Portal      │             │   POS Terminal   │
│ (Header, Hero,│               │(Orders, Table   │             │ (Live Orders, KDS│
│ Menu, About,  │               │ Res, Coupons,   │             │  Menu CRUD,      │
│ Chefs, etc.)  │               │ Cart, Settings) │             │  Analytics)      │
└───────────────┘               └─────────────────┘             └──────────────────┘
```

### Key Workflows:
1. **Unauthenticated Browsing**: Guests can explore the landing page, view menu categories, filter Veg/Non-Veg items, check chef profiles, read reviews, and open the sliding cart drawer.
2. **Auth Guard & Flow**: Attempting to add an item to basket, book a table, or access the Royal Lounge triggers `AuthModal.tsx`.
   - **Customer Auth**: Grants access to `CustomerDashboard.tsx` with saved pending cart items automatically added upon sign-in.
   - **Staff Auth**: Grants access to `Dashboard.tsx` (Staff POS & Kitchen Control).
3. **Table Reservation Workflow**: Customer submits booking details ➔ App stores reservation state (`pending`) ➔ Staff POS displays incoming booking ➔ Staff assigns Table Number and sets status to `Confirmed`.
4. **Order Basket & Checkout**: Customer adds dishes with custom notes ➔ Items sync in `cartItems` state ➔ Apply Promo Voucher (e.g. `ROYAL25`) ➔ Select Payment (UPI/Scan, Card, COD) ➔ Order sent to POS live queue.

---

## 3. Directory Structure & File Map

```
c:\PRACTICE\spice-heritage_final\
├── .env.example                 # Template for GEMINI_API_KEY and APP_URL environment variables
├── metadata.json                # Project capabilities metadata
├── package.json                 # Dependency manifests & NPM script configurations
├── tsconfig.json                # TypeScript compiler configuration
├── vite.config.ts               # Vite build & plugin configurations
├── prd.md                       # Product Requirement Document & Business Specs
├── design.md                    # Complete Design System, Tokens, Fonts & Motion Rules
├── memory.md                    # Memory Bank, System Context & Update Logbook (THIS FILE)
│
└── src/                         # Application Source Code
    ├── main.tsx                 # Entry point, mounts <App /> to DOM element #root
    ├── index.css                # Global CSS, theme color mappings, custom scrollbar, input overrides
    ├── types.ts                 # Central TypeScript interfaces & type declarations
    ├── data.ts                  # Mock database (RESTAURANT_INFO, MENU_ITEMS, CHEFS, TESTIMONIALS, FAQS)
    ├── App.tsx                  # Root component: handles global cart state, portals, auth & toast alerts
    │
    ├── assets/                  # Local image assets
    │   └── images/              # Dish photographs (Paneer Tikka, Butter Chicken, etc.)
    │
    └── components/              # UI Components Directory
        ├── Header.tsx           # Top navigation bar, brand emblem, cart counter, portal buttons
        ├── Hero.tsx             # Main hero section with luxury tagline, rating badge, CTAs
        ├── About.tsx            # Restaurant heritage story & 4 stats counter widgets
        ├── Menu.tsx             # Interactive dish catalog with category tabs & Veg filter
        ├── Chefs.tsx            # Elite culinary team showcase with social links
        ├── Gallery.tsx          # Atmosphere photo gallery with category filter & lightboxes
        ├── Testimonials.tsx     # Customer review cards with star rating breakdown
        ├── Faq.tsx              # Dietary choices & dining FAQ accordion
        ├── Contact.tsx          # Location address, working hours & inquiry submission form
        ├── Footer.tsx           # Site footer, social channels, copyright notice
        ├── OrderDrawer.tsx      # Quick sliding right-hand cart panel with item quantity controls
        ├── AuthModal.tsx        # Login & Registration modal for Customer Lounge & Staff Terminal
        ├── CustomerDashboard.tsx# Customer Royal Lounge (6 tabs: Overview, Table Res, Orders, Cart, Coupons, Settings)
        └── Dashboard.tsx        # Staff POS Terminal (Live Orders, Table Oversight, Menu CRUD, KDS, Sales Analytics)
```

---

## 4. Master Data Schemas & State Interfaces (`src/types.ts`)

### `MenuItem`
```typescript
export type MenuCategory = 'starters' | 'main-course' | 'indian-breads' | 'desserts' | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  isVegetarian: boolean;
  popular: boolean;
  image: string;
}
```

### `CartItem`
```typescript
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}
```

### `Reservation`
```typescript
export interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  specialRequests?: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  tableNumber?: number;
}
```

### `DashboardOrder` (Staff POS)
```typescript
export interface DashboardOrder {
  id: string;
  tableNumber: string;
  customerName: string;
  items: { menuItem: MenuItem; quantity: number }[];
  status: 'Dine In' | 'Waitlist' | 'Take Away' | 'Served';
  time: string;
  paymentMethod: 'Cash' | 'Scan' | 'Credit';
  isSettled?: boolean;
}
```

### `MockCoupon`
```typescript
export interface MockCoupon {
  code: string;        // e.g. "ROYAL25", "FESTIVESPICE", "DESIDELIGHT", "BOGO_NAAN"
  discount: string;    // e.g. "25% OFF", "₹200 OFF"
  description: string;
  minSpend: number;
}
```

---

## 5. Design System Summary (Obsidian Black & Royal Gold)

- **Primary Canvas**: Pitch Obsidian Black (`#000000` / `#09090b`).
- **Accent Color**: Luminous Royal Gold (`#facc15` / `#eab308`).
- **Typography Scale**:
  - Headings: `Outfit` (`font-display`), Bold uppercase.
  - Subtitles: `Playfair Display` (`font-serif`), Elegant italic.
  - Body: `Inter` (`font-sans`), Clean legible gray/yellow text.
- **Glassmorphic Standard**: `bg-zinc-950/90 backdrop-blur-md border border-yellow-400/20 rounded-2xl`.
- **Motion Animation Standard**:
  - Fade-Up: `{ opacity: 0, y: 30 }` ➔ `{ opacity: 1, y: 0 }`.
  - Modals: `{ opacity: 0, scale: 0.95 }` ➔ `{ opacity: 1, scale: 1 }`.
  - Micro-interactions: `whileHover={{ scale: 1.04 }}` & `whileTap={{ scale: 0.96 }}`.
*(For comprehensive CSS variables and styling rules, consult [design.md](file:///c:/PRACTICE/spice-heritage_final/design.md)).*

---

## 6. Developer Guidelines & Zero-Regression Rules

1. **Keep Linting Clean**: Run `npm run lint` (`npx tsc --noEmit`) before ending any development turn. Ensure 0 TypeScript errors.
2. **Preserve Royal Black & Gold Theme**: Never introduce light background components (`bg-white` or light gray cards). All surfaces must be `#000000` or `#09090b` with yellow borders.
3. **State Integrity**:
   - `cartItems` is elevated in `App.tsx` and shared between `OrderDrawer` and `CustomerDashboard`.
   - Modals utilize `AnimatePresence` for smooth exit transitions.
4. **Authentication Logic**:
   - User state `currentUser` controls access to `CustomerDashboard` and `Dashboard`.
   - Staff login email check opens `Dashboard.tsx` while customer login opens `CustomerDashboard.tsx`.

---

## 7. Operational Commands

| Task | Command | Description |
| :--- | :--- | :--- |
| **Start Development Server** | `npm run dev` | Starts Vite dev server at `http://localhost:3000` |
| **Run TypeScript Check** | `npm run lint` | Runs `tsc --noEmit` to verify type safety |
| **Production Build** | `npm run build` | Compiles production assets into `dist/` |
| **Clean Dist Output** | `npm run clean` | Removes build outputs |

---

## 8. Logbook / Revision History (Changelog)

> **Instructions for Future Updates**:
> Jab bhi aap codebase me koi change karein, niche formatted log entry add karein:
> `### [YYYY-MM-DD] - <Summary of Change>`
> `- Author: <Agent / Developer>`
> `- Scope: <Files modified>`
> `- Description: <What was added, fixed, or updated>`
> `- Verification: <Test or lint result>`

---

### [2026-07-27] - Initial Project Documentation & Memory Bank Creation
- **Author**: Antigravity AI Assistant
- **Scope**: Created `prd.md`, `design.md`, and `memory.md` in repository root.
- **Description**:
  1. Performed full codebase analysis of `spice-heritage_final` (React 19, Vite, Tailwind CSS v4, Motion, Lucide React).
  2. Documented Product Requirements & Business Brief in `prd.md`.
  3. Documented complete Obsidian & Royal Gold Design System, typography scale, motion animation rules, and file reference matrix in `design.md`.
  4. Established repository Memory Bank (`memory.md`) with complete architecture maps, data schemas, developer guidelines, and logbook system.
- **Verification**: `npm run lint` (`tsc --noEmit`) executed cleanly with 0 compilation errors.
