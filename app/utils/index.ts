export const imageUrls = [
    "/customer/customer1.png",
    "/customer/customer2.jpg",
    "/customer/customer3.jpg",
    "/customer/customer4.jpg",
]


export const heroDivs = [
    {
        title: 'Credit Cards',
        description: "Explore cards with great rewards"
    },
    {
        title: 'Personal Loan',
        description: "Quick approval & low interest rates"
    },
    {
        title: 'Business Loan',
        description: "Fuel your business growth"
    },
    {
        title: 'Gold Loan',
        description: "Unlock the value of your gold"
    },
]

export const banksImgs = [
    "/banks/SBI-Logo.png",
    "/banks/HDFC-Logo.png",
    "/banks/IDFC-Logo.png",
    "/banks/ICICI-Logo.png",
    "/banks/KOTAK-Logo.png",
    "/banks/INDUS-Logo.png"
]


interface CreditCardItem {
  id: string;
  name: string;
  imgSrc?: string;
  bank: string;
  category: "luxury" | "travel" | "cashback" | "rewards";
  badge: string;
  annualFee: string;
  feeWaiver?: string;
  rewardRate: string;
  loungeAccess: string;
  cardType: "Metal" | "Plastic" | "RuPay";
  keyPerks: string[];
  welcomeBenefit: string;
  // Card Visual Styling details
  cardTheme: {
    bgStyle: string;
    borderStyle: string;
    textColor: string;
    chipColor: string;
    network: "VISA" | "Mastercard" | "AMEX" | "Diners Club" | "RuPay";
    artElement?: "centurion" | "feather" | "infinia-facets" | "emerald-cut" | "globe" | "chevron" | "silk" | "neu-dots" | "gold-leaf";
  };
  applyLink: string;
}

export const cardsData: CreditCardItem[] = [
  {
    id: "hdfc-infinia",
    imgSrc: '/cards/hdfc-bank-infinia-metal-edition-credit-card.png',
    name: "Infinia Metal Edition",
    bank: "HDFC Bank",
    category: "luxury",
    badge: "Highest Reward Rate (33.3%)",
    annualFee: "₹12,500 + GST",
    feeWaiver: "Waived on spends of ₹10L in a year",
    rewardRate: "Up to 33.3% on SmartBuy",
    loungeAccess: "Unlimited Domestic & Global + Guests",
    cardType: "Metal",
    keyPerks: [
      "5X Reward Points on flights, hotels & Apple on SmartBuy",
      "1:1 Points redemption for air miles & luxury hotel bookings",
      "Complimentary golf games and global 24/7 concierge",
    ],
    welcomeBenefit: "12,500 Reward Points + Club Marriott membership",
    cardTheme: {
      bgStyle: "bg-gradient-to-br from-[#0a192f] via-[#102a43] to-[#040e1a]",
      borderStyle: "border-[#1e3a8a]/40 shadow-blue-900/30",
      textColor: "text-white",
      chipColor: "bg-[#d4af37]",
      network: "VISA",
      artElement: "infinia-facets",
    },
    applyLink: "#apply-infinia",
  },
  {
    id: "axis-magnus",
    imgSrc: '/cards/Axis-Magnus.png',
    name: "Magnus Credit Card",
    bank: "Axis Bank",
    category: "luxury",
    badge: "Ultra Luxury Travel & Dining",
    annualFee: "₹12,500 + GST",
    feeWaiver: "Waived on spends of ₹25L in a year",
    rewardRate: "Up to 12% on Travel EDGE",
    loungeAccess: "Unlimited Domestic + 8 Guest Visits",
    cardType: "Metal",
    keyPerks: [
      "35 EDGE Reward points per ₹200 on Travel EDGE portal",
      "1:0.8 miles transfer ratio across 15+ international airlines",
      "Complimentary airport VIP meet & greet assistance 8 times/yr",
    ],
    welcomeBenefit: "Domestic flight voucher or luxury stay worth ₹12,500",
    cardTheme: {
      bgStyle: "bg-gradient-to-br from-[#121214] via-[#1a1820] to-[#09080d]",
      borderStyle: "border-pink-900/40 shadow-pink-950/20",
      textColor: "text-white",
      chipColor: "bg-[#e5c158]",
      network: "VISA",
      artElement: "feather",
    },
    applyLink: "#apply-magnus",
  },
  {
    id: "icici-emeralde",
    imgSrc: '/cards/emeralde-private-metal.png',
    name: "Emeralde Private Metal",
    bank: "ICICI Bank",
    category: "luxury",
    badge: "Exclusive Emerald Gemstone Tier",
    annualFee: "₹12,499 + GST",
    feeWaiver: "Waived on spends of ₹10L",
    rewardRate: "3% uncapped on all spends",
    loungeAccess: "Unlimited Domestic & International + Spa",
    cardType: "Metal",
    keyPerks: [
      "6 Reward points per ₹200 on all retail and online spends",
      "Zero cancellation charges on travel bookings up to ₹12,000/yr",
      "Unlimited international airport lounge access + free spa sessions",
    ],
    welcomeBenefit: "12,500 reward points + Taj Epicure membership",
    cardTheme: {
      bgStyle: "bg-gradient-to-br from-[#064e3b] via-[#042f2e] to-[#022c22]",
      borderStyle: "border-emerald-500/30 shadow-emerald-950/30",
      textColor: "text-white",
      chipColor: "bg-[#f59e0b]",
      network: "Mastercard",
      artElement: "emerald-cut",
    },
    applyLink: "#apply-emeralde",
  },
  {
    id: "axis-atlas",
    imgSrc: '/cards/Atlas-credit-card.png',
    name: "Atlas Credit Card",
    bank: "Axis Bank",
    category: "travel",
    badge: "Best Frequent Flyer Card",
    annualFee: "₹5,000 + GST",
    feeWaiver: "Milestone-based waiver",
    rewardRate: "5 EDGE Miles per ₹100 on Travel",
    loungeAccess: "Up to 18 Domestic & 12 Intl Visits",
    cardType: "Plastic",
    keyPerks: [
      "1:2 conversion ratio to leading airline miles (Singapore, Qatar, etc.)",
      "Tiered milestone bonuses up to 10,000 EDGE Miles every year",
      "International airport lounge access for primary & guest holders",
    ],
    welcomeBenefit: "5,000 EDGE Miles on 1st transaction within 30 days",
    cardTheme: {
      bgStyle: "bg-gradient-to-br from-[#0f172a] via-[#1e1b4b] to-[#020617]",
      borderStyle: "border-rose-900/30 shadow-red-950/20",
      textColor: "text-white",
      chipColor: "bg-[#e5c158]",
      network: "VISA",
      artElement: "globe",
    },
    applyLink: "#apply-atlas",
  },
  {
    id: "sbi-cashback",
    imgSrc: '/cards/SBI-Cashback.png',
    name: "Cashback Credit Card",
    bank: "SBI Card",
    category: "cashback",
    badge: "Best Overall 5% Online Cashback",
    annualFee: "₹999 + GST",
    feeWaiver: "Waived on ₹2L annual spends",
    rewardRate: "Flat 5% Direct Statement Cashback",
    loungeAccess: "4 Domestic Lounges/Year",
    cardType: "Plastic",
    keyPerks: [
      "Flat 5% direct cashback on Amazon, Flipkart, Myntra, Swiggy & all online",
      "1% cashback on offline retail spends with zero minimum threshold",
      "Cashback automatically credited directly to next monthly card statement",
    ],
    welcomeBenefit: "First year fee reversal on achieving spend milestones",
    cardTheme: {
      bgStyle: "bg-gradient-to-br from-[#1d4ed8] via-[#1e40af] to-[#172554]",
      borderStyle: "border-blue-400/40 shadow-blue-800/20",
      textColor: "text-white",
      chipColor: "bg-[#f59e0b]",
      network: "VISA",
      artElement: "chevron",
    },
    applyLink: "#apply-sbicb",
  },
  {
    id: "hdfc-diners-black",
    imgSrc: '/cards/Diners-club-black-metal.png',
    name: "Diners Club Black (Metal)",
    bank: "HDFC Bank",
    category: "travel",
    badge: "10X SmartBuy Partner Rewards",
    annualFee: "₹10,000 + GST",
    feeWaiver: "Waived on spends of ₹8L in a year",
    rewardRate: "Up to 33.3% on SmartBuy 10X",
    loungeAccess: "Unlimited Domestic & Global Lounges",
    cardType: "Metal",
    keyPerks: [
      "10,000 bonus reward points on annual spend milestones",
      "Unlimited lounge access worldwide for both Primary and Add-on users",
      "Complimentary annual memberships to Club Marriott & Forbes",
    ],
    welcomeBenefit: "10,000 Reward Points on paying joining fee",
    cardTheme: {
      bgStyle: "bg-gradient-to-br from-[#18181b] via-[#27272a] to-[#09090b]",
      borderStyle: "border-gray-700/60 shadow-black/40",
      textColor: "text-white",
      chipColor: "bg-[#d4af37]",
      network: "Diners Club",
      artElement: "globe",
    },
    applyLink: "#apply-dcb",
  },
  {
    id: "yes-marquee",
    imgSrc: '/cards/Marquee-credit-card.png',
    name: "Marquée Credit Card",
    bank: "Yes Bank",
    category: "rewards",
    badge: "High-Yield Online Points",
    annualFee: "₹9,999 + GST",
    feeWaiver: "Waived on spends of ₹10L",
    rewardRate: "4.5% net return on online spends",
    loungeAccess: "Unlimited Domestic & International + Guests",
    cardType: "Metal",
    keyPerks: [
      "36 Reward points per ₹200 on all online purchases",
      "1:1 Air Mile conversion to Air India, Singapore Airlines, and Vistara",
      "Unlimited airport lounge access for primary and up to 4 guest visits/yr",
    ],
    welcomeBenefit: "60,000 Reward Points on card activation",
    cardTheme: {
      bgStyle: "bg-gradient-to-br from-[#090d16] via-[#111827] to-[#030712]",
      borderStyle: "border-indigo-900/40 shadow-indigo-950/30",
      textColor: "text-white",
      chipColor: "bg-[#e5c158]",
      network: "VISA",
      artElement: "silk",
    },
    applyLink: "#apply-marquee",
  },
  {
    id: "tata-neu-infinity",
    imgSrc: '/cards/Tata-neu-infinity-HDFC.png',
    name: "Tata Neu Infinity HDFC",
    bank: "HDFC Bank",
    category: "cashback",
    badge: "Best UPI & Tata Ecosystem Card",
    annualFee: "₹1,499 + GST",
    feeWaiver: "Waived on spends of ₹3L in a year",
    rewardRate: "Up to 10% NeuCoins on Tata Apps",
    loungeAccess: "8 Domestic & 4 International Lounges",
    cardType: "RuPay",
    keyPerks: [
      "10% NeuCoins on Tata Neu (Air India Express, BigBasket, Croma, Tata 1mg)",
      "1.5% NeuCoins on all UPI transactions using RuPay variant",
      "1 NeuCoin = ₹1 direct redemption value across all Tata brands",
    ],
    welcomeBenefit: "1,499 NeuCoins on 1st transaction within 30 days",
    cardTheme: {
      bgStyle: "bg-gradient-to-br from-[#3b0764] via-[#2e1065] to-[#1e1b4b]",
      borderStyle: "border-purple-500/40 shadow-purple-950/20",
      textColor: "text-white",
      chipColor: "bg-[#f59e0b]",
      network: "RuPay",
      artElement: "neu-dots",
    },
    applyLink: "#apply-tataneu",
  },
];