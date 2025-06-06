
import { useState } from "react";
import Hero from "@/components/Hero";
import EbookCategories from "@/components/EbookCategories";
import Slider3D from "@/components/Slider3D";
import PurchaseSteps from "@/components/PurchaseSteps";
import PricingPlans from "@/components/PricingPlans";
import PublisherSection from "@/components/PublisherSection";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Index = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <EbookCategories 
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      <Slider3D />
      <PurchaseSteps />
      <PricingPlans />
      <PublisherSection />
      <Footer />
    </div>
  );
};

export default Index;
