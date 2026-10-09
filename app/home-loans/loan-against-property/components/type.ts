export interface LoanAgainstPropertyInterestRate {
  min: number;
  max: number;
  text: string;
}

export interface LoanAgainstPropertyFAQ {
  question: string;
  answer: string;
  category?: string;
}

export interface LoanAgainstPropertyLender {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  bankType: 'psu' | 'private' | 'nbfc' | 'hfc' | string;
  interestRate: LoanAgainstPropertyInterestRate;
  startingEmiPerLakh15Yr: number;
  startingEmiPerLakh20Yr: number;
  maxAmount: string;
  maxAmountNum: number;
  maxTenure: string;
  tenureYears: number;
  processingFee: string;
  processingFeePercent: number;
  processingFeeCap?: string | null;
  maxLtv: string;
  maxLtvPercent: number;
  propertyTypesAccepted: string[];
  overdraftAvailable: boolean;
  overdraftScheme?: string | null;
  foreclosureCharges: string;
  minCreditScore: number;
  minIncome: string;
  features: string[];
  pros: string[];
  recommendedFor: string;
  rating: number;
  reviewCount: string;
  badge?: string | null;
  badgeColor?: string | null;
  category: string[];

  // SEO & Knowledge fields (optional when omitted in queries)
  title?: string;
  description?: string;
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDesc?: string;
  twitterTitle?: string;
  twitterDesc?: string;
  faqs?: LoanAgainstPropertyFAQ[];
}