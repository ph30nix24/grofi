"use client";

import React, { useState } from "react";
import {
  AlertTriangle,
  X,
  PhoneCall,
  ShieldAlert,
  FileText,
  CheckCircle2,
  Lock,
  ExternalLink,
  Copy,
  Clock,
  ArrowRight,
} from "lucide-react";

interface EmergencyReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EmergencyReportModal({
  isOpen,
  onClose,
}: EmergencyReportModalProps) {
  const [activeTab, setActiveTab] = useState<"helpline" | "banks" | "draft">("helpline");
  const [copied, setCopied] = useState(false);
  const [fraudType, setFraudType] = useState("UPI Fraud");
  const [approxAmount, setApproxAmount] = useState("25000");

  if (!isOpen) return null;

  const bankHelplines = [
    { bank: "State Bank of India (SBI)", number: "1800 11 1109 / 1800 425 3800", action: "Block UPI / NetBanking" },
    { bank: "HDFC Bank", number: "1800 258 3838 / 1800 266 4060", action: "Block Cards / NetBanking" },
    { bank: "ICICI Bank", number: "1800 1080", action: "Emergency Debit/UPI Freeze" },
    { bank: "Axis Bank", number: "1860 419 5555 / 1860 500 5555", action: "Lock Account / Stop Outward" },
    { bank: "NPCI / UPI Helpline", number: "1800 120 1740", action: "Disputed UPI Transactions" },
  ];

  const complaintSample = `URGENT INCIDENT REPORT:
Fraud Type: ${fraudType}
Estimated Loss: ₹${approxAmount}
Date & Time: ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
Platform / App: Bank UPI / Mobile App
Description: An unauthorized financial debit was detected. I request an immediate transaction trace, freeze of the beneficiary account, and transaction reversal as per RBI Zero-Liability Guidelines (RBI/2017-18/15 DBR.No.Leg.BC.78/09.07.005/2017-18).
Customer Note: I have NOT shared my OTP, PIN, or CVV.`;

  const handleCopy = () => {
    navigator.clipboard.writeText(complaintSample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-rose-100 overflow-hidden flex flex-col max-h-[92vh] animate-scaleUp font-montserrat"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Bar */}
        <div className="bg-linear-to-r from-rose-700 via-rose-600 to-amber-700 p-4 sm:p-5 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0 border border-white/20">
              <ShieldAlert className="w-6 h-6 text-amber-200 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bricolage font-extrabold text-lg sm:text-xl">
                  One-Tap Report Fraud
                </h3>
                <span className="bg-amber-400 text-rose-950 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full">
                  Golden Hour Protocol
                </span>
              </div>
              <p className="text-xs text-rose-100 mt-0.5">
                Immediate 1st-response journey within 15–60 minutes of unauthorized debit
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Golden Hour Countdown Banner */}
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5 flex items-center justify-between text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Crucial Rule:</strong> Reporting within the first 2 hours increases fund recovery chances by over 78%.
            </span>
          </div>
          <div className="hidden sm:flex items-center gap-1 font-mono font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
            SLA: &lt; 15 mins
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50/70 text-xs font-semibold">
          <button
            onClick={() => setActiveTab("helpline")}
            className={`py-3 px-2 text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "helpline"
                ? "border-b-2 border-rose-600 bg-white text-rose-700 font-bold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5" />
            <span>Step 1: 1930 Cybercell</span>
          </button>
          <button
            onClick={() => setActiveTab("banks")}
            className={`py-3 px-2 text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "banks"
                ? "border-b-2 border-rose-600 bg-white text-rose-700 font-bold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Step 2: Bank Freeze</span>
          </button>
          <button
            onClick={() => setActiveTab("draft")}
            className={`py-3 px-2 text-center transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === "draft"
                ? "border-b-2 border-rose-600 bg-white text-rose-700 font-bold"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Step 3: Auto-Draft</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          {activeTab === "helpline" && (
            <div className="space-y-4">
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold text-lg shrink-0">
                    1930
                  </div>
                  <div className="flex-1">
                    <h4 className="font-bricolage font-bold text-gray-900 text-base">
                      National Cyber Crime Reporting Helpline
                    </h4>
                    <p className="text-xs text-gray-600 mt-1 leading-relaxed">
                      Operated by Indian Cyber Crime Coordination Centre (I4C), MHA. Dial <strong>1930</strong> immediately from your registered mobile number to put a financial freeze on fraud beneficiary accounts.
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <a
                        href="tel:1930"
                        className="inline-flex items-center gap-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>Dial 1930 Now</span>
                      </a>
                      <a
                        href="https://cybercrime.gov.in"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 bg-white border border-gray-300 hover:border-gray-400 text-gray-700 text-xs font-semibold px-3 py-2 rounded-lg transition-colors"
                      >
                        <span>Visit cybercrime.gov.in</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 p-4 bg-gray-50/50">
                <h5 className="font-bricolage font-bold text-sm text-gray-900 mb-2">
                  What details 1930 officer will ask:
                </h5>
                <ul className="text-xs text-gray-600 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Your Bank Name & 16-digit Account / Card Number</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Exact Transaction UTR / Reference ID / UPI Transaction ID</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Recipient UPI ID or Beneficiary Bank Account number</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Time & date screenshot from SMS or UPI app statement</span>
                  </li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === "banks" && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600">
                Call your bank immediately to block outward net banking access, hotlist cards, and initiate a dispute token:
              </p>
              <div className="divide-y divide-gray-100 border border-gray-200 rounded-xl overflow-hidden bg-white">
                {bankHelplines.map((item, idx) => (
                  <div key={idx} className="p-3 hover:bg-gray-50 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-gray-900">{item.bank}</div>
                      <div className="text-[11px] text-gray-500">{item.action}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold text-primary">{item.number}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-900 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
                <span>
                  <strong>Tip:</strong> Demand a formal <em>&apos;Complaint Acknowledgment Token Number&apos;</em> from the bank rep. This token is required for both the police FIR and Grofi CyberShield claims.
                </span>
              </div>
            </div>
          )}

          {activeTab === "draft" && (
            <div className="space-y-3">
              <p className="text-xs text-gray-600">
                Generate an immediate email complaint to send to your bank branch and cyber cell nodal officer:
              </p>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Fraud Incident Type</label>
                  <select
                    value={fraudType}
                    onChange={(e) => setFraudType(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs bg-white text-gray-800"
                  >
                    <option value="Unauthorized UPI QR Scam">Unauthorized UPI QR Scam</option>
                    <option value="NetBanking Session Hijack">NetBanking Session Hijack</option>
                    <option value="Cloned Debit/Credit Card">Cloned Debit/Credit Card</option>
                    <option value="Phishing SMS / Fake Portal">Phishing SMS / Fake Portal</option>
                    <option value="SIM Swap Unauthorized Debit">SIM Swap Unauthorized Debit</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-gray-700 mb-1">Debited Amount (₹)</label>
                  <input
                    type="number"
                    value={approxAmount}
                    onChange={(e) => setApproxAmount(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 text-xs text-gray-800"
                    placeholder="25000"
                  />
                </div>
              </div>

              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-3.5 rounded-xl text-[11px] leading-relaxed whitespace-pre-wrap font-mono max-h-48 overflow-y-auto border border-gray-700">
                  {complaintSample}
                </pre>
                <button
                  onClick={handleCopy}
                  className="absolute top-2 right-2 bg-white/20 hover:bg-white/30 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-md flex items-center gap-1 backdrop-blur-xs transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>Copy Template</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer Guarantee */}
        <div className="bg-gray-100 p-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-emerald-800">
            <Lock className="w-4 h-4 text-emerald-700 shrink-0" />
            <span className="font-semibold text-[11px]">
              Grofi Rule: We NEVER ask for your OTP, PIN, CVV, or passwords.
            </span>
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto bg-gray-900 hover:bg-black text-white font-bold px-4 py-2 rounded-xl text-xs transition-colors cursor-pointer"
          >
            Close Emergency Guide
          </button>
        </div>
      </div>
    </div>
  );
}
