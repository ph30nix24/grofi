export interface ShortTermLoanLender {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  lenderType: 'bank' | 'nbfc' | 'fintech' | string;
  rbiRegulatedEntity: string;
  interestRate: {
    min: number;
    max: number;
    text: string;
    monthlyRateText?: string;
  };
  startingEmiPerLakh: number; // for 12-month tenure
  minAmount: string;
  minAmountNum: number;
  maxAmount: string;
  maxAmountNum: number;
  tenure: string;
  tenureMonths: number;
  shortTenureOptions: string[];
  processingFee: string;
  processingFeePercent: number;
  disbursalTime: string;
  disbursalSpeedCategory: 'under-5-mins' | 'under-15-mins' | 'under-2-hours' | 'same-day' | string;
  badge?: string | null;
  badgeColor?: string | null;
  categories: string[];
  minCreditScore: number;
  minIncome: string;
  documentation: string;
  features: string[];
  pros: string[];
  cons: string[];
  recommendedFor: string;
  rating: number;
  reviewCount: string;
  rbiRegulated: boolean;
  appDownloads?: string | null;
  playStoreRating?: number | null;
  coolingOffPeriod: string;
  kfsProvided: boolean;
  faqs?: {
    question: string;
    answer: string;
    category?: string;
  }[];
  title?: string;
  description?: string;
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDesc?: string;
  twitterTitle?: string;
  twitterDesc?: string;
}

export interface ShortTermLoanFilterState {
  searchQuery: string;
  category: string;
  speedCategory: string;
  lenderType: string;
  shortTenure: string;
  minCibil: string;
  sortBy: 'emi-asc' | 'rate-asc' | 'speed-asc' | 'amount-desc' | 'rating-desc';
  viewMode: 'grid' | 'list';
}