
import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EbookCategories from "@/components/EbookCategories";
import { Badge } from "@/components/ui/badge";

const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Categorias Especializadas
            </Badge>
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Explore por <span className="font-medium">Categoria</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre o conteúdo ideal organizado por área de especialização
            </p>
          </div>
        </div>
      </section>

      <EbookCategories 
        onCategorySelect={setSelectedCategory}
        selectedCategory={selectedCategory}
      />
      
      <Footer />
    </div>
  );
};

export default Categories;
