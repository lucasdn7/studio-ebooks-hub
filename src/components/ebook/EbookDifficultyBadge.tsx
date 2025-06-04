
import { Badge } from "@/components/ui/badge";
import { Star, BarChart3 } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;

interface EbookDifficultyBadgeProps {
  ebook: Ebook;
}

const EbookDifficultyBadge = ({ ebook }: EbookDifficultyBadgeProps) => {
  const difficultyColors = {
    "Iniciante": "bg-green-100 text-green-700 border-green-200",
    "Intermediário": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Avançado": "bg-red-100 text-red-700 border-red-200"
  };

  return (
    <div className="flex items-center justify-between">
      <Badge 
        variant="outline" 
        className={difficultyColors[ebook.difficulty as keyof typeof difficultyColors] || difficultyColors["Iniciante"]}
      >
        <BarChart3 className="w-3 h-3 mr-1" />
        {ebook.difficulty || "Iniciante"}
      </Badge>
      <div className="flex items-center text-sm text-gray-500">
        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
        {ebook.rating || 0}
      </div>
    </div>
  );
};

export default EbookDifficultyBadge;
