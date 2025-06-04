
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ContentBadge from "@/components/ContentBadge";
import FavoriteButton from "@/components/FavoriteButton";
import { Star, Download, BookOpen, Clock, TrendingUp, Headphones, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import { formatDownloads } from "@/utils/supabaseHelpers";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;

interface EbookCoverProps {
  ebook: Ebook;
  coverUrl: string;
  ebookType: 'free' | 'premium';
}

const EbookCover = ({ ebook, coverUrl, ebookType }: EbookCoverProps) => {
  const difficultyColors = {
    "Iniciante": "bg-green-100 text-green-700 border-green-200",
    "Intermediário": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Avançado": "bg-red-100 text-red-700 border-red-200"
  };

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
