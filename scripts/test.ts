import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
    adapter,
});

export interface CardStructure {
  id: string;
  name: string;
  issuer: string;
  logo: string;
  cardImage?: string;
  network: string;
  category: ('all' | 'cashback' | 'travel' | 'lifestyle' | 'upi' | 'business' | 'entry-level' | 'popular' | 'dining')[];
  categoryLabel: string;
  badge: string;
  description: string;
  joiningFee: string;
  annualFee: string;
  feeWaiver: string;
  forexMarkup: string;
  popularRank?: number;
  rewardRate: {
    headline: string;
    base: string;
    accelerated: string;
    rewardCurrency: string;
    pointValue: string;
  };
  loungeAccess: {
    domestic: string;
    international: string;
    spendCondition?: string;
  };
  welcomeBenefits: string[];
  keyHighlights: string[];
  pros: string[];
  cons: string[];
  eligibility: {
    minIncome: string;
    minCreditScore: number;
    employmentType: string;
  };
  bestFor: string;
  editorialVerdict: string;
}


async function main() {
    const rawData = await prisma.creditCard.findMany({
        distinct: ["issuer"],
        where: { joiningFee: { not: "Lifetime Free (₹0)" } },
        orderBy: { joiningFee: "asc" },
        take: 5,
    });

    const data = JSON.parse(JSON.stringify(rawData)) as CardStructure[]

    console.log(data)
}


main()
    .catch(console.error)
    .finally(async () => {
        prisma.$disconnect()
    })