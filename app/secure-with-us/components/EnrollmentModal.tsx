"use client";

import React, { useState } from "react";
import {
  X,
  ShieldCheck,
  CheckCircle2,
  Lock,
  ArrowRight,
  Sparkles,
  AlertCircle,
  FileCheck2,
  Download,
  Building2,
  BadgeCheck,
} from "lucide-react";

export interface PlanDetails {
  id: "essential" | "plus" | "premium";
  name: string;
  price: number;
  maxCover: string;
  tagline: string;
}

interface EnrollmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: PlanDetails;
  onSelectPlan: (plan: PlanDetails) => void;
}

export default function EnrollmentModal({
  isOpen,
  onClose,
  selectedPlan,
  onSelectPlan,
}: EnrollmentModalProps) {
  const [step, setStep] = useState<"form" | "certificate">("form");
  const [fullName, setFullName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [primaryBank, setPrimaryBank] = useState("State Bank of India (SBI)");
  const [acknowledged, setAcknowledged] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const basePrice = selectedPlan.price;
  const gst = Math.round(basePrice * 0.18);
  const total = basePrice + gst;
  const mockPolicyNo = `CS-2026-IN-${Math.floor(100000 + Math.random() * 900000)}`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setStep("certificate");
    }, 900);
  };

  const handleReset = () => {
    setStep("form");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp font-montserrat"
        role="dialog"
        aria-modal="true"
      >
        {/* Header */}
        <div className="bg-primary text-white p-4 sm:p-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20">
              <ShieldCheck className="w-6 h-6 text-gold" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bricolage font-bold text-lg sm:text-xl text-white">
                  {step === "form" ? "Activate CyberShield" : "Protection Certificate Issued"}
                </h3>
              </div>
              <p className="text-xs text-white/80">
                Underwritten by IRDAI-regulated general insurer • Powered by Grofi
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6 overflow-y-auto">
          {step === "form" ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Plan Switcher Pills */}
              <div className="bg-gray-50 p-1.5 rounded-xl border border-gray-200 grid grid-cols-3 gap-1.5 text-xs">
                <button
                  type="button"
                  onClick={() =>
                    onSelectPlan({
                      id: "essential",
                      name: "CyberShield Essential",
                      price: 999,
                      maxCover: "₹50,000",
                      tagline: "Mass-Market Entry",
                    })
                  }
                  className={`py-2 px-1 text-center rounded-lg transition-all font-semibold cursor-pointer ${
                    selectedPlan.id === "essential"
                      ? "bg-white text-primary shadow-xs border border-gray-200"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <div className="text-[11px]">Essential</div>
                  <div className="font-bold text-gray-900">₹999/yr</div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSelectPlan({
                      id: "plus",
                      name: "CyberShield Plus (Hero)",
                      price: 1499,
                      maxCover: "₹1,00,000",
                      tagline: "Primary Product / Hero",
                    })
                  }
                  className={`py-2 px-1 text-center rounded-lg transition-all font-semibold cursor-pointer ${
                    selectedPlan.id === "plus"
                      ? "bg-primary text-white shadow-xs"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <div className="text-[11px] text-amber-200 font-bold">★ Plus (Hero)</div>
                  <div className="font-bold">₹1,499/yr</div>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    onSelectPlan({
                      id: "premium",
                      name: "CyberShield Premium",
                      price: 2499,
                      maxCover: "₹2,00,000 - ₹5,00,000",
                      tagline: "Executive & Family",
                    })
                  }
                  className={`py-2 px-1 text-center rounded-lg transition-all font-semibold cursor-pointer ${
                    selectedPlan.id === "premium"
                      ? "bg-white text-primary shadow-xs border border-gray-200"
                      : "text-gray-500 hover:text-gray-900"
                  }`}
                >
                  <div className="text-[11px]">Premium</div>
                  <div className="font-bold text-gray-900">₹2,499/yr</div>
                </button>
              </div>

              {/* Protection Summary Box */}
              <div className="bg-[#EBF4ED] border border-primary/20 rounded-xl p-3 text-xs flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-gray-600 uppercase">Selected Plan Maximum Protection</div>
                  <div className="font-bricolage font-black text-primary text-xl mt-0.5">
                    {selectedPlan.maxCover}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-[11px] text-gray-600">Total Annual Premium (incl. 18% GST)</div>
                  <div className="font-bold text-gray-900 text-base">₹{total.toLocaleString("en-IN")} / year</div>
                  <div className="text-[10px] text-gray-500">Approx ₹{Math.round(total / 12)} / month</div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-gray-700 font-bold mb-1">Full Legal Name (as per Bank Account) *</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Rajesh Kumar Sharma"
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Mobile Number (UPI Linked) *</label>
                    <input
                      type="tel"
                      required
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="e.g. 98765 43210"
                      className="w-full border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 font-bold mb-1">Email Address (for Policy PDF) *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. rajesh@example.com"
                      className="w-full border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900 focus:outline-hidden focus:border-primary focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-1">Primary Salary / Savings Bank</label>
                  <select
                    value={primaryBank}
                    onChange={(e) => setPrimaryBank(e.target.value)}
                    className="w-full border border-gray-300 rounded-xl p-2.5 text-xs text-gray-900 bg-white focus:outline-hidden focus:border-primary"
                  >
                    <option value="State Bank of India (SBI)">State Bank of India (SBI)</option>
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra Bank">Kotak Mahindra Bank</option>
                    <option value="Bank of Baroda">Bank of Baroda</option>
                    <option value="Punjab National Bank">Punjab National Bank</option>
                    <option value="Other Bank">Other Scheduled Commercial Bank</option>
                  </select>
                </div>

                {/* Terms and Exclusions Checkbox */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 space-y-2">
                  <label className="flex items-start gap-2 text-[11px] text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={acknowledged}
                      onChange={(e) => setAcknowledged(e.target.checked)}
                      className="mt-0.5 rounded text-primary focus:ring-primary shrink-0"
                    />
                    <span>
                      I understand that <strong>CyberShield</strong> protects against <em>defined unauthorized</em> financial cyber fraud. Voluntary transfers (e.g. Ponzi/crypto scams) and gross negligence (knowingly sharing OTP) are excluded per policy terms.
                    </span>
                  </label>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting || !acknowledged}
                className="w-full bg-primary hover:bg-[#013539] disabled:bg-gray-400 text-white font-bold py-3 px-4 rounded-xl text-sm transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing Mock Underwriting...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4 text-gold" />
                    <span>Simulate Instant Policy Issuance • ₹{total.toLocaleString("en-IN")}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500">
                <Lock className="w-3 h-3 text-emerald-600" />
                <span>256-Bit SSL Encrypted Mock Flow • No Sensitive Bank Credentials Requested</span>
              </div>
            </form>
          ) : (
            /* Certificate Generated View */
            <div className="space-y-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-2">
                  <BadgeCheck className="w-8 h-8" />
                </div>
                <h4 className="font-bricolage font-extrabold text-xl text-gray-900">
                  Mock Policy Certificate Generated!
                </h4>
                <p className="text-xs text-gray-600 mt-1">
                  Congratulations, {fullName || "Customer"}! Your simulated cyber protection policy is active.
                </p>
              </div>

              {/* Digital Certificate Card */}
              <div className="bg-linear-to-br from-[#02474D] to-[#01272B] text-white rounded-2xl p-5 shadow-xl relative overflow-hidden border border-gold/30">
                <div className="absolute top-0 right-0 w-40 h-40 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
                <div className="flex items-start justify-between border-b border-white/15 pb-3">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-5 h-5 text-gold" />
                      <span className="font-bricolage font-bold text-base tracking-wide">
                        GROFI CYBERSHIELD CERTIFICATE
                      </span>
                    </div>
                    <span className="text-[10px] text-gold/90 font-mono tracking-wider">
                      POLICY NO: {mockPolicyNo}
                    </span>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    ACTIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 my-4 text-xs">
                  <div>
                    <div className="text-[10px] text-white/60 uppercase">Insured Member</div>
                    <div className="font-semibold text-white">{fullName || "Rajesh Kumar"}</div>
                    <div className="text-[10px] text-white/70">{phoneNumber || "+91 98765 43210"}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/60 uppercase">Maximum Sum Insured</div>
                    <div className="font-bricolage font-bold text-lg text-amber-300">
                      {selectedPlan.maxCover}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/60 uppercase">Protected Bank / UPI</div>
                    <div className="text-white/90 text-[11px] font-medium">{primaryBank}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-white/60 uppercase">Valid Period</div>
                    <div className="text-white/90 text-[11px] font-medium">365 Days (1 Full Year)</div>
                  </div>
                </div>

                <div className="bg-black/25 rounded-xl p-2.5 flex items-center justify-between text-[11px] border border-white/10">
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-amber-200" />
                    <span>Risk Carrier: IRDAI-Regulated General Insurer</span>
                  </div>
                  <span className="text-gold font-bold">Hero Plan</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => alert(`Policy Certificate ${mockPolicyNo} downloaded (Mock simulation)`)}
                  className="flex-1 bg-gray-900 hover:bg-black text-white text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Policy Certificate (PDF)</span>
                </button>
                <button
                  type="button"
                  onClick={handleReset}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold py-2.5 px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
