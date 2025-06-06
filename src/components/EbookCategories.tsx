
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Home, Lightbulb, Palette, Hammer, Building, Zap, Droplets, Scale, Laptop, TrendingUp, DollarSign, Target, GraduationCap, Briefcase } from "lucide-react";

interface EbookCategoriesProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
  compact?: boolean;
}

const categories = [
  { id: "arquitetura", name: "Arquitetura", icon: Building },
  { id: "paisagismo", name: "Paisagismo", icon: Palette },
  { id: "urbanismo", name: "Urbanismo", icon: Home },
  { id: "design-interiores", name: "Design de Interiores", icon: Lightbulb },
  { id: "marcenaria", name: "Marcenaria", icon: Hammer },
  { id: "engenharia-civil", name: "Engenharia Civil", icon: Building },
  { id: "eletrica", name: "Elétrica", icon: Zap },
  { id: "hidrossanitario", name: "Hidrossanitário", icon: Droplets },
  { id: "legislacao", name: "Legislação", icon: Scale },
  { id: "tecnologia", name: "Tecnologia", icon: Laptop },
  { id: "marketing", name: "Marketing", icon: TrendingUp },
  { id: "financas", name: "Finanças", icon: DollarSign },
  { id: "desenvolvimento-pessoal", name: "Desenvolvimento Pessoal", icon: Target },
  { id: "educacao", name: "Educação", icon: GraduationCap },
  { id: "negocios", name: "Negócios", icon: Briefcase }
];

const EbookCategories = ({ onCategorySelect, selectedCategory, compact = false }: EbookCategoriesProps) => {
  if (compact) {
    // Layout compacto para sidebar da página de eBooks
    return (
      <div className="bg-white rounded-lg border border-blue-200 p-4">
        <h4 className="text-md font-medium text-blue-900 mb-3 border-b border-blue-100 pb-2">
          Categorias
        </h4>
        <div className="space-y-2">
          <button
            onClick={() => onCategorySelect(null)}
            className={`w-full text-left p-2 rounded-md transition-all duration-200 hover:bg-blue-50 text-sm ${
              selectedCategory === null ? 'bg-blue-100 border-blue-300' : 'hover:shadow-sm'
            }`}
          >
            <div className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span className="font-medium text-blue-900">Todas</span>
            </div>
          </button>
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => onCategorySelect(category.id)}
                className={`w-full text-left p-2 rounded-md transition-all duration-200 hover:bg-blue-50 text-sm ${
                  selectedCategory === category.id ? 'bg-blue-100 border-blue-300' : 'hover:shadow-sm'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Icon className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-900">{category.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // Layout normal para outras páginas
  return (
    <div className="mb-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <Badge variant="secondary" className="mb-3 bg-blue-100 text-blue-800">
            Categorias Especializadas
          </Badge>
          <h3 className="text-xl font-light text-blue-900 mb-2">
            Explore por <span className="font-medium">Área de Conhecimento</span>
          </h3>
        </div>

        {/* Botão "Todas as Categorias" */}
        <div className="flex justify-center mb-6">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => onCategorySelect(null)}
            className={`text-sm px-4 py-2 ${selectedCategory === null ? 'bg-blue-600 hover:bg-blue-700' : 'border-blue-300 text-blue-600 hover:bg-blue-50'}`}
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Todas as Categorias
          </Button>
        </div>

        {/* Categorias em linha simples */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => onCategorySelect(category.id)}
                className={`text-sm px-3 py-2 ${
                  selectedCategory === category.id 
                    ? 'bg-blue-600 hover:bg-blue-700' 
                    : 'border-blue-300 text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className="w-4 h-4 mr-2" />
                {category.name}
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default EbookCategories;
