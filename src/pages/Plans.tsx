
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PricingPlans from "@/components/PricingPlans";
import { Badge } from "@/components/ui/badge";

const Plans = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Planos de Assinatura
            </Badge>
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Escolha seu <span className="font-medium">Plano</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Planos flexíveis para todas as necessidades profissionais
            </p>
          </div>
        </div>
      </section>

      <PricingPlans />
      
      <Footer />
    </div>
  );
};

export default Plans;
