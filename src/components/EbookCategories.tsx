
import { Button } from "@/components/ui/button";

interface EbookCategoriesProps {
  onCategorySelect: (category: string | null) => void;
  selectedCategory: string | null;
}

const categories = [
  { id: null, name: "Todas as Categorias" },
  { id: "business", name: "Negócios" },
  { id: "technology", name: "Tecnologia" },
  { id: "marketing", name: "Marketing" },
  { id: "finance", name: "Finanças" },
  { id: "personal-development", name: "Desenvolvimento Pessoal" },
  { id: "education", name: "Educação" },
  { id: "health", name: "Saúde" },
  { id: "lifestyle", name: "Estilo de Vida" }
];

const EbookCategories = ({ onCategorySelect, selectedCategory }: EbookCategoriesProps) => {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Categorias</h3>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id || 'all'}
            variant={selectedCategory === category.id ? "default" : "outline"}
            onClick={() => onCategorySelect(category.id)}
            className="text-sm"
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default EbookCategories;
