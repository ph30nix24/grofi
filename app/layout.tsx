import { Geist, Geist_Mono, Bricolage_Grotesque, Montserrat } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// app/layout.tsx or a fonts.ts file


const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

import type { Metadata, Viewport } from "next";
import { ApplyModalProvider } from "./context/ApplyModalContext";
import ScrollRevealProvider from "./components/ScrollRevealProvider";
import ScrollToTop from "./components/ScrollToTop";
import FloatingConnectButton from "./components/FloatingConnectButton";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.grofi.in"),
  title: {
    default: "Grofi - Smart Financial Growth Partner",
    template: "%s | Grofi",
  },
  description:
    "Compare and apply for top personal loans, home loans, business loans, and credit cards across leading Indian banks and NBFCs.",
  applicationName: "Grofi",
  category: "Finance",
  classification: "Financial Services Marketplace",
  creator: "Grofi",
  publisher: "Grofi",
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/icon.png", type: "image/png" },
    ],
    apple: [{ url: "/apple-icon.png" }],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.grofi.in",
    siteName: "Grofi",
    title: "Grofi - Smart Financial Growth Partner",
    description:
      "Compare and apply for top personal loans, home loans, business loans, and credit cards across leading Indian banks and NBFCs.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Grofi - Smart Financial Growth Partner",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Grofi - Smart Financial Growth Partner",
    description:
      "Compare and apply for top personal loans, home loans, business loans, and credit cards across leading Indian banks and NBFCs.",
    images: ["/og-image.png"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${montserrat.variable} h-full antialiased overflow-x-hidden max-w-full`}
    >
      <body className="min-h-full flex flex-col overflow-x-hidden w-full max-w-full">
        <ScrollRevealProvider>
          <ApplyModalProvider>
            {children}
            <FloatingConnectButton />
            <ScrollToTop />
          </ApplyModalProvider>
        </ScrollRevealProvider>
      </body>
    </html>
  );
}
