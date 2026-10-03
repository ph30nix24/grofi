import "dotenv/config";
import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";

const adapter = new PrismaNeon({
    connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({
    adapter,
});


export interface BusinessLoanLender {
    id: string;
    name: string;
    logo: string;
    tagline: string;
    bankType: 'private' | 'psu' | 'nbfc' | string;
    interestRate: { min: number; max: number; text: string };
    startingEmiPerLakh: number;
    maxAmount: string;
    maxAmountNum: number;
    tenure: string;
    tenureMonths: number;
    processingFee: string;
    processingFeePercent: number;
    collateralType: string;
    disbursalTime: string;
    foreclosureCharges: string;
    minTurnover: string;
    minVintage: string;
    minCibilScore: number;
    badge: string;
    badgeColor?: string | null;
    category: string[];
    features: string[];
    recommendedFor: string;
    rating: number;
    reviewCount: string;
    faqs: {
        question: string;
        answer: string;
    }[];
    title: string;
    description: string;
    keywords: string[];
    openGraphTitle: string;
    openGraphDesc: string;
    twitterTitle: string;
    twitterDesc: string;
}

async function main() {
    const data = await prisma.businessLoanData.findMany({
        orderBy: [
            { startingEmiPerLakh: "asc" },
            { rating: "desc" },
        ],
    })

    console.log(JSON.parse(JSON.stringify(data)))
}

main()
    .catch(console.error)
    .finally(async () => {
        await prisma.$disconnect()
    })