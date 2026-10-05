export interface HomeLoanInterestRate {
  min: number;
  max: number;
  text: string;
}

export interface HomeLoanFAQ {
  question: string;
  answer: string;
  category?: string;
}

export interface HomeLoanLender {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  bankType: 'psu' | 'private' | 'hfc' | string;
  interestRate: HomeLoanInterestRate;
  startingEmiPerLakh20Yr: number;
  startingEmiPerLakh30Yr: number;
  maxAmount: string;
  maxAmountNum: number;
  maxTenure: string;
  tenureYears: number;
  processingFee: string;
  processingFeePercent: number;
  maxLtv: string;
  womenConcession: string;
  overdraftScheme?: string | null;
  foreclosureCharges: string;
  category: string[];
  minCreditScore: number;
  minIncome: string;
  features: string[];
  pros: string[];
  recommendedFor: string;
  rating: number;
  reviewCount: string;
  badge?: string | null;
  badgeColor?: string | null;

  title?: string;
  description?: string;
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDesc?: string;
  twitterTitle?: string;
  twitterDesc?: string;
  faqs?: HomeLoanFAQ[];
}