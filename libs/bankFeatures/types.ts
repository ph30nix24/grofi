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
