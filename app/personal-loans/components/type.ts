export interface PersonalLoanInterestRate {
  min: number;
  max: number;
  text: string;
}

export interface PersonalLoanEligibilityDetails {
  age?: string;
  minIncome?: string;
  cibil?: string;
  employmentType?: string;
  workExperience?: string;
}

export interface PersonalLoanDocumentChecklist {
  identityProof?: string;
  incomeProof?: string;
  bankProof?: string;
  employmentProof?: string;
}

export interface PersonalLoanFAQ {
  question: string;
  answer: string;
}

export interface PersonalLoanLender {
  id: string;
  name: string;
  logo: string;
  tagline: string;
  bankType?: 'private' | 'psu' | 'nbfc' | string | null;
  interestRate?: PersonalLoanInterestRate | null;
  startingEmiPerLakh: number; // For 5 years (60 months)
  maxAmount: string;
  maxAmountNum: number;
  tenure: string;
  tenureMonths?: number | null;
  processingFee: string;
  processingFeePercent?: number | null;
  disbursalTime: string;
  foreclosureCharges?: string | null;
  lockInPeriod?: string | null;
  badge?: string | null;
  badgeColor?: string | null;
  category: string[];
  minCreditScore: number;
  minIncome: string;
  features: string[];
  recommendedFor: string;
  rating?: number | null;
  reviewCount?: string | null;
  overview?: string | null;
  pros?: string[];
  cons?: string[];
  aprRange?: string | null;
  partPrepayment?: string | null;
  bounceCharges?: string | null;
  stampDuty?: string | null;
  aliases?: string[];
  eligibilityDetails?: PersonalLoanEligibilityDetails | null;
  documentChecklist?: PersonalLoanDocumentChecklist | null;
  customFaqs?: PersonalLoanFAQ[] | null;

  title: string;
  description: string;
  keywords: string[];
  openGraphTitle: string;
  openGraphDesc: string;
  twitterTitle: string;
  twitterDesc: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
