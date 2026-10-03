"use client";

import React, { useState, useMemo } from "react";
import {
  Calculator,
  IndianRupee,
  Calendar,
  Percent,
  ArrowRight,
  ShieldCheck,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Receipt,
} from "lucide-react";
import { BusinessLoanLender } from "../../components/type";
import { useApplyModal } from "@/app/context/ApplyModalContext";

interface BusinessLoanEmiCalculatorSectionProps {
  lender: BusinessLoanLender;
}

export default function BusinessLoanEmiCalculatorSection({ lender }: BusinessLoanEmiCalculatorSectionProps) {
  const { openApplyModal } = useApplyModal();

  const minRate = lender.interestRate?.min ?? 10.75;
  const maxRate = lender.interestRate?.max ?? 22.0;
  const maxSanction = lender.maxAmountNum || 10000000;
  const maxTenureYears = Math.max(1, Math.round((lender.tenureMonths || 60) / 12));

  // Slider States
  const [loanAmount, setLoanAmount] = useState<number>(Math.min(1000000, maxSanction));
  const [interestRate, setInterestRate] = useState<number>(minRate);
  const [tenureYears, setTenureYears] = useState<number>(Math.min(4, maxTenureYears));
  const [showAmortization, setShowAmortization] = useState<boolean>(false);

  // Quick Amount Presets
  const presets = useMemo(() => {
    const list = [500000, 1000000, 2500000, 5000000, 10000000];
    const filtered = list.filter((amt) => amt <= maxSanction);
    if (!filtered.includes(maxSanction) && maxSanction > 1000000) {
      filtered.push(maxSanction);
    }
    return filtered;
  }, [maxSanction]);

  // Reducing Balance EMI Calculation
  const {
    monthlyEmi,
    totalInterest,
    totalPayment,
    principalPercent,
    interestPercent,
    processingFeeEstimate,
    taxSavingsEstimate,
    schedulePreview,
  } = useMemo(() => {
    const p = loanAmount;
    const r = interestRate / 12 / 100;
    const n = tenureYears * 12;

    let emi = 0;
    if (r === 0) {
      emi = p / n;
    } else {
      emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    }

    const totalPay = emi * n;
    const totalInt = totalPay - p;

    const pPct = Math.round((p / totalPay) * 100);
    const iPct = 100 - pPct;

    // Estimate processing fee
    const feePct = lender.processingFeePercent || 2.0;
    const estFee = Math.round(p * (feePct / 100));

    // Estimate Tax Deduction Savings under Section 36(1)(iii) assuming ~25% corporate / firm tax slab
    const taxSaving = Math.round(totalInt * 0.25);

    // Build first 6 months amortization preview
    let balance = p;
    const preview = [];
    for (let month = 1; month <= Math.min(6, n); month++) {
      const interestPart = balance * r;
      const principalPart = emi - interestPart;
      balance = Math.max(0, balance - principalPart);
      preview.push({
        month,
        principalPart: Math.round(principalPart),
        interestPart: Math.round(interestPart),
        balance: Math.round(balance),
      });
    }

    return {
      monthlyEmi: Math.round(emi),
      totalInterest: Math.round(totalInt),
      totalPayment: Math.round(totalPay),
      principalPercent: pPct,
      interestPercent: iPct,
      processingFeeEstimate: estFee,
      taxSavingsEstimate: taxSaving,
      schedulePreview: preview,
    };
  }, [loanAmount, interestRate, tenureYears, lender.processingFeePercent]);

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(val);
  };

  const formatLakhs = (val: number): string => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(val % 100000 === 0 ? 0 : 1)} Lakh`;
    return `₹${formatINR(val)}`;
  };

  const handleReset = () => {
    setLoanAmount(Math.min(1000000, maxSanction));
    setInterestRate(minRate);
    setTenureYears(Math.min(4, maxTenureYears));
  };

  return (
    <section id="emi-calculator" className="py-12 sm:py-16 max-w-7xl mx-auto px-4 sm:px-6 md:px-8 border-t border-gray-200 font-montserrat">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
        <div className="inline-flex items-center gap-2 bg-[#EBF4ED] text-primary px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide border border-primary/15 shadow-2xs mb-3">
          <Calculator className="w-3.5 h-3.5 text-gold" />
          <span>COMMERCIAL EMI ESTIMATOR</span>
        </div>
        <h2 className="font-bricolage font-extrabold text-2xl sm:text-4xl text-gray-900 tracking-tight">
          Calculate Your EMI for <span className="text-primary">{lender.name}</span>
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 mt-2">
          Monthly reducing balance calculator designed for businesses and MSMEs. Plan cashflows, calculate tax deductions, and budget repayment comfortably.
        </p>
      </div>

      {/* Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Sliders & Controls (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-gray-200/90 shadow-sm space-y-7">
          
          <div className="flex items-center justify-between pb-2 border-b border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Loan Parameter Controls
            </span>
            <button
              onClick={handleReset}
              className="text-xs font-bold text-primary hover:text-[#035259] flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          {/* SLIDER 1: LOAN AMOUNT */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-primary" />
                <span>Required Loan Quantum</span>
              </label>
              <div className="bg-[#EBF4ED] text-primary font-bricolage font-extrabold text-lg sm:text-xl px-4 py-1.5 rounded-xl border border-primary/20">
                ₹{formatINR(loanAmount)}
              </div>
            </div>

            <input
              type="range"
              min={100000}
              max={maxSanction}
              step={50000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex justify-between text-[11px] text-gray-400 font-medium">
              <span>₹1 Lakh</span>
              <span>Max: {lender.maxAmount}</span>
            </div>

            {/* Quick Presets */}
            <div className="flex flex-wrap gap-2 pt-1">
              {presets.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setLoanAmount(amt)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    loanAmount === amt
                      ? "bg-primary text-white shadow-2xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {formatLakhs(amt)}
                </button>
              ))}
            </div>
          </div>

          {/* SLIDER 2: INTEREST RATE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <Percent className="w-4 h-4 text-primary" />
                <span>Interest Rate (p.a.)</span>
              </label>
              <div className="bg-[#EBF4ED] text-primary font-bricolage font-extrabold text-lg sm:text-xl px-4 py-1.5 rounded-xl border border-primary/20">
                {interestRate.toFixed(2)}%
              </div>
            </div>

            <input
              type="range"
              min={minRate}
              max={maxRate}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex justify-between text-[11px] text-gray-400 font-medium">
              <span>Min: {minRate}% (Best GST / CMR)</span>
              <span>Max: {maxRate}% p.a.</span>
            </div>
          </div>

          {/* SLIDER 3: TENURE */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span>Repayment Tenure</span>
              </label>
              <div className="bg-[#EBF4ED] text-primary font-bricolage font-extrabold text-lg sm:text-xl px-4 py-1.5 rounded-xl border border-primary/20">
                {tenureYears} {tenureYears === 1 ? "Year" : "Years"} ({tenureYears * 12} Mos)
              </div>
            </div>

            <input
              type="range"
              min={1}
              max={maxTenureYears}
              step={1}
              value={tenureYears}
              onChange={(e) => setTenureYears(Number(e.target.value))}
              className="w-full h-2.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
            />

            <div className="flex justify-between text-[11px] text-gray-400 font-medium">
              <span>1 Year (12 Mos)</span>
              <span>{maxTenureYears} Years ({maxTenureYears * 12} Mos)</span>
            </div>

            <div className="flex gap-2 pt-1">
              {[1, 2, 3, 4, 5, 7].filter((y) => y <= maxTenureYears).map((y) => (
                <button
                  key={y}
                  type="button"
                  onClick={() => setTenureYears(y)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                    tenureYears === y
                      ? "bg-primary text-white shadow-2xs"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {y} {y === 1 ? "Yr" : "Yrs"}
                </button>
              ))}
            </div>
          </div>

          {/* Enterprise Tax Deduction Callout */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 via-[#EBF4ED] to-emerald-50 border border-emerald-200 flex items-start gap-3">
            <Receipt className="w-5 h-5 text-emerald-700 shrink-0 mt-0.5" />
            <div className="text-xs text-emerald-950 leading-relaxed">
              <strong className="text-emerald-900 font-bold block mb-0.5">
                Section 36(1)(iii) Tax Advantage:
              </strong>
              Under the Indian Income Tax Act, 100% of the interest paid on business loans (estimated ~₹{formatINR(totalInterest)}) is treated as a deductible business expense, reducing corporate/firm tax liability by ~<strong>₹{formatINR(taxSavingsEstimate)}</strong>!
            </div>
          </div>

        </div>

        {/* Right Column: Calculated Results Summary & CTA (5 cols) */}
        <div className="lg:col-span-5 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-sm space-y-6">
          
          {/* Main EMI Highlight Box */}
          <div className="bg-gradient-to-br from-primary to-[#035259] rounded-2xl p-6 text-white text-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/15 rounded-full blur-2xl pointer-events-none" />
            
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-200 block mb-1">
              Estimated Monthly Outflow (EMI)
            </span>
            <div className="font-bricolage font-extrabold text-3xl sm:text-4xl text-white tracking-tight">
              ₹{formatINR(monthlyEmi)}
            </div>
            <p className="text-[11px] text-emerald-100/80 mt-1 font-medium">
              For {tenureYears * 12} months @ {interestRate.toFixed(2)}% p.a.
            </p>
          </div>

          {/* Breakdown Values Matrix */}
          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
              <span className="text-gray-500 font-medium">Principal Loan Quantum</span>
              <span className="font-bricolage font-bold text-sm text-gray-900">
                ₹{formatINR(loanAmount)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
              <span className="text-gray-500 font-medium">Total Interest Payable</span>
              <span className="font-bricolage font-bold text-sm text-amber-700">
                ₹{formatINR(totalInterest)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
              <span className="text-gray-500 font-medium">Total Repayment (Principal + Interest)</span>
              <span className="font-bricolage font-bold text-sm text-gray-900">
                ₹{formatINR(totalPayment)}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-white border border-gray-200/80 shadow-2xs">
              <span className="text-gray-500 font-medium">Est. Processing Fee (~{lender.processingFeePercent || 2}%)</span>
              <span className="font-medium text-gray-700">
                ~₹{formatINR(processingFeeEstimate)} + GST
              </span>
            </div>
          </div>

          {/* Visual Breakdown Progress Bar */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold">
              <span className="text-primary">Principal: {principalPercent}%</span>
              <span className="text-amber-700">Interest: {interestPercent}%</span>
            </div>
            
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden flex shadow-inner">
              <div
                className="bg-primary h-full transition-all duration-500"
                style={{ width: `${principalPercent}%` }}
                title={`Principal: ${principalPercent}%`}
              />
              <div
                className="bg-amber-500 h-full transition-all duration-500"
                style={{ width: `${interestPercent}%` }}
                title={`Interest: ${interestPercent}%`}
              />
            </div>
          </div>

          {/* Action Trigger Button */}
          <button
            type="button"
            onClick={() =>
              openApplyModal(
                lender.name,
                `Business Loan EMI Application: ₹${formatINR(monthlyEmi)}/mo for ₹${formatINR(loanAmount)}`
              )
            }
            className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-4 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer active:scale-98"
          >
            <span>Apply for this EMI (₹{formatINR(monthlyEmi)}/mo)</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          {/* Amortization Schedule Accordion Toggle */}
          <div className="pt-2 border-t border-gray-200">
            <button
              type="button"
              onClick={() => setShowAmortization(!showAmortization)}
              className="w-full flex items-center justify-between text-xs font-bold text-gray-700 hover:text-primary transition-colors cursor-pointer py-1"
            >
              <span>View Initial 6-Month Business Amortization Schedule</span>
              {showAmortization ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {showAmortization && (
              <div className="mt-3 overflow-x-auto text-[11px] border border-gray-200 rounded-xl bg-white shadow-2xs">
                <table className="w-full text-left">
                  <thead className="bg-gray-50 border-b border-gray-200 text-gray-500 font-bold uppercase text-[9px]">
                    <tr>
                      <th className="p-2">Mo</th>
                      <th className="p-2">Principal</th>
                      <th className="p-2">Interest</th>
                      <th className="p-2">Balance</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    {schedulePreview.map((row) => (
                      <tr key={row.month} className="hover:bg-gray-50/50">
                        <td className="p-2 font-bold text-gray-900">{row.month}</td>
                        <td className="p-2 text-emerald-800">₹{formatINR(row.principalPart)}</td>
                        <td className="p-2 text-amber-800">₹{formatINR(row.interestPart)}</td>
                        <td className="p-2 text-gray-700">₹{formatINR(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] text-gray-500 text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Soft inquiry does not impact company or promoter credit score.</span>
          </div>

        </div>

      </div>

    </section>
  );
}
