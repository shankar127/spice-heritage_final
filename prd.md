# 📜 Product Requirement Document (PRD) & Project Brief
## 🏰 Spice Heritage - Premium Indian Dining & Digital Restaurant Experience

---

## 1. Executive Summary (프로젝트 개요 / Project Brief)

**Spice Heritage** is a state-of-the-art, luxury digital restaurant platform and web application designed for a premium Indian dining establishment. The platform provides an end-to-end digital experience—from immersive front-of-house guest exploration to a dedicated **Royal Customer Lounge** portal and a real-time **Staff & Kitchen POS Control Terminal**.

The application combines rich luxury visual aesthetics (Royal Dark Gold theme, glassmorphic UI elements, dynamic Motion animations) with complete functional workflows for table reservations, online ordering, promo/coupon applications, order tracking, and administrative menu & table management.

---

## 2. Project Vision & Objectives

### Vision
To redefine the digital dining experience for luxury Indian cuisine by delivering a seamless, regal user interface for guests alongside efficient management tools for restaurant operations.

### Key Objectives
1. **Elevate Brand Aesthetics**: Deliver a stunning luxury visual impression using deep blacks, warm gold accents, elegant typography, and micro-interactions.
2. **Seamless Table Reservations**: Provide guests with effortless digital table booking with guest counts, time slots, and special arrangement notes.
3. **Interactive Menu & Basket**: Offer dynamic filtering (Veg/Non-Veg, Categories, Search) and customizable order baskets with special culinary instructions.
4. **Customer Loyalty & Royal Lounge**: Provide customer account management, order history tracking, active order status, and coupon code redemptions.
5. **Staff POS & Kitchen Management**: Equip restaurant staff and management with real-time order processing, table status tracking, live kitchen queues, menu CRUD operations, and analytics dashboards.

---

## 3. Technology Stack & Technical Architecture

### Tech Stack
| Layer | Technology Used | Version / Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React | `^19.0.1` (TypeScript) |
| **Build Tool & Server** | Vite | `^6.2.3` |
| **Styling Engine** | Tailwind CSS | `^4.1.14` + `@tailwindcss/vite` |
| **Animations** | Motion (Framer Motion) | `^12.23.24` (`motion/react`) |
| **Icons** | Lucide React | `^0.546.0` |
| **Backend & Tooling** | Node.js / Express | Express `^4.21.2`, TSX `^4.21.0` |
| **AI Integration Capabilities** | Google GenAI SDK | `@google/genai` `^2.4.0` |

### System Architecture Overview
- **Single Page Application (SPA)** with client-side modal & overlay-based portal routing.
- **State Management**: React State & Hooks managing persistent cart items, active tab contexts, user sessions, order states, and toast notifications.
- **Role-Based Access Control (RBAC)**:
  - **Guest User**: Browsing menu, viewing about/chefs/gallery/reviews, initiating orders & reservations (triggers login modal if unauthenticated).
  - **Authenticated Customer**: Access to **Royal Customer Lounge** (Order History, Basket Checkout, Coupon Code Redemption, Table Booking History, Profile Settings).
  - **Staff / Admin User**: Access to **Kitchen Terminal & Staff Dashboard** (Live POS Orders, Table Assignment, Menu Item CRUD, Sales Analytics, KDS).

---

## 4. User Personas & Target Audience

1. **The Fine Diner (Guest Customer)**
   - *Needs*: High-end visual experience, clear menu descriptions with dietary tags (Veg/Non-Veg), easy table booking for special occasions.
2. **The Regular / Loyalty Member (Registered Customer)**
   - *Needs*: Quick basket checkout, tracking active order status, managing saved preferences, using exclusive promo codes (e.g. `ROYAL25`).
3. **Kitchen Staff & Head Chef**
   - *Needs*: Clear Kitchen Display System (KDS), dish preparation tickets, marking order statuses (Pending -> Kitchen Preparing -> Served).
4. **Restaurant Owner & Manager**
   - *Needs*: Revenue analytics, daily order counts, editing menu items (pricing, availability), managing table allocation.

---

## 5. Key Features & Functionality Breakdown

### 5.1 Public Web Portal (Front-of-House Experience)

- **Header & Royal Navigation (`Header.tsx`)**
  - Brand Crest / Logo with dark luxury aesthetics.
  - Smooth scroll navigation: Home, About Us, Interactive Menu, Elite Chefs, Atmosphere Gallery, Guest Reviews, FAQ, Contact & Directions.
  - Action Triggers: Table Reservation button, Shopping Basket counter badge, Auth (Login/Register) modal toggle, Customer Lounge link, Staff Dashboard trigger.

- **Hero Banner Section (`Hero.tsx`)**
  - High-impact hero imagery with regal backdrop.
  - Core Brand Tagline: *"Authentic Indian Flavors, Crafted with Tradition"*.
  - Primary CTAs: "Explore Royal Menu" and "Book a Table".
  - Key Highlights: Rating badge (4.7 Stars, 1850+ reviews), Culinary Heritage stats.

- **Heritage & Story Section (`About.tsx`)**
  - Brand history (Est. 2018 by Owner Arjun Mehta).
  - Four pillars of excellence: Authentic Spices, Heritage Recipes, Clay Tandoor Cooking, Warm Hospitality.
  - Key metrics counter: 8+ Years of Heritage, 50,000+ Happy Diners, 15+ Master Chefs, 40+ Signature Dishes.

- **Interactive Digital Menu (`Menu.tsx`)**
  - **Category Tabs**: Starters, Main Course, Indian Breads, Desserts, Beverages.
  - **Dietary Filter**: Vegetarian / Non-Vegetarian toggle.
  - **Live Search**: Instant text search by dish name or ingredient description.
  - **Dish Cards**: High-res food imagery, price in INR (₹), popular dish tags, spice level indicators.
  - **Add to Basket Modal**: Custom quantity selector and input box for special culinary instructions (e.g. *"Extra mild spice, less cream"*).

- **Elite Culinary Team (`Chefs.tsx`)**
  - Profiles of Executive Chefs and Tandoor Masters.
  - Culinary specializations, background bios, and social media links.

- **Atmosphere & Dining Gallery (`Gallery.tsx`)**
  - Filterable image grid: All, Dining Ambience, Live Kitchen, Royal Thali, Sweet Delights, Private Lounges.
  - Full-screen image preview lightbox.

- **Customer Reviews & Testimonials (`Testimonials.tsx`)**
  - Verified diner ratings, star breakdowns, and featured quote cards.

- **Frequently Asked Questions (`Faq.tsx`)**
  - Accordion menu covering reservations, dietary choices (Halal, Jain, Vegan), valet parking, private party bookings.

- **Coordinates & Contact Form (`Contact.tsx`)**
  - Physical Address (MG Road, Indiranagar, Bengaluru).
  - Operating hours (Mon-Thu 11:00 AM - 10:30 PM, Fri-Sun 11:00 AM - 11:30 PM).
  - Direct inquiry form with subject and message submission.
  - Visual location map representation.

- **Footer & Quick Access (`Footer.tsx`)**
  - Operational links, social media channels (Instagram, Facebook, Twitter, YouTube), newsletter subscription, copyright notice.

---

### 5.2 Customer Royal Lounge Portal (`CustomerDashboard.tsx`)

A dedicated overlay portal accessible to logged-in customers with six key tabs:

1. **Dashboard Overview**: User welcome card, Royal Points loyalty summary, active order counter, recent activity log.
2. **Table Reservation**:
   - Interactive booking form (Date, Time slot, Number of guests, Preferred seating area e.g., Window View / Main Dining / Private Lounge).
   - View past & upcoming reservation tickets with table numbers and status (`Pending` / `Confirmed` / `Cancelled`).
3. **Live Order Tracking**:
   - Visual progress bar tracking live orders through 4 stages: *Order Received ➔ Kitchen Preparing ➔ Out for Delivery ➔ Delivered*.
   - Invoice receipt view and re-order triggers.
4. **Shopping Cart & Checkout**:
   - Basket item management (Increase/Decrease quantity, delete item, clear basket).
   - Dynamic Price Calculation: Subtotal + GST (5%) + Delivery Fee (₹49, waived on orders above ₹500).
   - Promo Code Input with validation against available coupons.
   - Payment Method Selection: UPI / QR Scan, Credit/Debit Card, Cash on Delivery.
5. **Royal Coupons & Offers**:
   - Display active discount coupons (`ROYAL25`, `FESTIVESPICE`, `DESIDELIGHT`, `BOGO_NAAN`).
   - One-click "Copy & Apply" voucher action.
6. **Profile & Settings**:
   - Update user profile details (Name, Email, Phone Number, Saved Delivery Address, Spice Preference).

---

### 5.3 Staff & Kitchen POS Control Terminal (`Dashboard.tsx`)

An administrative portal tailored for restaurant managers, waiters, and kitchen staff:

1. **Live POS Order Management**:
   - Order Queue categorized by fulfillment status: `Dine In`, `Waitlist`, `Take Away`, `Served`.
   - Update order status live (e.g. mark item as cooked or served).
   - Print thermal bill / POS invoice preview.
2. **Table Reservation Oversight**:
   - View all incoming customer table requests.
   - Assign specific table numbers (e.g., Table 04, Table 12).
   - Approve (`Confirm`) or decline reservations.
3. **Menu Item CRUD Management**:
   - Add new dish items to the menu.
   - Edit existing dish details (Name, Price, Category, Description, Image URL, Vegetarian flag).
   - Delete obsolete menu items or toggle dish availability status.
4. **Revenue & Performance Analytics**:
   - Total Daily Sales revenue cards (₹).
   - Today's Order Count & Table Occupancy rate.
   - Top-selling dishes breakdown chart.
5. **Kitchen Display System (KDS)**:
   - Dedicated chef view for real-time dish preparation queue with elapsed timer tracking.

---

### 5.4 Order Basket Drawer & Custom Toast System (`OrderDrawer.tsx` & `App.tsx`)

- **Sliding Basket Panel (`OrderDrawer.tsx`)**: Quick drawer accessible from anywhere on the web page to inspect cart contents without leaving the page.
- **Custom Toast Notification System**:
  - Gold luxury alert toasts for successful actions (e.g. *"Added 2x Paneer Tikka to basket"*).
  - Red alert toasts for validation/auth prompts (e.g. *"Please login/register first to access your royal lounge"*).
  - Blur backdrop overlay with pulse icons and explicit action buttons.

---

## 6. Data Schemas & Types Definition (`types.ts`)

```typescript
// Menu Categories
export type MenuCategory = 'starters' | 'main-course' | 'indian-breads' | 'desserts' | 'beverages';

// Menu Item Model
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

// Shopping Cart Item Model
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

// Table Reservation Model
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

// Customer Review Model
export interface Testimonial {
  id: string;
  name: string;
  review: string;
  rating: number;
  date: string;
  avatar: string;
}

// Chef Profile Model
export interface ChefInfo {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}
```

---

## 7. Design System & UX Standards

- **Color Palette**:
  - Background: Deep Black (`#000000`), Zinc 950 (`#09090b`), Dark Charcoal.
  - Accent / Gold: Warm Royal Gold (`#facc15`), Amber (`#f59e0b`), Gold-400 (`#facc15`).
  - Text: Warm Yellow-100 (`#fef9c3`), Pure White (`#ffffff`), Muted Zinc-400 (`#a1a1aa`).
  - Status Indicators: Emerald Green (Confirmed/Served), Amber Yellow (Pending/Preparing), Crimson Red (Cancelled/Alerts).
- **Typography**: Clean sans-serif fonts with uppercase tracked subtitles (`tracking-widest`).
- **Visual Effects**: Micro-interactions with Framer Motion (`scale-105`, `hover:shadow-gold`), glassmorphic panels (`bg-black/80 backdrop-blur-md`), gold border glowing effects.

---

## 8. Directory & File Structure

```
spice-heritage_final/
├── public/                     # Static public assets
├── src/
│   ├── assets/                 # Custom images (Paneer Tikka, Butter Chicken, etc.)
│   ├── components/             # Component Library
│   │   ├── About.tsx           # Story & Heritage statistics
│   │   ├── AuthModal.tsx       # Auth modal for Customer Lounge & Staff POS
│   │   ├── Chefs.tsx           # Culinary team spotlight
│   │   ├── Contact.tsx         # Operating hours, address & inquiry form
│   │   ├── CustomerDashboard.tsx# Customer Royal Lounge (6 Tabs)
│   │   ├── Dashboard.tsx       # Staff/Admin POS & Kitchen Terminal
│   │   ├── Faq.tsx             # Dietary & Dining FAQ accordion
│   │   ├── Footer.tsx          # Footer navigation & social links
│   │   ├── Gallery.tsx         # Dining atmosphere photo gallery
│   │   ├── Header.tsx          # Top navbar & action triggers
│   │   ├── Hero.tsx            # Hero banner & primary CTAs
│   │   ├── Menu.tsx            # Interactive category menu & filters
│   │   ├── OrderDrawer.tsx     # Quick sliding shopping cart drawer
│   │   └── Testimonials.tsx    # Customer reviews & ratings
│   ├── App.tsx                 # Root application state & global toast manager
│   ├── data.ts                 # Restaurant metadata & initial mock database
│   ├── index.css               # Tailwind CSS imports & custom utility styles
│   ├── main.tsx                # Application entry point
│   └── types.ts                # TypeScript interface definitions
├── .env.example                # Environment variables template
├── metadata.json               # Project capability metadata
├── package.json                # NPM dependencies & scripts
├── prd.md                      # Product Requirement Document & Brief (This File)
├── README.md                   # Project setup guide
├── tsconfig.json               # TypeScript compiler config
└── vite.config.ts              # Vite configuration
```

---

## 9. Verification & Quality Assurance Plan

### Automated Checks
- `npm run lint` / `npx tsc --noEmit`: Ensure zero TypeScript compilation errors.
- `npm run dev`: Confirm local Vite development server runs smoothly on port `3000`.

### Manual User Journey Verification
1. **Menu Exploration & Filtering**: Test category switching (Starters ➔ Desserts) and Veg-only filter toggling.
2. **Adding to Cart & Authentication Prompt**: Select items and verify unauthenticated users get redirected to the Auth Modal.
3. **Customer Lounge Workflow**:
   - Register/Login as a customer.
   - Apply coupon `ROYAL25` to basket and verify discount calculation.
   - Submit a table reservation request.
4. **Staff Terminal Workflow**:
   - Login to Staff POS using demo credentials.
   - Confirm pending table reservation and assign table number.
   - Update order status on the POS queue and verify updates.

---

## 10. Future Enhancements & Roadmap

- **AI Sommelier / Dish Recommendation**: Integrate `@google/genai` (Gemini API) to recommend wine/beverage pairings based on selected spicy curries.
- **Payment Gateway Integration**: Connect Razorpay / Stripe for real payment processing.
- **WhatsApp Order Receipts**: Auto-generate WhatsApp order updates and table booking confirmation messages.
