
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Home, Lightbulb, Palette, Hammer, Building, Zap, Droplets, Scale, Laptop, TrendingUp, DollarSign, Target, GraduationCap, Briefcase } from "lucide-react";

interface EbookCategoriesProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
}

const categoryGroups = [
  {
    title: "Construção Civil",
    categories: [
      { id: "arquitetura", name: "Arquitetura", icon: Building },
      { id: "paisagismo", name: "Paisagismo", icon: Palette },
      { id: "urbanismo", name: "Urbanismo", icon: Home },
      { id: "design-interiores", name: "Design de Interiores", icon: Lightbulb },
      { id: "marcenaria", name: "Marcenaria", icon: Hammer },
      { id: "engenharia-civil", name: "Engenharia Civil", icon: Building },
      { id: "eletrica", name: "Elétrica", icon: Zap },
      { id: "hidrossanitario", name: "Hidrossanitário", icon: Droplets },
      { id: "legislacao", name: "Legislação", icon: Scale }
    ]
  },
  {
    title: "Desenvolvimento Profissional",
    categories: [
      { id: "tecnologia", name: "Tecnologia", icon: Laptop },
      { id: "marketing", name: "Marketing", icon: TrendingUp },
      { id: "financas", name: "Finanças", icon: DollarSign },
      { id: "desenvolvimento-pessoal", name: "Desenvolvimento Pessoal", icon: Target },
      { id: "educacao", name: "Educação", icon: GraduationCap },
      { id: "negocios", name: "Negócios", icon: Briefcase }
    ]
  }
];

const EbookCategories = ({ onCategorySelect, selectedCategory }: EbookCategoriesProps) => {
  return (
    <div className="mb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <Badge variant="secondary" className="mb-4">
            Categorias Especializadas
          </Badge>
          <h3 className="text-2xl font-light text-gray-900 mb-4">
            Explore por <span className="font-medium">Área de Conhecimento</span>
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Conteúdo organizado por especialização para acelerar seu aprendizado
          </p>
        </div>

        {/* Botão "Todas as Categorias" */}
        <div className="flex justify-center mb-8">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            onClick={() => onCategorySelect(null)}
            className="text-sm px-6 py-2"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Todas as Categorias
          </Button>
        </div>

        {/* Grupos de Categorias */}
        <div className="space-y-10">
          {categoryGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-lg font-medium text-gray-900 mb-4 text-center">
                {group.title}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <Button
                      key={category.id}
                      variant={selectedCategory === category.id ? "default" : "outline"}
                      onClick={() => onCategorySelect(category.id)}
                      className="h-auto p-4 flex flex-col items-center space-y-2 hover:shadow-lg transition-all duration-200"
                    >
                      <Icon className="w-6 h-6" />
                      <span className="text-sm font-medium text-center">
                        {category.name}
                      </span>
                    </Button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EbookCategories;
