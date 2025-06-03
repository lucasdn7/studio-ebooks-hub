import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentBadge from "@/components/ContentBadge";
import FavoriteButton from "@/components/FavoriteButton";
import { Star, Download, BookOpen, Clock, Users, TrendingUp, ThumbsUp, ThumbsDown, ArrowLeft, Target, BarChart3, Headphones, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getStorageUrl, formatDownloads, mapEbookType } from "@/utils/supabaseHelpers";
import type { Tables } from "@/integrations/supabase/types";
type Ebook = Tables<'ebooks'>;
const EbookDetail = () => {
  const {
    id
  } = useParams();
  const [ebook, setEbook] = useState<Ebook | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState<boolean | null>(null);
  useEffect(() => {
    if (id) {
      fetchEbook(id);
    }
  }, [id]);
  const fetchEbook = async (ebookId: string) => {
    try {
      setLoading(true);
      const {
        data,
        error
      } = await supabase.from('ebooks').select('*').eq('id', parseInt(ebookId)).single();
      if (error) throw error;
      setEbook(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao carregar e-book');
    } finally {
      setLoading(false);
    }
  };
  const difficultyColors = {
    "Iniciante": "bg-green-100 text-green-700 border-green-200",
    "Intermediário": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Avançado": "bg-red-100 text-red-700 border-red-200"
  };
  const getEbookSnippets = (ebook: Ebook) => {
    const baseSnippets = [{
      icon: Target,
      text: `Domine ${ebook.category?.toLowerCase()} em ${ebook.reading_time || 30} minutos`
    }, {
      icon: BarChart3,
      text: `Técnicas práticas para aplicar no dia a dia`
    }, {
      icon: Clock,
      text: `Retorno do investimento em conhecimento garantido`
    }];

    // Category-specific snippets
    const categorySnippets: Record<string, Array<{
      icon: any;
      text: string;
    }>> = {
      'Arquitetura': [{
        icon: BarChart3,
        text: "Entenda em quanto tempo a arquitetura sustentável se paga"
      }, {
        icon: Target,
        text: "Projetos que valorizam imóveis em até 30%"
      }, {
        icon: Clock,
        text: "Reduza custos operacionais desde o primeiro mês"
      }],
      'Negócios': [{
        icon: TrendingUp,
        text: "Estratégias para aumentar receita em 90 dias"
      }, {
        icon: Target,
        text: "Métodos validados por empresas de sucesso"
      }, {
        icon: BarChart3,
        text: "ROI comprovado em estudos de caso reais"
      }],
      'Tecnologia': [{
        icon: Target,
        text: "Implemente soluções que economizam horas de trabalho"
      }, {
        icon: BarChart3,
        text: "Automações que aumentam produtividade em 40%"
      }, {
        icon: Clock,
        text: "Tecnologias do futuro explicadas de forma simples"
      }],
      'Desenvolvimento Pessoal': [{
        icon: Target,
        text: "Hábitos que transformam resultados em 21 dias"
      }, {
        icon: TrendingUp,
        text: "Mindset de alta performance comprovado"
      }, {
        icon: Clock,
        text: "Técnicas usadas por líderes mundiais"
      }]
    };
    return categorySnippets[ebook.category || ''] || baseSnippets;
  };
  const handleRating = (rating: number) => {
    setUserRating(rating);
  };
  const handleLike = (isLike: boolean) => {
    setLiked(isLike);
  };
  const handleSubmitFeedback = () => {
    console.log('Feedback:', {
      rating: userRating,
      comment,
      liked
    });
    setComment("");
    setUserRating(0);
    setLiked(null);
  };
  if (loading) {
    return <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando e-book...</p>
          </div>
        </div>
        <Footer />
      </div>;
  }
  if (error || !ebook) {
    return <div className="min-h-screen bg-gray-50">
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
      </div>;
  }
  const ebookType = mapEbookType(ebook.type, ebook.is_premium);
  const coverUrl = getStorageUrl('ebook-covers', ebook.cover || '');
  const snippets = getEbookSnippets(ebook);
  return <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/ebooks" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar para biblioteca
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column - Cover and Basic Info */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <div className="relative">
                  <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
                    <img src={coverUrl} alt={ebook.title} className="https://hnlbvgnnfdewyawnoevm.supabase.co/storage/v1/object/sign/ebooks/capa%20ebooks/Capa%20ebook3.png?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9lYTcxOTRjMi04NjljLTRkN2QtYWFiZS0wMmEzMzBlYjk5ZGYiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJlYm9va3MvY2FwYSBlYm9va3MvQ2FwYSBlYm9vazMucG5nIiwiaWF0IjoxNzQ4OTg0MDU3LCJleHAiOjE3ODA1MjAwNTd9.Yi85tw95UhU4loL5v-NdUHW83zWdVsY6w09bZsHxb9s" />
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
                      <Badge variant="outline" className={difficultyColors[ebook.difficulty as keyof typeof difficultyColors] || difficultyColors["Iniciante"]}>
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
                      <Button size="lg" className={`w-full ${ebookType === 'free' ? 'bg-gray-900 hover:bg-gray-800' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        {ebookType === 'free' ? 'Baixar gratuitamente' : 'Adquirir agora'}
                      </Button>

                      <Link to={`/ebook/${id}/reader`} className="block">
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
                      
                      <FavoriteButton ebook={{
                      id: ebook.id,
                      title: ebook.title,
                      author: ebook.author,
                      category: ebook.category,
                      cover: coverUrl
                    }} variant="button" className="w-full" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Detailed Content */}
            <div className="lg:col-span-2">
              <div className="space-y-8">
                {/* Informações principais */}
                <div>
                  <Badge variant="outline" className="mb-4">
                    {ebook.category}
                  </Badge>
                  <h1 className="text-3xl font-light text-gray-900 mb-2">
                    {ebook.title}
                  </h1>
                  <p className="text-lg text-gray-600 mb-4">por {ebook.author}</p>
                </div>

                {/* Snippets com ícones */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-medium">O que você vai aprender</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      {snippets.map((snippet, index) => {
                      const IconComponent = snippet.icon;
                      return <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <IconComponent className="w-4 h-4 text-blue-600" />
                            </div>
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {snippet.text}
                            </p>
                          </div>;
                    })}
                    </div>
                  </CardContent>
                </Card>

                {/* Descrição */}
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

                {/* Sistema de avaliação */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-medium">Avalie este e-book</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Avaliação por estrelas */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Sua avaliação
                      </label>
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(star => <button key={star} onClick={() => handleRating(star)} className="transition-colors">
                            <Star className={`w-6 h-6 ${star <= userRating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                          </button>)}
                      </div>
                    </div>

                    {/* Like/Dislike */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recomenda este conteúdo?
                      </label>
                      <div className="flex gap-3">
                        <button onClick={() => handleLike(true)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${liked === true ? 'bg-green-50 border-green-200 text-green-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                          <ThumbsUp className="w-4 h-4" />
                          Gostei
                        </button>
                        <button onClick={() => handleLike(false)} className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${liked === false ? 'bg-red-50 border-red-200 text-red-700' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                          <ThumbsDown className="w-4 h-4" />
                          Não gostei
                        </button>
                      </div>
                    </div>

                    {/* Comentário */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comentário (opcional)
                      </label>
                      <Textarea placeholder="Compartilhe sua opinião sobre este e-book..." value={comment} onChange={e => setComment(e.target.value)} className="resize-none" rows={3} />
                    </div>

                    <Button onClick={handleSubmitFeedback} disabled={userRating === 0 && liked === null && !comment.trim()} className="w-full sm:w-auto">
                      Enviar avaliação
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>;
};
export default EbookDetail;