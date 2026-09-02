import Hero2 from "./components/hero2";
import ProductsSection from "./components/ProductsSection";
import CreditCardShowcase from "./components/CreditCardShowcase";
import EmiCalculator from "./components/EmiCalculator";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Grofi - Smart Financial Growth Partner",
  description: "Grofi helps you compare & apply for the best personal loans, credit cards, business loans, & home loans with a hassle-free process and fast approval.",
  keywords: [
    "credit cards",
    "personal loans",
    "home loans",
    "instant loans",
    "credit card offers",
    "loan offers",
    "compare credit cards",
    "compare loans",
    "online loan application",
    "credit card eligibility",
    "loan eligibility",
    "Gorfi",
    "Grofi",
    "Money Mitra",
    "Money Mitra the reward club",
  ],
  authors: [{ name: "Grofi" }],
  creator: "Grofi",
  publisher: "Grofi",
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero2 />
      <ProductsSection />
      <CreditCardShowcase />
      <EmiCalculator />
      <WhyChooseUs />
      <Testimonials />
      <Footer />
    </main>
  );
}





