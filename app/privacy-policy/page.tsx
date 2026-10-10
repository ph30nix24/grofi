import { Metadata } from "next";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { ShieldCheck, Lock, FileText, CheckCircle2, UserCheck, Bell } from "lucide-react";
import { CURRENT_CONSENT_VERSION } from "@/app/constants/consent";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: "Privacy Policy | Grofi",
  description:
    "Learn how Grofi collects, uses, protects, and governs your personal and financial data in accordance with DPDP regulations and RBI Digital Lending Guidelines.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Grofi",
    description:
      "Our commitment to protecting your privacy, data sovereignty, and secure credit & loan comparisons.",
    url: "https://www.grofi.in/privacy-policy",
    siteName: "Grofi",
    locale: "en_IN",
    type: "website",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[#FDFBF7] text-gray-800 font-montserrat">
        {/* Hero Banner */}
        <section className="bg-gradient-to-b from-[#02474D] to-[#012f33] text-white py-16 sm:py-20 px-4 sm:px-6 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 text-emerald-300 text-xs font-semibold mb-4 border border-white/15">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>DPDP Act & RBI Compliance Ready • Policy Version: {CURRENT_CONSENT_VERSION}</span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold font-bricolage tracking-tight leading-tight">
              Grofi Privacy Policy & Consent Notice
            </h1>
            <p className="mt-4 text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
              We respect your privacy and never sell your personal information. Read our transparent data collection, consent architecture, and partner disclosure policy below.
            </p>
            <p className="text-xs text-gray-400 mt-3">
              Last updated: October 2026 • Policy Version: {CURRENT_CONSENT_VERSION}
            </p>
          </div>
        </section>

        {/* Content Body */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-16 space-y-10">
          {/* Section 1 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200/80">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4ED] text-[#02474D] flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-bricolage text-gray-900">
                Explicit & Versioned Consent
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Grofi operates on an unambiguous, opt-in consent model. When you check the consent checkbox on any loan, credit card, or advisory application form, you explicitly authorize Grofi and its partnered RBI-regulated lending institutions to:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-gray-600">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Contact you via Phone Call, SMS, WhatsApp, or Email regarding the status of your inquiry.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Assess your eligibility for the financial product requested.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                <span>Record a cryptographically timestamped server consent record linked to policy version <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[#02474D] font-mono font-bold text-xs">{CURRENT_CONSENT_VERSION}</code>.</span>
              </li>
            </ul>
          </div>

          {/* Section 2 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200/80">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4ED] text-[#02474D] flex items-center justify-center font-bold">
                2
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-bricolage text-gray-900">
                Information We Collect
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              We collect information you explicitly provide to us when submitting an application:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h3 className="font-bold text-sm text-gray-900 mb-1">Contact Information</h3>
                <p className="text-xs text-gray-600">Full name, verified 10-digit mobile number, email address, and city of residence.</p>
              </div>
              <div className="p-4 rounded-xl bg-gray-50 border border-gray-100">
                <h3 className="font-bold text-sm text-gray-900 mb-1">Financial Requirements</h3>
                <p className="text-xs text-gray-600">Desired loan amount, employment category, income band, and self-reported credit score tier.</p>
              </div>
            </div>
          </div>

          {/* Section 3 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200/80">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4ED] text-[#02474D] flex items-center justify-center font-bold">
                3
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-bricolage text-gray-900">
                No Spam Guarantee & Data Protection
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              We have a zero-tolerance policy for unsolicited telemarketing. Your contact number is never broadcasted to unauthorized lists or third-party marketing agencies. All data in transit is encrypted with 256-bit TLS/SSL protocols.
            </p>
          </div>

          {/* Section 4 */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-200/80">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-[#EBF4ED] text-[#02474D] flex items-center justify-center font-bold">
                4
              </div>
              <h2 className="text-xl sm:text-2xl font-bold font-bricolage text-gray-900">
                Consent Revocation & Grievance Redressal
              </h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              In accordance with Digital Personal Data Protection (DPDP) standards, you retain the right to withdraw your consent or request the deletion of your lead data at any time. To withdraw consent or raise a grievance, please write to our Data Protection Officer at:
            </p>
            <div className="mt-4 p-4 rounded-xl bg-[#EBF4ED]/60 border border-[#02474D]/20 text-xs sm:text-sm text-[#02474D]">
              <p className="font-bold">Grievance & Data Privacy Desk: Grofi Fintech Private Limited</p>
              <p className="mt-1 text-gray-700">Email: <a href="mailto:privacy@grofi.in" className="underline font-semibold text-[#02474D]">privacy@grofi.in</a></p>
              <p className="text-gray-700">Turnaround Time: Acknowledgement within 24 hours, resolution within 7 working days.</p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
