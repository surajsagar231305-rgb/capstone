# ♻️ KabaadSetu (कबाड़सेतु) - Smart Scrap & Recycling Marketplace

> A modern hyper-local marketplace platform connecting households, offices, and shops with certified scrap dealers (Kabadiwalas) for transparent doorstep recycling with certified electronic weights and instant settlements.

---

## 🚀 Live Demo & Quick Start

```bash
# Clone the repository
git clone https://github.com/surajsagar231305-rgb/capstone.git

# Enter project directory
cd capstone

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173/` in your browser.

---

## 🌟 Key Features & User Roles

### 1. 🏠 Household / Citizen Seller
- **Live Scrap Rate Board:** Real-time per-kg rates for paper, cardboard, plastics, iron/steel, copper, brass, aluminium, e-waste, inverter batteries, and appliances.
- **Doorstep Pickup Booking Wizard:** 3-step scheduling wizard with category selection, weight estimation sliders, photo upload preview, address/pin code, and morning/afternoon/evening slots.
- **Live Order Tracker:** Visual 4-stage tracking timeline (`Booked` ➔ `Assigned` ➔ `Out for Pickup` ➔ `Weighed & Paid`) with dealer contact and scale certificate details.
- **Green Sustainability Score:** Environmental impact engine calculating landfill diversion (kg), trees saved, water conserved, and CO₂ offset.

### 2. 🚛 Verified Scrap Dealer Desk
- **Legal Metrology Digital Scale Simulation:** Real-time green LCD display simulating an electronic scale. Input measured weights per item and auto-calculate gross payout.
- **Doorstep Instant Settlement:** Record payments via Instant UPI (GPay/PhonePe) or Doorstep Cash, and generate tamper-proof digital invoices.
- **Incoming Requests Feed:** Filter requests by service pin codes, view declared items and photos, and accept requests with van assignment.
- **Godown Inventory & Margins:** Stock ledger showing consolidated materials in godown with projected profits when selling truckloads to wholesale smelting/pulper mills.
- **Daily Rate Card Manager:** Adjust local per-kg buying prices with one click.

### 3. 🛡️ Platform Admin Suite
- **Legal Metrology Scale & KYC Verification:** Inspect dealer shop licenses (Gumasta), Aadhaar IDs, and digital scale stamping certificates before granting verified badges.
- **City Benchmark Rates Controller:** Broadcast daily standard base rates across urban wards to prevent under-quoting.
- **Doorstep Audit & Dispute Monitor:** Live feed of completed pickups, customer ratings, and transparent settlement verification.

---

## 🛠️ Technology Stack

- **Frontend Core:** React 19, JavaScript (ESModules)
- **Build Tool:** Vite 6
- **Styling:** Vanilla CSS design system with custom CSS variables, glassmorphism, responsive grid layouts, and mobile-first aesthetics.
- **Icons & Effects:** `lucide-react`, `canvas-confetti`
- **Typography:** Plus Jakarta Sans & Outfit (Google Fonts)

---

## 📁 Project Architecture

```
capstone/
├── public/                 # Static assets & SVG icons
├── src/
│   ├── assets/             # Brand logos and images
│   ├── components/
│   │   ├── Navbar.jsx          # Header with role switcher & language toggle
│   │   ├── SellerView.jsx      # Citizen portal, rate cards & order tracking
│   │   ├── DealerPortal.jsx    # Dealer desk with digital scale LCD & feed
│   │   ├── AdminDashboard.jsx  # Admin KYC verification & benchmark rates
│   │   ├── BookingModal.jsx    # Step-by-step scrap pickup wizard
│   │   └── ReceiptModal.jsx    # Digital invoice & weighing slip
│   ├── data/
│   │   └── mockData.js         # Commodity rates, dealers, initial orders & translations
│   ├── App.jsx             # Main orchestrator
│   ├── App.css             # Component styling & layouts
│   ├── index.css           # Global tokens & design system
│   └── main.jsx            # React root mount
├── package.json
└── vite.config.js
```

---

## 📜 Compliance & Trust Model

1. **Certified Electronic Scales:** Only dealers with active stamping from the Department of Legal Metrology receive booking dispatches.
2. **Doorstep Direct Payments:** Instant UPI or cash directly handed to citizens before scrap leaves premises.
3. **Circular Economy Tracking:** 100% traceable scrap flow from doorstep collection to authorized B2B smelting and pelletizing plants.

---

## 👨‍💻 Author
- Repository: [surajsagar231305-rgb/capstone](https://github.com/surajsagar231305-rgb/capstone)
