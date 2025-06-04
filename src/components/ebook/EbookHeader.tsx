
import { Badge } from "@/components/ui/badge";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;

interface EbookHeaderProps {
  ebook: Ebook;
}

const EbookHeader = ({ ebook }: EbookHeaderProps) => {
  return (
    <div>
      <Badge variant="outline" className="mb-4">
        {ebook.category}
      </Badge>
      <h1 className="text-3xl font-light text-gray-900 mb-2">
        {ebook.title}
      </h1>
      <p className="text-lg text-gray-600 mb-4">por {ebook.author}</p>
    </div>
  );
};

export default EbookHeader;
