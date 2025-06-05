
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Package, Download, CreditCard, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EbookPaymentFlow from "@/components/payment/EbookPaymentFlow";
import { supabase } from "@/integrations/supabase/client";
import { getStorageUrl } from "@/utils/supabaseHelpers";
import type { Tables } from "@/integrations/supabase/types";

type Kit = Tables<'kits'>;
type Ebook = Tables<'ebooks'>;

const KitDetail = () => {
  const { id } = useParams();
  const [kit, setKit] = useState<Kit | null>(null);
  const [ebooks, setEbooks] = useState<Ebook[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  useEffect(() => {
    if (id) {
      fetchKit(id);
    }
  }, [id]);

  const fetchKit = async (kitId: string) => {
    try {
      setLoading(true);
      
      // Fetch kit details
      const { data: kitData, error: kitError } = await supabase
        .from('kits')
        .select('*')
        .eq('id', kitId)
        .single();

      if (kitError) throw kitError;
      setKit(kitData);

      // Fetch ebooks in the kit
      if (kitData.ebook_ids && kitData.ebook_ids.length > 0) {
        const { data: ebooksData, error: ebooksError } = await supabase
          .from('ebooks')
          .select('*')
          .in('id', kitData.ebook_ids);

        if (ebooksError) throw ebooksError;
        setEbooks(ebooksData || []);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar kit');
    } finally {
      setLoading(false);
    }
  };

  const handlePurchaseSuccess = () => {
    setShowPaymentModal(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando kit...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !kit) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-light text-gray-900 mb-4">
              Ops! Este kit não foi encontrado
            </h2>
            <p className="text-gray-600 mb-6">
              O kit que você está procurando não existe ou foi removido.
            </p>
            <Link to="/bundles">
              <Button>Voltar para kits</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const coverUrl = getStorageUrl('kit-covers', kit.cover_image || '');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/bundles" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para kits
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Cover and Basic Info */}
            <div className="lg:col-span-1">
              <div className="space-y-6">
                {/* Cover Image */}
                <div className="relative">
                  <div className="aspect-[3/4] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
                    <img 
                      src={coverUrl} 
                      alt={kit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-blue-600 text-white">
                        <Package className="w-3 h-3 mr-1" />
                        Kit
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Purchase Actions */}
                <div className="space-y-3">
                  <div className="text-center">
                    <span className="text-3xl font-bold text-gray-900">
                      R$ {kit.price.toString().replace('.', ',')}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      {ebooks.length} e-books inclusos
                    </p>
                  </div>
                  
                  <Button 
                    onClick={() => setShowPaymentModal(true)}
                    className="w-full"
                    size="lg"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Comprar Kit
                  </Button>
                  
                  <p className="text-xs text-center text-gray-500">
                    Pagamento seguro • Download imediato • Acesso vitalício
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Header */}
                <div>
                  <h1 className="text-3xl font-light text-gray-900 mb-4">
                    {kit.title}
                  </h1>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    {kit.description}
                  </p>
                </div>

                {/* Ebooks Included */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-medium">
                      E-books inclusos neste kit ({ebooks.length})
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {ebooks.map((ebook) => {
                        const ebookCoverUrl = getStorageUrl('ebook-covers', ebook.cover || '');
                        return (
                          <div key={ebook.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                            <div className="w-12 h-16 bg-gray-200 rounded overflow-hidden flex-shrink-0">
                              <img 
                                src={ebookCoverUrl} 
                                alt={ebook.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-900">{ebook.title}</h4>
                              <p className="text-sm text-gray-600">por {ebook.author}</p>
                              <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                                <span className="flex items-center">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  {ebook.pages || 0} páginas
                                </span>
                                <Badge variant="outline" className="text-xs">
                                  {ebook.category}
                                </Badge>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-sm font-medium text-gray-900">
                                R$ {ebook.price?.toString().replace('.', ',') || '0,00'}
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    <div className="mt-6 p-4 bg-green-50 rounded-lg">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium text-green-800">Economia do Kit</p>
                          <p className="text-sm text-green-700">
                            Comprando separadamente: R$ {ebooks.reduce((total, ebook) => total + Number(ebook.price || 0), 0).toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-green-700">Você economiza:</p>
                          <p className="text-lg font-bold text-green-800">
                            R$ {(ebooks.reduce((total, ebook) => total + Number(ebook.price || 0), 0) - Number(kit.price)).toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />

      {/* Payment Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Package className="w-5 h-5 mr-2" />
              Adquirir Kit: {kit.title}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">{kit.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{kit.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-gray-900">
                  R$ {kit.price.toString().replace('.', ',')}
                </span>
                <span className="text-sm text-gray-600">
                  {ebooks.length} e-books
                </span>
              </div>
            </div>
            
            <div className="space-y-3">
              <Button className="w-full" size="lg">
                <CreditCard className="w-4 h-4 mr-2" />
                Comprar Kit Agora
              </Button>
              
              <p className="text-xs text-center text-gray-500">
                Pagamento seguro • Download imediato • Acesso vitalício
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KitDetail;
