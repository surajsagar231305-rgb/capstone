// Mock data for Scrapify Marketplace

export const TRANSLATIONS = {
  en: {
    brandName: "Scrapify",
    tagline: "Smart On-Demand Scrap Recycling",
    nav: {
      rates: "Today's Rates",
      bookPickup: "Schedule Pickup",
      myPickups: "My Pickups",
      impact: "Green Impact",
      dealerPortal: "Dealer Desk",
      adminPanel: "Admin Suite"
    },
    roles: {
      seller: "Household / Seller",
      dealer: "Verified Scrap Dealer",
      admin: "Platform Admin"
    },
    hero: {
      badge: "🌱 Over 14,250 kg Recycled This Week",
      title: "Turn Household Scrap into Instant Cash at Fair Rates",
      subtitle: "Verified local scrap dealers at your doorstep with certified digital weighing scales. No haggling, no weight fraud.",
      ctaBook: "Book Doorstep Pickup",
      ctaRates: "Check Live Rate Card"
    },
    stats: {
      recycled: "Total Scrap Collected",
      payout: "Total Cash Paid to Sellers",
      dealers: "Verified Local Dealers",
      rating: "Average Service Rating"
    }
  },
  hi: {
    brandName: "Scrapify",
    tagline: "स्मार्ट कबाड़ एवं रीसाइक्लिंग सेवा",
    nav: {
      rates: "आज के भाव",
      bookPickup: "पिकअप बुक करें",
      myPickups: "मेरे ऑर्डर्स",
      impact: "पर्यावरण प्रभाव",
      dealerPortal: "डीलर पोर्टल",
      adminPanel: "एडमिन पैनल"
    },
    roles: {
      seller: "नागरिक / विक्रेता",
      dealer: "सत्यापित रीसाइक्लर डीलर",
      admin: "प्लेटफॉर्म एडमिन"
    },
    hero: {
      badge: "🌱 इस सप्ताह 14,250 किग्रा रीसायकल हुआ",
      title: "घर का कबाड़ बेचें, तुरंत नकद पाएं — सही वजन, सही दाम",
      subtitle: "सत्यापित डीलर सीधे आपके द्वार पर, डिजिटल कांटे के साथ। न वजन में हेराफेरी, न मोलभाव का झंझट।",
      ctaBook: "घर बैठे पिकअप बुक करें",
      ctaRates: "आज की रेट लिस्ट देखें"
    },
    stats: {
      recycled: "कुल रीसायकल सामग्री",
      payout: "ग्राहकों को भुगतान",
      dealers: "सत्यापित डीलर",
      rating: "औसत रेटिंग"
    }
  },
  mr: {
    brandName: "Scrapify",
    tagline: "स्मार्ट भंगार व पुनर्वापर व्यासपीठ",
    nav: {
      rates: "आजचे दर",
      bookPickup: "पिकअप बुक करा",
      myPickups: "माझे ऑर्डर्स",
      impact: "पर्यावरण लाभ",
      dealerPortal: "डीलर पोर्टल",
      adminPanel: "अॅडमिन पॅनेल"
    },
    roles: {
      seller: "नागरिक / विक्रेता",
      dealer: "प्रमाणित भंगार व्यावसायिक",
      admin: "प्लॅटफॉर्म अॅडमिन"
    },
    hero: {
      badge: "🌱 या आठवड्यात 14,250 किलो पुनर्वापर",
      title: "घरातील भंगार विका, जागेवर रोख रक्कम मिळवा — अचूक वजन",
      subtitle: "डिजिटल वजनकाट्यासह प्रमाणित व्यावसायिक थेट तुमच्या दारात. कोणतीही लबाडी नाही, खात्रीशीर दर.",
      ctaBook: "घरी पिकअप बुक करा",
      ctaRates: "आजचे दर तपासा"
    },
    stats: {
      recycled: "एकूण गोळा केलेले साहित्य",
      payout: "ग्राहकांना दिलेली रक्कम",
      dealers: "प्रमाणित व्यावसायिक",
      rating: "सरासरी रेटिंग"
    }
  }
};

export const INITIAL_CATEGORIES = [
  {
    id: "newspaper",
    name: "Newspaper (Raddi)",
    nameHi: "अखबार (रद्दी)",
    category: "Paper",
    rate: 16,
    unit: "kg",
    trend: "+₹1 this week",
    icon: "Newspaper",
    color: "#3b82f6",
    desc: "Clean dry newspapers, flyers, newsprint"
  },
  {
    id: "cardboard",
    name: "Cardboard / Carton (Gatta)",
    nameHi: "गत्ता / कार्टन",
    category: "Paper",
    rate: 11,
    unit: "kg",
    trend: "Stable",
    icon: "Box",
    color: "#f59e0b",
    desc: "Brown corrugated packaging boxes, cartons"
  },
  {
    id: "books",
    name: "Office Paper & Notebooks",
    nameHi: "किताबें व सफेद रद्दी",
    category: "Paper",
    rate: 14,
    unit: "kg",
    trend: "+₹0.5",
    icon: "BookOpen",
    color: "#6366f1",
    desc: "Used notebooks, registers, white A4 papers"
  },
  {
    id: "iron",
    name: "Iron & Steel Scrap (Loha)",
    nameHi: "लोहा एवं स्टील",
    category: "Metals",
    rate: 29,
    unit: "kg",
    trend: "+₹2.0",
    icon: "Hammer",
    color: "#64748b",
    desc: "Pipes, grills, rebars, iron utensils, angles"
  },
  {
    id: "copper",
    name: "Copper Wires & Utensils (Tamba)",
    nameHi: "तांबा (कॉपर)",
    category: "Metals",
    rate: 460,
    unit: "kg",
    trend: "+₹15",
    icon: "Zap",
    color: "#d97706",
    desc: "Stripped wiring, copper motors, pipes, vessels"
  },
  {
    id: "brass",
    name: "Brass (Pital)",
    nameHi: "पीतल (ब्रास)",
    category: "Metals",
    rate: 340,
    unit: "kg",
    trend: "Stable",
    icon: "Award",
    color: "#eab308",
    desc: "Pooja items, taps, fittings, heavy brass ware"
  },
  {
    id: "aluminium",
    name: "Aluminium Scrap",
    nameHi: "एल्युमिनियम",
    category: "Metals",
    rate: 115,
    unit: "kg",
    trend: "+₹4",
    icon: "Shield",
    color: "#06b6d4",
    desc: "Window frames, soda cans, cookware, sheets"
  },
  {
    id: "plastic_pet",
    name: "Hard Plastic & PET Bottles",
    nameHi: "प्लास्टिक बोतलें व डिब्बे",
    category: "Plastic",
    rate: 12,
    unit: "kg",
    trend: "-₹0.5",
    icon: "Milk",
    color: "#10b981",
    desc: "Water bottles, bucket plastic, jars, drums"
  },
  {
    id: "ewaste_pc",
    name: "Laptops & CPU Motherboards",
    nameHi: "पुराना कंप्यूटर व लैपटॉप",
    category: "E-Waste",
    rate: 350,
    unit: "piece",
    trend: "High Demand",
    icon: "Laptop",
    color: "#8b5cf6",
    desc: "Defunct laptops, CPUs, servers, circuits"
  },
  {
    id: "battery",
    name: "Lead-Acid Inverter / Car Battery",
    nameHi: "इनवर्टर व गाड़ी की पुरानी बैटरी",
    category: "E-Waste",
    rate: 92,
    unit: "kg",
    trend: "+₹3",
    icon: "BatteryCharging",
    color: "#ef4444",
    desc: "Dead automotive batteries, tubular UPS packs"
  },
  {
    id: "appliance_fridge",
    name: "Old Refrigerator / AC Split Unit",
    nameHi: "पुराना फ्रिज / एसी",
    category: "Appliances",
    rate: 1250,
    unit: "piece",
    trend: "Fixed Estimate",
    icon: "Tv",
    color: "#14b8a6",
    desc: "Single/Double door fridges, outdoor AC compressors"
  }
];

export const INITIAL_DEALERS = [
  {
    id: "d1",
    name: "Apex EcoRecycling Hub",
    owner: "Rameshwar Gupta",
    phone: "+91 98231 45678",
    verified: true,
    scaleType: "Certified Crown Digital Platform 150kg",
    scaleCertNo: "DL/W&M/2026/8942",
    rating: 4.8,
    reviewsCount: 342,
    servicePinCodes: ["411038", "411004", "411052"],
    area: "Kothrud & Deccan, Pune",
    photo: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=150&auto=format&fit=crop&q=80",
    completedPickups: 1240,
    joinedDate: "Feb 2024"
  },
  {
    id: "d2",
    name: "GreenEarth Scrap Traders",
    owner: "Mohammad Aslam Sheikh",
    phone: "+91 98452 11234",
    verified: true,
    scaleType: "Phoenix Heavy Duty Hanging Scale 50kg",
    scaleCertNo: "DL/W&M/2025/4412",
    rating: 4.9,
    reviewsCount: 512,
    servicePinCodes: ["411014", "411006"],
    area: "Viman Nagar & Kalyani Nagar, Pune",
    photo: "https://images.unsplash.com/photo-1541888946425-d0fbb186f5f7?w=150&auto=format&fit=crop&q=80",
    completedPickups: 2180,
    joinedDate: "Oct 2023"
  },
  {
    id: "d3",
    name: "Metro Metal & E-Waste Recyclers",
    owner: "Vikas Patil",
    phone: "+91 97654 99881",
    verified: true,
    scaleType: "Essae Electronic Scale 200kg",
    scaleCertNo: "DL/W&M/2026/1029",
    rating: 4.7,
    reviewsCount: 189,
    servicePinCodes: ["411057", "411033"],
    area: "Wakad & Hinjawadi, Pune",
    photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    completedPickups: 890,
    joinedDate: "May 2024"
  }
];

export const INITIAL_PICKUPS = [
  {
    id: "REQ-1082",
    sellerName: "Ananya Sharma",
    sellerType: "Household",
    phone: "+91 98901 33445",
    address: "Flat 402, Mayur Heights, Paud Road",
    pincode: "411038",
    slot: "Today, 4:00 PM - 6:00 PM",
    items: [
      { categoryId: "newspaper", estWeight: 25 },
      { categoryId: "cardboard", estWeight: 15 },
      { categoryId: "plastic_pet", estWeight: 5 }
    ],
    status: "out_for_pickup",
    assignedDealerId: "d1",
    assignedDealerName: "Apex EcoRecycling Hub",
    dealerPhone: "+91 98231 45678",
    estTotal: 625,
    actualWeighed: null,
    finalAmount: null,
    paymentMethod: null,
    createdAt: "Today, 10:15 AM",
    notes: "Old cartons in parking lot. Call 10 mins prior."
  },
  {
    id: "REQ-1083",
    sellerName: "Innovatech Solutions Pvt Ltd",
    sellerType: "Office",
    phone: "+91 94220 78112",
    address: "Tower B, Cyber City, Magarpatta",
    pincode: "411028",
    slot: "Tomorrow, 11:00 AM - 1:00 PM",
    items: [
      { categoryId: "ewaste_pc", estWeight: 6 },
      { categoryId: "books", estWeight: 80 },
      { categoryId: "iron", estWeight: 35 }
    ],
    status: "requested",
    assignedDealerId: null,
    assignedDealerName: null,
    dealerPhone: null,
    estTotal: 4235,
    actualWeighed: null,
    finalAmount: null,
    paymentMethod: null,
    createdAt: "Today, 11:45 AM",
    notes: "Security gate permission arranged. Gate pass available."
  },
  {
    id: "REQ-1080",
    sellerName: "Dr. Rajesh Deshmukh",
    sellerType: "Clinic / Shop",
    phone: "+91 98223 99001",
    address: "B-12, Commercial Complex, FC Road",
    pincode: "411004",
    slot: "Yesterday, 2:30 PM",
    items: [
      { categoryId: "iron", estWeight: 42 },
      { categoryId: "copper", estWeight: 4 },
      { categoryId: "battery", estWeight: 18 }
    ],
    status: "completed",
    assignedDealerId: "d1",
    assignedDealerName: "Apex EcoRecycling Hub",
    dealerPhone: "+91 98231 45678",
    estTotal: 4500,
    actualWeighed: [
      { name: "Iron & Steel Scrap", weight: 44.5, rate: 29, total: 1290.5 },
      { name: "Copper Wires & Utensils", weight: 4.2, rate: 460, total: 1932.0 },
      { name: "Inverter Battery Scrap", weight: 19.0, rate: 92, total: 1748.0 }
    ],
    finalAmount: 4970.5,
    paymentMethod: "UPI (GooglePay)",
    completedAt: "Yesterday, 3:15 PM",
    ratingGiven: 5,
    feedback: "Exact digital weight shown on scale. Instant UPI transfer at doorstep!",
    receiptNo: "SCRAP-INV-2026-904"
  }
];

export const INITIAL_DEALER_STOCK = [
  { category: "Newspaper & Cartons", currentStockKg: 2450, avgPurchaseRate: 13.5, estWholesaleRate: 17.5 },
  { category: "Scrap Iron & Steel", currentStockKg: 4890, avgPurchaseRate: 28.5, estWholesaleRate: 34.0 },
  { category: "Copper & High Grade Brass", currentStockKg: 320, avgPurchaseRate: 430.0, estWholesaleRate: 510.0 },
  { category: "Crushed Plastic (PET/HDPE)", currentStockKg: 1100, avgPurchaseRate: 11.0, estWholesaleRate: 16.0 },
  { category: "Lead Inverter Batteries", currentStockKg: 640, avgPurchaseRate: 90.0, estWholesaleRate: 110.0 }
];

export const INITIAL_KYC_APPLICATIONS = [
  {
    id: "KYC-301",
    name: "Balaji Eco-Traders",
    applicant: "Ganesh K. Yadav",
    phone: "+91 97665 12093",
    shopAddress: "Sector 7 Market, PCMC",
    pinCode: "411017",
    scaleModel: "Crown Digital 200kg Platform with valid stamping seal",
    idProof: "Aadhaar + Trade License",
    status: "pending",
    submittedAt: "2 hours ago"
  },
  {
    id: "KYC-302",
    name: "Om Sai Material Recovery",
    applicant: "Sunil N. Shinde",
    phone: "+91 94220 54312",
    shopAddress: "Plot 19, MIDC Bhosari",
    pinCode: "411026",
    scaleModel: "Eagle Hanging Crane Scale 100kg",
    idProof: "Aadhaar + GSTIN Certificate",
    status: "pending",
    submittedAt: "5 hours ago"
  }
];
