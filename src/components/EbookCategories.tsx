
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
      { 
        id: "arquitetura", 
        name: "Arquitetura", 
        icon: Building,
        description: "Projetos, técnicas e metodologias arquitetônicas"
      },
      { 
        id: "paisagismo", 
        name: "Paisagismo", 
        icon: Palette,
        description: "Design de jardins e espaços verdes urbanos"
      },
      { 
        id: "urbanismo", 
        name: "Urbanismo", 
        icon: Home,
        description: "Planejamento e desenvolvimento urbano sustentável"
      },
      { 
        id: "design-interiores", 
        name: "Design de Interiores", 
        icon: Lightbulb,
        description: "Ambientação e decoração de espaços internos"
      },
      { 
        id: "marcenaria", 
        name: "Marcenaria", 
        icon: Hammer,
        description: "Técnicas de carpintaria e trabalho em madeira"
      },
      { 
        id: "engenharia-civil", 
        name: "Engenharia Civil", 
        icon: Building,
        description: "Cálculos estruturais e gestão de obras"
      },
      { 
        id: "eletrica", 
        name: "Elétrica", 
        icon: Zap,
        description: "Instalações elétricas e automação predial"
      },
      { 
        id: "hidrossanitario", 
        name: "Hidrossanitário", 
        icon: Droplets,
        description: "Sistemas hidráulicos e sanitários"
      },
      { 
        id: "legislacao", 
        name: "Legislação", 
        icon: Scale,
        description: "Normas técnicas e regulamentações do setor"
      }
    ]
  },
  {
    title: "Desenvolvimento Profissional",
    categories: [
      { 
        id: "tecnologia", 
        name: "Tecnologia", 
        icon: Laptop,
        description: "Ferramentas digitais para construção civil"
      },
      { 
        id: "marketing", 
        name: "Marketing", 
        icon: TrendingUp,
        description: "Estratégias de divulgação e vendas"
      },
      { 
        id: "financas", 
        name: "Finanças", 
        icon: DollarSign,
        description: "Gestão financeira e orçamentos de obra"
      },
      { 
        id: "desenvolvimento-pessoal", 
        name: "Desenvolvimento Pessoal", 
        icon: Target,
        description: "Liderança e habilidades interpessoais"
      },
      { 
        id: "educacao", 
        name: "Educação", 
        icon: GraduationCap,
        description: "Metodologias de ensino na construção civil"
      },
      { 
        id: "negocios", 
        name: "Negócios", 
        icon: Briefcase,
        description: "Empreendedorismo e gestão empresarial"
      }
    ]
  }
];

const EbookCategories = ({ onCategorySelect, selectedCategory }: EbookCategoriesProps) => {
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

        {/* Grupos de Categorias - Layout compacto */}
        <div className="grid lg:grid-cols-2 gap-6">
          {categoryGroups.map((group) => (
            <div key={group.title} className="bg-white rounded-lg border border-blue-200 p-4">
              <h4 className="text-md font-medium text-blue-900 mb-3 border-b border-blue-100 pb-2">
                {group.title}
              </h4>
              <div className="space-y-2">
                {group.categories.map((category) => {
                  const Icon = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => onCategorySelect(category.id)}
                      className={`w-full text-left p-2 rounded-md transition-all duration-200 hover:bg-blue-50 ${
                        selectedCategory === category.id ? 'bg-blue-100 border-blue-300' : 'hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <Icon className="w-4 h-4 text-blue-600 mt-1 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-blue-900">
                            {category.name}
                          </div>
                          <div className="text-xs text-gray-600 mt-1">
                            {category.description}
                          </div>
                        </div>
                      </div>
                    </button>
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
