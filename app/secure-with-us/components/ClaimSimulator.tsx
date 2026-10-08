"use client";

import React, { useState } from "react";
import {
  Scale,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Info,
  ArrowRight,
  TrendingUp,
  Landmark,
  ShieldAlert,
} from "lucide-react";

export default function ClaimSimulator() {
  // Preset scenarios from Section 4 of the blueprint
  const blueprintScenarios = [
    {
      id: "unauthorized-75k",
      title: "1. Covered Unauthorized Fraud",
      loss: 75000,
      bankRecovery: 0,
      eligibility: "If all policy conditions & reporting SLAs are met",
      potentialPayment: 75000,
      paymentLabel: "Up to ₹75,000",
      payoutColor: "text-emerald-700 bg-emerald-50 border-emerald-200",
      outcome: "Full reimbursement of admissible loss within ₹1,00,000 sum insured cap.",
      isCovered: true,
    },
    {
      id: "loss-140k",
      title: "2. Catastrophic Fraud Exceeding Cap",
      loss: 140000,
      bankRecovery: 0,
      eligibility: "If all policy conditions & reporting SLAs are met",
      potentialPayment: 100000,
      paymentLabel: "Maximum ₹1,00,000",
      payoutColor: "text-primary bg-primary/10 border-primary/20",
      outcome: "Payment is capped at the hero plan limit of ₹1 Lakh. Excess loss is borne by applicant.",
      isCovered: true,
    },
    {
      id: "bank-recovery-40k",
      title: "3. Bank Recovers ₹40,000 First",
      loss: 100000,
      bankRecovery: 40000,
      eligibility: "Subject to RBI recovery & no double-dipping rules",
      potentialPayment: 60000,
      paymentLabel: "Balance ₹60,000 considered",
      payoutColor: "text-blue-700 bg-blue-50 border-blue-200",
      outcome: "Bank chargeback of ₹40,000 is deducted. Insurance covers remaining unrecovered loss of ₹60,000.",
      isCovered: true,
    },
    {
      id: "crypto-scam",
      title: "4. Investment / Task / Crypto Scam",
      loss: 80000,
      bankRecovery: 0,
      eligibility: "Not covered unless expressly included as a rider",
      potentialPayment: 0,
      paymentLabel: "₹0 (Excluded)",
      payoutColor: "text-rose-700 bg-rose-50 border-rose-200",
      outcome: "Voluntary transfers to high-yield schemes are excluded under standard unauthorized cyber fraud terms.",
      isCovered: false,
    },
    {
      id: "network-outage",
      title: "5. Bank App / Network Outage Glitch",
      loss: 20000,
      bankRecovery: 0,
      eligibility: "Not automatically a cyber fraud incident",
      potentialPayment: 0,
      paymentLabel: "₹0 (Bank Settlement)",
      payoutColor: "text-amber-800 bg-amber-50 border-amber-200",
      outcome: "Pending settlement timeouts are resolved by bank grievance reversal, not insurance claims.",
      isCovered: false,
    },
  ];

  const [activeScenarioId, setActiveScenarioId] = useState<string>("unauthorized-75k");
  const selectedScenario = blueprintScenarios.find((s) => s.id === activeScenarioId) || blueprintScenarios[0];

  // Custom Interactive Simulator State
  const [customLoss, setCustomLoss] = useState<number>(85000);
  const [bankRecoveredAmt, setBankRecoveredAmt] = useState<number>(0);
  const [isVoluntaryTransfer, setIsVoluntaryTransfer] = useState<boolean>(false);

  // Payout calculation for custom mode
  const policySumInsured = 100000;
  const netUnrecoveredLoss = Math.max(0, customLoss - bankRecoveredAmt);
  const calculatedCustomPayout = isVoluntaryTransfer
    ? 0
    : Math.min(policySumInsured, netUnrecoveredLoss);

  return (
    <section id="claim-simulator-section" className="py-16 sm:py-24 bg-white font-montserrat">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary border border-primary/20 rounded-full px-3.5 py-1 text-xs font-bold shadow-2xs mb-3">
            <Scale className="w-3.5 h-3.5 text-gold" />
            <span>Section 4 • Reality Check &amp; Trust</span>
          </div>
          <h2 className="font-bricolage font-extrabold text-3xl sm:text-4xl text-gray-900 tracking-tight">
            How the ₹1 Lakh Cover Actually Works
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Real-world claim scenarios to set transparent consumer expectations. No false marketing promises.
          </p>
        </div>

        {/* Blueprint 5 Scenario Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 mb-8">
          {blueprintScenarios.map((scen) => (
            <button
              key={scen.id}
              onClick={() => setActiveScenarioId(scen.id)}
              className={`p-3 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                activeScenarioId === scen.id
                  ? "bg-primary text-white border-primary shadow-md scale-102"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-800"
              }`}
            >
              <div>
                <span className={`text-[10px] font-bold uppercase tracking-wider block ${
                  activeScenarioId === scen.id ? "text-gold" : "text-gray-400"
                }`}>
                  {scen.isCovered ? "Eligible Event" : "Excluded Event"}
                </span>
                <span className="font-bricolage font-bold text-xs sm:text-sm line-clamp-2 mt-1">
                  {scen.title}
                </span>
              </div>
              <div className="mt-3 pt-2 border-t border-current/10 flex items-center justify-between text-xs font-mono">
                <span className="opacity-80">Loss: ₹{(scen.loss).toLocaleString("en-IN")}</span>
                <span className="font-bold">{scen.paymentLabel}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Scenario Detail Card */}
        <div className="bg-linear-to-br from-[#FDFBF7] to-white rounded-3xl p-6 sm:p-8 border border-gray-200 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-7 space-y-4">
              <div className="flex items-center gap-2">
                <span className="bg-primary/10 text-primary font-mono text-xs font-bold px-2.5 py-1 rounded-md">
                  BLUEPRINT SCENARIO
                </span>
                <h3 className="font-bricolage font-bold text-xl sm:text-2xl text-gray-900">
                  {selectedScenario.title}
                </h3>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <div className="text-gray-500 text-[10px] uppercase font-bold">Total Fraud Loss</div>
                  <div className="font-bricolage font-extrabold text-lg text-gray-900 mt-0.5">
                    ₹{selectedScenario.loss.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200">
                  <div className="text-gray-500 text-[10px] uppercase font-bold">Bank Recovered</div>
                  <div className="font-bricolage font-extrabold text-lg text-blue-700 mt-0.5">
                    ₹{selectedScenario.bankRecovery.toLocaleString("en-IN")}
                  </div>
                </div>
                <div className="p-3 bg-white rounded-xl border border-gray-200 col-span-2 sm:col-span-1">
                  <div className="text-gray-500 text-[10px] uppercase font-bold">Sum Insured Limit</div>
                  <div className="font-bricolage font-extrabold text-lg text-primary mt-0.5">
                    ₹1,00,000
                  </div>
                </div>
              </div>

              <div className="p-3.5 bg-gray-50 rounded-xl border border-gray-200 text-xs space-y-1">
                <div className="text-gray-500 font-bold uppercase text-[10px]">Eligibility Criteria:</div>
                <div className="text-gray-800 font-medium">{selectedScenario.eligibility}</div>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                <strong>Why this happens:</strong> {selectedScenario.outcome}
              </p>
            </div>

            {/* Right: Potential Insurance Payment Display */}
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-white rounded-2xl border border-gray-200 text-center shadow-xs">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                Potential Insurance Payout
              </div>
              <div className={`mt-2 font-bricolage font-black text-3xl sm:text-4xl px-4 py-2 rounded-2xl border ${selectedScenario.payoutColor}`}>
                {selectedScenario.paymentLabel}
              </div>
              <div className="mt-3 text-[11px] text-gray-500 max-w-xs">
                {selectedScenario.isCovered
                  ? "✓ Disbursed directly to your verified bank account once claim is approved by insurer."
                  : "✕ Excluded peril. Not compensable under unauthorized cyber fraud coverage."}
              </div>
            </div>

          </div>
        </div>

        {/* Interactive Custom Loss Simulator Drawer */}
        <div className="mt-12 bg-linear-to-r from-primary to-[#013539] text-white rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 border-b border-white/10 pb-4">
            <div>
              <span className="text-gold text-xs font-bold uppercase tracking-wider">Interactive Playground</span>
              <h3 className="font-bricolage font-extrabold text-xl sm:text-2xl text-white">
                Test Any Custom Loss Amount
              </h3>
            </div>
            <div className="text-xs text-white/80 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
              Hero Sum Insured: <strong>₹1,00,000</strong>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Slider Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-5 text-xs">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold text-white/90">
                    Simulated Unauthorized Fraud Loss Amount:
                  </label>
                  <span className="font-bricolage font-bold text-xl text-amber-300">
                    ₹{customLoss.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="5000"
                  max="200000"
                  step="5000"
                  value={customLoss}
                  onChange={(e) => setCustomLoss(Number(e.target.value))}
                  className="custom-range-slider"
                />
                <div className="flex justify-between text-[10px] text-white/50 mt-1">
                  <span>₹5,000</span>
                  <span>₹1,00,000 (Hero Cap)</span>
                  <span>₹2,00,000</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="font-semibold text-white/90">
                    Amount Recovered by Bank / Merchant (if any):
                  </label>
                  <span className="font-bricolage font-bold text-base text-blue-300">
                    ₹{bankRecoveredAmt.toLocaleString("en-IN")}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max={customLoss}
                  step="5000"
                  value={bankRecoveredAmt}
                  onChange={(e) => setBankRecoveredAmt(Number(e.target.value))}
                  className="custom-range-slider"
                />
                <div className="flex justify-between text-[10px] text-white/50 mt-1">
                  <span>₹0 (Zero Bank Recovery)</span>
                  <span>₹{customLoss.toLocaleString("en-IN")} (Full Chargeback)</span>
                </div>
              </div>

              {/* Exclusion toggle test */}
              <div className="p-3 bg-white/10 rounded-xl border border-white/15 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">Was this transfer voluntary (e.g. investment scheme / task fraud)?</div>
                  <div className="text-[10px] text-white/70">Voluntary transfers do not qualify as unauthorized cyber fraud.</div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
                  <input
                    type="checkbox"
                    checked={isVoluntaryTransfer}
                    onChange={(e) => setIsVoluntaryTransfer(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-white/20 peer-focus:outline-hidden rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-rose-500"></div>
                </label>
              </div>
            </div>

            {/* Calculated Output (5 cols) */}
            <div className="lg:col-span-5 bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center">
              <span className="text-[11px] uppercase tracking-wider text-white/70 font-bold">
                Simulated Net Claim Payout
              </span>
              <div className="font-bricolage font-black text-3xl sm:text-4xl text-amber-300 mt-2">
                ₹{calculatedCustomPayout.toLocaleString("en-IN")}
              </div>

              <div className="mt-4 pt-3 border-t border-white/15 text-left text-[11px] space-y-1.5 text-white/80">
                <div className="flex justify-between">
                  <span>Gross Fraud Loss:</span>
                  <span className="font-mono">₹{customLoss.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Less: Bank Recovery:</span>
                  <span className="font-mono text-blue-200">- ₹{bankRecoveredAmt.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between">
                  <span>Net Unrecovered Loss:</span>
                  <span className="font-mono">₹{netUnrecoveredLoss.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex justify-between font-bold text-white pt-1 border-t border-white/10">
                  <span>Subject to Hero Plan Cap:</span>
                  <span className="text-amber-300">Min(Net Loss, ₹1,00,000)</span>
                </div>
              </div>

              {isVoluntaryTransfer && (
                <div className="mt-3 p-2 bg-rose-500/30 border border-rose-400 text-rose-200 rounded-lg text-[10px]">
                  ⚠️ Marked as voluntary transfer. Claim payout is ₹0 under unauthorized cyber fraud policy terms.
                </div>
              )}
            </div>

          </div>
        </div>

        {/* Verbatim Disclaimer */}
        <div className="mt-6 text-center text-xs text-gray-500">
          Illustrations only. Final claim admissibility and settlement decisions follow the approved policy wording, terms, and surveyor findings.
        </div>

      </div>
    </section>
  );
}
