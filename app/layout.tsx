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

import { ApplyModalProvider } from "./context/ApplyModalContext";
import ScrollRevealProvider from "./components/ScrollRevealProvider";

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bricolage.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ScrollRevealProvider>
          <ApplyModalProvider>
            {children}
          </ApplyModalProvider>
        </ScrollRevealProvider>
      </body>
    </html>
  );
}
