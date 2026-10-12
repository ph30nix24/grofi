/**
 * Core EMI Calculation Engine
 * Centralized pure math functions for all loan calculators
 */

export interface AmortizationYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  balance: number;
}

export interface EmiCalculationResult {
  monthlyEmi: number;
  totalInterest: number;
  totalPayment: number;
  principalPercent: number;
  interestPercent: number;
  yearlyBreakdown: AmortizationYear[];
}

/**
 * Calculates monthly EMI, total interest, total payable, and yearly amortization schedule.
 * Uses the standard Reducing Balance EMI formula:
 * E = P * r * (1 + r)^n / ((1 + r)^n - 1)
 */
export function calculateEmi(
  principal: number,
  annualInterestRate: number,
  totalMonths: number
): EmiCalculationResult {
  const P = Math.max(0, principal);
  const n = Math.max(1, totalMonths);
  const r = annualInterestRate / 12 / 100;

  if (r === 0 || P === 0) {
    const emi = P / n;
    return {
      monthlyEmi: Math.round(emi),
      totalInterest: 0,
      totalPayment: Math.round(P),
      principalPercent: 100,
      interestPercent: 0,
      yearlyBreakdown: [],
    };
  }

  const compound = Math.pow(1 + r, n);
  const emi = (P * r * compound) / (compound - 1);
  const totalPayment = emi * n;
  const totalInterest = totalPayment - P;

  const principalPercent = totalPayment > 0 ? (P / totalPayment) * 100 : 100;
  const interestPercent = Math.max(0, 100 - Math.round(principalPercent));

  // Generate yearly amortization breakdown
  let balance = P;
  const yearlyBreakdown: AmortizationYear[] = [];
  const totalYears = Math.ceil(n / 12);

  for (let yr = 1; yr <= totalYears; yr++) {
    let yrPrincipal = 0;
    let yrInterest = 0;
    const monthsInThisYear = yr === totalYears && n % 12 !== 0 ? n % 12 : 12;

    for (let m = 1; m <= monthsInThisYear; m++) {
      const monthlyInt = balance * r;
      const monthlyPrin = emi - monthlyInt;
      yrInterest += monthlyInt;
      yrPrincipal += monthlyPrin;
      balance = Math.max(0, balance - monthlyPrin);
    }

    yearlyBreakdown.push({
      year: yr,
      principalPaid: Math.round(yrPrincipal),
      interestPaid: Math.round(yrInterest),
      balance: Math.round(balance),
    });
  }

  return {
    monthlyEmi: Math.round(emi),
    totalInterest: Math.round(totalInterest),
    totalPayment: Math.round(totalPayment),
    principalPercent: Math.round(principalPercent),
    interestPercent,
    yearlyBreakdown,
  };
}

/**
 * Format currency in Indian standard format (e.g. 5,00,000)
 */
export function formatINR(val: number): string {
  return new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(Math.round(val || 0));
}

/**
 * Format currency with Lakh / Cr suffixes (e.g. ₹ 25 Lakh, ₹ 1.5 Cr)
 */
export function formatAmountText(val: number): string {
  if (val >= 10000000) {
    return `₹ ${(val / 10000000).toFixed(2).replace(/\.00$/, "")} Cr`;
  }
  if (val >= 100000) {
    return `₹ ${(val / 100000).toFixed(2).replace(/\.00$/, "")} Lakh`;
  }
  return `₹ ${formatINR(val)}`;
}

/**
 * Calculates slider fill percentage
 */
export function getSliderPercentage(value: number, min: number, max: number): number {
  if (max <= min) return 0;
  return Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
}

export interface BalanceTransferResult {
  oldEmi: number;
  newEmi: number;
  monthlySavings: number;
  totalInterestSaved: number;
  estimatedTransferCost: number;
  netSavings: number;
}

/**
 * Calculates balance transfer refinancing savings
 */
export function calculateBalanceTransfer(
  transferBalance: number,
  currentRate: number,
  newRate: number,
  remainingYears: number
): BalanceTransferResult {
  const P = Math.max(0, transferBalance);
  const n = Math.max(1, remainingYears * 12);

  const rOld = currentRate / 12 / 100;
  const compOld = Math.pow(1 + rOld, n);
  const oldEmi = (P * rOld * compOld) / (compOld - 1);
  const oldTotalInterest = oldEmi * n - P;

  const rNew = newRate / 12 / 100;
  const compNew = Math.pow(1 + rNew, n);
  const newEmi = (P * rNew * compNew) / (compNew - 1);
  const newTotalInterest = newEmi * n - P;

  const monthlySavings = Math.max(0, Math.round(oldEmi - newEmi));
  const totalInterestSaved = Math.max(0, Math.round(oldTotalInterest - newTotalInterest));
  const estimatedTransferCost = Math.round(P * 0.0035 + 5000);
  const netSavings = Math.max(0, totalInterestSaved - estimatedTransferCost);

  return {
    oldEmi: Math.round(oldEmi),
    newEmi: Math.round(newEmi),
    monthlySavings,
    totalInterestSaved,
    estimatedTransferCost,
    netSavings,
  };
}

