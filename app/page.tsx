import Hero2 from "./components/hero2";
import ProductsSection from "./components/ProductsSection";
import CreditCardShowcase from "./components/CreditCardShowcase";
import EmiCalculator from "./components/EmiCalculator";
import WhyChooseUs from "./components/WhyChooseUs";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
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





