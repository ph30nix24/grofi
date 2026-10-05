import { JobOpening, Benefit, ValueItem, HiringStep, CandidateFaq } from "../types";

export const careersHeroStats = [
  { value: "₹1,200 Cr+", label: "Facilitated Disbursals", subtext: "Across retail & MSME credit" },
  { value: "50+", label: "Lending & Banking Partners", subtext: "HDFC, SBI, ICICI, Axis & more" },
  { value: "4.9 / 5", label: "Team Satisfaction Score", subtext: "Glassdoor & internal surveys" },
  { value: "100%", label: "Covered Health & ESOPs", subtext: "For all full-time team members" },
];

export const coreValues: ValueItem[] = [
  {
    id: "transparency",
    title: "Radical Transparency",
    tagline: "No fine print for customers, zero politics internally.",
    description:
      "We believe financial products in India shouldn't be shrouded in confusing jargon and hidden fees. That same honesty guides our internal communication—open books, direct feedback, and shared context.",
    iconName: "ShieldCheck",
  },
  {
    id: "velocity",
    title: "Velocity with FinTech Precision",
    tagline: "Move fast, build relentlessly, never compromise security.",
    description:
      "We operate with the speed of an ambitious startup and the rigor of a bank. We deploy multiple times a day, test comprehensively, and hold ourselves to military-grade security benchmarks.",
    iconName: "Zap",
  },
  {
    id: "empathy",
    title: "Relentless Borrower Empathy",
    tagline: "We build for real people navigating big life decisions.",
    description:
      "Whether someone is funding their first home, expanding an SME, or consolidating medical debt, we design experiences that respect their time, protect their privacy, and offer genuine financial relief.",
    iconName: "HeartHandshake",
  },
  {
    id: "ownership",
    title: "Founder-Level Ownership",
    tagline: "High agency, substantial trust, and generous equity.",
    description:
      "We don't micro-manage. Every team member has autonomy over their domain, is trusted to make pivotal decisions, and shares directly in Grofi's upside through meaningful equity grants.",
    iconName: "Compass",
  },
  {
    id: "craft",
    title: "Obsession with Craft",
    tagline: "Great software is art in motion.",
    description:
      "From sub-millisecond query execution in our matching engine to buttery-smooth 60fps micro-animations on mobile, we take pride in building financial software that feels joyful to use.",
    iconName: "Sparkles",
  },
  {
    id: "wellbeing",
    title: "Sustainable Ambition",
    tagline: "Peak performance without personal burnout.",
    description:
      "Fintech is a marathon, not a sprint. We prioritize deep work blocks, respect personal evenings and weekends, and provide the mental and physical support our team needs to thrive long term.",
    iconName: "Flame",
  },
];

export const perksAndBenefits: Benefit[] = [
  {
    id: "equity",
    title: "Generous ESOPs & Wealth Creation",
    description:
      "Competitive base salaries benchmarked against top Indian unicorns, paired with meaningful equity grants so you build real long-term wealth as Grofi scales.",
    category: "Wealth & Growth",
    iconName: "TrendingUp",
    badge: "Wealth",
  },
  {
    id: "insurance",
    title: "₹10 Lakh Comprehensive Health Cover",
    description:
      "Complete medical, surgical, and OPD hospitalization coverage for you, your spouse, children, and parents with cashless settlement across 10,000+ hospitals.",
    category: "Health & Wellness",
    iconName: "ShieldCheck",
    badge: "100% Paid",
  },
  {
    id: "flexibility",
    title: "Hybrid Freedom & Co-Working Access",
    description:
      "Collaborative hubs in Bengaluru & Mumbai with flexible hybrid work schedules. Need remote focus? We support work-from-anywhere periods and co-working passes.",
    category: "Work & Flexibility",
    iconName: "Building2",
    badge: "Flexible",
  },
  {
    id: "learning",
    title: "₹50,000 Annual Learning Budget",
    description:
      "An unbureaucratic annual stipend for conferences, books, certifications, specialized cohorts, and tech subscriptions. Never stop leveling up.",
    category: "Wealth & Growth",
    iconName: "GraduationCap",
    badge: "Stipend",
  },
  {
    id: "hardware",
    title: "Apple M-Series Gear & Tech Setup",
    description:
      "Your choice of latest Apple MacBook Pro (M3/M4 Pro), 4K secondary monitors, ergonomic chair stipend, and subscriptions to modern AI tools (GitHub Copilot, Cursor, ChatGPT).",
    category: "Tools & Perks",
    iconName: "Laptop",
    badge: "Top Tier",
  },
  {
    id: "timeoff",
    title: "25+ Paid Leaves & Wellness Breaks",
    description:
      "Generous earned leaves, optional festival holidays, recharge mental-health days, and paid parental leave (26 weeks maternity, 4 weeks paternity).",
    category: "Health & Wellness",
    iconName: "Coffee",
    badge: "Recharge",
  },
  {
    id: "meals",
    title: "Gourmet Meals & Healthy Pantry",
    description:
      "Nutritious catered team lunches, artisanal pour-over coffee, seasonal fruits, and wholesome snacks in all our office spaces.",
    category: "Tools & Perks",
    iconName: "Award",
    badge: "Daily",
  },
  {
    id: "retreats",
    title: "Annual Offsites & Ship Sprints",
    description:
      "Regular hack weeks, quarterly celebration dinners, and all-expense-paid annual team retreats in scenic destinations across India.",
    category: "Work & Flexibility",
    iconName: "Rocket",
    badge: "Community",
  },
];

export const jobOpenings: JobOpening[] = [
  {
    id: "staff-fullstack-engineer",
    title: "Staff Full-Stack Engineer (Next.js & TypeScript)",
    department: "Engineering",
    location: "Bengaluru, Karnataka",
    locationType: "Hybrid",
    experience: "5+ Years",
    type: "Full-Time",
    salaryRange: "₹38L – ₹55L + Significant ESOPs",
    featured: true,
    tags: ["Next.js 16", "TypeScript", "React 19", "PostgreSQL", "Node.js", "Tailwind CSS"],
    summary:
      "Architect and lead the core web applications that power Grofi's loan comparison engine, credit score diagnostics, and seamless partner integrations.",
    responsibilities: [
      "Lead architectural decisions for our Next.js web application, focusing on sub-second initial load times, SSR optimizations, and rock-solid reliability.",
      "Design and maintain high-performance microservices and API gateways interfacing with 50+ banking APIs and credit rating bureaus.",
      "Collaborate closely with product designers to build accessible, modular design system components and fluid interactive calculators.",
      "Mentor mid-level engineers, conduct rigorous code reviews, and drive engineering excellence through automated testing and CI/CD pipelines.",
      "Implement robust telemetry, security audits, and latency monitoring across production environments.",
    ],
    requirements: [
      "5+ years of production experience shipping high-scale web products with Next.js, React, and TypeScript.",
      "Deep understanding of modern JavaScript, asynchronous patterns, server-side rendering, and web performance optimization.",
      "Proven experience with relational databases (PostgreSQL, Prisma ORM, Neon) and caching layers (Redis).",
      "Familiarity with financial compliance, secure handling of PII, and bank-grade REST/GraphQL API integration.",
      "Strong product mindset—you care about business impact and user joy, not just lines of code.",
    ],
    niceToHave: [
      "Experience working in a fast-paced fintech, consumer lending, or neo-banking startup in India.",
      "Contributions to open-source UI libraries or developer tooling.",
      "Hands-on experience with Turbopack, Tailwind CSS v4, and edge deployment platforms.",
    ],
    first90Days: [
      "Day 30: Ship your first major feature on the loan application workflow and optimize Core Web Vitals on mobile.",
      "Day 60: Redesign the real-time quote comparison engine to reduce quote latency by 35%.",
      "Day 90: Champion technical architecture guidelines and lead the launch of our next-gen Credit Card recommendation hub.",
    ],
  },
  {
    id: "senior-backend-engineer",
    title: "Senior Backend Engineer (Lending APIs & Distributed Systems)",
    department: "Engineering",
    location: "Bengaluru, Karnataka",
    locationType: "Hybrid",
    experience: "4–7 Years",
    type: "Full-Time",
    salaryRange: "₹32L – ₹48L + ESOPs",
    featured: true,
    tags: ["Node.js", "PostgreSQL", "Kafka / BullMQ", "Docker", "AWS", "Security"],
    summary:
      "Build resilient, fault-tolerant credit decisioning pipelines, asynchronous loan disbursement hooks, and bank webhook processors.",
    responsibilities: [
      "Build and optimize backend services handling loan eligibility evaluations, lead scoring, and automated document verification.",
      "Integrate bi-directional webhooks with leading banks (HDFC, SBI, ICICI, Axis) with idempotent transaction processing.",
      "Design robust schema migrations, read replicas, and indexing strategies in PostgreSQL.",
      "Implement automated retry mechanisms, dead-letter queues, and distributed circuit breakers.",
      "Ensure compliance with RBI data localization and financial security directives.",
    ],
    requirements: [
      "4+ years of backend engineering experience building distributed, fault-tolerant web APIs.",
      "High proficiency in Node.js / TypeScript, PostgreSQL, and event queues (BullMQ, Redis, or Kafka).",
      "Solid foundation in database transactions (ACID), locking strategies, and API security (OAuth2, JWT, HMAC signatures).",
      "Proficiency with Docker, AWS/GCP, and infrastructure as code.",
    ],
    niceToHave: [
      "Prior experience interfacing with NSDL, UIDAI, CIBIL/Experian, or AA (Account Aggregator) frameworks.",
      "Knowledge of micro-services architecture and Kubernetes orchestration.",
    ],
    first90Days: [
      "Day 30: Audit and harden our bank webhook processing pipeline with automated reconciliation.",
      "Day 60: Deliver an automated eligibility matching engine that handles 10,000 requests/minute.",
      "Day 90: Co-architect our real-time loan status push notification system.",
    ],
  },
  {
    id: "lead-product-designer",
    title: "Lead Product Designer (FinTech UX & Systems)",
    department: "Product & Design",
    location: "Bengaluru or Mumbai",
    locationType: "Hybrid",
    experience: "5+ Years",
    type: "Full-Time",
    salaryRange: "₹30L – ₹45L + ESOPs",
    featured: true,
    tags: ["Figma", "Design Systems", "User Research", "Prototyping", "Fintech UX"],
    summary:
      "Transform complex loan eligibility calculators, credit card reward matrices, and financial disclosures into elegant, trust-inducing consumer journeys.",
    responsibilities: [
      "Own the end-to-end product design experience across Grofi's desktop and mobile web platforms.",
      "Maintain and evolve our comprehensive design system, establishing consistent visual hierarchy, typography, and micro-interactions.",
      "Conduct in-depth user interviews with borrowers and credit card seekers to uncover friction points in loan discovery.",
      "Partner with engineering to ensure pixel-perfect implementation, motion design, and responsive behavior.",
      "Run A/B test experiments that simultaneously improve user clarity and conversion rates.",
    ],
    requirements: [
      "5+ years of UI/UX product design experience, preferably in consumer fintech, e-commerce, or SaaS.",
      "Mastery of Figma, advanced autolayout, component variants, and interactive prototyping.",
      "Exceptional typography, layout, and visual design fundamentals rooted in simplicity and credibility.",
      "Deep understanding of how cognitive load affects financial decisions and trust.",
    ],
    niceToHave: [
      "Experience designing for the Next Billion Users (NBU) in India, including multilingual UI considerations.",
      "Familiarity with HTML/CSS/Tailwind and ability to inspect and tweak front-end code.",
    ],
    first90Days: [
      "Day 30: Audit our loan comparison funnel and publish an actionable UX improvements roadmap.",
      "Day 60: Roll out an updated mobile loan calculator with tactile feedback and clear breakdown visualizations.",
      "Day 90: Lead a design sprint for Grofi's upcoming interactive Credit Score Health Dashboard.",
    ],
  },
  {
    id: "principal-credit-risk-analyst",
    title: "Principal Credit Risk & Scoring Analyst",
    department: "Data & Risk",
    location: "Mumbai, Maharashtra",
    locationType: "Hybrid",
    experience: "5–8 Years",
    type: "Full-Time",
    salaryRange: "₹35L – ₹50L + ESOPs",
    featured: false,
    tags: ["Credit Risk", "CIBIL / Experian", "Python", "SQL", "Risk Modeling", "Underwriting"],
    summary:
      "Deeply analyze credit bureau score trends, repayment odds, and bank approval matrices to optimize approval rates for Grofi applicants.",
    responsibilities: [
      "Formulate statistical credit scoring rules that match borrowers with lenders most likely to approve their profile at the lowest interest rate.",
      "Analyze historical loan application datasets to detect early drop-off signals and misaligned underwriting criteria.",
      "Liaise with credit policy heads at partner banks to decode policy changes, eligibility thresholds, and niche loan programs.",
      "Build predictive models for loan disbursement probabilities and customer lifetime value (LTV).",
      "Collaborate with product and data engineering to automate risk tiering in real time.",
    ],
    requirements: [
      "5+ years of experience in credit risk analytics, retail banking underwriting, or fintech lending.",
      "Deep understanding of CIBIL/CRIF/Experian bureau data formats and retail loan policies (personal, business, home loans).",
      "Advanced proficiency in SQL, Python/R, and data visualization tools (Tableau, Metabase).",
      "Strong analytical intuition—able to translate complex credit trends into simple product decisions.",
    ],
    niceToHave: [
      "Experience with Account Aggregator (AA) data analysis and bank statement parsing algorithms.",
      "Master's degree in Economics, Statistics, Finance, or related quantitative field.",
    ],
    first90Days: [
      "Day 30: Map out bank approval variance across personal loan tiers and identify our top 3 conversion bottlenecks.",
      "Day 60: Deploy an automated pre-qualification scorecard that improves partner bank acceptance by 20%.",
      "Day 90: Publish our first quarterly India Retail Credit Trends benchmark report.",
    ],
  },
  {
    id: "senior-product-manager-lending",
    title: "Senior Product Manager (Lending Marketplace)",
    department: "Product & Design",
    location: "Bengaluru, Karnataka",
    locationType: "Hybrid",
    experience: "4–7 Years",
    type: "Full-Time",
    salaryRange: "₹32L – ₹46L + ESOPs",
    featured: false,
    tags: ["Product Strategy", "Lending", "Growth Funnels", "FinTech", "Data-Driven"],
    summary:
      "Drive the product vision and roadmap for Grofi's flagship loan discovery, comparison, and pre-approval experience.",
    responsibilities: [
      "Define the product strategy and feature roadmap for our personal and business loan vertical.",
      "Lead cross-functional squads of engineers, designers, data analysts, and compliance specialists.",
      "Break down intricate lending workflows (e-KYC, income verification, mandate setup) into effortless user flows.",
      "Track North Star metrics: application completion rate, instant approval rate, and net disbursal NPS.",
      "Conduct continuous customer research and user testing to discover unmet credit needs.",
    ],
    requirements: [
      "4+ years of product management experience in consumer tech or fintech lending.",
      "Strong technical literacy—able to have nuanced conversations with engineers regarding APIs, latencies, and schemas.",
      "Relentless data focus: proficient in SQL, event tracking (Mixpanel/Amplitude), and A/B test analysis.",
      "Exceptional communication skills and ability to influence cross-functional stakeholders.",
    ],
    niceToHave: [
      "Experience with digital lending platforms (NBFCs, digital DSA platforms, or credit marketplaces).",
      "Background in engineering or computer science.",
    ],
    first90Days: [
      "Day 30: Establish a unified metrics dashboard for all lending flows from discovery to disbursal.",
      "Day 60: Launch a revamped instant-eligibility checker with real-time pre-approvals.",
      "Day 90: Lead quarterly planning for our upcoming MSME Working Capital loan portal.",
    ],
  },
  {
    id: "growth-marketing-lead",
    title: "Head of Growth & Performance Marketing",
    department: "Growth & Marketing",
    location: "Bengaluru or Mumbai",
    locationType: "Hybrid",
    experience: "5+ Years",
    type: "Full-Time",
    salaryRange: "₹28L – ₹42L + ESOPs",
    featured: false,
    tags: ["Performance Marketing", "SEO", "Customer Acquisition", "CAC/LTV", "Meta & Google Ads"],
    summary:
      "Scale Grofi from hundreds of thousands of monthly visitors to millions of active borrowers through data-driven acquisition and brand trust.",
    responsibilities: [
      "Lead our digital acquisition strategy across Google Search, Meta, programmatic networks, and affiliate channels.",
      "Optimize user acquisition cost (CAC) while scaling qualified loan applications and credit card approvals.",
      "Collaborate with the content and SEO team to capture high-intent financial search queries with organic authority.",
      "Build retention loops, lifecycle email/WhatsApp marketing sequences, and re-engagement campaigns.",
      "Allocate and manage multi-crore annual performance marketing budgets with rigorous ROI accountability.",
    ],
    requirements: [
      "5+ years of hands-on performance marketing experience in consumer internet or fintech.",
      "Deep expertise in Google Ads (Search, Performance Max), Meta Ads Manager, and programmatic networks.",
      "Strong understanding of attribution modeling, conversion rate optimization (CRO), and cohort analysis.",
      "Analytical mindset: comfortable slicing attribution data in Google Analytics 4 and SQL.",
    ],
    niceToHave: [
      "Experience navigating financial advertising compliance guidelines on Google and Meta.",
      "Proven track record scaling a D2C or fintech platform past 10M+ annual visits.",
    ],
    first90Days: [
      "Day 30: Audit our active ad campaigns, landing page conversion rates, and tracking pixels.",
      "Day 60: Restructure Google Search campaigns to lower blended acquisition costs by 18%.",
      "Day 90: Roll out an automated WhatsApp nudging pipeline for incomplete loan applicants.",
    ],
  },
  {
    id: "bank-partnerships-manager",
    title: "Strategic Bank & NBFC Partnerships Manager",
    department: "Partnerships & Ops",
    location: "Mumbai, Maharashtra",
    locationType: "Hybrid",
    experience: "4–8 Years",
    type: "Full-Time",
    salaryRange: "₹26L – ₹38L + Performance Bonus",
    featured: false,
    tags: ["Banking Alliances", "NBFC Relations", "Credit Cards", "Lending", "Business Development"],
    summary:
      "Deepen alliances with India's top private and public banks, securing exclusive payout terms, faster SLA disbursals, and direct API integrations.",
    responsibilities: [
      "Manage and expand commercial relationships with tier-1 banks (HDFC, SBI, ICICI, Kotak, Axis, IndusInd) and leading NBFCs.",
      "Negotiate strategic commercial agreements, fee structures, and faster turnaround times (TAT) for Grofi customers.",
      "Work with bank product managers to pilot exclusive pre-approved offers and co-branded digital programs.",
      "Resolve partner escalations, reconcile monthly disbursal figures, and track SLA adherence.",
      "Identify emerging fintech lenders and specialized credit card issuers to bring onto Grofi.",
    ],
    requirements: [
      "4+ years of experience in retail banking alliances, fintech business development, or digital lending partnerships.",
      "Established network within Indian banking and NBFC retail credit divisions.",
      "High commercial acumen, contract negotiation skills, and consultative communication style.",
      "Ability to navigate institutional banking hierarchies to get things done quickly.",
    ],
    niceToHave: [
      "Experience working inside a top bank's digital alliances or fintech aggregator team.",
      "Understanding of digital API onboarding agreements and regulatory covenants.",
    ],
    first90Days: [
      "Day 30: Onboard 3 new tier-2 NBFC partners specializing in instant micro-business loans.",
      "Day 60: Renegotiate API service-level agreements with our top 2 banking partners to halve processing delays.",
      "Day 90: Establish a monthly executive review cadence with all key lending partners.",
    ],
  },
  {
    id: "data-engineer-analytics",
    title: "Senior Data Engineer (Real-Time Credit Pipeline)",
    department: "Data & Risk",
    location: "Bengaluru, Karnataka",
    locationType: "Hybrid",
    experience: "4–6 Years",
    type: "Full-Time",
    salaryRange: "₹28L – ₹42L + ESOPs",
    featured: false,
    tags: ["Python", "SQL", "BigQuery / Snowflake", "Airflow", "Kafka", "Data Modeling"],
    summary:
      "Architect our core data warehouse, event streaming pipelines, and reverse-ETL flows that power credit analytics and executive reporting.",
    responsibilities: [
      "Design and maintain scalable ETL/ELT pipelines ingesting hundreds of millions of events monthly.",
      "Structure data models in our modern data warehouse for self-serve business intelligence and risk analysis.",
      "Build real-time data feeds powering our credit card reward comparison tables and EMI forecasting algorithms.",
      "Ensure airtight data hygiene, anonymization of sensitive financial data, and compliance audits.",
      "Partner with product managers and engineers to standardize event tracking taxonomies.",
    ],
    requirements: [
      "4+ years of experience as a Data Engineer building production-grade data pipelines.",
      "Deep expertise with Python, modern SQL, and orchestration frameworks (Apache Airflow or Dagster).",
      "Hands-on experience with cloud data warehouses (BigQuery, Snowflake, or Redshift) and streaming tech (Kafka/Flink).",
      "Familiarity with data quality testing, dbt, and schema governance.",
    ],
    niceToHave: [
      "Experience handling financial transactions, billing ledgers, or banking data compliance.",
      "Knowledge of vector databases and LLM retrieval pipelines.",
    ],
    first90Days: [
      "Day 30: Modernize our core loan funnel tracking pipeline with real-time dbt transformations.",
      "Day 60: Reduce daily ETL pipeline runtimes by 50% and implement automated data anomaly alerts.",
      "Day 90: Build a self-serve reporting layer empowering marketing and partnerships teams.",
    ],
  },
  {
    id: "fintech-content-editorial-lead",
    title: "Senior Financial Content & Editorial Lead",
    department: "Growth & Marketing",
    location: "Remote or Bengaluru",
    locationType: "Remote",
    experience: "3–6 Years",
    type: "Full-Time",
    salaryRange: "₹18L – ₹28L + ESOPs",
    featured: false,
    tags: ["Content Strategy", "SEO", "Financial Journalism", "Copywriting", "Credit Cards"],
    summary:
      "Lead Grofi's editorial voice, crafting authoritative credit card reviews, loan tax hacks, and CIBIL score optimization guides that demystify money for millions.",
    responsibilities: [
      "Direct our content strategy, publishing best-in-class guides, card tear-downs, and financial literacy deep dives.",
      "Research obscure bank reward schemes, milestone bonuses, and credit card devaluation nuances to provide unparalleled advice.",
      "Collaborate with SEO specialists to ensure our articles rank #1 for high-volume financial search intents.",
      "Write engaging copy for in-app microcopy, newsletters, and social media breakdown threads.",
      "Maintain our rigorous editorial fact-checking guidelines to uphold 100% unbiased recommendations.",
    ],
    requirements: [
      "3+ years of experience writing high-quality financial content, credit card reviews, or personal finance journalism in India.",
      "Deep, personal passion for credit cards, reward points, air miles, and retail loans in India.",
      "Crisp, clear writing style that explains complex banking mechanics in accessible, engaging prose.",
      "Strong understanding of SEO best practices and user search intent.",
    ],
    niceToHave: [
      "Active personal portfolio, newsletter, or social following in Indian personal finance circles.",
      "Understanding of basic financial math (APR calculation, compounding, tax slabs under Sec 24b/80C).",
    ],
    first90Days: [
      "Day 30: Publish 10 in-depth credit card reward optimization guides ranking in top Google search results.",
      "Day 60: Launch Grofi's weekly 'Smart Money' email digest with an open rate exceeding 45%.",
      "Day 90: Establish Grofi's official style guide and fact-checking workflow across all product copy.",
    ],
  },
  {
    id: "devops-cloud-security-lead",
    title: "DevOps & Cloud Security Engineer",
    department: "Engineering",
    location: "Bengaluru, Karnataka",
    locationType: "Hybrid",
    experience: "4–7 Years",
    type: "Full-Time",
    salaryRange: "₹30L – ₹45L + ESOPs",
    featured: false,
    tags: ["AWS", "Terraform", "Kubernetes", "CI/CD", "Security", "SOC-2 / ISO 27001"],
    summary:
      "Architect our multi-region AWS cloud infrastructure, automate deployment pipelines, and safeguard critical financial infrastructure against vulnerabilities.",
    responsibilities: [
      "Own Grofi's cloud architecture on AWS, optimizing for 99.99% uptime, minimal latency, and zero data leakage.",
      "Automate infrastructure provisioning using Terraform and manage containerized workloads.",
      "Design zero-trust network access, Web Application Firewalls (WAF), and automated intrusion detection systems.",
      "Drive SOC-2 Type II, ISO 27001, and RBI cybersecurity compliance audits.",
      "Build seamless CI/CD pipelines that enable engineering squads to ship safely dozens of times a day.",
    ],
    requirements: [
      "4+ years of DevOps / Site Reliability / Cloud Security experience in a production environment.",
      "Expertise in AWS (VPC, ECS/EKS, RDS, IAM, KMS, CloudFront, GuardDuty) and Terraform / OpenTofu.",
      "Solid understanding of network security, TLS termination, vulnerability scanners, and secrets management.",
      "Proficiency in shell scripting, Python or Go, and modern CI/CD tools (GitHub Actions).",
    ],
    niceToHave: [
      "Certified AWS Solutions Architect or Certified Kubernetes Administrator (CKA).",
      "Direct experience working in a PCI-DSS or RBI-regulated fintech environment.",
    ],
    first90Days: [
      "Day 30: Implement automated secret rotation and enhance container vulnerability scanning across all repos.",
      "Day 60: Re-architect staging environments to allow ephemeral pull-request preview deployments.",
      "Day 90: Lead our annual security penetration test with external auditors and achieve zero high-severity findings.",
    ],
  },
];

export const hiringProcess: HiringStep[] = [
  {
    step: 1,
    title: "Application & Portfolio Review",
    duration: "Within 48 Hours",
    description:
      "We respect your time. Our hiring managers review every single application directly—no algorithmic keyword shredders. If there's a match, you'll hear from us promptly.",
    tips: "Highlight real outcomes, code samples, or case studies where you solved challenging problems.",
  },
  {
    step: 2,
    title: "Discovery & Ambition Chat",
    duration: "30 Minutes",
    description:
      "A friendly, conversational video call with our Talent Lead or Hiring Manager. We'll discuss what excites you, what you're seeking in your next career chapter, and give you an unfiltered look at Grofi's trajectory.",
    tips: "Come with tough questions about our culture, business model, and future milestones.",
  },
  {
    step: 3,
    title: "Craft & Technical Deep Dive",
    duration: "60–90 Minutes",
    description:
      "No contrived leetcode puzzles or whiteboard trivia. We simulate real problems we encounter daily—architecting a resilient API, designing a complex user journey, or analyzing a credit distribution.",
    tips: "Focus on first principles, trade-off evaluations, and how you think through edge cases.",
  },
  {
    step: 4,
    title: "Founder Meet & Transparent Offer",
    duration: "45 Minutes",
    description:
      "Meet our founders to discuss vision, values, and alignment. Upon selection, we make a clear, competitive offer with zero lowball games and full transparency into ESOP valuation and vesting.",
    tips: "We provide comprehensive written offer packages and fast turnaround to respect your decision timeline.",
  },
];

export const candidateFaqs: CandidateFaq[] = [
  {
    question: "Where are Grofi's office hubs located, and what is your work policy?",
    category: "Workplace",
    answer:
      "Our main engineering and product hub is in Indiranagar, Bengaluru, with an alliances and partnerships presence in BKC, Mumbai. We operate on a modern hybrid model: we gather in person 2-3 days a week for whiteboard sessions, sprints, and team lunches, while offering full flexibility to work from home on focus days. Several specialized roles are also fully remote across India.",
  },
  {
    question: "How does Grofi approach ESOPs and equity compensation?",
    category: "Equity & Compensation",
    answer:
      "We believe everyone building Grofi deserves meaningful ownership in our success. Full-time hires receive formal ESOP grants benchmarked to market valuation, with a standard 4-year vesting schedule (25% cliff at year 1, monthly thereafter). We provide full visibility into our cap table logic, current share valuation, and liquidity options.",
  },
  {
    question: "What is your tech stack and how often do you ship?",
    category: "Culture & Perks",
    answer:
      "We run on Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, PostgreSQL (with Prisma), Redis, BullMQ, and AWS. We believe in continuous delivery: our squads ship to production multiple times a day using GitHub Actions and automated end-to-end testing pipelines.",
  },
  {
    question: "What does the typical hiring turnaround look like?",
    category: "Hiring Process",
    answer:
      "From initial application submission to final offer rollout, our standard hiring loop typically takes between 7 to 14 business days. We keep you proactively updated via email or WhatsApp after every step so you're never left wondering where things stand.",
  },
  {
    question: "Do you offer relocation support for outstation candidates?",
    category: "Culture & Perks",
    answer:
      "Yes! For hybrid roles based in Bengaluru or Mumbai, we offer a dedicated relocation allowance to cover flight tickets, moving logistics, and up to 14 days of premium hotel accommodation while you settle into your new city.",
  },
  {
    question: "Can I re-apply if I wasn't selected for a role previously?",
    category: "Hiring Process",
    answer:
      "Absolutely. Careers and skill sets evolve rapidly. If a previously applied role was not a fit or you were not selected, you are welcome to apply again after 6 months or whenever you spot an opening that aligns closely with your expanded experience.",
  },
];
