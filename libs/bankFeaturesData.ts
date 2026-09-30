export interface BankFeatureCard {
  id: string;
  title: string;
  category: "rewards" | "travel" | "dining" | "upi" | "waiver" | "protection";
  categoryLabel: string;
  tag: string;
  summary: string;
  benefits: string[];
  bestSuitedFor: string;
}

export interface BankFeaturesAndBenefits {
  slug: string;
  bankName: string;
  shortName: string;
  logo: string;
  tagline: string;
  overview: string;
  keyMetrics: {
    maxRewardRate: string;
    rewardCurrency: string;
    domesticLounge: string;
    internationalLounge: string;
    upiRuPay: string;
    forexMarkup: string;
    feeWaiver: string;
  };
  rewardsEcosystem: {
    programName: string;
    rateSummary: string;
    pointValuation: string;
    acceleratedPartners: string[];
    redemptionOptions: string[];
  };
  loungeAndTravel: {
    domestic: string;
    international: string;
    railway: string;
    spendCondition: string;
    guestAccess: string;
  };
  diningEntertainment: {
    diningProgram: string;
    diningDiscount: string;
    movieBenefits: string;
  };
  waiversAndMilestones: {
    lifetimeFreeCards: string[];
    waiverSpend: string;
    fuelSurchargeWaiver: string;
  };
  features: BankFeatureCard[];
  flagshipCards: {
    name: string;
    category: string;
    highlight: string;
    annualFee: string;
  }[];
}

export const BANK_FEATURES_DATA: Record<string, BankFeaturesAndBenefits> = {
  "hdfc-bank": {
    slug: "hdfc-bank",
    bankName: "HDFC Bank",
    shortName: "HDFC",
    logo: "/partners-logos/hdfc-logo.webp",
    tagline: "India's #1 Credit Card Issuer: SmartBuy Rewards, Diners Club & Global Travel",
    overview:
      "HDFC Bank powers India's highest reward-yielding credit card ecosystem. Led by legendary flagships like Infinia, Diners Club Black, and Regalia Gold alongside mass-popular cards like Millennia and Tata Neu, HDFC credit cards deliver up to 33.3% return via the SmartBuy accelerator portal, 1:1 airmile conversions, unlimited airport lounges, and seamless RuPay UPI payments.",
    keyMetrics: {
      maxRewardRate: "Up to 33.3% (SmartBuy 10X)",
      rewardCurrency: "HDFC Reward Points / CashPoints / NeuCoins",
      domesticLounge: "Unlimited (Infinia/DCM) or 8-16 visits/year",
      internationalLounge: "Unlimited Priority Pass + Guest visits (Infinia)",
      upiRuPay: "Tata Neu Plus/Infinity, UPI RuPay, Pixel Play",
      forexMarkup: "2.00% (Infinia / Regalia Gold) to 3.50%",
      feeWaiver: "₹1 Lakh to ₹10 Lakhs annual spend milestones",
    },
    rewardsEcosystem: {
      programName: "HDFC SmartBuy & MyCards Rewards",
      rateSummary: "Base 1.3% to 3.3% regular earn; up to 10X (33.3%) on SmartBuy portal",
      pointValuation: "Up to ₹1.00 per point for flight & hotel bookings",
      acceleratedPartners: [
        "Apple Store",
        "Amazon & Flipkart (via SmartBuy Gyftr)",
        "MakeMyTrip & Cleartrip",
        "Tanishq",
        "Swiggy & Zomato",
      ],
      redemptionOptions: [
        "1:1 Flight & Luxury Hotel Bookings via SmartBuy",
        "1:1 Air Mile Transfers (KrisFlyer, Avios, Club Vistara)",
        "Direct Statement Cash Credit (up to ₹0.30 - ₹1.00/pt)",
        "Instant Gyftr Brand E-Vouchers",
      ],
    },
    loungeAndTravel: {
      domestic: "Unlimited complimentary domestic airport lounge visits across India on Infinia and Diners Club Black; 8-12 visits on Regalia Gold and Millennia.",
      international: "Unlimited international airport lounge access via complimentary Priority Pass for primary cardholders and authorized add-ons with free guest visits on Infinia.",
      railway: "Complimentary access to IRCTC Executive Lounges on select co-branded cards.",
      spendCondition: "Unconditional lounge access on Infinia & Diners Club Black; quarterly spend of ₹10,000 to ₹15,000 on mid-tier cards like Millennia.",
      guestAccess: "Complimentary guest visits included on super-premium Infinia metal cards.",
    },
    diningEntertainment: {
      diningProgram: "Good Food Trail & Swiggy Dineout Privileges",
      diningDiscount: "Up to 20% to 30% savings across 10,000+ partner restaurants in top metro cities",
      movieBenefits: "Buy 1 Get 1 Free movie tickets via BookMyShow up to ₹250 to ₹500 off",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["HDFC UPI RuPay (Pre-approved)", "MoneyBack+ (Select Corporate Offers)", "Pixel Play (Promo Offers)"],
      waiverSpend: "₹1,00,000 (Millennia), ₹4,00,000 (Regalia Gold), ₹10,00,000 (Infinia Metal)",
      fuelSurchargeWaiver: "1% fuel surcharge waiver on transactions between ₹400 and ₹5,000 across all petrol pumps in India",
    },
    features: [
      {
        id: "hdfc-smartbuy",
        title: "SmartBuy 10X Acceleration Engine",
        category: "rewards",
        categoryLabel: "Accelerated Rewards",
        tag: "Highest Yield in India",
        summary:
          "Multiply your reward points by up to 10X when booking flights, hotels, or purchasing brand vouchers through HDFC's proprietary SmartBuy portal.",
        benefits: [
          "Earn up to 33.3% effective return on hotel bookings and flight reservations",
          "5X to 10X reward points on instant Gyftr gift vouchers for Amazon, Flipkart, Myntra, Swiggy, and Uber",
          "Exclusive Apple Store SmartBuy portal offering accelerated points or instant cashbacks",
          "Monthly SmartBuy reward point bonus caps up to 10,000 to 15,000 points on super-premium cards",
        ],
        bestSuitedFor: "Frequent travelers and avid online shoppers seeking maximum point value.",
      },
      {
        id: "hdfc-miles-transfer",
        title: "1:1 Air Mile Transfer & Travel Portal",
        category: "travel",
        categoryLabel: "Travel & Air Miles",
        tag: "Global Flight Redemptions",
        summary:
          "Convert reward points into international frequent flyer miles and luxury hotel room stays at the best conversion ratios in the industry.",
        benefits: [
          "1:1 transfer to Singapore Airlines KrisFlyer, British Airways Executive Club Avios, and Flying Blue",
          "Book flights and 5-star hotels directly on the SmartBuy travel portal with points valued at ₹1.00 each",
          "Up to 70% of ticket fare payable via points with the remaining 30% earning accelerated points",
          "Dedicated 24/7 travel desk for customized itineraries and emergency re-routing",
        ],
        bestSuitedFor: "International jetsetters and luxury holiday planners.",
      },
      {
        id: "hdfc-lounge-golf",
        title: "Complimentary Airport Lounges & Championship Golf",
        category: "travel",
        categoryLabel: "VIP Privileges",
        tag: "Luxury Terminal Perks",
        summary:
          "Relax in comfort before every flight with unlimited lounge visits and enjoy complimentary rounds at top golf courses in India and abroad.",
        benefits: [
          "Unlimited domestic and international airport lounge access via Priority Pass and LoungeKey",
          "Complimentary add-on cardholder lounge access + free guest allowances on Infinia",
          "Complimentary golf games and golf lessons per quarter across premier courses globally",
          "Meet-and-assist airport VIP tarmac escort services on super-premium variants",
        ],
        bestSuitedFor: "Business executives and frequent domestic/international flyers.",
      },
      {
        id: "hdfc-tata-neu",
        title: "Tata Neu Co-Branded 10% Valueback Ecosystem",
        category: "rewards",
        categoryLabel: "Retail & Groceries",
        tag: "1 NeuCoin = ₹1.00",
        summary:
          "Earn up to 10% direct NeuCoins across Tata's premier brands like BigBasket, 1mg, Croma, Air India, Tata CLiQ, and Westside.",
        benefits: [
          "5% NeuCoins on Tata Neu Plus and 10% NeuCoins on Tata Neu Infinity cards",
          "NeuCoins credit directly to Tata Neu wallet and never suffer valuation downgrades (1 NeuCoin = ₹1)",
          "1.5% NeuCoins on all non-Tata UPI transactions when linked to RuPay",
          "Complimentary domestic and international lounge visits included",
        ],
        bestSuitedFor: "Households spending on groceries, medicines, electronics, and Tata fashion.",
      },
      {
        id: "hdfc-rupay-upi",
        title: "RuPay UPI Instant QR Payments",
        category: "upi",
        categoryLabel: "Digital & UPI",
        tag: "Scan & Pay Anywhere",
        summary:
          "Link your HDFC RuPay credit card to Google Pay, PhonePe, Paytm, or BHIM to pay at millions of merchant QR codes with credit float.",
        benefits: [
          "Enjoy up to 50 days of interest-free credit period on everyday scan-and-pay transactions",
          "Earn reward points or NeuCoins on UPI merchant transactions",
          "Zero merchant surcharge on UPI QR payments up to ₹2,000",
          "Virtual instant card issuance through HDFC MyCards portal within 2 minutes",
        ],
        bestSuitedFor: "Anyone looking to replace cash and debit card payments with UPI credit.",
      },
      {
        id: "hdfc-waiver-smartemi",
        title: "SmartEMI & Milestone Fee Waivers",
        category: "waiver",
        categoryLabel: "Waivers & EMI",
        tag: "Fee Waiver Guaranteed",
        summary:
          "Clear, achievable annual spend thresholds that waive your annual maintenance fees completely, plus instant transaction-to-EMI conversions.",
        benefits: [
          "Annual fee 100% reversed upon reaching spend thresholds (e.g. ₹1 Lakh on Millennia, ₹4 Lakhs on Regalia Gold)",
          "Instant pre-approved SmartEMI conversion at competitive interest rates with zero paperwork",
          "1% fuel surcharge waiver across every petrol station in India",
          "24/7 dedicated card concierge desk for reservations and fraud protection",
        ],
        bestSuitedFor: "Disciplined spenders seeking lifetime-free economics on premium cards.",
      },
    ],
    flagshipCards: [
      { name: "HDFC Infinia Metal Edition", category: "Super Premium", highlight: "Up to 33.3% SmartBuy rewards, unlimited global lounges + guests", annualFee: "₹12,500 + GST" },
      { name: "HDFC Diners Club Black Metal", category: "Luxury Travel", highlight: "1:1 airmiles, unlimited global lounges, complimentary golf", annualFee: "₹10,000 + GST" },
      { name: "HDFC Regalia Gold", category: "Premium Travel", highlight: "12 domestic lounges, ₹1,500 Marks & Spencer/Myntra vouchers", annualFee: "₹2,500 + GST" },
      { name: "HDFC Millennia Credit Card", category: "Cashback & Shopping", highlight: "5% cashback on Amazon, Flipkart, Swiggy, Zomato & Myntra", annualFee: "₹1,000 + GST" },
      { name: "Tata Neu Infinity HDFC Card", category: "Co-Branded UPI", highlight: "Up to 10% NeuCoins on Tata ecosystem & 1.5% on UPI spends", annualFee: "₹1,499 + GST" },
    ],
  },

  "sbi-bank": {
    slug: "sbi-bank",
    bankName: "SBI Bank",
    shortName: "SBI Card",
    logo: "/partners-logos/sbi-logo.webp",
    tagline: "India's Largest Public Card Issuer: 5% Online Cashback & Value Back",
    overview:
      "SBI Card, India's premier public sector credit card issuer, provides some of the most reliable and transparent reward programs in the country. Anchored by the market-disrupting SBI Cashback Credit Card with flat 5% cashback on virtually every online platform, SBI also excels with travel partnerships (Club Vistara, Air India), SimplySAVE daily grocery multipliers, and comprehensive fuel surcharge waivers nationwide.",
    keyMetrics: {
      maxRewardRate: "Flat 5.0% Direct Statement Cashback",
      rewardCurrency: "Cashback / SBI Reward Points / CV Points",
      domesticLounge: "Complimentary access (Prime, Elite, Aurum, Pulse)",
      internationalLounge: "Complimentary Priority Pass membership (4-6 visits)",
      upiRuPay: "SimplySAVE RuPay, BPCL RuPay, SBI Shaurya",
      forexMarkup: "1.99% (Aurum / Elite) to 3.50%",
      feeWaiver: "₹1 Lakh to ₹10 Lakhs annual spend milestones",
    },
    rewardsEcosystem: {
      programName: "SBI Rewardz & Direct Cashback Engine",
      rateSummary: "Flat 5% direct cashback on online spends; 10X reward points on dining and groceries",
      pointValuation: "₹0.25 per SBI Reward Point / 1:1 on direct cashback",
      acceleratedPartners: [
        "Amazon & Flipkart",
        "Swiggy & Zomato",
        "Myntra & Nykaa",
        "BookMyShow",
        "BPCL Fuel Stations",
      ],
      redemptionOptions: [
        "Direct Statement Credit (Auto-credited for Cashback card)",
        "SBI Rewardz Merchandise & Gift Voucher Catalog",
        "Air India & Club Vistara Ticket Redemptions",
        "E-Gift Vouchers (Amazon, Flipkart, Dominos)",
      ],
    },
    loungeAndTravel: {
      domestic: "Up to 8 complimentary domestic airport lounge visits per year (2 per quarter) on cards like SBI Card Prime, Elite, and Pulse.",
      international: "Complimentary Priority Pass membership with up to 6 free international lounge visits per calendar year on SBI Card Elite and Aurum.",
      railway: "Complimentary railway lounge access across Indian railway junctions on select co-branded cards.",
      spendCondition: "Generally linked to card tier without cumbersome quarterly spend barriers on premium cards.",
      guestAccess: "Guest visits chargeable under standard Priority Pass rates, or included on Aurum.",
    },
    diningEntertainment: {
      diningProgram: "SBI Card Dining Privileges",
      diningDiscount: "Up to 15% to 20% discount across 2,000+ partner restaurants",
      movieBenefits: "Free movie tickets worth up to ₹6,000 annually (2 free tickets every month on BookMyShow with SBI Card Elite)",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["SBI Shaurya RuPay (Defense)", "Pre-approved Corporate Upgrade Offers"],
      waiverSpend: "₹1,00,000 (SimplyCLICK/SimplySAVE), ₹2,00,000 (Cashback), ₹3,00,000 (Prime), ₹10,00,000 (Elite)",
      fuelSurchargeWaiver: "1% fuel surcharge waiver across all petrol pumps in India on transactions between ₹500 and ₹4,000",
    },
    features: [
      {
        id: "sbi-flat-cashback",
        title: "Flat 5% Online Cashback (No Merchant Lock)",
        category: "rewards",
        categoryLabel: "Cashback Powerhouse",
        tag: "Industry Gold Standard",
        summary:
          "The celebrated SBI Cashback card delivers an unconditional 5% cashback on virtually every online platform without merchant exclusions.",
        benefits: [
          "5% cashback on online spends across Amazon, Flipkart, Myntra, Swiggy, Zomato, Nykaa, and Uber",
          "Cashback auto-credits straight into your card statement within two days of billing cycle generation",
          "Monthly online cashback cap of ₹5,000 (meaning up to ₹1,00,000 spend earns full 5%)",
          "1% cashback on all offline and retail store spends",
        ],
        bestSuitedFor: "Online shoppers who prefer simple, direct cash savings over complicated reward points.",
      },
      {
        id: "sbi-simplysave-multipliers",
        title: "10X Reward Points on Daily Household Spends",
        category: "rewards",
        categoryLabel: "Daily Spends Multiplier",
        tag: "Groceries & Dining",
        summary:
          "SimplySAVE and SimplyCLICK accelerate reward generation on everyday essentials, groceries, departmental stores, and dining out.",
        benefits: [
          "10 reward points per ₹100 spent on dining, groceries, supermarket shopping, and movies",
          "Log into SBI Rewardz portal to redeem points for gift vouchers, electronics, and statement credits",
          "Bonus milestone e-vouchers worth ₹2,000 from Cleartrip/Bata upon crossing ₹1 Lakh & ₹2 Lakh annual spends",
          "Reversal of annual renewal fees upon reaching ₹1 Lakh in annual card spend",
        ],
        bestSuitedFor: "Families and individuals with recurring supermarket, dining, and departmental bills.",
      },
      {
        id: "sbi-travel-lounges",
        title: "Domestic Airport Lounges & Free Movie Tickets",
        category: "travel",
        categoryLabel: "Travel & Lifestyle",
        tag: "Lounge + Movies",
        summary:
          "Enjoy relaxing airport lounge visits and unwind with complimentary BookMyShow movie tickets every month on premier SBI cards.",
        benefits: [
          "Up to 8 complimentary domestic airport lounge visits annually (2 per quarter)",
          "Complimentary Priority Pass membership for seamless international airport lounge entry",
          "Free movie tickets worth ₹250 each (up to 2 tickets per month, ₹6,000/year) on BookMyShow with SBI Elite",
          "Club Vistara Silver Tier membership with complimentary one-way flight ticket voucher",
        ],
        bestSuitedFor: "Lifestyle enthusiasts who enjoy weekend cinemas and quarterly domestic vacations.",
      },
      {
        id: "sbi-bpcl-fuel",
        title: "Up to 7.25% Valueback on BPCL Fuel Stations",
        category: "waiver",
        categoryLabel: "Fuel & Travel",
        tag: "Highest Fuel Return",
        summary:
          "The BPCL SBI Card Octane offers unbeatable savings on petrol and diesel purchases across Bharat Petroleum pumps nationwide.",
        benefits: [
          "7.25% value back (25 Reward Points per ₹100 spend) on fuel purchases at BPCL pumps",
          "1% fuel surcharge waiver on all BPCL fuel transactions up to ₹4,000",
          "Accelerated reward points on departmental store shopping, groceries, and dining",
          "Redeem points instantly for fuel right at the BPCL point-of-sale machine",
        ],
        bestSuitedFor: "Daily vehicle commuters and highway road-trippers.",
      },
      {
        id: "sbi-rupay-upi",
        title: "SimplySAVE RuPay UPI Scan-and-Pay",
        category: "upi",
        categoryLabel: "Digital & UPI",
        tag: "UPI on Credit",
        summary:
          "Transact effortlessly at local stores, vegetable vendors, and neighborhood outlets by linking SBI RuPay cards to UPI apps.",
        benefits: [
          "Link card to Google Pay, Paytm, PhonePe, or BHIM for instant QR code scanning",
          "Earn reward points on UPI transactions just like physical card point-of-sale swipes",
          "Interest-free grace period up to 50 days on all UPI merchant transactions",
          "Enhanced security: manage UPI spending limits and toggle online permissions in the SBI Card app",
        ],
        bestSuitedFor: "Cardholders wanting cashless UPI convenience backed by interest-free credit.",
      },
      {
        id: "sbi-flexipay-controls",
        title: "Flexipay Instant EMI & Mobile Security Controls",
        category: "protection",
        categoryLabel: "Security & EMI",
        tag: "Complete Control",
        summary:
          "Convert bulky transactions into pocket-friendly monthly installments and control your card security in real-time.",
        benefits: [
          "Flexipay allows converting any transaction over ₹2,500 into easy EMIs within 30 days of purchase",
          "Host Card Emulation (HCE) and tokenized tap-and-pay through your Android smartphone",
          "Instant temporary card lock, ATM limit adjustment, and international transaction toggle",
          "Comprehensive 24/7 fraud monitoring and emergency card replacement anywhere in India",
        ],
        bestSuitedFor: "Users planning high-ticket purchases who want transparent EMI conversion options.",
      },
    ],
    flagshipCards: [
      { name: "SBI Cashback Credit Card", category: "Online Cashback", highlight: "Flat 5% cashback on all online shopping, auto-credited to statement", annualFee: "₹999 + GST" },
      { name: "SBI Card Elite", category: "Luxury Lifestyle", highlight: "Free movie tickets worth ₹6,000/yr, 6 Priority Pass lounges, Club Vistara Silver", annualFee: "₹4,999 + GST" },
      { name: "SBI Card Prime", category: "Premium All-Rounder", highlight: "₹3,000 welcome voucher, 8 domestic lounges, 4 Priority Pass visits", annualFee: "₹2,999 + GST" },
      { name: "SimplyCLICK SBI Card", category: "Online Shopping", highlight: "10X rewards on Amazon, BookMyShow, Cleartrip & ₹500 welcome gift", annualFee: "₹499 + GST" },
      { name: "BPCL SBI Card Octane", category: "Fuel & Travel", highlight: "7.25% valueback on fuel at BPCL petrol stations nationwide", annualFee: "₹1,499 + GST" },
    ],
  },

  "icici-bank": {
    slug: "icici-bank",
    bankName: "ICICI Bank",
    shortName: "ICICI",
    logo: "/partners-logos/icici-logo.webp",
    tagline: "Lifetime Free Amazon Pay, Everlasting Rewards & Culinary Delights",
    overview:
      "ICICI Bank is renowned for customer-friendly, friction-free credit products headlined by India's most successful credit card: the Amazon Pay ICICI Credit Card. With unconditional lifetime free status, points that never expire, Buy 1 Get 1 Free cinema privileges, and domestic airport plus Indian Railway executive lounge access, ICICI credit cards offer unmatched utility with minimal fee friction.",
    keyMetrics: {
      maxRewardRate: "Unlimited 5% Cashback (Amazon Prime)",
      rewardCurrency: "Amazon Pay Balance (Direct) / ICICI Reward Points",
      domesticLounge: "Complimentary access (Sapphiro, Rubyx, Coral, Emeralde)",
      internationalLounge: "Complimentary DreamFolks DragonPass memberships",
      upiRuPay: "ICICI Coral RuPay, HPCL Super Saver RuPay",
      forexMarkup: "1.50% (Emeralde Private) to 3.50%",
      feeWaiver: "Unconditional Lifetime Free on Amazon Pay; ₹1.5L-₹15L on others",
    },
    rewardsEcosystem: {
      programName: "ICICI Bank Rewards & Amazon Pay Ecosystem",
      rateSummary: "Unlimited 5% cashback on Amazon Prime; up to 4 reward points per ₹100 on retail",
      pointValuation: "1:1 on Amazon Pay Balance / ₹0.25 per ICICI Reward Point",
      acceleratedPartners: [
        "Amazon India & Amazon Fresh",
        "100+ Amazon Pay Partner Merchants (Flight bookings, Swiggy, Uber)",
        "HPCL Fuel Outlets",
        "BookMyShow",
        "Culinary Treats Partner Restaurants",
      ],
      redemptionOptions: [
        "Auto-Credited directly as Amazon Pay Balance every billing month",
        "Redeem ICICI Reward Points for flights, hotels, and merchandise (Points NEVER Expire)",
        "Convert to shopping e-vouchers (Shoppers Stop, Croma, Lifestyle)",
        "Direct statement credit for corporate cardholders",
      ],
    },
    loungeAndTravel: {
      domestic: "Up to 8 to 16 complimentary domestic airport lounge visits annually across tier-1 and tier-2 airports on Sapphiro and Rubyx.",
      international: "Complimentary DreamFolks DragonPass membership offering international lounge visits and airport spa sessions on Emeralde and Sapphiro.",
      railway: "Complimentary access to IRCTC Executive Lounges at major Indian railway junctions on cards like Coral and Rubyx.",
      spendCondition: "Subject to spending ₹75,000 in the preceding calendar quarter on retail cards.",
      guestAccess: "DreamFolks card enables subsidized or complimentary guest access depending on card tier.",
    },
    diningEntertainment: {
      diningProgram: "ICICI Culinary Treats Program",
      diningDiscount: "Minimum 15% discount across 2,500+ partner restaurants in over 30 Indian cities",
      movieBenefits: "Buy 1 Get 1 Free movie tickets on BookMyShow (up to ₹500 off twice a month on Sapphiro; up to ₹100 off on Coral)",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["Amazon Pay ICICI Card", "ICICI Platinum Chip Card", "Select Corporate Salary Upgrades"],
      waiverSpend: "₹1,50,000 (Coral), ₹3,00,000 (Rubyx), ₹6,00,000 (Sapphiro), ₹15,00,000 (Emeralde)",
      fuelSurchargeWaiver: "1% fuel surcharge waiver across all fuel pumps in India on transactions up to ₹4,000",
    },
    features: [
      {
        id: "icici-amazon-pay",
        title: "Amazon Pay ICICI Lifetime Free Privilege",
        category: "rewards",
        categoryLabel: "Unconditional Lifetime Free",
        tag: "No Annual Fee Forever",
        summary:
          "India's most popular credit card: ₹0 joining fee, ₹0 annual renewal fee, and unlimited cashback automatically credited as Amazon Pay Balance.",
        benefits: [
          "5% unlimited cashback on Amazon purchases for Amazon Prime members (3% for non-Prime members)",
          "2% unlimited cashback on 100+ partner merchants when paying via Amazon Pay (flights, recharges, bill payments, food orders)",
          "1% unlimited cashback on all other domestic and international retail spends",
          "No minimum redemption limit; earnings automatically credit into Amazon Pay Balance every month",
        ],
        bestSuitedFor: "Every Indian household that shops online, pays utility bills, or uses Amazon.",
      },
      {
        id: "icici-never-expire-points",
        title: "ICICI Reward Points with Zero Expiry",
        category: "rewards",
        categoryLabel: "Evergreen Rewards",
        tag: "Points Never Expire",
        summary:
          "Earn reward points that stay with you forever. Accumulate points over several years for big-ticket redemptions without forfeiture pressure.",
        benefits: [
          "Reward points earned on ICICI proprietary cards carry zero validity expiration",
          "Earn up to 4 reward points per ₹100 spent on domestic and international transactions",
          "Redeem accumulated points for luxury hotel bookings, flights, electronics, and lifestyle vouchers",
          "Seamless point redemption directly through the iMobile Pay app or internet banking",
        ],
        bestSuitedFor: "Long-term point accumulators planning dream vacations or luxury gadget redemptions.",
      },
      {
        id: "icici-bogo-culinary",
        title: "BookMyShow BOGO & Culinary Treats Discounts",
        category: "dining",
        categoryLabel: "Movies & Fine Dining",
        tag: "Buy 1 Get 1 Free",
        summary:
          "Pamper your weekends with Buy 1 Get 1 Free cinema passes and delicious dining discounts across thousands of restaurants.",
        benefits: [
          "Buy 1 Get 1 Free movie tickets on BookMyShow up to ₹500 discount per ticket on Sapphiro (twice a month)",
          "Buy 1 Get 1 Free movie tickets up to ₹100 off on BookMyShow with ICICI Coral",
          "Save minimum 15% on dining bills across 2,500+ restaurants under the ICICI Culinary Treats program",
          "Complimentary golf rounds and coaching sessions per month on Gemstone cards",
        ],
        bestSuitedFor: "Movie buffs and weekend foodies.",
      },
      {
        id: "icici-railway-airport-lounges",
        title: "Airport & IRCTC Railway Executive Lounges",
        category: "travel",
        categoryLabel: "Travel Comfort",
        tag: "Airport + Railway",
        summary:
          "Enjoy complimentary visits to premier domestic airport lounges as well as Indian Railway executive lounges across railway junctions.",
        benefits: [
          "Up to 4 to 16 complimentary domestic airport lounge visits per year depending on card tier",
          "Complimentary access to IRCTC Executive Railway Lounges at New Delhi, Agra, Jaipur, Madurai, etc.",
          "DreamFolks membership for international airport lounge and spa access on flagship cards",
          "Complimentary personal air accident insurance up to ₹3 Crores on Sapphiro and Emeralde",
        ],
        bestSuitedFor: "Domestic travelers who travel via both air and India's railway network.",
      },
      {
        id: "icici-coral-rupay",
        title: "ICICI Coral RuPay Scan-and-Pay on UPI",
        category: "upi",
        categoryLabel: "Digital & UPI",
        tag: "RuPay UPI Float",
        summary:
          "Link your ICICI Coral RuPay credit card to PhonePe, Google Pay, and Paytm to make instant QR code payments backed by credit float.",
        benefits: [
          "Earn 2 ICICI Reward Points per ₹100 on retail UPI merchant spends",
          "Enjoy up to 50 days of interest-free credit on street vendor, grocery, and fuel payments",
          "Zero joining fee on pre-approved virtual RuPay card issuance for existing ICICI customers",
          "Manage UPI transaction caps independently inside the iMobile Pay app",
        ],
        bestSuitedFor: "Everyday spenders who want to rack up reward points on neighborhood QR payments.",
      },
      {
        id: "icici-imobile-security",
        title: "iMobile Pay Centralized Security Switchboard",
        category: "protection",
        categoryLabel: "Digital Security",
        tag: "Total Mobile Control",
        summary:
          "Industry-leading digital controls: instantly freeze your card, set sub-limits, toggle international access, and generate virtual cards.",
        benefits: [
          "One-tap card lock/unlock feature prevents unauthorized usage instantly",
          "Separate toggles for contactless tap-and-pay, online e-commerce, ATM cash, and international PoS",
          "Instant virtual credit card generation for safe online shopping before your plastic arrives",
          "Zero lost card liability upon reporting unauthorized transactions immediately to customer care",
        ],
        bestSuitedFor: "Security-conscious cardholders wanting complete control over their card settings.",
      },
    ],
    flagshipCards: [
      { name: "Amazon Pay ICICI Credit Card", category: "Lifetime Free Cashback", highlight: "Unlimited 5% cashback on Amazon Prime, ₹0 annual fee forever", annualFee: "Lifetime Free (₹0)" },
      { name: "ICICI Sapphiro Credit Card", category: "Luxury Travel & Movies", highlight: "₹500 BOGO on BookMyShow, 16 domestic lounges, 4 railway lounges", annualFee: "₹6,500 + GST" },
      { name: "ICICI Rubyx Credit Card", category: "Dual Card Privilege", highlight: "Dual card (Visa + Mastercard), 8 airport lounges, 4 railway lounges", annualFee: "₹3,000 + GST" },
      { name: "ICICI Coral RuPay Credit Card", category: "UPI & Lifestyle", highlight: "RuPay UPI payments, airport & railway lounges, 25% movie discounts", annualFee: "₹500 + GST" },
      { name: "ICICI Emeralde Private Metal", category: "Ultra High Net Worth", highlight: "Unlimited international lounges, 1.5% low forex markup, Taj Epicure", annualFee: "₹12,499 + GST" },
    ],
  },

  "axis-bank": {
    slug: "axis-bank",
    bankName: "AXIS Bank",
    shortName: "Axis",
    logo: "/partners-logos/axis-logo.webp",
    tagline: "Elite Travel EDGE Miles, 20+ Airline Partners & Power Cashback Cards",
    overview:
      "Axis Bank boasts one of India's most versatile credit card portfolios. From the frequent-flyer favourite Axis Atlas and Magnus cards with lucrative 5:4 air mile conversion ratios across 20+ global airline and hotel programs, to everyday household champions like Airtel Axis (25% bill cashback) and Flipkart Axis (5% unlimited cashback), Axis cards blend elite travel luxury with immense utility.",
    keyMetrics: {
      maxRewardRate: "Up to 5:4 Air Mile Ratio / 25% on Airtel Thanks",
      rewardCurrency: "EDGE Miles / EDGE REWARDS / Direct Cashback",
      domesticLounge: "Complimentary access (Atlas, Magnus, Select, Horizon)",
      internationalLounge: "Unlimited Priority Pass with guest visits (Magnus)",
      upiRuPay: "IndianOil Axis RuPay, Axis Kiwi RuPay, SuperSaver RuPay",
      forexMarkup: "2.00% (Magnus / Reserve / Horizon) to 3.50%",
      feeWaiver: "₹2 Lakhs to ₹15 Lakhs annual spend milestones",
    },
    rewardsEcosystem: {
      programName: "Axis EDGE REWARDS & EDGE Miles Hub",
      rateSummary: "Up to 5:4 air mile transfer ratio; 2 EDGE Miles per ₹100 base; 5 EDGE Miles on travel",
      pointValuation: "Up to ₹1.00 per mile when transferred to international frequent flyer programs",
      acceleratedPartners: [
        "Airtel (25% cashback on mobile/DTH/fiber via Airtel Axis)",
        "Flipkart & Myntra (5% unlimited cashback)",
        "Swiggy, Zomato & BigBasket (10% cashback)",
        "Singapore Airlines, Qatar Airways, Turkish Miles&Smiles, Accor ALL",
        "EazyDiner Partner Restaurants",
      ],
      redemptionOptions: [
        "Transfer to 20+ Airline & Hotel Partners (KrisFlyer, Qatar, United, Marriott, Accor)",
        "Direct Statement Credit (Flipkart Axis auto-credits monthly)",
        "EDGE REWARDS Travel Booking Portal (Flights and hotel stays)",
        "Exclusive Electronic & Luxury Merchandise Catalog",
      ],
    },
    loungeAndTravel: {
      domestic: "Complimentary domestic lounge access across all major airports in India (8 to 18 visits/year on Atlas; unlimited on Magnus and Reserve).",
      international: "Unlimited international airport lounge access via Priority Pass for primary cardholders with complimentary guest visits on Magnus and Reserve.",
      railway: "Select regional partnerships on specific retail cards.",
      spendCondition: "Spend ₹50,000 in previous 3 months for lounge access on entry-level cards; spend-unlinked on Atlas and Magnus.",
      guestAccess: "Complimentary guest visits included on Magnus (up to 8 guest visits/year) and Reserve.",
    },
    diningEntertainment: {
      diningProgram: "Axis Dining Delights & EazyDiner Prime",
      diningDiscount: "Up to 40% instant discount on dining via EazyDiner Prime and minimum 15% under Dining Delights",
      movieBenefits: "Buy 1 Get 1 Free movie tickets via BookMyShow (up to ₹500 off per ticket on Select/Magnus)",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["Axis Neo (Promotional Offers)", "Axis My Zone (Select Bank Accounts)"],
      waiverSpend: "₹2,00,000 (Airtel/Flipkart/Select), ₹15,00,000 (Atlas/Magnus)",
      fuelSurchargeWaiver: "1% fuel surcharge waiver on transactions between ₹400 and ₹4,000 across all petrol pumps in India",
    },
    features: [
      {
        id: "axis-edge-miles",
        title: "EDGE Miles & 20+ Global Air Mile Partners",
        category: "travel",
        categoryLabel: "Air Miles & Global Travel",
        tag: "5:4 Transfer Ratio",
        summary:
          "Transfer EDGE Miles to the world's finest airline frequent flyer and luxury hotel programs at unbeatable conversion ratios.",
        benefits: [
          "Transfer to 20+ partners: Singapore Airlines KrisFlyer, Qatar Privilege Club, United MileagePlus, Accor ALL, and Turkish Airlines",
          "Tier-based milestone bonuses: earn up to 10,000 bonus EDGE Miles upon reaching annual spending milestones on Axis Atlas",
          "5 EDGE Miles per ₹100 spent directly on airline tickets and hotel reservations",
          "Points transfer processed seamlessly through the Axis Travel EDGE portal",
        ],
        bestSuitedFor: "Aviation enthusiasts, business globetrotters, and vacationers seeking luxury flights on points.",
      },
      {
        id: "axis-airtel-cashback",
        title: "Airtel Axis 25% Utility & Mobile Cashback",
        category: "rewards",
        categoryLabel: "Everyday Utilities",
        tag: "Highest Utility Cashback",
        summary:
          "Transform your monthly household bills with 25% cashback on Airtel mobile, broadband, and DTH, plus 10% on electricity bills.",
        benefits: [
          "25% cashback on Airtel mobile recharges, Airtel Black, broadband, and DTH bill payments via Airtel Thanks app",
          "10% cashback on utility bill payments (electricity, piped gas, water) via Airtel Thanks app",
          "10% cashback on food delivery and grocery essentials via Swiggy, Zomato, and BigBasket",
          "Cashback auto-credits straight into your credit card statement monthly",
        ],
        bestSuitedFor: "Households with monthly telecom, Wi-Fi, electricity, and food delivery spending.",
      },
      {
        id: "axis-flipkart-unlimited",
        title: "Flipkart Axis 5% Unlimited Cashback",
        category: "rewards",
        categoryLabel: "E-Commerce Shopping",
        tag: "5% Unlimited Cashback",
        summary:
          "Shop without caps: flat 5% unlimited cashback on Flipkart and Cleartrip, with 4% cashback on preferred partner merchants.",
        benefits: [
          "5% unlimited cashback on Flipkart, Myntra, and Cleartrip bookings with no monthly ceiling",
          "4% cashback on curated merchant partners including Uber, PVR, Swiggy, and Tata 1mg",
          "1% unlimited cashback on all other retail expenditures",
          "4 complimentary domestic airport lounge visits per year upon meeting spend threshold",
        ],
        bestSuitedFor: "Regular Flipkart and Myntra shoppers seeking predictable cash savings.",
      },
      {
        id: "axis-magnus-vip-travel",
        title: "Airport Concierge & VIP Lounge Privileges",
        category: "travel",
        categoryLabel: "VIP Luxury",
        tag: "Concierge & Lounges",
        summary:
          "Experience airport luxury with VIP terminal meet-and-assist escorts, luxury airport transfers, and unlimited lounge visits.",
        benefits: [
          "Complimentary airport meet-and-assist concierge services across major metropolitan airports in India",
          "Unlimited domestic and international airport lounge access via Priority Pass for primary cardholder",
          "Complimentary guest visits included on super-premium tiers",
          "Low foreign currency exchange markup of 2.0% on international spending",
        ],
        bestSuitedFor: "Affluent professionals and HNWIs who expect frictionless airport experiences.",
      },
      {
        id: "axis-dining-delights",
        title: "Dining Delights & EazyDiner Prime 40% Off",
        category: "dining",
        categoryLabel: "Dining Privileges",
        tag: "Up to 40% Dining Off",
        summary:
          "Enjoy sumptuous dining savings with EazyDiner Prime memberships and Axis Dining Delights discounts across India.",
        benefits: [
          "Up to 40% instant discount on dining bills via EazyDiner Prime at over 10,000 participating restaurants",
          "Minimum 15% discount across 4,000+ restaurant outlets under the Axis Dining Delights program",
          "Buy 1 Get 1 Free movie tickets on BookMyShow (up to ₹500 off) on Axis Select and Magnus",
          "Exclusive chef tables and priority reservation desks at Michelin-starred dining destinations",
        ],
        bestSuitedFor: "Fine dining gourmets and regular restaurant patrons.",
      },
      {
        id: "axis-insurance-protection",
        title: "₹4.5 Crore Air Accident & Comprehensive Insurance",
        category: "protection",
        categoryLabel: "Insurance & Security",
        tag: "Maximum Insurance Cover",
        summary:
          "Travel with total peace of mind backed by high-value air accident insurance, lost baggage cover, and zero lost card liability.",
        benefits: [
          "Complimentary air accident insurance coverage up to ₹4.5 Crores on premium card tiers",
          "Purchase protection up to ₹1 Lakh covering electronic goods against fire, theft, or burglary within 90 days",
          "Lost baggage delay and flight delay insurance covers up to USD 500",
          "Zero liability on fraudulent transactions reported within 48 hours of occurrence",
        ],
        bestSuitedFor: "International holidaymakers and families needing comprehensive travel protection.",
      },
    ],
    flagshipCards: [
      { name: "Axis Bank Atlas Credit Card", category: "Frequent Flyer", highlight: "5 EDGE Miles/₹100 on travel, 5:4 airline miles transfer, tier upgrades", annualFee: "₹5,000 + GST" },
      { name: "Airtel Axis Bank Credit Card", category: "Utility & Bills", highlight: "25% cashback on Airtel bills, 10% on utilities, 10% on Swiggy/Zomato", annualFee: "₹500 + GST" },
      { name: "Flipkart Axis Bank Credit Card", category: "Online Shopping", highlight: "5% unlimited cashback on Flipkart & Cleartrip, 4 lounges/year", annualFee: "₹500 + GST" },
      { name: "Axis Bank Magnus Credit Card", category: "Super Premium", highlight: "Unlimited global lounges + 8 guest visits, VIP airport concierge", annualFee: "₹12,500 + GST" },
      { name: "IndianOil Axis Bank RuPay Card", category: "Fuel & UPI", highlight: "Up to 4% valueback on fuel at IndianOil pumps + RuPay UPI scanning", annualFee: "₹500 + GST" },
    ],
  },

  "au-bank": {
    slug: "au-bank",
    bankName: "AU Bank",
    shortName: "AU Bank",
    logo: "/partners-logos/au-logo.webp",
    tagline: "Pioneering Credit Limit Matching via SwipeUp & Dynamic Customizable Packs",
    overview:
      "AU Small Finance Bank has emerged as India's most innovative challenger in the credit card industry. Known for its revolutionary AU SwipeUp platform—which matches or upgrades credit card limits from other banks with zero salary documentation—AU also created India's first customizable credit card (AU LIT) and offers standout luxury benefits including 0.99% forex markup on Zenith+ and complimentary railway executive lounges.",
    keyMetrics: {
      maxRewardRate: "Up to 5% Cashback / 10X Reward Points",
      rewardCurrency: "AU Reward Points / Real-Time Cashback",
      domesticLounge: "Up to 16 complimentary visits/year (Zenith, Vetta, Altura)",
      internationalLounge: "Complimentary Priority Pass visits on Zenith & Zenith+",
      upiRuPay: "AU InstaPay RuPay, AU LIT RuPay, SwipeUp RuPay",
      forexMarkup: "0.99% (Zenith+) to 3.49%",
      feeWaiver: "SwipeUp upgrades issued Lifetime Free; ₹30,000-₹8L spend waivers",
    },
    rewardsEcosystem: {
      programName: "AU Rewardz & Dynamic LIT Packs",
      rateSummary: "Up to 10X reward points on dining and international spends; 5% cashback on retail",
      pointValuation: "₹0.25 per AU Reward Point / 1:1 on direct cashback",
      acceleratedPartners: [
        "Swiggy, Zomato & Blinkit",
        "MakeMyTrip & Cleartrip",
        "BookMyShow",
        "Major Fuel Stations Nationwide",
        "OTT Platforms (Amazon Prime, Netflix, Hotstar)",
      ],
      redemptionOptions: [
        "Direct Statement Credit against monthly card bill",
        "Flight and Hotel Bookings via AU Rewardz Portal",
        "E-Gift Cards for top shopping brands",
        "Merchandise and electronics catalog",
      ],
    },
    loungeAndTravel: {
      domestic: "Up to 8 to 16 complimentary domestic airport lounge visits per year across major Indian metropolitan terminals.",
      international: "Complimentary Priority Pass membership with up to 4 free international visits per year on Zenith and Zenith+.",
      railway: "Complimentary access to IRCTC Executive Lounges across key Indian railway stations on select cards.",
      spendCondition: "Subject to spending ₹20,000 in preceding calendar quarter on entry-level cards; spend-free on Zenith+.",
      guestAccess: "Chargeable under standard Priority Pass guest fee structure.",
    },
    diningEntertainment: {
      diningProgram: "AU Delicious Dining Program",
      diningDiscount: "Up to 20% to 30% discount at 1,500+ curated partner dining establishments across India",
      movieBenefits: "Buy 1 Get 1 Free movie tickets on BookMyShow (up to ₹100 to ₹250 off twice every month)",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["AU SwipeUp Cards (Xcite, Xcite Ace, Xcite Pro)", "AU LIT Card (Base card is Lifetime Free)"],
      waiverSpend: "₹30,000 (Altura), ₹1,00,000 (Altura Plus), ₹1,50,000 (Vetta), ₹8,00,000 (Zenith+)",
      fuelSurchargeWaiver: "1% fuel surcharge waiver on transactions between ₹400 and ₹5,000 across all petrol pumps in India",
    },
    features: [
      {
        id: "au-swipeup-engine",
        title: "AU SwipeUp Limit Matching Engine",
        category: "waiver",
        categoryLabel: "Limit Upgrade Innovation",
        tag: "Zero Salary Slips",
        summary:
          "Upgrade your existing competitor bank credit card to an AU card with a higher credit limit and lifetime free terms with zero documentation.",
        benefits: [
          "Enter your existing competitor card details on AU SwipeUp to get an instant upgraded card offer",
          "Higher matched credit limits and enhanced reward rate compared to your current bank card",
          "Issued completely Lifetime Free with zero joining fee and zero annual maintenance fee forever",
          "Full video KYC approval and instant virtual card generation within minutes",
        ],
        bestSuitedFor: "Cardholders wanting higher credit limits and free cards without income paperwork.",
      },
      {
        id: "au-lit-customizable",
        title: "AU LIT Dynamic Customizable Feature Packs",
        category: "rewards",
        categoryLabel: "Customizable Cards",
        tag: "India's First Customizable Card",
        summary:
          "Take control: switch features like 5% dining cashback, 4X travel rewards, or OTT memberships ON or OFF each month as your needs change.",
        benefits: [
          "Activate 5% cashback on travel, dining, or grocery for 30 or 90 days right from the AU 0101 app",
          "Turn on domestic airport lounge access packs only in the months you plan to travel",
          "Add 10X reward points accelerators on international or online purchases",
          "Pay nominal micro-fees only for the specific perks you activate, keeping the core card lifetime free",
        ],
        bestSuitedFor: "Tech-savvy users who want a flexible credit card tailored to their seasonal spending.",
      },
      {
        id: "au-zenith-forex",
        title: "0.99% Ultra-Low Forex Markup on Zenith+",
        category: "travel",
        categoryLabel: "International Travel",
        tag: "0.99% Forex Rate",
        summary:
          "Slash foreign currency transaction fees with an industry-low 0.99% forex markup on the AU Zenith+ Metal credit card.",
        benefits: [
          "Save 2.5% or more compared to conventional 3.5% + GST bank forex fees on international expenses",
          "16 complimentary domestic airport lounge visits annually + 4 international lounge visits via Priority Pass",
          "Complimentary luxury dining and Taj Epicure membership benefits",
          "Luxury metal form factor with dedicated 24/7 private concierge desk",
        ],
        bestSuitedFor: "Frequent international business travellers and luxury vacationers.",
      },
      {
        id: "au-railway-lounges",
        title: "Complimentary Domestic & Railway Lounges",
        category: "travel",
        categoryLabel: "Travel Comfort",
        tag: "Airport & Train Lounges",
        summary:
          "Unwind in comfort whether traveling by air or rail with complimentary lounge access across major Indian transit hubs.",
        benefits: [
          "Up to 8 to 16 domestic airport lounge visits per year across tier-1 and tier-2 airport terminals",
          "Access to Indian Railway executive lounges at New Delhi, Agra, Jaipur, and other major junctions",
          "Includes free buffet meals, Wi-Fi, air-conditioned seating, and refreshments",
          "Simplified tap-and-enter access with Visa and RuPay payment networks",
        ],
        bestSuitedFor: "Travelers across India who take both flights and trains.",
      },
      {
        id: "au-device-protection",
        title: "Complimentary Mobile Screen Damage Protection",
        category: "protection",
        categoryLabel: "Insurance & Safety",
        tag: "Device Screen Cover",
        summary:
          "Protect your smartphone and gadgets with complimentary screen damage insurance when purchased on select AU credit cards.",
        benefits: [
          "Covers mobile screen damage repairs up to ₹5,000 to ₹10,000 per claim",
          "Lost card liability insurance up to ₹15 Lakhs protecting against unauthorized offline/online use",
          "Personal air accident cover up to ₹1 Crore on premium tiers",
          "Purchase protection covering newly bought items against accidental damage or burglary",
        ],
        bestSuitedFor: "Gadget owners and smartphone buyers seeking built-in electronic protection.",
      },
      {
        id: "au-rupay-upi-0101",
        title: "AU RuPay UPI & 0101 Mobile Banking Ecosystem",
        category: "upi",
        categoryLabel: "Digital & UPI",
        tag: "Scan & Pay Anywhere",
        summary:
          "Link your AU RuPay credit card to PhonePe, Paytm, and Google Pay to pay at millions of QR codes with credit float.",
        benefits: [
          "Earn reward points on UPI transactions just like physical card point-of-sale swipes",
          "Enjoy up to 50 days of interest-free credit period on everyday scan-and-pay transactions",
          "Manage card limits, reset PIN, block/unblock, and toggle international spends in the AU 0101 app",
          "Instant credit card bill payment directly from your AU savings account or any UPI app",
        ],
        bestSuitedFor: "Cardholders wanting cashless UPI convenience backed by interest-free credit.",
      },
    ],
    flagshipCards: [
      { name: "AU Zenith+ Metal Credit Card", category: "Luxury Travel", highlight: "0.99% forex markup, 16 domestic lounges, 4 Priority Pass, Taj Epicure", annualFee: "₹4,999 + GST" },
      { name: "AU LIT Credit Card", category: "Customizable Packs", highlight: "India's first customizable card, switch 5% cashback or lounge packs ON/OFF", annualFee: "Lifetime Free (₹0)" },
      { name: "AU Xcite Ace Credit Card", category: "SwipeUp Upgrade", highlight: "Issued Lifetime Free via SwipeUp, 8 domestic airport lounges/year", annualFee: "Lifetime Free (₹0)" },
      { name: "AU Vetta Credit Card", category: "Lifestyle & Dining", highlight: "Complimentary airport & railway lounges, ₹1,000 vouchers/quarter", annualFee: "₹2,999 + GST" },
      { name: "AU Altura Plus Credit Card", category: "Cashback & Fuel", highlight: "1.5% cashback on POS retail, 2 free railway lounges/quarter, 1% fuel waiver", annualFee: "₹499 + GST" },
    ],
  },

  "idfc-bank": {
    slug: "idfc-bank",
    bankName: "IDFC Bank",
    shortName: "IDFC FIRST",
    logo: "/partners-logos/idfc-logo.webp",
    tagline: "100% Lifetime Free Cards, Never-Expiring 10X Points & Dynamic 9% APR",
    overview:
      "IDFC FIRST Bank revolutionized the Indian credit card industry with an unconditional Lifetime Free promise across its flagship lineup. Offering points that never expire, dynamic interest rates starting as low as 9% per annum, 0% interest on ATM cash withdrawals until the due date, and complimentary quarterly airport lounge and spa sessions, IDFC credit cards deliver premium benefits with zero annual fee anxiety.",
    keyMetrics: {
      maxRewardRate: "Up to 10X Points (Milestone & Birthday Spends)",
      rewardCurrency: "IDFC FIRST Reward Points (Never Expire)",
      domesticLounge: "Complimentary access (First Select, First Wealth, Club Vistara)",
      internationalLounge: "Complimentary lounge & quarterly spa access (First Wealth)",
      upiRuPay: "FIRST Digital RuPay, Ashva RuPay, Mayura RuPay",
      forexMarkup: "0.00% (Mayura), 1.00% (Ashva), 1.99% (Wealth)",
      feeWaiver: "Lifetime Free unconditionally across Classic, Millennia, Select, Wealth",
    },
    rewardsEcosystem: {
      programName: "IDFC FIRST Evergreen Rewards Hub",
      rateSummary: "3X points on offline spends; 6X on online spends; 10X on incremental spends crossing monthly threshold",
      pointValuation: "1 Reward Point = ₹0.25 (1:1 value on shopping carts; points never expire)",
      acceleratedPartners: [
        "All online e-commerce transactions (6X base points)",
        "Spends above ₹20,000 or ₹30,000 per month (10X accelerated points)",
        "Birthday Spends (10X accelerated points)",
        "BookMyShow & Paytm Movies",
        "Select Luxury Hotel Chains",
      ],
      redemptionOptions: [
        "Instant Point-to-Cash deduction during online shopping checkout carts",
        "Redeem for Flight and Hotel Bookings directly on the IDFC FIRST travel portal",
        "E-Gift Vouchers for Amazon, Flipkart, Myntra, and top retail brands",
        "Direct statement cash credit",
      ],
    },
    loungeAndTravel: {
      domestic: "Up to 4 complimentary domestic airport lounge visits per calendar quarter on First Select, First Wealth, and First Private cards.",
      international: "Complimentary international airport lounge access via DreamFolks and Priority Pass networks on First Wealth and Mayura.",
      railway: "Up to 4 complimentary railway lounge visits per quarter across Indian railway stations.",
      spendCondition: "Spend ₹20,000 in preceding calendar month for lounge access on retail cards; lifetime-free unconditionally.",
      guestAccess: "Complimentary spa access every quarter on First Wealth; guest visits chargeable at partner rates.",
    },
    diningEntertainment: {
      diningProgram: "IDFC FIRST Dining Delights",
      diningDiscount: "Up to 20% discount across 1,500+ restaurants in major cities",
      movieBenefits: "Buy 1 Get 1 Free movie tickets via Paytm Movies / BookMyShow (up to ₹250 to ₹500 off twice a month)",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["FIRST Classic", "FIRST Millennia", "FIRST Select", "FIRST Wealth", "FIRST WOW (FD-backed)"],
      waiverSpend: "All core cards are 100% Lifetime Free unconditionally with zero joining and zero annual fee",
      fuelSurchargeWaiver: "1% fuel surcharge waiver up to ₹200 to ₹400 per month across all petrol pumps in India",
    },
    features: [
      {
        id: "idfc-lifetime-free",
        title: "100% Lifetime Free Forever (Zero Hidden Fees)",
        category: "waiver",
        categoryLabel: "Unconditional Lifetime Free",
        tag: "₹0 Annual Fee Forever",
        summary:
          "Enjoy elite credit card privileges with absolute peace of mind: zero joining fee and zero annual renewal fee forever across IDFC's core lineup.",
        benefits: [
          "Zero joining fee and zero annual fee unconditionally on FIRST Classic, Millennia, Select, and Wealth",
          "No minimum annual spend required to keep the card free for life",
          "Free add-on cards for family members with independent credit limits and zero annual charges",
          "No annual renewal fee shocks or retroactive fee billing surprises",
        ],
        bestSuitedFor: "Spenders who despise annual fee maintenance requirements.",
      },
      {
        id: "idfc-10x-never-expire",
        title: "Never-Expiring 10X Reward Points",
        category: "rewards",
        categoryLabel: "Evergreen Rewards",
        tag: "Points Never Expire",
        summary:
          "Earn reward points that stay with you forever, featuring 10X reward multipliers on monthly milestone spends and birthdays.",
        benefits: [
          "Points never expire; accumulate over a decade without fear of point devaluation or expiration",
          "10X reward points on all incremental spends crossing the monthly threshold (e.g. ₹20,000 or ₹30,000)",
          "10X reward points on all transactions conducted on your birthday",
          "Redeem points directly on merchant checkout screens at ₹0.25 per point like real cash",
        ],
        bestSuitedFor: "High-value spenders who appreciate evergreen reward points that never expire.",
      },
      {
        id: "idfc-low-apr",
        title: "Dynamic Low Interest Rates (Starting from 9% APR)",
        category: "waiver",
        categoryLabel: "Low Interest Innovation",
        tag: "From 0.75% per Month",
        summary:
          "Ditch conventional 42%-48% APR credit card interest rates: IDFC calculates dynamic APR starting as low as 9% per annum.",
        benefits: [
          "Dynamic interest pricing ranges from 9% to 36% p.a. (0.75% to 3.0% per month) based on creditworthiness",
          "Save up to 75% on interest expenses compared to rigid competitor interest charges",
          "Transparent interest calculation with zero hidden finance charges",
          "Flexible repayment tenures and instant EMI conversion through the IDFC FIRST mobile app",
        ],
        bestSuitedFor: "Cardholders who occasionally revolve balances and want to avoid predatory interest charges.",
      },
      {
        id: "idfc-atm-interest-free",
        title: "Interest-Free Cash Withdrawals at ATMs",
        category: "waiver",
        categoryLabel: "Emergency Liquidity",
        tag: "0% Interest on Cash",
        summary:
          "A feature unique in the Indian card industry: withdraw cash from ATMs with 0% interest until the due date (up to 48 days float).",
        benefits: [
          "Zero interest charged on ATM cash withdrawals up to 48 days until the payment due date",
          "Only a nominal flat transaction fee applies (₹199), unlike other banks that charge 3.5% monthly interest from day one",
          "Instant emergency liquidity at any ATM across India and internationally",
          "High cash advance limits linked to your overall card limit",
        ],
        bestSuitedFor: "Cardholders wanting an emergency cash safety net without compounding interest penalties.",
      },
      {
        id: "idfc-lounges-spa",
        title: "Airport Lounges & Free Quarterly Spa Sessions",
        category: "travel",
        categoryLabel: "Travel & Wellness",
        tag: "Lounges + Free Spa",
        summary:
          "Pamper yourself before departure with complimentary domestic airport lounge access and refreshing quarterly airport spa sessions.",
        benefits: [
          "Up to 4 complimentary domestic airport lounge visits per quarter on First Select and First Wealth",
          "Complimentary airport spa sessions per quarter at participating domestic terminals on First Wealth",
          "Up to 4 complimentary railway executive lounge visits per calendar quarter",
          "International lounge visits via DreamFolks / Priority Pass on premium variants",
        ],
        bestSuitedFor: "Travelers seeking airport relaxation and wellness perks.",
      },
      {
        id: "idfc-bogo-roadside",
        title: "Movie BOGO & 24/7 Roadside Assistance",
        category: "dining",
        categoryLabel: "Lifestyle & Auto",
        tag: "BOGO Movies + RSA",
        summary:
          "Enjoy Buy 1 Get 1 Free cinema passes every month, plus complimentary nationwide emergency roadside assistance for your car.",
        benefits: [
          "Buy 1 Get 1 Free movie tickets up to ₹250 off on Paytm Movies / BookMyShow twice a month on First Select",
          "Buy 1 Get 1 Free movie tickets up to ₹500 off twice a month on First Wealth",
          "Complimentary roadside assistance (RSA) worth ₹1,399 covering flat tires, towing, fuel delivery, and jump-starts",
          "Comprehensive travel insurance and lost card liability coverage up to ₹50,000",
        ],
        bestSuitedFor: "Car owners, cinema fans, and weekend spenders.",
      },
    ],
    flagshipCards: [
      { name: "IDFC FIRST Wealth Credit Card", category: "Ultra Premium Lifetime Free", highlight: "Complimentary airport lounges + quarterly spa, 10X points, low 1.99% forex", annualFee: "Lifetime Free (₹0)" },
      { name: "IDFC FIRST Select Credit Card", category: "Premium Travel & Lifestyle", highlight: "4 free domestic lounges/quarter, BOGO movie tickets up to ₹250, 10X points", annualFee: "Lifetime Free (₹0)" },
      { name: "IDFC FIRST Millennia Credit Card", category: "Youth & E-Commerce", highlight: "6X online points, 10X on milestone spends, 25% movie discounts", annualFee: "Lifetime Free (₹0)" },
      { name: "IDFC FIRST Mayura Metal Card", category: "Zero Forex Luxury", highlight: "0% forex markup, unlimited domestic & international lounges, metal card", annualFee: "₹5,999 + GST" },
      { name: "IDFC FIRST WOW Credit Card", category: "FD-Backed Credit Builder", highlight: "100% approval against FD, zero credit score required, 0% forex markup", annualFee: "Lifetime Free (₹0)" },
    ],
  },

  "indusind-bank": {
    slug: "indusind-bank",
    bankName: "INDUSIND Bank",
    shortName: "IndusInd",
    logo: "/partners-logos/indusind-logo.webp",
    tagline: "Zero Forex Markup Leaders, Direct 1:1 Cash Redemptions & Bespoke Concierge",
    overview:
      "IndusInd Bank is the undisputed destination for high-net-worth individuals, business entrepreneurs, and international travellers seeking zero forex fees. Led by flagship cards like Pioneer Heritage, Celesta, and the Tiger Credit Card, IndusInd stands out with 0% foreign exchange markups, rare direct 1:1 cash reward redemptions against card balances, BookMyShow BOGO privileges, and dedicated bespoke concierge desks.",
    keyMetrics: {
      maxRewardRate: "Direct 1:1 Statement Cash Credit",
      rewardCurrency: "IndusInd Reward Points",
      domesticLounge: "Complimentary access (Pinnacle, Legend, Celesta, Tiger)",
      internationalLounge: "Unlimited Priority Pass with guest visits on Pioneer",
      upiRuPay: "IndusInd Platinum RuPay, Samman RuPay, Nexxt RuPay",
      forexMarkup: "0.00% (Pioneer / Tiger) to 3.50%",
      feeWaiver: "Spend ₹1 Lakh to ₹5 Lakhs annually or one-time fee models",
    },
    rewardsEcosystem: {
      programName: "IndusInd Moments Rewards & Cash Credit",
      rateSummary: "Earn up to 2.5 Reward Points per ₹100; points convert directly to cash",
      pointValuation: "Up to ₹1.00 per point directly credited against your card balance",
      acceleratedPartners: [
        "International & Overseas Spends",
        "BookMyShow & Movie Tickets",
        "E-Commerce & High-Value Retail Shopping",
        "Dining & Luxury Hotels",
        "Private Aviation & Luxury Concierge",
      ],
      redemptionOptions: [
        "Direct Cash Credit: 1 Reward Point = Up to ₹1.00 Statement Credit",
        "Air Miles Transfer to InterMiles, Singapore KrisFlyer & Club Vistara",
        "E-Gift Vouchers for Amazon, Flipkart, Taj Hotels, and Oberoi",
        "Bespoke Luxury Merchandise & Private Charters",
      ],
    },
    loungeAndTravel: {
      domestic: "Complimentary domestic airport lounge visits across India (up to 8 to 16 visits per year on Legend, Pinnacle, and Celesta).",
      international: "Unlimited complimentary international airport lounge access via Priority Pass for primary and add-on cardholders on Pioneer Heritage.",
      railway: "Select cards offer complimentary access to railway executive lounges.",
      spendCondition: "Spend-unlinked lounge access on premium metal cards; quarterly threshold on entry cards.",
      guestAccess: "Complimentary guest visits included on Pioneer Private and bespoke wealth variants.",
    },
    diningEntertainment: {
      diningProgram: "IndusInd Culinary Delights",
      diningDiscount: "Up to 20% to 30% savings at premium dining destinations and luxury hotel restaurants",
      movieBenefits: "Buy 1 Get 1 or Buy 1 Get 2 free tickets on BookMyShow (up to ₹500 to ₹1,000 off per month)",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["IndusInd Legend (Promotional Offers)", "IndusInd Platinum Aura Edge (Select Channels)"],
      waiverSpend: "Many IndusInd cards use a one-time joining fee model with zero annual maintenance fees thereafter",
      fuelSurchargeWaiver: "1% fuel surcharge waiver on transactions between ₹400 and ₹4,000 across all petrol pumps in India",
    },
    features: [
      {
        id: "indusind-zero-forex",
        title: "Zero (0.00%) Foreign Exchange Markup",
        category: "travel",
        categoryLabel: "Zero Forex Leaders",
        tag: "0% Forex Markup",
        summary:
          "Save lakhs on international business trips, foreign vacations, and cross-border SaaS subscriptions with 0% foreign exchange fees.",
        benefits: [
          "0.00% forex markup on Pioneer Heritage and IndusInd Tiger credit cards",
          "Subsidized 1.50% forex markup on Celesta and Pinnacle cards (vs 3.50% standard industry fee)",
          "Eliminates extra bank currency conversion margins on hotels, flights, and international shopping",
          "Real-time dynamic currency conversion monitoring in the IndusMobile app",
        ],
        bestSuitedFor: "International corporate travelers, globetrotters, and overseas software buyers.",
      },
      {
        id: "indusind-direct-cash-redemption",
        title: "Direct 1:1 Statement Cash Credit Redemption",
        category: "rewards",
        categoryLabel: "Real Cash Value",
        tag: "1 Point = ₹1.00 Cash",
        summary:
          "No catalog devaluation: convert your accumulated IndusInd reward points into direct rupee cash credited straight to your monthly card balance.",
        benefits: [
          "1 Reward Point = up to ₹1.00 direct statement cash credit on super-premium tiers",
          "No mandatory conversion to low-value consumer catalogs or unwanted vouchers",
          "Instantly offset outstanding card dues with your earned points via IndusNet or phone banking",
          "Points carry long shelf lives with flexible redemption modes",
        ],
        bestSuitedFor: "Spenders who value pure, unadulterated cash returns over complex reward vouchers.",
      },
      {
        id: "indusind-bespoke-concierge",
        title: "Bespoke 24/7 Lifestyle & Aviation Concierge",
        category: "travel",
        categoryLabel: "Bespoke Concierge",
        tag: "24/7 Global Desk",
        summary:
          "Unlock reservations at sold-out Michelin-star restaurants, secure private yacht charters, and receive VIP airport tarmac transfers.",
        benefits: [
          "Dedicated private concierge team available round the clock worldwide",
          "Assistance with private jet charters, super-yacht bookings, and sold-out international theatre events",
          "VIP airport tarmac meet-and-assist escorts at major Indian and international gateways",
          "Priority reservations at leading fine-dining restaurants across Delhi, Mumbai, and Bengaluru",
        ],
        bestSuitedFor: "HNWIs, corporate leaders, and executives demanding personalized concierge service.",
      },
      {
        id: "indusind-bogo-bookmyshow",
        title: "BookMyShow Buy 1 Get 1 or Buy 1 Get 2 Free Tickets",
        category: "dining",
        categoryLabel: "Cinema Privileges",
        tag: "Buy 1 Get 2 Free",
        summary:
          "One of India's most generous movie perks: get free movie tickets up to ₹500 to ₹1,000 value per ticket every single month.",
        benefits: [
          "Buy 1 Get 1 Free movie tickets on BookMyShow up to ₹250 to ₹500 discount per ticket on Legend and Pinnacle",
          "Buy 1 Get 2 Free tickets on select ultra-premium tiers up to three times a month",
          "Valid for both weekday and weekend cinema screenings including IMAX and 4DX",
          "Additional discounts on food and beverage combos inside cinema halls",
        ],
        bestSuitedFor: "Movie aficionados and families who visit theaters frequently.",
      },
      {
        id: "indusind-golf-privileges",
        title: "Complimentary Championship Golf Access",
        category: "travel",
        categoryLabel: "Golf & Sports",
        tag: "Complimentary Golf",
        summary:
          "Enjoy complimentary green fees and professional golf lessons at India's premier championship golf courses.",
        benefits: [
          "Up to 4 complimentary rounds of golf per quarter across top golf courses in India",
          "Complimentary golf coaching sessions for cardholders and family members",
          "Hassle-free booking through the dedicated IndusInd golf concierge desk",
          "Access to golf clubs across Mumbai, Bengaluru, Delhi NCR, Hyderabad, and overseas destinations",
        ],
        bestSuitedFor: "Golf enthusiasts and corporate networking executives.",
      },
      {
        id: "indusind-total-protect",
        title: "Total Protect 48-Hour Pre-Reporting Liability Cover",
        category: "protection",
        categoryLabel: "Security & Fraud Cover",
        tag: "48-Hr Pre-Reporting Shield",
        summary:
          "India's finest zero-liability shield covers unauthorized fraudulent card transactions occurring up to 48 hours prior to reporting loss.",
        benefits: [
          "Zero liability on unauthorized fraudulent transactions made up to 48 hours before reporting the loss to the bank",
          "Complimentary air accident personal insurance cover up to ₹1 Crore on premium tiers",
          "Emergency card replacement and emergency cash advance service while traveling abroad",
          "Nexxt interactive credit card featuring physical push-buttons for instant EMI/Reward selection at POS",
        ],
        bestSuitedFor: "Travelers seeking airtight financial safety and unauthorized swipe protection.",
      },
    ],
    flagshipCards: [
      { name: "IndusInd Pioneer Heritage Card", category: "Ultra Luxury Wealth", highlight: "0% forex markup, unlimited global lounges + guests, 1:1 cash redemption", annualFee: "₹90,000 (One-Time)" },
      { name: "IndusInd Legend Credit Card", category: "Premium Travel & Movies", highlight: "BookMyShow BOGO, complimentary domestic lounges, golf access", annualFee: "₹9,999 (Often LTF Promo)" },
      { name: "IndusInd Tiger Credit Card", category: "Co-Branded Travel", highlight: "Zero forex markup, accelerated travel rewards, complimentary lounges", annualFee: "₹499 + GST" },
      { name: "IndusInd Pinnacle Credit Card", category: "High Net Worth", highlight: "Buy 1 Get 1 tickets up to ₹500 off, golf rounds, 1.5% low forex markup", annualFee: "₹12,999 (One-Time)" },
      { name: "IndusInd Platinum RuPay Card", category: "UPI & Everyday", highlight: "Scan & pay via UPI, accelerated reward points, 1% fuel surcharge waiver", annualFee: "Lifetime Free (₹0)" },
    ],
  },

  "yes-bank": {
    slug: "yes-bank",
    bankName: "YES Bank",
    shortName: "YES Bank",
    logo: "/partners-logos/yes-bank-logo.webp",
    tagline: "High-Multiplier Metal Cards, Taj Epicure Privileges & Low Forex Markup",
    overview:
      "YES Bank has re-engineered its credit card lineup around lifestyle luxury and high point acceleration. Highlighted by the solid metal YES Marquee and YES Reserv cards, YES Bank delivers up to 36 reward points per ₹200 spent, complimentary Taj Epicure and EazyDiner memberships, unlimited domestic and international airport lounges with guest allowances, and low 1.00% to 1.75% forex markups.",
    keyMetrics: {
      maxRewardRate: "Up to 36 Reward Points per ₹200 Spent",
      rewardCurrency: "YES Rewardz Points",
      domesticLounge: "Complimentary access (YES Marquee, Reserv, Elite, Ace)",
      internationalLounge: "Unlimited international visits via Priority Pass with guest access",
      upiRuPay: "YES Bank Virtual RuPay, Prosperity RuPay",
      forexMarkup: "1.00% (Marquee), 1.75% (Reserv) to 3.50%",
      feeWaiver: "₹1.5 Lakhs to ₹10 Lakhs annual spend milestones",
    },
    rewardsEcosystem: {
      programName: "YES Rewardz Accelerated Portal",
      rateSummary: "Earn up to 36 reward points per ₹200 on subscription and travel spends; 18 points on online retail",
      pointValuation: "₹0.25 per point for flights, hotels, and gift vouchers",
      acceleratedPartners: [
        "Online Subscriptions (Netflix, Amazon Prime, Spotify)",
        "Travel Portals & International Airlines",
        "E-Commerce & Fashion Platforms",
        "BookMyShow Cinema Tickets",
        "Taj Hotels & Luxury Dining",
      ],
      redemptionOptions: [
        "Flight and Hotel Bookings via YES Rewardz Portal with 100% point redemption option",
        "E-Gift Cards for top shopping brands (Amazon, Flipkart, Taj)",
        "Direct Statement Credit against outstanding balance",
        "Curated Luxury Merchandise and Gadgets",
      ],
    },
    loungeAndTravel: {
      domestic: "Unlimited complimentary domestic airport lounge access on YES Marquee; up to 12 complimentary visits/year on Reserv.",
      international: "Unlimited international airport lounge visits via complimentary Priority Pass for primary and add-on cardholders with guest access on Marquee.",
      railway: "Select entry variants offer domestic railway lounge access.",
      spendCondition: "Unconditional lounge access on Marquee and Reserv; spend threshold on entry tiers.",
      guestAccess: "Complimentary guest visits included on YES Marquee (up to 8 guest visits annually).",
    },
    diningEntertainment: {
      diningProgram: "YES Bank Dining Delights & EazyDiner Prime",
      diningDiscount: "Complimentary EazyDiner Prime membership offering up to 25% to 40% instant dining discounts",
      movieBenefits: "Buy 1 Get 1 Free movie tickets on BookMyShow (up to ₹250 to ₹800 off per ticket)",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["YES Prosperity Edge (Select Corporate Offers)", "YES Virtual RuPay"],
      waiverSpend: "₹1,50,000 (Ace/Select), ₹4,00,000 (Reserv), ₹10,00,000 (Marquee)",
      fuelSurchargeWaiver: "1% fuel surcharge waiver on transactions between ₹400 and ₹5,000 across all petrol pumps in India",
    },
    features: [
      {
        id: "yes-marquee-metal",
        title: "Solid Metal Craftsmanship & Ultra-Premium Status",
        category: "travel",
        categoryLabel: "Ultra-Premium Metal",
        tag: "Crafted in Solid Metal",
        summary:
          "The YES Marquee credit card is crafted in heavy precision metal, delivering an elite touch of luxury and status with every transaction.",
        benefits: [
          "Heavy metal form factor with personalized laser etching and RFID tap-and-pay",
          "Dedicated 24/7 lifestyle and travel concierge desk for flight re-routing and private dining bookings",
          "Welcome gift hamper of 60,000 YES Rewardz points worth ₹15,000 upon fee payment",
          "Annual bonus milestone points worth up to ₹10,000 on spending milestones",
        ],
        bestSuitedFor: "Affluent executives and luxury lifestyle enthusiasts wanting a prestigious metal card.",
      },
      {
        id: "yes-accelerated-multipliers",
        title: "Up to 36 Reward Points per ₹200 Spent",
        category: "rewards",
        categoryLabel: "Accelerated Rewards",
        tag: "Up to 36X Points",
        summary:
          "Rapidly accumulate points with accelerated multipliers on monthly subscriptions, travel tickets, and e-commerce shopping.",
        benefits: [
          "36 reward points per ₹200 spent on subscription services, streaming platforms, and international spending",
          "18 reward points per ₹200 spent on regular online e-commerce transactions",
          "No ceiling cap on base reward points accumulation across billing cycles",
          "Redeem points 100% against flight tickets and 5-star hotel bookings on the YES Rewardz portal",
        ],
        bestSuitedFor: "Online shoppers, digital subscription subscribers, and frequent travelers.",
      },
      {
        id: "yes-taj-eazydiner",
        title: "Complimentary Taj Epicure & EazyDiner Prime",
        category: "dining",
        categoryLabel: "Luxury Memberships",
        tag: "Taj Epicure Included",
        summary:
          "Enjoy complimentary luxury memberships that open doors to fine dining discounts, free hotel room upgrades, and dining vouchers.",
        benefits: [
          "Complimentary Taj Epicure membership providing 25% dining discount at Taj, Vivanta, and SeleQtions hotels",
          "Complimentary EazyDiner Prime annual membership offering up to 25% to 40% instant discounts at partner restaurants",
          "Buy 1 Get 1 Free movie tickets on BookMyShow (up to ₹800 off per ticket on Marquee; up to ₹250 off on Reserv)",
          "Complimentary rounds of golf per month across India's premier golf greens",
        ],
        bestSuitedFor: "Frequent diners, luxury hotel patrons, and movie buffs.",
      },
      {
        id: "yes-unlimited-lounges",
        title: "Unlimited Domestic & Global Lounges + Guest Access",
        category: "travel",
        categoryLabel: "Airport Lounges",
        tag: "Unlimited Global Lounges",
        summary:
          "Travel in total comfort with unrestricted access to international and domestic airport lounges with complimentary guest visits.",
        benefits: [
          "Unlimited domestic airport lounge access for primary cardholders across India",
          "Unlimited international airport lounge access via complimentary Priority Pass membership",
          "Up to 8 complimentary international lounge guest visits per calendar year on YES Marquee",
          "Dedicated airport meet-and-greet services available on select premium variants",
        ],
        bestSuitedFor: "Frequent flyers who travel with family members or business associates.",
      },
      {
        id: "yes-low-forex",
        title: "Low 1.00% to 1.75% Foreign Exchange Markup",
        category: "travel",
        categoryLabel: "Forex Savings",
        tag: "1.00% Low Forex",
        summary:
          "Minimize currency conversion penalties on foreign hotel bills, international shopping, and overseas business expenses.",
        benefits: [
          "Low 1.00% foreign exchange markup on the YES Marquee credit card",
          "Subsidized 1.75% forex markup on the YES Reserv credit card (vs 3.50% industry standard)",
          "Substantial savings of ₹2,500+ per ₹1 Lakh spent internationally",
          "Emergency card replacement anywhere in the world within 48 hours",
        ],
        bestSuitedFor: "International holidaymakers and frequent overseas business travellers.",
      },
      {
        id: "yes-iris-security",
        title: "Iris by YES BANK Digital Security & RuPay UPI",
        category: "upi",
        categoryLabel: "Digital Banking",
        tag: "Iris Digital Suite",
        summary:
          "Experience full control over your card via the next-generation Iris mobile app, plus seamless RuPay UPI QR payments.",
        benefits: [
          "Link virtual RuPay credit cards to PhonePe, Paytm, and Google Pay for instant QR code payments",
          "Toggle contactless payments, e-commerce transactions, and international limits in real time",
          "Instant temporary card freeze in case of misplacement with one-tap reactivation",
          "Zero lost card liability protection against unauthorized transactions upon reporting",
        ],
        bestSuitedFor: "Tech-focused users who manage finances primarily through their smartphone.",
      },
    ],
    flagshipCards: [
      { name: "YES Marquee Metal Credit Card", category: "Ultra Luxury Metal", highlight: "1.00% forex markup, unlimited global lounges + guests, Taj Epicure, 36X points", annualFee: "₹9,999 + GST" },
      { name: "YES Reserv Credit Card", category: "Premium Travel & Lifestyle", highlight: "1.75% low forex markup, 12 domestic lounges, EazyDiner Prime, 24X points", annualFee: "₹1,999 + GST" },
      { name: "YES Ace Credit Card", category: "All-Rounder Rewards", highlight: "Accelerated online rewards, 4 domestic lounges/year, achievable fee waivers", annualFee: "₹499 + GST" },
      { name: "YES Prosperity Edge Credit Card", category: "Corporate & Lifestyle", highlight: "Complimentary airport lounges, movie ticket discounts, 1% fuel surcharge waiver", annualFee: "₹999 + GST" },
      { name: "YES Bank Virtual RuPay Card", category: "UPI & Everyday", highlight: "Instant digital issuance, scan & pay on UPI, zero annual fee offers", annualFee: "Lifetime Free (₹0)" },
    ],
  },

  "federal-bank": {
    slug: "federal-bank",
    bankName: "FEDERAL Bank",
    shortName: "Federal",
    logo: "/partners-logos/federal-logo.webp",
    tagline: "Zero Forex Scapia Travel Innovation, Celesta Luxury & Co-Branded Perks",
    overview:
      "Federal Bank is an agile private sector banking powerhouse celebrated for its ground-breaking co-branded partnerships. Most notable is the Scapia Federal Credit Card—which brought true 0% forex markup and travel coins with zero annual fee to Indian travelers—alongside flagship credit cards like Celesta, Imperio, and Signet offering domestic airport lounges, BookMyShow BOGO cinema offers, and golf privileges.",
    keyMetrics: {
      maxRewardRate: "Up to 4% - 10% Return on Travel & Dining",
      rewardCurrency: "Federal Rewards / Scapia Coins",
      domesticLounge: "Complimentary access (Scapia, Celesta, Imperio, Signet)",
      internationalLounge: "Complimentary visits via LoungeKey on Celesta",
      upiRuPay: "Federal RuPay Wave, Federal Signet RuPay",
      forexMarkup: "0.00% (Scapia) to 3.50%",
      feeWaiver: "Lifetime Free on Scapia; ₹50,000-₹3L spend waivers on core cards",
    },
    rewardsEcosystem: {
      programName: "Federal Rewards & Scapia Travel Hub",
      rateSummary: "Earn up to 10% Scapia Coins on travel; up to 3X Federal Rewards on domestic retail",
      pointValuation: "1 Scapia Coin = ₹0.20 (1:1 instant flight/hotel redemption); ₹0.25 on Federal Rewards",
      acceleratedPartners: [
        "International & Overseas Spends (0% Forex)",
        "Scapia App Flight & Hotel Bookings (10% Coins)",
        "Dining & Restaurant Bills",
        "BookMyShow & INOX Cinemas",
        "Departmental Stores & Supermarkets",
      ],
      redemptionOptions: [
        "100% Instant Flight & Hotel Redemptions on the Scapia app with zero convenience fee",
        "Federal Rewards Portal for Gift Vouchers, Electronics, and Home Products",
        "Direct Statement Credit on eligible variants",
        "Transfer to Partner Reward Currencies",
      ],
    },
    loungeAndTravel: {
      domestic: "Complimentary domestic airport lounge visits across India upon meeting simple monthly spend milestones on Scapia; quarterly visits on Celesta and Imperio.",
      international: "Complimentary international airport lounge access via LoungeKey on the flagship Celesta credit card.",
      railway: "Select railway lounge privileges across partner terminals.",
      spendCondition: "Spend ₹5,000 to ₹10,000 in preceding billing cycle for unlocked unlimited lounge access on Scapia.",
      guestAccess: "Chargeable under standard partner lounge guest rates.",
    },
    diningEntertainment: {
      diningProgram: "Federal Feast Dining Offers",
      diningDiscount: "Up to 15% to 20% discount across 1,000+ partner restaurants in tier-1 and tier-2 cities",
      movieBenefits: "Buy 1 Get 1 Free movie tickets on BookMyShow (up to ₹125 to ₹250 off per ticket twice a month on Celesta and Imperio)",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["Scapia Federal Credit Card", "Federal RuPay Signet (Promotional LTF)"],
      waiverSpend: "₹50,000 (Signet), ₹1,00,000 (Imperio), ₹3,00,000 (Celesta)",
      fuelSurchargeWaiver: "1% fuel surcharge waiver on transactions between ₹400 and ₹4,000 across all petrol pumps in India",
    },
    features: [
      {
        id: "federal-scapia-zero-forex",
        title: "0.00% Forex Markup with Scapia Federal Card",
        category: "travel",
        categoryLabel: "Zero Forex Travel",
        tag: "Zero Forex + LTF",
        summary:
          "The ultimate travel companion: absolute zero (0.00%) foreign exchange markup on all international transactions, paired with lifetime free status.",
        benefits: [
          "Zero (0.00%) forex markup on all overseas transactions, international websites, and foreign POS terminals",
          "Lifetime Free card: ₹0 joining fee and ₹0 annual maintenance fee unconditionally",
          "Earn 10% Scapia Coins on all flight and hotel bookings made via the Scapia travel app",
          "Redeem Scapia Coins instantly against future flights and hotels with 100% point redemption and zero convenience fees",
        ],
        bestSuitedFor: "International holidaymakers, digital nomads, and overseas online shoppers.",
      },
      {
        id: "federal-spend-linked-lounges",
        title: "Spend-Linked Unlimited Domestic Airport Lounges",
        category: "travel",
        categoryLabel: "Airport Lounges",
        tag: "Spend-Linked Lounges",
        summary:
          "Unlock complimentary domestic airport lounge visits by meeting simple, achievable monthly card spending targets.",
        benefits: [
          "Complimentary domestic airport lounge visits unlocked upon spending just ₹5,000 to ₹10,000 in the billing cycle on Scapia",
          "Complimentary quarterly lounge visits on Celesta and Imperio cards across major Indian hubs",
          "Simplified digital QR entry pass generated right inside the mobile app",
          "Includes free buffet meals, Wi-Fi, air-conditioned seating, and refreshments",
        ],
        bestSuitedFor: "Budget-conscious frequent domestic travelers.",
      },
      {
        id: "federal-bogo-bookmyshow",
        title: "BookMyShow Buy 1 Get 1 Free Cinema Tickets",
        category: "dining",
        categoryLabel: "Movies & Entertainment",
        tag: "BOGO Movie Passes",
        summary:
          "Enjoy weekend cinema outings with Buy 1 Get 1 Free movie tickets on BookMyShow across INOX, PVR, and Cinepolis theaters.",
        benefits: [
          "Buy 1 Get 1 Free movie tickets on BookMyShow (up to ₹250 off per ticket twice a month on Celesta)",
          "Buy 1 Get 1 Free tickets (up to ₹125 off twice a month on Imperio)",
          "Valid on all movie showtimes including blockbuster weekend screenings",
          "Instant discount applied directly on BookMyShow checkout page",
        ],
        bestSuitedFor: "Movie fans and weekend family cinema-goers.",
      },
      {
        id: "federal-golf-privileges",
        title: "Complimentary Golf Rounds & Professional Lessons",
        category: "travel",
        categoryLabel: "Luxury Sports",
        tag: "Complimentary Golf",
        summary:
          "Enjoy complimentary green access and professional golf coaching sessions at premier golf clubs across India.",
        benefits: [
          "Complimentary golf games and golf lessons per quarter on the flagship Celesta card",
          "Access to championship golf courses in Delhi NCR, Mumbai, Bengaluru, Hyderabad, and Pune",
          "Hassle-free booking through the Federal Bank golf concierge desk",
          "Coaching sessions available for beginners and experienced players alike",
        ],
        bestSuitedFor: "Golf lovers and corporate executives.",
      },
      {
        id: "federal-rupay-upi",
        title: "Federal RuPay Wave Scan-and-Pay on UPI",
        category: "upi",
        categoryLabel: "Digital & UPI",
        tag: "RuPay UPI Float",
        summary:
          "Link your Federal RuPay credit card to PhonePe, Google Pay, and Paytm to make instant QR code payments backed by credit float.",
        benefits: [
          "Earn reward points on UPI transactions at local grocery stores, fuel bunks, and medical shops",
          "Enjoy up to 50 days of interest-free credit period on daily scan-and-pay transactions",
          "Instant virtual RuPay card issuance for existing Federal Bank account holders",
          "Set independent daily UPI spending caps for added security",
        ],
        bestSuitedFor: "Everyday spenders who want UPI payment speed backed by interest-free credit.",
      },
      {
        id: "federal-fedmobile-security",
        title: "FedMobile Centralized Card Controls & Safety",
        category: "protection",
        categoryLabel: "Mobile Banking & Security",
        tag: "Complete App Control",
        summary:
          "Control your card effortlessly with the feature-rich FedMobile app: toggle international limits, lock card, and convert spends into EMIs.",
        benefits: [
          "One-tap card lock/unlock feature prevents unauthorized usage instantly",
          "Set independent limits for ATM, online e-commerce, and contactless tap-and-pay",
          "Convert transactions above ₹2,500 into convenient monthly EMIs with low processing fees",
          "Zero lost card liability upon reporting unauthorized transactions immediately",
        ],
        bestSuitedFor: "Cardholders wanting hassle-free mobile servicing and robust fraud security.",
      },
    ],
    flagshipCards: [
      { name: "Scapia Federal Credit Card", category: "Zero Forex Travel", highlight: "0% forex markup, lifetime free, 10% Scapia Coins on travel, spend-linked lounges", annualFee: "Lifetime Free (₹0)" },
      { name: "Federal Celesta Credit Card", category: "Luxury Lifestyle", highlight: "International LoungeKey, BookMyShow BOGO up to ₹250, complimentary golf", annualFee: "₹3,000 + GST" },
      { name: "Federal Imperio Credit Card", category: "Premium Family", highlight: "Domestic airport lounges, BOGO movie tickets, accelerated grocery points", annualFee: "₹1,500 + GST" },
      { name: "Federal Signet RuPay Card", category: "Everyday UPI", highlight: "RuPay UPI payments, 3X dining & entertainment points, 1% fuel waiver", annualFee: "₹750 + GST" },
    ],
  },

  "bob-bank": {
    slug: "bob-bank",
    bankName: "BOB Bank",
    shortName: "Bank of Baroda",
    logo: "/partners-logos/bob-logo.webp",
    tagline: "India's RuPay UPI Pioneer, High-Yield Rewards & Achievable Fee Waivers",
    overview:
      "Bank of Baroda (BOB Financial) is a leader in accessible, high-utility credit cards engineered for everyday Indians. As one of the earliest adopters of RuPay credit cards on UPI, BOB offers seamless scan-and-pay functionality across cards like BOB Premier, Select, and Easy. Combined with generous 5X reward points on dining and departmental shopping, achievable spend waiver milestones, and railway executive lounge access, BOB cards deliver immense value.",
    keyMetrics: {
      maxRewardRate: "Up to 5X Reward Points (Direct Statement Credit)",
      rewardCurrency: "BOB Reward Points",
      domesticLounge: "Complimentary access (BOB Eterna, Premier, Select)",
      internationalLounge: "Complimentary Priority Pass visits on BOB Eterna",
      upiRuPay: "BOB Premier RuPay, BOB Easy RuPay, BOB Select RuPay",
      forexMarkup: "2.00% (BOB Eterna) to 3.50%",
      feeWaiver: "Spend ₹35,000 to ₹1.5 Lakhs annually for 100% fee waiver",
    },
    rewardsEcosystem: {
      programName: "BOB Financial Rewardz & Cashback Hub",
      rateSummary: "Up to 5X reward points on dining, groceries, and travel; points convert to cashback",
      pointValuation: "1 Reward Point = ₹0.25 (directly redeemable as cash statement credit)",
      acceleratedPartners: [
        "Dining & Restaurant Outlets",
        "Departmental Stores & Supermarkets",
        "Movies & Cinema Bookings",
        "Fuel Outlets Nationwide",
        "Travel & Flight Portals",
      ],
      redemptionOptions: [
        "Direct Cash Credit: Points offset against your credit card statement balance",
        "E-Gift Vouchers for Amazon, Flipkart, Myntra, and retail chains",
        "Flight and Hotel Bookings via the BOB Rewardz portal",
        "Merchandise and electronics catalog",
      ],
    },
    loungeAndTravel: {
      domestic: "Up to 4 to 8 complimentary domestic airport lounge visits per year on BOB Premier, Select, and Eterna cards.",
      international: "Complimentary Priority Pass membership with international visits included on the flagship BOB Eterna card.",
      railway: "Complimentary access to IRCTC Executive Lounges across major Indian railway junctions on select cards.",
      spendCondition: "Spend threshold of ₹40,000 in previous quarter on entry cards; spend-free on BOB Eterna.",
      guestAccess: "Chargeable under standard Priority Pass guest terms.",
    },
    diningEntertainment: {
      diningProgram: "BOB Dining Privileges",
      diningDiscount: "Up to 15% to 20% discount across 1,500+ partner restaurants in India",
      movieBenefits: "Buy 1 Get 1 Free movie tickets on BookMyShow (up to ₹250 off on BOB Eterna)",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["BOB ConQR (Select Variants)", "BOB Shaurya (Armed Forces)", "Pre-approved Salary Upgrades"],
      waiverSpend: "₹35,000 (BOB Easy), ₹70,000 (BOB Select), ₹1,00,000 (BOB Premier)",
      fuelSurchargeWaiver: "1% fuel surcharge waiver on transactions between ₹400 and ₹5,000 across all petrol pumps in India",
    },
    features: [
      {
        id: "bob-rupay-upi-champion",
        title: "RuPay UPI Pioneer: Scan & Pay at Any QR Code",
        category: "upi",
        categoryLabel: "RuPay UPI Pioneer",
        tag: "Scan & Pay Anywhere",
        summary:
          "Link your BOB RuPay credit card to Google Pay, PhonePe, Paytm, or BHIM and pay at millions of street vendors and retail stores with credit float.",
        benefits: [
          "Link BOB Premier RuPay or Easy RuPay cards seamlessly to any UPI app",
          "Earn reward points on UPI transactions at local merchants, grocery shops, and pharmacies",
          "Enjoy up to 50 days of interest-free credit on everyday UPI transactions",
          "Zero transaction surcharges on QR payments up to ₹2,000",
        ],
        bestSuitedFor: "Everyday shoppers who want to earn credit card rewards on all their daily UPI payments.",
      },
      {
        id: "bob-5x-rewards",
        title: "Smart 5X Reward Points on Dining & Groceries",
        category: "rewards",
        categoryLabel: "Daily Spends Multiplier",
        tag: "5X Reward Points",
        summary:
          "Accelerate point accumulation with 5X reward points on grocery shopping, departmental stores, movies, and dining out.",
        benefits: [
          "5X reward points (5 points per ₹100 spend) on dining, groceries, and departmental store purchases",
          "Points redeemable directly as cash statement credit (1 Point = ₹0.25)",
          "No complicated point transfer ratios; simple, transparent cash balance offsets",
          "Additional bonus reward points on crossing annual spending milestones",
        ],
        bestSuitedFor: "Households with regular grocery, supermarket, and family dining expenditures.",
      },
      {
        id: "bob-achievable-waivers",
        title: "India's Most Achievable Fee Waiver Thresholds",
        category: "waiver",
        categoryLabel: "Customer-Friendly Waivers",
        tag: "Waiver from ₹35,000",
        summary:
          "Enjoy virtually lifetime-free economics with the lowest spend waiver milestones in the Indian credit card industry.",
        benefits: [
          "Annual renewal fee 100% reversed upon spending just ₹35,000 annually on BOB Easy",
          "Spend ₹70,000 annually for fee reversal on BOB Select, and ₹1,00,000 on BOB Premier",
          "No penal fees or hidden clauses; automatic fee reversal on your anniversary statement",
          "Free lifetime add-on cards for your spouse, parents, and children above 18 years",
        ],
        bestSuitedFor: "Value-seeking cardholders who want premium features without recurring fee burdens.",
      },
      {
        id: "bob-airport-railway-lounges",
        title: "Complimentary Airport & Railway Executive Lounges",
        category: "travel",
        categoryLabel: "Transit Comfort",
        tag: "Air & Rail Lounges",
        summary:
          "Unwind in comfort whether traveling by flight or train with complimentary lounge access across major Indian transit hubs.",
        benefits: [
          "Up to 4 to 8 complimentary domestic airport lounge visits annually on Premier and Eterna",
          "Access to Indian Railway executive lounges at New Delhi, Agra, Jaipur, and other major junctions",
          "Complimentary Priority Pass membership for international airport lounge entry on Eterna",
          "Includes free buffet meals, Wi-Fi, air-conditioned seating, and refreshments",
        ],
        bestSuitedFor: "Frequent domestic travelers who use both flights and trains.",
      },
      {
        id: "bob-fuel-waiver",
        title: "1% Fuel Surcharge Waiver Across All Fuel Stations",
        category: "waiver",
        categoryLabel: "Fuel Surcharge Relief",
        tag: "All Petrol Pumps",
        summary:
          "Save on every tank refill with a 1% fuel surcharge waiver valid across every oil marketing company in India.",
        benefits: [
          "1% fuel surcharge waiver on transactions between ₹400 and ₹5,000 at all petrol pumps nationwide",
          "Valid across Indian Oil, Bharat Petroleum, HPCL, and private fuel stations",
          "Maximum surcharge waiver of up to ₹250 per billing cycle",
          "Save hundreds of rupees annually on personal vehicular fuel expenses",
        ],
        bestSuitedFor: "Vehicle owners and frequent commuters.",
      },
      {
        id: "bob-smart-emi",
        title: "Instant SmartEMI & ConQR Mobile Card Controls",
        category: "protection",
        categoryLabel: "Security & EMI",
        tag: "Easy EMI Conversion",
        summary:
          "Convert large purchases into affordable monthly installments and manage your card security seamlessly via mobile app.",
        benefits: [
          "Convert any transaction above ₹2,500 into 6 to 36 month EMIs directly via SMS or the BOB Card portal",
          "Manage card limits, toggle contactless tap-and-pay, and reset PIN in real time",
          "Zero lost card liability protection upon reporting unauthorized usage",
          "Complimentary personal accident insurance cover up to ₹50 Lakhs on premium variants",
        ],
        bestSuitedFor: "Cardholders planning electronics or home renovation purchases needing flexible EMIs.",
      },
    ],
    flagshipCards: [
      { name: "BOB Eterna Credit Card", category: "Luxury Lifestyle", highlight: "Unlimited domestic lounges, 2.0% forex markup, BookMyShow BOGO, 7X points", annualFee: "₹2,499 + GST" },
      { name: "BOB Premier RuPay Credit Card", category: "RuPay UPI & Travel", highlight: "5X rewards on travel & dining, domestic airport lounges, RuPay UPI payments", annualFee: "₹1,000 + GST" },
      { name: "BOB Select Credit Card", category: "Shopping & Dining", highlight: "5X rewards on shopping & dining, achievable ₹70k annual fee waiver", annualFee: "₹750 + GST" },
      { name: "BOB Easy RuPay Credit Card", category: "Entry-Level Everyday", highlight: "5X rewards on grocery & departmental, ₹35,000 spend waiver, RuPay UPI", annualFee: "₹500 + GST" },
    ],
  },
};

export function getBankFeatures(bankSlugOrName: string): BankFeaturesAndBenefits {
  if (!bankSlugOrName) return BANK_FEATURES_DATA["hdfc-bank"];

  const normalized = bankSlugOrName
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

  // Direct match on slug
  if (BANK_FEATURES_DATA[normalized]) {
    return BANK_FEATURES_DATA[normalized];
  }

  // Check if slug contains key bank keywords
  if (normalized.includes("hdfc")) return BANK_FEATURES_DATA["hdfc-bank"];
  if (normalized.includes("sbi")) return BANK_FEATURES_DATA["sbi-bank"];
  if (normalized.includes("icici")) return BANK_FEATURES_DATA["icici-bank"];
  if (normalized.includes("axis")) return BANK_FEATURES_DATA["axis-bank"];
  if (normalized.includes("au-") || normalized === "au" || normalized.includes("aubank")) return BANK_FEATURES_DATA["au-bank"];
  if (normalized.includes("idfc")) return BANK_FEATURES_DATA["idfc-bank"];
  if (normalized.includes("indusind")) return BANK_FEATURES_DATA["indusind-bank"];
  if (normalized.includes("yes")) return BANK_FEATURES_DATA["yes-bank"];
  if (normalized.includes("federal")) return BANK_FEATURES_DATA["federal-bank"];
  if (normalized.includes("bob") || normalized.includes("baroda")) return BANK_FEATURES_DATA["bob-bank"];

  // Search by bankName match
  const found = Object.values(BANK_FEATURES_DATA).find(
    (b) =>
      b.bankName.toLowerCase().includes(bankSlugOrName.toLowerCase()) ||
      bankSlugOrName.toLowerCase().includes(b.shortName.toLowerCase())
  );
  if (found) return found;

  // Rich fallback dynamic object
  return {
    slug: normalized,
    bankName: bankSlugOrName,
    shortName: bankSlugOrName,
    logo: "/partners-logos/hdfc-logo.webp",
    tagline: `Official ${bankSlugOrName} Credit Card Features & Benefits`,
    overview: `Explore verified credit card features, reward acceleration portals, domestic & international airport lounge privileges, and RuPay UPI scan-and-pay perks engineered across ${bankSlugOrName} cards.`,
    keyMetrics: {
      maxRewardRate: "Up to 5X - 10X Points",
      rewardCurrency: `${bankSlugOrName} Rewards`,
      domesticLounge: "Complimentary access on premium tiers",
      internationalLounge: "Complimentary Priority Pass on select cards",
      upiRuPay: "Supported via RuPay credit cards",
      forexMarkup: "2.00% to 3.50%",
      feeWaiver: "Spend-based milestone waivers",
    },
    rewardsEcosystem: {
      programName: `${bankSlugOrName} Rewards Hub`,
      rateSummary: "Earn reward points or cashbacks on retail, dining, and online spends",
      pointValuation: "₹0.20 to ₹0.25 per point",
      acceleratedPartners: ["Online Shopping", "Dining Outlets", "Travel Bookings", "Departmental Stores"],
      redemptionOptions: ["Statement Credit", "E-Gift Vouchers", "Travel Bookings", "Merchandise"],
    },
    loungeAndTravel: {
      domestic: "Complimentary domestic airport lounge visits across India on select cards.",
      international: "Complimentary Priority Pass membership on super-premium tiers.",
      railway: "Complimentary railway executive lounges on select co-branded cards.",
      spendCondition: "Spend-based quarterly criteria or unconditional on high-tier cards.",
      guestAccess: "Chargeable at partner rates.",
    },
    diningEntertainment: {
      diningProgram: `${bankSlugOrName} Dining Privileges`,
      diningDiscount: "Up to 15% to 20% discount at partner restaurants",
      movieBenefits: "Buy 1 Get 1 Free movie tickets on BookMyShow or cinema portals",
    },
    waiversAndMilestones: {
      lifetimeFreeCards: ["Select corporate cards and promotional upgrade offers"],
      waiverSpend: "Milestone-based annual spend waiver options",
      fuelSurchargeWaiver: "1% fuel surcharge waiver across petrol stations in India",
    },
    features: [
      {
        id: "gen-rewards",
        title: "Reward Multipliers & Accelerated Points",
        category: "rewards",
        categoryLabel: "Rewards",
        tag: "Accelerated Spends",
        summary: `Earn accelerated reward points on online shopping, grocery essentials, and dining with ${bankSlugOrName}.`,
        benefits: [
          "Accelerated reward points on merchant partner transactions",
          "Points redeemable against flights, hotels, vouchers, and statement credits",
          "Milestone bonus rewards upon achieving spend thresholds",
          "Zero liability on unredeemed points within the validity period",
        ],
        bestSuitedFor: "Everyday retail shoppers and household spenders.",
      },
      {
        id: "gen-lounges",
        title: "Airport Lounge & Travel Perks",
        category: "travel",
        categoryLabel: "Travel",
        tag: "Airport Lounges",
        summary: "Enjoy complimentary domestic and international airport lounge access across premier terminals in India.",
        benefits: [
          "Complimentary access to domestic airport lounges",
          "Complimentary refreshments, Wi-Fi, and plush seating",
          "International lounge visits via Priority Pass / LoungeKey on premium variants",
          "Comprehensive travel and flight delay protection",
        ],
        bestSuitedFor: "Business travellers and frequent vacationers.",
      },
      {
        id: "gen-rupay",
        title: "RuPay UPI Scan-and-Pay Float",
        category: "upi",
        categoryLabel: "Digital & UPI",
        tag: "UPI Scan & Pay",
        summary: "Link your RuPay card to UPI apps and pay seamlessly at merchant QR codes with credit float.",
        benefits: [
          "Link card to Google Pay, PhonePe, and Paytm",
          "Earn reward points on everyday merchant QR transactions",
          "Enjoy up to 50 days interest-free credit period",
          "Zero surcharge on transactions up to ₹2,000",
        ],
        bestSuitedFor: "Daily UPI shoppers and QR code users.",
      },
      {
        id: "gen-waiver",
        title: "Milestone Fee Waivers & Zero Liability",
        category: "waiver",
        categoryLabel: "Waivers & Security",
        tag: "Fee Waiver Milestone",
        summary: "Annual fee waivers upon achieving modest spend milestones, plus 24/7 fraud protection.",
        benefits: [
          "100% annual renewal fee reversed upon crossing spend targets",
          "1% fuel surcharge waiver at fuel stations across India",
          "Zero lost card liability upon timely reporting of unauthorized transactions",
          "Mobile banking controls to freeze card and set custom limits",
        ],
        bestSuitedFor: "Disciplined cardholders seeking maximum savings.",
      },
    ],
    flagshipCards: [],
  };
}

export function getAllBankFeatures(): BankFeaturesAndBenefits[] {
  return Object.values(BANK_FEATURES_DATA);
}
