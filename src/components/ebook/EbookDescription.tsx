
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;

interface EbookDescriptionProps {
  ebook: Ebook;
}

const EbookDescription = ({ ebook }: EbookDescriptionProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl font-medium">Sobre este e-book</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-700 leading-relaxed mb-6">
          {ebook.description || 'Descrição não disponível.'}
        </p>
      </CardContent>
    </Card>
  );
};

export default EbookDescription;
