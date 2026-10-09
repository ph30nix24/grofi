export interface BalanceTransferFaq {
  question: string;
  answer: string;
  category: string;
}

export interface BalanceTransferLender {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  bankType: 'psu' | 'private' | 'hfc' | string;
  interestRate: {
    min: number;
    max: number;
    text: string;
  };
  startingEmiPerLakh20Yr: number;
  startingEmiPerLakh30Yr: number;
  maxAmount: string;
  maxAmountNum: number;
  maxTenure: string;
  tenureYears: number;
  processingFee: string;
  processingFeePercent: number;
  processingFeeCap: string;
  maxLtv: string;
  womenConcession: string;
  overdraftScheme?: string | null;
  foreclosureCharges: string;
  topUpAvailable: boolean;
  maxTopUpAmount: string;
  turnaroundTime: string;
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
  title?: string;
  description?: string;
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDesc?: string;
  twitterTitle?: string;
  twitterDesc?: string;
  faqs?: BalanceTransferFaq[];
}
