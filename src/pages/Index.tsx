
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EbookCategories from "@/components/EbookCategories";
import Footer from "@/components/Footer";
import PricingPlans from "@/components/PricingPlans";
import EbookCarousel from "@/components/EbookCarousel";

const Index = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Hero />
      <EbookCarousel />
      <EbookCategories />
      <PricingPlans />
      <Footer />
    </div>
  );
};

export default Index;
