"use client";

import { useEffect } from "react";
import Link from "next/link";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to an error reporting service
    console.error("Application error captured:", error);
  }, [error]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FDFBF7] text-gray-900">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="max-w-md w-full text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-6 shadow-sm">
            <AlertTriangle className="w-7 h-7" />
          </div>

          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight mb-3">
            Something Went Wrong
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mb-6">
            We encountered an unexpected error while loading this page. Our team has been notified.
          </p>

          {error.digest && (
            <div className="mb-6 p-2.5 rounded-lg bg-gray-100 border border-gray-200 text-xs font-mono text-gray-500 truncate">
              Reference ID: {error.digest}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => reset()}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors shadow-sm cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Try Again
            </button>
            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-300 text-gray-700 text-sm font-semibold hover:bg-gray-50 transition-colors shadow-sm"
            >
              <Home className="w-4 h-4" />
              Return Home
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
