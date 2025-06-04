
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ContentBadge from "@/components/ContentBadge";
import FavoriteButton from "@/components/FavoriteButton";
import EbookDifficultyBadge from "./EbookDifficultyBadge";
import EbookStatsGrid from "./EbookStatsGrid";
import { BookOpen, Headphones, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;

interface EbookCoverProps {
  ebook: Ebook;
  coverUrl: string;
  ebookType: 'free' | 'premium';
}

const EbookCover = ({ ebook, coverUrl, ebookType }: EbookCoverProps) => {
  return (
    <Card className="sticky top-8">
      <div className="relative">
        <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
          <img 
            src={coverUrl} 
            alt={ebook.title} 
            className="w-full h-full object-cover" 
          />
          <div className="absolute top-4 right-4">
            <ContentBadge type={ebookType} />
          </div>
          <div className="absolute top-4 left-4">
            <FavoriteButton ebook={{
              id: ebook.id,
              title: ebook.title,
              author: ebook.author,
              category: ebook.category,
              cover: coverUrl
            }} />
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="space-y-4">
          <EbookDifficultyBadge ebook={ebook} />
          <EbookStatsGrid ebook={ebook} />

          <div className="space-y-2">
            <Button 
              size="lg" 
              className={`w-full ${ebookType === 'free' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-blue-600 hover:bg-blue-700'}`}
            >
              {ebookType === 'free' ? 'Baixar gratuitamente' : 'Adquirir agora'}
            </Button>

            <Link to={`/ebook/${ebook.id}/reader`} className="block">
              <Button variant="outline" size="lg" className="w-full">
                <BookOpen className="w-4 h-4 mr-2" />
                Modo Leitura
              </Button>
            </Link>

            <Button variant="outline" size="lg" className="w-full" disabled>
              <Headphones className="w-4 h-4 mr-2" />
              Audiobook
              <Crown className="w-3 h-3 ml-2 text-yellow-600" />
            </Button>
            
            <FavoriteButton 
              ebook={{
                id: ebook.id,
                title: ebook.title,
                author: ebook.author,
                category: ebook.category,
                cover: coverUrl
              }} 
              variant="button" 
              className="w-full" 
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EbookCover;
