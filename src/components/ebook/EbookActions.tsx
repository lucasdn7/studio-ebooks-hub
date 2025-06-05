
import { Button } from "@/components/ui/button";
import { Download, BookOpen, Crown, Lock, CreditCard } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useEbookDownload } from "@/hooks/useEbookDownload";
import { useAchievements } from "@/hooks/useAchievements";
import { Link } from "react-router-dom";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;
type EbookType = 'free' | 'premium';

interface EbookActionsProps {
  ebook: Ebook;
  ebookType: EbookType;
  onPurchase?: () => void;
}

const EbookActions = ({ ebook, ebookType, onPurchase }: EbookActionsProps) => {
  const { user } = useAuth();
  const { userProgress } = useAchievements();
  const { downloadEbook, downloading } = useEbookDownload();

  const handleDownload = () => {
    if (!ebook.file_url) return;
    
    downloadEbook(
      ebook.id, 
      ebook.title, 
      ebook.file_url, 
      ebookType === 'premium'
    );
  };

  // E-book gratuito
  if (ebookType === 'free') {
    if (!user) {
      return (
        <div className="space-y-3">
          <Button 
            variant="outline" 
            className="w-full" 
            size="lg"
            onClick={() => window.location.href = '/auth'}
          >
            <Lock className="w-4 h-4 mr-2" />
            Faça cadastro para baixar
          </Button>
          <p className="text-xs text-center text-gray-500">
            E-book gratuito para usuários cadastrados
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        <Button 
          onClick={handleDownload}
          disabled={downloading === ebook.id || !ebook.file_url}
          className="w-full bg-green-600 hover:bg-green-700"
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          {downloading === ebook.id ? 'Baixando...' : 'Download Gratuito'}
        </Button>
        
        <Link to={`/ebook/${ebook.id}/reader`}>
          <Button variant="outline" className="w-full">
            <BookOpen className="w-4 h-4 mr-2" />
            Ler Online
          </Button>
        </Link>
      </div>
    );
  }

  // E-book premium
  const isPremiumUser = userProgress?.isPremium;
  
  if (isPremiumUser) {
    return (
      <div className="space-y-3">
        <div className="bg-yellow-50 p-3 rounded-lg text-center">
          <p className="text-sm text-yellow-700 font-medium">
            ✨ Este e-book está incluído na sua assinatura!
          </p>
        </div>
        
        <Button 
          onClick={handleDownload}
          disabled={downloading === ebook.id || !ebook.file_url}
          className="w-full"
          size="lg"
        >
          <Download className="w-4 h-4 mr-2" />
          {downloading === ebook.id ? 'Baixando...' : 'Baixar E-book'}
        </Button>
        
        <Link to={`/ebook/${ebook.id}/reader`}>
          <Button variant="outline" className="w-full">
            <BookOpen className="w-4 h-4 mr-2" />
            Ler Online
          </Button>
        </Link>
      </div>
    );
  }

  // Usuário não premium - precisa comprar
  return (
    <div className="space-y-3">
      <Button 
        onClick={onPurchase}
        className="w-full"
        size="lg"
      >
        <CreditCard className="w-4 h-4 mr-2" />
        Comprar E-book
      </Button>
      
      {ebook.price && (
        <div className="text-center">
          <span className="text-lg font-semibold text-gray-900">
            R$ {ebook.price.toString().replace('.', ',')}
          </span>
        </div>
      )}
      
      <div className="bg-blue-50 p-3 rounded-lg">
        <p className="text-xs text-blue-700 text-center">
          💡 Com a assinatura Premium você tem acesso a todos os e-books + modo leitura exclusivo
        </p>
      </div>
    </div>
  );
};

export default EbookActions;
