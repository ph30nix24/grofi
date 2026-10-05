export interface JobOpening {
  id: string;
  title: string;
  department: "Engineering" | "Product & Design" | "Data & Risk" | "Growth & Marketing" | "Partnerships & Ops";
  location: string;
  locationType: "Remote" | "Hybrid" | "On-site";
  experience: string;
  type: "Full-Time" | "Contract";
  salaryRange: string;
  featured?: boolean;
  tags: string[];
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  first90Days: string[];
}

export interface Benefit {
  id: string;
  title: string;
  description: string;
  category: "Health & Wellness" | "Wealth & Growth" | "Work & Flexibility" | "Tools & Perks";
  iconName: string;
  badge?: string;
}

export interface ValueItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface HiringStep {
  step: number;
  title: string;
  duration: string;
  description: string;
  tips: string;
}

export interface CandidateFaq {
  question: string;
  answer: string;
  category: "Culture & Perks" | "Hiring Process" | "Equity & Compensation" | "Workplace";
}
