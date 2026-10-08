export interface InstantLoanLender {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  lenderType: 'bank' | 'nbfc' | 'fintech' | string;
  interestRate: {
    min: number;
    max: number;
    text: string;
  };
  startingEmiPerLakh: number;
  minAmount: string;
  minAmountNum: number;
  maxAmount: string;
  maxAmountNum: number;
  tenure: string;
  tenureMonths: number;
  processingFee: string;
  processingFeePercent: number;
  disbursalTime: string;
  disbursalSpeedCategory: 'under-10-seconds' | 'under-15-mins' | 'under-2-hours' | 'same-day' | string;
  badge?: string | null;
  badgeColor?: string | null;
  categories: string[];
  minCreditScore: number;
  minIncome: string;
  documentation: string;
  features: string[];
  recommendedFor: string;
  rating: number;
  reviewCount: string;
  rbiRegulated: boolean;
  appDownloads?: string | null;
  playStoreRating?: number | null;
}

export interface InstantLoanFilterState {
  searchQuery: string;
  category: string;
  speedCategory: string;
  lenderType: string;
  minCibil: string;
  sortBy: 'speed-asc' | 'rate-asc' | 'amount-desc' | 'emi-asc' | 'rating-desc';
  viewMode: 'grid' | 'list';
}