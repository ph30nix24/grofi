import prisma from "@/libs/db"
import { PersonalLoanLender } from "../components/type"

async function fetchLoan(loanID: string): Promise<PersonalLoanLender | null> {
    try {
        const rawData = await prisma.personalLoanLender.findUnique({
            where: { id: loanID }
        })
        return JSON.parse(JSON.stringify(rawData)) as PersonalLoanLender
    }
    catch(error) {
        console.warn("Error while fetching loan", error)
        return null
    }
}

export default async function SelectedPersonalLaon({ params }: {
    params: Promise<{ loan: string }>
}){
    const loanID = (await params).loan

    const selectedPersonalLoan = await fetchLoan(loanID)
    return (
        <main>{loanID} - {selectedPersonalLoan?.name}</main>
    )
}