
import { Button } from "@/components/ui/button";
import { Download, Lock } from "lucide-react";
import ContentBadge from "@/components/ContentBadge";
import EbookDifficultyBadge from "./EbookDifficultyBadge";
import EbookStatsGrid from "./EbookStatsGrid";
import { useEbookDownload } from "@/hooks/useEbookDownload";
import { useAuth } from "@/hooks/useAuth";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;
type EbookType = 'free' | 'premium';

interface EbookCoverProps {
  ebook: Ebook;
  coverUrl: string;
  ebookType: EbookType;
}

const EbookCover = ({ ebook, coverUrl, ebookType }: EbookCoverProps) => {
  const { downloadEbook, downloading } = useEbookDownload();
  const { user } = useAuth();

  const handleDownload = () => {
    if (!ebook.file_url) {
      return;
    }
    
    downloadEbook(
      ebook.id, 
      ebook.title, 
      ebook.file_url, 
      ebookType === 'premium'
    );
  };

  const canDownload = ebookType === 'free' || (user && ebook.file_url);

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="relative">
        <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
          <img 
            src={coverUrl} 
            alt={ebook.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 right-3">
            <ContentBadge type={ebookType} />
          </div>
          {ebook.difficulty && (
            <div className="absolute top-3 left-3">
              <EbookDifficultyBadge difficulty={ebook.difficulty} />
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <EbookStatsGrid ebook={ebook} />

      {/* Download/Access Button */}
      <div className="space-y-3">
        {canDownload ? (
          <Button 
            onClick={handleDownload}
            disabled={downloading === ebook.id || !ebook.file_url}
            className="w-full"
            size="lg"
          >
            <Download className="w-4 h-4 mr-2" />
            {downloading === ebook.id ? 'Baixando...' : ebookType === 'free' ? 'Download Gratuito' : 'Baixar E-book'}
          </Button>
        ) : (
          <Button 
            variant="outline" 
            className="w-full" 
            size="lg"
            disabled
          >
            <Lock className="w-4 h-4 mr-2" />
            {!user ? 'Faça login para acessar' : 'Conteúdo Premium'}
          </Button>
        )}
        
        {ebookType === 'premium' && ebook.price && (
          <div className="text-center">
            <span className="text-lg font-semibold text-gray-900">
              R$ {ebook.price.toString().replace('.', ',')}
            </span>
          </div>
        )}
      </div>

      {!ebook.file_url && (
        <div className="text-center text-sm text-gray-500 bg-yellow-50 p-3 rounded-lg">
          ⚠️ Arquivo não disponível para download no momento
        </div>
      )}
    </div>
  );
};

export default EbookCover;
