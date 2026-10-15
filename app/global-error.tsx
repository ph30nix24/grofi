"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global application crash captured:", error);
  }, [error]);

  return (
    <html lang="en">
      <body className="min-h-screen bg-[#FDFBF7] text-gray-900 flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-2xl border border-gray-200 p-8 shadow-sm text-center">
          <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">
            !
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Critical System Error
          </h1>
          <p className="text-sm text-gray-600 mb-6">
            An unexpected error occurred at the application level. Please try refreshing or reloading the application.
          </p>

          {error.digest && (
            <p className="text-xs text-gray-400 font-mono mb-6 truncate">
              ID: {error.digest}
            </p>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={() => reset()}
              className="px-5 py-2.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-black transition-colors cursor-pointer"
            >
              Reload Page
            </button>
            <Link
              href="/"
              className="px-5 py-2.5 rounded-xl bg-gray-100 border border-gray-200 text-gray-700 text-sm font-semibold hover:bg-gray-200 transition-colors"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
