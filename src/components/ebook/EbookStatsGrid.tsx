
import { BookOpen, Clock, Download, TrendingUp } from "lucide-react";
import { formatDownloads } from "@/utils/supabaseHelpers";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;

interface EbookStatsGridProps {
  ebook: Ebook;
}

const EbookStatsGrid = ({ ebook }: EbookStatsGridProps) => {
  return (
    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
      <div className="flex items-center">
        <BookOpen className="w-4 h-4 mr-2" />
        {ebook.pages || 0} páginas
      </div>
      <div className="flex items-center">
        <Clock className="w-4 h-4 mr-2" />
        {ebook.reading_time || 0} min
      </div>
      <div className="flex items-center">
        <Download className="w-4 h-4 mr-2" />
        {formatDownloads(ebook.downloads)}
      </div>
      <div className="flex items-center">
        <TrendingUp className="w-4 h-4 mr-2" />
        {ebook.featured ? 'Destaque' : 'Popular'}
      </div>
    </div>
  );
};

export default EbookStatsGrid;
