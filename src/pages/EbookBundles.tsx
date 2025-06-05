
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BundleCard from "@/components/bundles/BundleCard";
import EbookPaymentFlow from "@/components/payment/EbookPaymentFlow";
import { Search, Package, Star, ShoppingCart } from "lucide-react";
import { useKits } from "@/hooks/useKits";
import type { Tables } from "@/integrations/supabase/types";

type Kit = Tables<'kits'>;

const EbookBundles = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBundle, setSelectedBundle] = useState<Kit | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { data: kits = [], isLoading, error } = useKits();

  const filteredBundles = kits.filter(kit =>
    kit.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (kit.description || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handlePurchase = (bundle: Kit) => {
    setSelectedBundle(bundle);
    setShowPaymentModal(true);
  };

  const handlePurchaseSuccess = () => {
    setShowPaymentModal(false);
    setSelectedBundle(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando kits...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro ao carregar kits: {error.message}</p>
            <Button onClick={() => window.location.reload()}>Tentar novamente</Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Kits de <span className="font-medium">E-books</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Coleções especiais com múltiplos e-books por um preço especial. 
              Economize até 50% comprando em kits temáticos.
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Buscar kits de e-books..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Featured Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <Package className="w-8 h-8 mx-auto text-blue-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Múltiplos E-books</h3>
                <p className="text-sm text-gray-600">
                  Receba vários e-books relacionados por um preço especial
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <Star className="w-8 h-8 mx-auto text-yellow-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Economia Garantida</h3>
                <p className="text-sm text-gray-600">
                  Economize até 50% comparado à compra individual
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardContent className="p-6">
                <ShoppingCart className="w-8 h-8 mx-auto text-green-600 mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Acesso Imediato</h3>
                <p className="text-sm text-gray-600">
                  Download imediato após confirmação do pagamento
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center text-gray-600">
            {filteredBundles.length} kit{filteredBundles.length !== 1 ? 's' : ''} disponível{filteredBundles.length !== 1 ? 'eis' : ''}
          </div>

          {/* Bundles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredBundles.map((bundle) => (
              <BundleCard
                key={bundle.id}
                bundle={bundle}
                onPurchase={handlePurchase}
              />
            ))}
          </div>

          {filteredBundles.length === 0 && (
            <div className="text-center py-12">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhum kit encontrado</h3>
              <p className="text-gray-600 mb-4">Tente ajustar sua busca ou explore nossa biblioteca completa</p>
              <Button className="bg-gray-900 hover:bg-gray-800">
                Ver Todos os E-books
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <ShoppingCart className="w-5 h-5 mr-2" />
              Adquirir Kit: {selectedBundle?.title}
            </DialogTitle>
          </DialogHeader>
          
          {selectedBundle && (
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">{selectedBundle.title}</h4>
                <p className="text-sm text-gray-600 mb-3">{selectedBundle.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-gray-900">
                    R$ {selectedBundle.price.toString().replace('.', ',')}
                  </span>
                  <span className="text-sm text-gray-600">
                    {selectedBundle.ebook_ids?.length || 0} e-books
                  </span>
                </div>
              </div>
              
              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar Kit Agora
                </Button>
                
                <p className="text-xs text-center text-gray-500">
                  Pagamento seguro • Download imediato • Acesso vitalício
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EbookBundles;
