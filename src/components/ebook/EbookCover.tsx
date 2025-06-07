
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import ContentBadge from "@/components/ContentBadge";
import EbookDifficultyBadge from "./EbookDifficultyBadge";
import EbookStatsGrid from "./EbookStatsGrid";
import EbookActions from "./EbookActions";
import EbookPaymentFlow from "@/components/payment/EbookPaymentFlow";
import { ShoppingCart } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;
type EbookType = 'free' | 'premium';

interface EbookCoverProps {
  ebook: Ebook;
  coverUrl: string;
  ebookType: EbookType;
}

const EbookCover = ({ ebook, coverUrl, ebookType }: EbookCoverProps) => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const handlePurchaseSuccess = () => {
    setShowPaymentModal(false);
    // Aqui você pode atualizar o estado ou recarregar os dados
  };

  return (
    <div className="space-y-6">
      {/* Cover Image */}
      <div className="relative">
        <div className="aspect-[3/4] bg-blue-50 rounded-lg overflow-hidden shadow-lg">
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
              <EbookDifficultyBadge ebook={ebook} />
            </div>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <EbookStatsGrid ebook={ebook} />

      {/* Actions */}
      <EbookActions 
        ebook={ebook} 
        ebookType={ebookType}
        onPurchase={() => setShowPaymentModal(true)}
      />

      {!ebook.file_url && (
        <div className="text-center text-sm text-blue-600 bg-blue-50 p-3 rounded-lg border border-blue-200">
          ⚠️ Arquivo não disponível para download no momento
        </div>
      )}

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-blue-900">
              <ShoppingCart className="w-5 h-5 mr-2 text-blue-600" />
              Adquirir E-book
            </DialogTitle>
          </DialogHeader>
          
          <EbookPaymentFlow 
            ebook={ebook}
            ebookType={ebookType}
            onSuccess={handlePurchaseSuccess}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EbookCover;
