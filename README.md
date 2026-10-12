# Grofi (www.grofi.in)

> India's premier financial product comparison and discovery platform. Compare credit cards, personal loans, instant loans, short-term loans, home loans, balance transfers, loan against property (LAP), and business loans with zero CIBIL impact soft checks.

---

## 🌟 Key Features

- **Credit Cards Comparison Engine**: Filter by partner banks, fee waivers, lounge access, cashback, travel, and dining reward rates.
- **Multi-Category Loan Portals**:
  - Personal Loans & Instant Micro-Loans (turnaround time, RBI NBFC compliance, processing fees).
  - Home Loans & Mortgage Balance Transfers (interest rate caps, overdraft facilities, tenure options).
  - Business Loans & MSME Schemes (collateral-free commercial credit, turnover norms).
- **SEO & Search Compliance**:
  - Full Schema.org structured data (`FinancialProduct`, `Review`, `FAQPage`, `BreadcrumbList`).
  - Genuine editorial review attribution (`Grofi Editorial Team`) without fabricated user rating counts.
  - Comprehensive, real-time dynamic sitemap covering all 320+ canonical products and category hubs using database `updatedAt` timestamps.
- **Safety Nets & Resiliency**:
  - Global and route-level error boundaries (`error.tsx`, `global-error.tsx`).
  - Dedicated brand-aligned 404 handler (`not-found.tsx`).
  - Try/catch protected database lookups and `generateMetadata` handlers.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org/)
- **UI Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Database & ORM**: PostgreSQL via [Prisma ORM](https://www.prisma.io/) with `@prisma/adapter-pg`
- **Icons**: [Lucide React](https://lucide.dev/)
- **Testing**: Built-in test runner via `tsx --test` & Node Test Runner
- **Continuous Integration**: GitHub Actions

---

## 📁 Project Directory Structure

```
grofi/
├── app/
│   ├── blogs/                     # Financial insights & blog posts
│   ├── business-loans/            # Business & commercial loan comparators
│   ├── credit-cards/              # Credit card issuer pages & details
│   ├── home-loans/                # Home loans, balance transfer, and LAP
│   ├── personal-loans/            # Personal, instant & short-term loans
│   ├── components/                # Global UI components (Navbar, Footer, Modals)
│   ├── context/                   # React context providers
│   ├── error.tsx                  # Application-level error boundary
│   ├── global-error.tsx           # Root layout crash boundary
│   ├── not-found.tsx              # Brand 404 page with navigation shortcuts
│   ├── layout.tsx                 # Root layout & typography
│   ├── sitemap.ts                 # Dynamic sitemap engine (all catalog tables)
│   └── robots.ts                  # Search engine crawlers policy
├── libs/
│   └── db.ts                      # Prisma client singleton with PG adapter
├── prisma/
│   └── schema.prisma              # Data models (Credit cards, loans, blogs, leads)
├── tests/                         # Automated test suite
│   ├── constants.test.ts
│   ├── sitemap.test.ts
│   └── structured-data.test.ts
└── .github/workflows/
    └── ci.yml                     # GitHub Actions CI workflow
```

---

## 🚀 Getting Started

### 1. Prerequisites

- **Node.js**: `v20.x` or higher
- **PostgreSQL**: PostgreSQL database instance (local or hosted, e.g., Neon/Supabase/AWS RDS)

### 2. Environment Setup

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/grofi?sslmode=prefer"
RESEND_API_KEY="your-resend-api-key" # Optional, for lead notification emails
```

### 3. Install Dependencies & Generate Prisma Client

```bash
npm install
npx prisma generate
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## 🧪 Testing & Verification

Run the automated test suite:

```bash
npm test
```

Run code quality and lint checks:

```bash
npm run lint
```

Run production build verification:

```bash
npm run build
```

---

## 🔄 Continuous Integration (CI)

This repository includes a GitHub Actions CI pipeline located at [`.github/workflows/ci.yml`](.github/workflows/ci.yml) that automatically runs on every push and pull request to `main`:

1. Installs project dependencies.
2. Generates the Prisma Client.
3. Executes ESLint.
4. Executes the automated test suite.

---

## 📄 License

Proprietary © Grofi. All rights reserved.
