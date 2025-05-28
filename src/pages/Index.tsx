
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import EbookCategories from "@/components/EbookCategories";
import VideoSection from "@/components/VideoSection";
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
      <VideoSection />
      <PricingPlans />
      <Footer />
    </div>
  );
};

export default Index;
