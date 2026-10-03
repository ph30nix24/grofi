export interface BusinessLoanLender {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  bankType: 'private' | 'psu' | 'nbfc' | string;
  interestRate: { min: number; max: number; text: string };
  startingEmiPerLakh: number;
  maxAmount: string;
  maxAmountNum: number;
  tenure: string;
  tenureMonths: number;
  processingFee: string;
  processingFeePercent: number;
  collateralType: string;
  disbursalTime: string;
  foreclosureCharges: string;
  minTurnover: string;
  minVintage: string;
  minCibilScore: number;
  badge: string;
  badgeColor?: string | null;
  category: string[];
  features: string[];
  recommendedFor: string;
  rating: number;
  reviewCount: string;
  faqs: {
    question: string;
    answer: string;
  }[];
  title: string;
  description: string;
  keywords: string[];
  openGraphTitle: string;
  openGraphDesc: string;
  twitterTitle: string;
  twitterDesc: string;
}

export interface BusinessLoanFAQItem {
  id: string;
  category: 'rates' | 'collateral' | 'eligibility' | 'disbursal';
  categoryLabel: string;
  question: string;
  quickTakeaway: string;
  answer: string[];
  proTip: string;
}