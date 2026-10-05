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
  "/partners-logos/hdfc-logo.webp",
  "/partners-logos/axis-logo.webp",
  "/partners-logos/bob-logo.webp",
  "/partners-logos/yes-bank-logo.webp",
  "/partners-logos/idfc-logo.webp",
  "/partners-logos/lic-logo.webp",
]




export interface CardStructure {
  id: string;
  name: string;
  issuer: string;
  logo: string;
  cardImage?: string | null;
  network: string;
  category: string[];
  categoryLabel?: string;
  badge?: string;
  description?: string;
  joiningFee: string;
  annualFee: string;
  feeWaiver?: string;
  forexMarkup?: string;
  popularRank?: number | null;
  rewardRate?: {
    headline?: string;
    base?: string;
    accelerated?: string;
    rewardCurrency?: string;
    pointValue?: string;
  } | null;
  loungeAccess?: {
    domestic?: string;
    international?: string;
    spendCondition?: string;
  } | null;
  welcomeBenefits?: string[];
  keyHighlights?: string[];
  pros?: string[];
  cons?: string[];
  eligibility?: {
    minIncome?: string;
    minCreditScore?: number | string;
    employmentType?: string;
  } | null;
  bestFor?: string;
  editorialVerdict?: string;
}


export const navLinks = [
  {
    label: 'Credit Cards',
    href: '/credit-cards',
    dropdown: [
      {
        label: 'HDFC Credit Card', href: '/credit-cards/hdfc-bank',
        subItems: [
          { label: 'HDFC Millennia', href: '/credit-cards/hdfc-bank/hdfc-millennia' },
          { label: 'HDFC Regalia Gold', href: '/credit-cards/hdfc-bank/hdfc-regalia-gold' },
          { label: 'HDFC Diners Club Black', href: '/credit-cards/hdfc-bank/hdfc-diners-club-black-metal' },
          { label: 'HDFC Infinia Metal', href: '/credit-cards/hdfc-bank/hdfc-infinia-metal' },
          { label: 'Swiggy HDFC Card', href: '/credit-cards/hdfc-bank/swiggy-hdfc' },
          { label: 'Tata Neu Infinity HDFC', href: '/credit-cards/hdfc-bank/tata-neu-infinity-hdfc' },
          { label: 'HDFC MoneyBack+', href: '/credit-cards/hdfc-bank/hdfc-moneyback-plus' },
          { label: 'Marriott Bonvoy HDFC', href: '/credit-cards/hdfc-bank/marriott-bonvoy-hdfc' },
        ],
      },
      {
        label: 'ICICI Credit Card',
        href: '/credit-cards/icici-bank',
        subItems: [
          { label: 'Amazon Pay ICICI', href: '/credit-cards/icici-bank/icici-amazon-pay' },
          { label: 'ICICI Coral RuPay', href: '/credit-cards/icici-bank/icici-coral-rupay' },
          { label: 'ICICI Sapphiro', href: '/credit-cards/icici-bank/icici-sapphiro' },
          { label: 'ICICI Emeralde Private Metal', href: '/credit-cards/icici-bank/icici-emeralde-private-metal' },
          { label: 'ICICI Rubyx', href: '/credit-cards/icici-bank/icici-rubyx' },
          { label: 'MakeMyTrip ICICI Signature', href: '/credit-cards/icici-bank/icici-makemytrip-signature' },
          { label: 'ICICI HPCL Super Saver', href: '/credit-cards/icici-bank/icici-hpcl-super-saver' },
          { label: 'ICICI Platinum Chip Card', href: '/credit-cards/icici-bank/icici-platinum-chip' },
        ],
      },
      {
        label: 'SBI Credit Card', href: '/credit-cards/sbi-bank',
        subItems: [
          { label: 'CASHBACK SBI Card', href: '/credit-cards/sbi-bank/sbi-cashback' },
          { label: 'SBI SimplyCLICK Card', href: '/credit-cards/sbi-bank/sbi-simplyclick' },
          { label: 'SimplySAVE SBI Card', href: '/credit-cards/sbi-bank/sbi-simplysave-rupay' },
          { label: 'BPCL SBI Card Octane', href: '/credit-cards/sbi-bank/sbi-bpcl-octane' },
          { label: 'SBI Prime Credit Card', href: '/credit-cards/sbi-bank/sbi-card-prime' },
          { label: 'SBI Credit Card ELITE', href: '/credit-cards/sbi-bank/sbi-card-elite' },
          { label: 'IRCTC SBI Credit Card', href: '/credit-cards/sbi-bank/sbi-irctc-rupay' },
          { label: 'BPCL SBI Card (Standard)', href: '/credit-cards/sbi-bank/bpcl-sbi-card-standard' },
        ],
      },
      {
        label: 'Axis Credit Card',
        href: '/credit-cards/axis-bank',
        subItems: [
          { label: 'Flipkart Axis Bank', href: '/credit-cards/axis-bank/axis-flipkart' },
          { label: 'Airtel Axis Bank', href: '/credit-cards/axis-bank/axis-airtel' },
          { label: 'Axis Bank ACE', href: '/credit-cards/axis-bank/axis-ace' },
          { label: 'Axis Bank ATLAS', href: '/credit-cards/axis-bank/axis-atlas' },
          { label: 'Axis Bank My Zone', href: '/credit-cards/axis-bank/axis-my-zone' },
          { label: 'Axis Bank Magnus', href: '/credit-cards/axis-bank/axis-magnus' },
          { label: 'Axis Bank Neo', href: '/credit-cards/axis-bank/axis-neo' },
          { label: 'IndianOil Axis Bank', href: '/credit-cards/axis-bank/axis-indianoil' },
        ],
      },
      {
        label: 'BOBCARD',
        href: '/credit-cards/bob-bank',
        subItems: [
          { label: 'BOBCARD Eterna', href: '/credit-cards/bob-bank/bob-eterna' },
          { label: 'BOBCARD Cashback', href: '/credit-cards/bob-bank/bob-cashback' },
          { label: 'BOBCARD Premier', href: '/credit-cards/bob-bank/bob-premier' },
          { label: 'BOBCARD Select', href: '/credit-cards/bob-bank/bob-select' },
          { label: 'BOBCARD Easy RuPay', href: '/credit-cards/bob-bank/bob-easy-rupay' },
          { label: 'HPCL BOBCARD Energie', href: '/credit-cards/bob-bank/hpcl-bob-energie' },
          { label: 'BOBCARD Etihad Guest Premium', href: '/credit-cards/bob-bank/bob-etihad-guest-premium' },
          { label: 'BOBCARD Prime Secured', href: '/credit-cards/bob-bank/bob-prime-secured' },
        ],
      },
      {
        label: 'AU Credit Card',
        href: '/credit-cards/au-bank',
        subItems: [
          { label: 'AU LIT Credit Card', href: '/credit-cards/au-bank/au-lit' },
          { label: 'ixigo AU Credit Card', href: '/credit-cards/au-bank/au-ixigo' },
          { label: 'AU Altura Plus', href: '/credit-cards/au-bank/au-altura-plus' },
          { label: 'AU Zenith+ Metal', href: '/credit-cards/au-bank/au-zenith-plus' },
          { label: 'AU Vetta Credit Card', href: '/credit-cards/au-bank/au-vetta' },
          { label: 'AU Spont Credit Card', href: '/credit-cards/au-bank/au-spont' },
          { label: 'AU Tejas Credit Card', href: '/credit-cards/au-bank/au-tejas' },
          { label: 'AU Altura Credit Card', href: '/credit-cards/au-bank/au-altura' },
        ],
      },
      {
        label: 'IndusInd Credit Card',
        href: '/credit-cards/indusind-bank',
        subItems: [
          { label: 'IndusInd Legend', href: '/credit-cards/indusind-bank/indusind-legend' },
          { label: 'IndusInd Platinum RuPay', href: '/credit-cards/indusind-bank#indusind-platinum-rupay' },
          { label: 'EazyDiner IndusInd', href: '/credit-cards/indusind-bank/indusind-eazydiner' },
          { label: 'IndusInd Avios Infinite', href: '/credit-cards/indusind-bank#indusind-avios-visa-infinite' },
          { label: 'IndusInd Pinnacle', href: '/credit-cards/indusind-bank/indusind-pinnacle' },
          { label: 'IndusInd Tiger Card', href: '/credit-cards/indusind-bank/indusind-tiger' },
          { label: 'IndusInd Nexxt Card', href: '/credit-cards/indusind-bank/indusind-nexxt' },
          { label: 'IndusInd Platinum Aura Edge', href: '/credit-cards/indusind-bank/indusind-platinum-aura-edge' },
        ],
      },
      {
        label: 'Federal Credit Card',
        href: '/credit-cards/federal-bank',
        subItems: [
          { label: 'Scapia Federal (0% Forex)', href: '/credit-cards/federal-bank/federal-scapia' },
          { label: 'Federal OneCard Metal', href: '/credit-cards/federal-bank/federal-onecard' },
          { label: 'Federal RuPay Wave (UPI)', href: '/credit-cards/federal-bank/federal-rupay-wave' },
          { label: 'Federal Celesta', href: '/credit-cards/federal-bank/federal-celesta' },
          { label: 'Fi-Federal AmpliFi', href: '/credit-cards/federal-bank/federal-fi-amplifi' },
          { label: 'Federal Signet', href: '/credit-cards/federal-bank/federal-signet' },
          { label: 'Federal Imperio', href: '/credit-cards/federal-bank/federal-imperio' },
        ],
      },
      {
        label: 'IDFC First Credit Card',
        href: '/credit-cards/idfc-bank',
        subItems: [
          { label: 'IDFC FIRST Millennia', href: '/credit-cards/idfc-bank/idfc-first-millennia' },
          { label: 'IDFC FIRST WOW! (FD-Backed)', href: '/credit-cards/idfc-bank/idfc-first-wow' },
          { label: 'IDFC FIRST Select', href: '/credit-cards/idfc-bank/idfc-first-select' },
          { label: 'FIRST SWYP Credit Card', href: '/credit-cards/idfc-bank/idfc-first-swyp' },
          { label: 'IDFC FIRST Classic', href: '/credit-cards/idfc-bank/idfc-first-classic' },
          { label: 'IDFC FIRST Ashva Metal', href: '/credit-cards/idfc-bank/idfc-first-ashva' },
          { label: 'IDFC FIRST Wealth', href: '/credit-cards/idfc-bank/idfc-first-wealth' },
          { label: 'IDFC FIRST Mayura Metal', href: '/credit-cards/idfc-bank/idfc-first-mayura' },
        ],
      },
      {
        label: 'YES Bank Credit Card',
        href: '/credit-cards/yes-bank',
        subItems: [
          { label: 'YES Bank Klick RuPay', href: '/credit-cards/yes-bank/yes-bank-klick-kiwi' },
          { label: 'YES SELECT Credit Card', href: '/credit-cards/yes-bank/yes-bank-select' },
          { label: 'YES BANK MARQUÉE', href: '/credit-cards/yes-bank/yes-bank-marquee' },
          { label: 'YES ELITE+ Credit Card', href: '/credit-cards/yes-bank/yes-bank-elite-plus' },
          { label: 'POP-CLUB YES Bank', href: '/credit-cards/yes-bank/yes-bank-pop-club' },
          { label: 'Paisabazaar PaisaSave', href: '/credit-cards/yes-bank/yes-bank-paisasave' },
          { label: 'Uni YES Bank RuPay', href: '/credit-cards/yes-bank/yes-bank-uni-rupay' },
          { label: 'YES Bank Virtual RuPay', href: '/credit-cards/yes-bank#yes-bank-virtual-rupay' },
        ],
      },
    ],
  },
  {
    label: 'Loans',
    href: '/personal-loans',
    dropdown: [
      {
        label: 'Personal Loan',
        href: '/personal-loans',
        subItems: [
          { label: 'Instant Personal Loan', href: '/personal-loans/instant-loans' },
          { label: 'Short Term Personal Loan', href: '/personal-loans/short-term-loans' },
          { label: 'HDFC Bank Personal Loan', href: '/personal-loans/hdfc-bank' },
          { label: 'SBI Personal Loan', href: '/personal-loans/sbi-xpress-credit' },
          { label: 'Axis Bank Personal Loan', href: '/personal-loans/axis-bank' },
          { label: 'ICICI Personal Loan', href: '/personal-loans/icici-bank' }
        ]
      },
      {
        label: 'Business Loan',
        href: '/business-loans',
        subItems: [
          { label: 'HDFC Business Loan', href: '/business-loans/hdfc-bank-business-growth' },
          { label: 'SBI Business Loan', href: '/business-loans/sbi-simplified-small-business' },
          { label: 'BOB Business Loan', href: '/business-loans/bank-of-baroda-sme' },
          { label: 'Govt Business Loan Schemes', href: '/business-loans#govt-schemes' },
          { label: 'Business Loan EMI Calculator', href: '/business-loans#calculator' }
        ]
      },
      {
        label: 'Home Loan',
        href: '/home-loans',
        subItems: [
          { label: 'Home Loan Balance Transfer', href: '/home-loans/balance-transfer', subItems: [] },
          { label: 'Loan Against Property', href: '/home-loans/loan-against-property', subItems: [] },
          { label: 'SBI Home Loan', href: '/home-loans/sbi-home-loan' },
          { label: 'HDFC Home Loan', href: '/home-loans/hdfc-bank-home-loan' },
          { label: 'LIC Housing Finance', href: '/home-loans/lic-housing-finance' },
          { label: 'Axis Bank Home Loan', href: '/home-loans/axis-bank-home-loan' },
        ]
      }
    ],
  },
  { label: 'Be Secure', href: '/secure-with-us'},
  { label: 'Blogs', href: '/blogs' },
  { label: "Careers", href: '/careers' }
];