
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import EbookCover from "@/components/ebook/EbookCover";
import EbookHeader from "@/components/ebook/EbookHeader";
import EbookLearningPoints from "@/components/ebook/EbookLearningPoints";
import EbookDescription from "@/components/ebook/EbookDescription";
import EbookRating from "@/components/ebook/EbookRating";
import { supabase } from "@/integrations/supabase/client";
import { getStorageUrl, mapEbookType } from "@/utils/supabaseHelpers";
import type { Tables } from "@/integrations/supabase/types";

type Ebook = Tables<'ebooks'>;

const EbookDetail = () => {
  const { id } = useParams();
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchEbook(id);
    }
  }, [id]);

  const fetchEbook = async (ebookId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('ebooks')
        .select('*')
        .eq('id', parseInt(ebookId))
        .single();

      if (error) throw error;
      setEbook(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar e-book');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando e-book...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !ebook) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <p className="text-red-600 mb-4">Erro ao carregar e-book: {error}</p>
            <Link to="/ebooks">
              <Button>Voltar para biblioteca</Button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const ebookType = mapEbookType(ebook.type, ebook.is_premium);
  const coverUrl = getStorageUrl('ebook-covers', ebook.cover || '');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            to="/ebooks" 
            className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para biblioteca
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Cover and Basic Info */}
            <div className="lg:col-span-1">
              <EbookCover 
                ebook={ebook} 
                coverUrl={coverUrl} 
                ebookType={ebookType} 
              />
            </div>

            {/* Right Column - Detailed Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                <EbookHeader ebook={ebook} />
                <EbookLearningPoints ebook={ebook} />
                <EbookDescription ebook={ebook} />
                <EbookRating />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EbookDetail;
