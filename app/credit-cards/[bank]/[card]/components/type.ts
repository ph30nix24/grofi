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

export interface CardMetaData {
  id?: string;
  creditCardId?: string;
  title?: string;
  description?: string;
  keywords?: string[];
  openGraphTitle?: string;
  openGraphDesc?: string;
  imageUrl?: string;
  imageAlt?: string;
  twitterTitle?: string;
  twitterDesc?: string;
}