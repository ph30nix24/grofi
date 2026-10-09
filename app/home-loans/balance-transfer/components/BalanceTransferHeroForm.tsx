"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  TrendingDown,
  Building2,
  Calculator,
} from "lucide-react";
import { useApplyModal } from "@/app/context/ApplyModalContext";

export default function BalanceTransferHeroForm() {
  const { openApplyModal } = useApplyModal();

  const [currentBank, setCurrentBank] = useState("HDFC Bank");
  const [outstandingLoan, setOutstandingLoan] = useState<number>(5000000); // ₹50 Lakhs
  const [currentRate, setCurrentRate] = useState<number>(9.25);
  const [newRate] = useState<number>(7.25); // Target benchmark rate

  // Quick calculations for instant gratification
  const remainingYears = 18;
  const n = remainingYears * 12;
  const rOld = currentRate / 12 / 100;
  const rNew = newRate / 12 / 100;

  const emiOld = Math.round(
    (outstandingLoan * rOld * Math.pow(1 + rOld, n)) /
      (Math.pow(1 + rOld, n) - 1)
  );
  const emiNew = Math.round(
    (outstandingLoan * rNew * Math.pow(1 + rNew, n)) /
      (Math.pow(1 + rNew, n) - 1)
  );
  const monthlySavings = Math.max(0, emiOld - emiNew);
  const totalSavingsLakhs = (
    (monthlySavings * n - 15000) /
    100000
  ).toFixed(1);

  const formatINR = (val: number): string => {
    return new Intl.NumberFormat("en-IN", {
      maximumFractionDigits: 0,
    }).format(Math.round(val));
  };

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    openApplyModal(
      "Home Loan Balance Transfer",
      `Transfer from ${currentBank} (₹${(outstandingLoan / 100000).toFixed(0)}L at ${currentRate}%) to save ~₹${formatINR(monthlySavings)}/mo`
    );
  };

  const scrollToCalculator = () => {
    const el = document.getElementById("savings-calculator");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-gray-100 relative font-montserrat">
      {/* Top Banner */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#EBF4ED] text-primary flex items-center justify-center font-bold">
            <TrendingDown className="w-4 h-4 text-primary" />
          </div>
          <div>
            <span className="text-xs font-bold text-gray-900 block font-bricolage">
              Quick Savings Estimator
            </span>
            <span className="text-[11px] text-gray-500 block">
              100% Free • No impact on CIBIL
            </span>
          </div>
        </div>
        <span className="bg-emerald-50 text-emerald-700 text-[11px] font-bold px-2.5 py-1 rounded-full border border-emerald-200">
          Save Up to 2.0%
        </span>
      </div>

      <form onSubmit={handleApply} className="space-y-4">
        {/* Existing Lender */}
        <div>
          <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5">
            Current Bank / Lender
          </label>
          <div className="relative">
            <Building2 className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <select
              value={currentBank}
              onChange={(e) => setCurrentBank(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white transition-all appearance-none cursor-pointer"
            >
              <option value="HDFC Bank">HDFC Bank</option>
              <option value="SBI">State Bank of India (SBI)</option>
              <option value="ICICI Bank">ICICI Bank</option>
              <option value="Axis Bank">Axis Bank</option>
              <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
              <option value="Bank of Baroda">Bank of Baroda</option>
              <option value="Canara Bank">Canara Bank</option>
              <option value="Punjab National Bank">Punjab National Bank</option>
              <option value="LIC Housing Finance">LIC Housing Finance</option>
              <option value="Bajaj Housing Finance">Bajaj Housing Finance</option>
              <option value="Other Bank / NBFC">Other Bank / NBFC</option>
            </select>
          </div>
        </div>

        {/* Outstanding Balance */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Outstanding Loan Balance
            </label>
            <span className="text-xs font-bold text-primary font-mono">
              ₹{(outstandingLoan / 100000).toFixed(0)} Lakhs
            </span>
          </div>
          <div className="grid grid-cols-4 gap-1.5 mb-2">
            {[3000000, 5000000, 7500000, 10000000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setOutstandingLoan(amt)}
                className={`py-1.5 px-1 text-[11px] font-bold rounded-lg transition-all cursor-pointer ${
                  outstandingLoan === amt
                    ? "bg-primary text-white shadow-xs"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                ₹{(amt / 100000).toFixed(0)}L
              </button>
            ))}
          </div>
          <input
            type="range"
            min={1000000}
            max={20000000}
            step={250000}
            value={outstandingLoan}
            onChange={(e) => setOutstandingLoan(Number(e.target.value))}
            className="w-full accent-primary h-1.5 bg-gray-200 rounded-lg cursor-pointer"
          />
        </div>

        {/* Current Interest Rate */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-wider">
              Current Interest Rate
            </label>
            <span className="text-xs font-bold text-amber-700 font-mono">
              {currentRate.toFixed(2)}% p.a.
            </span>
          </div>
          <input
            type="range"
            min={7.5}
            max={11.5}
            step={0.05}
            value={currentRate}
            onChange={(e) => setCurrentRate(Number(e.target.value))}
            className="w-full accent-amber-600 h-1.5 bg-gray-200 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            <span>7.50%</span>
            <span>9.00%</span>
            <span>10.50%</span>
            <span>11.50%</span>
          </div>
        </div>

        {/* Live Estimated Savings Box */}
        <div className="bg-linear-to-br from-[#EBF4ED] to-emerald-50/60 border border-emerald-200 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-emerald-900 font-medium">
              Estimated Monthly Savings:
            </span>
            <span className="text-sm font-bold text-emerald-700 font-mono">
              ₹{formatINR(monthlySavings)} / mo
            </span>
          </div>

          <div className="flex items-center justify-between border-t border-emerald-200/60 pt-2">
            <span className="text-xs text-emerald-900 font-medium">
              Total Lifetime Savings:
            </span>
            <span className="text-sm font-extrabold text-primary font-mono">
              ~₹{totalSavingsLakhs} Lakhs
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-[#035259] text-white font-bold text-xs sm:text-sm py-3 px-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-gold" />
          <span>Check Pre-Approved Transfer Offers</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </button>

        {/* Secondary Detailed Calculator link */}
        <button
          type="button"
          onClick={scrollToCalculator}
          className="w-full text-center text-xs text-gray-500 hover:text-primary transition-colors flex items-center justify-center gap-1.5 font-medium cursor-pointer"
        >
          <Calculator className="w-3.5 h-3.5" />
          <span>Open Full Interactive Savings Calculator</span>
        </button>
      </form>

      {/* Trust Guarantee */}
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-center gap-2 text-[11px] text-gray-500">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
        <span>RBI Regulated Lenders • Capped Processing Fees</span>
      </div>
    </div>
  );
}
