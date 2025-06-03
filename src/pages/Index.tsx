
import Hero from "@/components/Hero";
import EbookCategories from "@/components/EbookCategories";
import EbookCarousel from "@/components/EbookCarousel";
import PricingPlans from "@/components/PricingPlans";
import PublisherSection from "@/components/PublisherSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <EbookCategories />
      <EbookCarousel />
      <PricingPlans />
      <PublisherSection />
      <Footer />
    </div>
  );
};

export default Index;
