"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from "react";
import {
  X,
  User,
  Phone,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  Loader2,
  Landmark,
  ChevronDown,
  Clock,
  Headphones,
  Lock,
} from "lucide-react";

interface ApplyModalContextType {
  isOpen: boolean;
  productName: string;
  productSubtitle?: string;
  openApplyModal: (productName?: string, productSubtitle?: string) => void;
  closeApplyModal: () => void;
}

export interface ProductCategoryGroup {
  category: string;
  items: string[];
}

const ApplyModalContext = createContext<ApplyModalContextType | undefined>(undefined);

export const productCategories: ProductCategoryGroup[] = [
  {
    category: "Credit Cards",
    items: [
      "Credit Card",
      "Magnus Credit Card",
      "Infinia Metal Edition",
      "Cashback Credit Card",
      "Atlas Credit Card",
      "Emeralde Private Metal",
      "Platinum Card (Metal)",
      "Diners Club Black (Metal)",
      "Gold Charge Card",
      "Marquée Credit Card",
      "Tata Neu Infinity HDFC",
      "Credit Card Pre-Approved Offers",
    ],
  },
  {
    category: "Loans & Financing",
    items: [
      "Personal Loan",
      "Short Term Personal Loan",
      "Gold Loan",
      "Business Loan",
      "Home Loan",
      "Loan Against Property",
      "Home Loan Balance Transfer",
      "Loan Against Mutual Fund",
    ],
  },
  {
    category: "Insurance & Other",
    items: [
      "Health Insurance",
      "General Pre-Approved Offers",
    ],
  },
];

export function ApplyModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState("Personal Loan");
  const [productSubtitle, setProductSubtitle] = useState<string | undefined>(undefined);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("Personal Loan");
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Dynamically ensure selectedProduct is always present in categories so select never defaults incorrectly
  const allProductCategories = useMemo(() => {
    const allItems = productCategories.flatMap((c) => c.items);
    if (selectedProduct && !allItems.includes(selectedProduct)) {
      const isCard = selectedProduct.toLowerCase().includes("card");
      return productCategories.map((cat) => {
        if (isCard && cat.category === "Credit Cards") {
          return { ...cat, items: [selectedProduct, ...cat.items] };
        }
        if (!isCard && cat.category === "Loans & Financing") {
          return { ...cat, items: [selectedProduct, ...cat.items] };
        }
        return cat;
      });
    }
    return productCategories;
  }, [selectedProduct]);

  const openApplyModal = (prodName?: string, prodSubtitle?: string) => {
    const finalName = prodName || "Personal Loan";
    setProductName(finalName);
    setSelectedProduct(finalName);
    setProductSubtitle(prodSubtitle);
    setName("");
    setPhone("");
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
    setIsOpen(true);
  };

  const closeApplyModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setName("");
      setPhone("");
      setErrors({});
    }, 200);
  };

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeApplyModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Prevent background body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const validateForm = () => {
    const newErrors: { name?: string; phone?: string } = {};

    if (!name.trim()) {
      newErrors.name = "Please enter your full name";
    } else if (name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    const cleanPhone = phone.replace(/\D/g, "");
    if (!cleanPhone) {
      newErrors.phone = "Please enter your mobile number";
    } else if (cleanPhone.length !== 10) {
      newErrors.phone = "Please enter a valid 10-digit mobile number";
    } else if (!/^[6-9]/.test(cleanPhone)) {
      newErrors.phone = "Mobile number must start with 6, 7, 8, or 9";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <ApplyModalContext.Provider
      value={{
        isOpen,
        productName,
        productSubtitle,
        openApplyModal,
        closeApplyModal,
      }}
    >
      {children}

      {/* ── Popup Form Modal ── */}
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 bg-black/65 backdrop-blur-sm animate-fadeIn">
          
          {/* Backdrop click dismiss */}
          <div
            className="absolute inset-0"
            onClick={closeApplyModal}
          />

          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100 z-10 animate-scaleUp overflow-hidden">
            
            {/* Background decorative glow */}
            <div className="absolute -top-16 -right-16 w-44 h-44 bg-linear-to-br from-primary/10 to-gold/15 rounded-full blur-2xl pointer-events-none" />

            {/* Close button */}
            <button
              onClick={closeApplyModal}
              className="absolute top-5 right-5 w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors cursor-pointer z-10"
              aria-label="Close dialog"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <div>
                {/* Modal Header */}
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-primary/15 mb-2.5">
                    <Sparkles className="w-3 h-3 text-gold" />
                    Instant Application
                  </div>

                  <h3 className="font-bricolage font-bold text-2xl text-gray-900 leading-tight">
                    Apply for <span className="text-primary">{productName}</span>
                  </h3>
                  <p className="text-xs text-gray-500 font-montserrat mt-1 leading-relaxed">
                    {productSubtitle || "Enter your contact details below to check pre-approved offers and get quick assistance."}
                  </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-montserrat">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                        }}
                        placeholder="Enter your full name"
                        className={`w-full bg-gray-50 border rounded-xl pl-10 pr-4 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all font-montserrat ${
                          errors.name
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-[11px] text-red-500 font-medium font-montserrat mt-1 pl-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-montserrat">
                      Mobile Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative flex">
                      <div className="bg-gray-100 border border-r-0 border-gray-200 rounded-l-xl px-3 py-3 text-xs sm:text-sm font-bold text-gray-600 flex items-center gap-1.5 select-none">
                        <Phone className="w-3.5 h-3.5 text-primary" />
                        <span>+91</span>
                      </div>
                      <input
                        type="tel"
                        maxLength={10}
                        value={phone}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          setPhone(val);
                          if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                        }}
                        placeholder="98765 43210"
                        className={`flex-1 bg-gray-50 border rounded-r-xl px-3.5 py-3 text-xs sm:text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:bg-white transition-all font-montserrat tracking-wider ${
                          errors.phone
                            ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100"
                            : "border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10"
                        }`}
                      />
                    </div>
                    {errors.phone && (
                      <p className="text-[11px] text-red-500 font-medium font-montserrat mt-1 pl-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Product Selector Dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-1.5 font-montserrat">
                      Interested Product
                    </label>
                    <div className="relative">
                      <Landmark className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <select
                        value={selectedProduct}
                        onChange={(e) => {
                          setSelectedProduct(e.target.value);
                          setProductName(e.target.value);
                        }}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-9 py-3 text-xs sm:text-sm font-semibold text-gray-900 focus:outline-none focus:border-primary focus:bg-white focus:ring-2 focus:ring-primary/10 transition-all font-montserrat appearance-none cursor-pointer"
                      >
                        {allProductCategories.map((group) => (
                          <optgroup key={group.category} label={group.category} className="font-bold text-gray-900 bg-gray-100">
                            {group.items.map((prod) => (
                              <option key={prod} value={prod} className="font-medium text-gray-700 bg-white">
                                {prod}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <ChevronDown className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    </div>
                  </div>

                  {/* Trust & Consent Note */}
                  <div className="bg-[#EBF4ED]/50 border border-primary/10 rounded-xl p-3 flex items-start gap-2.5 text-[11px] text-gray-600 font-montserrat leading-relaxed">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>
                      Your information is 100% confidential. No spam calls — only genuine bank offers and expert advice.
                    </span>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-primary hover:bg-primary/90 text-white font-montserrat font-bold text-sm py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg transition-all duration-200 cursor-pointer disabled:opacity-75 group mt-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Application...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Application</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              /* ── High-End Celebratory Confirmation Screen ── */
              <div className="text-center py-2 animate-fadeIn relative">
                
                {/* Decorative radial lighting */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-44 h-44 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />

                {/* Multi-ring pulsating luxury checkmark badge */}
                <div className="relative flex items-center justify-center my-3">
                  <div className="absolute w-18 h-18 rounded-full bg-emerald-500/15 animate-ping duration-1000 pointer-events-none" />
                  <div className="relative w-18 h-18 rounded-full bg-linear-to-tr from-emerald-500 via-teal-400 to-[#C9AA3C] p-0.5 shadow-xl shadow-emerald-500/25 flex items-center justify-center">
                    <div className="w-full h-full bg-white rounded-full flex items-center justify-center p-1">
                      <div className="w-full h-full bg-linear-to-br from-primary to-[#035259] rounded-full flex items-center justify-center text-white shadow-inner">
                        <CheckCircle2 className="w-7 h-7 text-emerald-300 stroke-[2.5]" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Status Reference Pill */}
                <div className="inline-flex items-center gap-1.5 bg-[#EBF4ED] text-primary px-3.5 rounded-full text-[11px] font-bold font-montserrat mt-2  border border-primary/15 shadow-2xs py-2 mb-4">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Application Received
                </div>

                {/* Main Heading */}
                <h3 className="font-bricolage font-bold text-2xl sm:text-[1.7rem] text-gray-900 leading-tight">
                  You&apos;re All Set, <span className="text-primary">{name || "Applicant"}</span>!
                </h3>

                {/* Prominent Callback Callout Box */}
                <div className="bg-linear-to-r from-[#EBF4ED] via-emerald-50 to-[#EBF4ED] border border-emerald-300/80 rounded-2xl p-3.5 my-3.5 shadow-xs flex items-center gap-3 text-left">
                  <div className="w-10 h-10 rounded-xl bg-linear-to-tr from-primary to-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                    <Headphones className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-montserrat font-bold text-emerald-950 text-sm sm:text-base leading-tight">
                      Our expert will contact you very shortly.
                    </p>
                    <p className="text-[11px] text-emerald-800/85 font-montserrat mt-0.5 flex items-center gap-1 font-medium">
                      <Clock className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      Estimated response time: <strong className="font-bold text-emerald-950">Under 15 minutes</strong>
                    </p>
                  </div>
                </div>

                {/* Application Details Summary Ticket */}
                <div className="bg-gray-50/85 border border-gray-200/70 rounded-2xl p-3.5 my-3 text-left mb-8">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2 flex items-center justify-between font-montserrat">
                    <span>Application Summary</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
                      <span className="text-[10px] text-gray-400 font-medium block font-montserrat">Selected Product</span>
                      <span className="text-xs font-bold text-gray-900 block mt-0.5 truncate font-montserrat" title={selectedProduct}>
                        {selectedProduct}
                      </span>
                    </div>

                    <div className="bg-white p-2.5 rounded-xl border border-gray-100 shadow-2xs">
                      <span className="text-[10px] text-gray-400 font-medium block font-montserrat">Registered Mobile</span>
                      <span className="text-xs font-bold text-gray-900 block mt-0.5 font-mono tracking-wide">
                        +91 {phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Security Trust Badges */}
                <div className="flex items-center justify-center gap-3 text-[10px] sm:text-[11px] text-gray-500 font-montserrat my-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>100% Free Service</span>
                  </div>
                  <span className="w-1 h-1 rounded-full bg-gray-300" />
                  <div className="flex items-center gap-1 text-gray-600">
                    <Lock className="w-3.5 h-3.5 text-primary" />
                    <span>256-Bit SSL Encrypted</span>
                  </div>
                </div>

                {/* Done Action Button */}
                <button
                  onClick={closeApplyModal}
                  className="w-full bg-linear-to-r from-primary to-[#035259] hover:from-primary/95 hover:to-primary text-white font-montserrat font-bold text-xs sm:text-sm py-3.5 px-6 rounded-xl transition-all shadow-md hover:shadow-lg cursor-pointer"
                >
                  Done
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </ApplyModalContext.Provider>
  );
}

export function useApplyModal() {
  const context = useContext(ApplyModalContext);
  if (!context) {
    throw new Error("useApplyModal must be used within an ApplyModalProvider");
  }
  return context;
}
