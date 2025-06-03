
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentBadge from "@/components/ContentBadge";
import FavoriteButton from "@/components/FavoriteButton";
import { 
  Star, 
  Download, 
  BookOpen, 
  Clock, 
  Users, 
  TrendingUp,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Target,
  BarChart3,
  Headphones,
  Crown
} from "lucide-react";

const EbookDetail = () => {
  const { id } = useParams();
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [liked, setLiked] = useState<boolean | null>(null);

  // Mock data - em produção viria de uma API
  const ebook = {
    id: 1,
    title: "Manual Completo de Arquitetura Residencial",
    author: "Arq. Maria Silva",
    category: "Arquitetura",
    pages: 120,
    rating: 4.8,
    downloads: "2.3k",
    cover: "/placeholder.svg",
    description: "Guia completo para projetos residenciais modernos com técnicas sustentáveis e inovadoras. Este manual aborda desde os conceitos fundamentais até as práticas mais avançadas da arquitetura residencial contemporânea.",
    benefits: [
      "Domine técnicas avançadas de projeto residencial",
      "Aprenda sobre sustentabilidade e eficiência energética",
      "Desenvolva habilidades em design bioclimático",
      "Conheça as tendências atuais do mercado"
    ],
    targetAudience: "Arquitetos, estudantes de arquitetura e profissionais da área de construção",
    difficulty: "Intermediário",
    readingTime: 180,
    type: "free" as const,
    featured: true,
    totalRatings: 342,
    likes: 89,
    dislikes: 12
  };

  const difficultyColors = {
    "Iniciante": "bg-green-100 text-green-700 border-green-200",
    "Intermediário": "bg-yellow-100 text-yellow-700 border-yellow-200",
    "Avançado": "bg-red-100 text-red-700 border-red-200"
  };

  const handleRating = (rating: number) => {
    setUserRating(rating);
  };

  const handleLike = (isLike: boolean) => {
    setLiked(isLike);
  };

  const handleSubmitFeedback = () => {
    // Aqui seria enviado o feedback para a API
    console.log('Feedback:', { rating: userRating, comment, liked });
    setComment("");
    setUserRating(0);
    setLiked(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
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
                    <img 
                      src={ebook.cover} 
                      alt={ebook.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                      <ContentBadge type={ebook.type} />
                    </div>
                    <div className="absolute top-4 left-4">
                      <FavoriteButton 
                        ebook={{
                          id: ebook.id,
                          title: ebook.title,
                          author: ebook.author,
                          category: ebook.category,
                          cover: ebook.cover
                        }}
                      />
                    </div>
                  </div>
                </div>

                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge 
                        variant="outline" 
                        className={difficultyColors[ebook.difficulty as keyof typeof difficultyColors]}
                      >
                        <BarChart3 className="w-3 h-3 mr-1" />
                        {ebook.difficulty}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                        {ebook.rating} ({ebook.totalRatings})
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="flex items-center">
                        <BookOpen className="w-4 h-4 mr-2" />
                        {ebook.pages} páginas
                      </div>
                      <div className="flex items-center">
                        <Clock className="w-4 h-4 mr-2" />
                        {ebook.readingTime} min
                      </div>
                      <div className="flex items-center">
                        <Download className="w-4 h-4 mr-2" />
                        {ebook.downloads}
                      </div>
                      <div className="flex items-center">
                        <TrendingUp className="w-4 h-4 mr-2" />
                        Popular
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Button 
                        size="lg" 
                        className={`w-full ${ebook.type === 'free' 
                          ? 'bg-gray-900 hover:bg-gray-800' 
                          : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                      >
                        {ebook.type === 'free' ? 'Baixar gratuitamente' : 'Adquirir agora'}
                      </Button>

                      <Link to={`/ebook/${id}/reader`} className="block">
                        <Button 
                          variant="outline" 
                          size="lg" 
                          className="w-full"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Modo Leitura
                        </Button>
                      </Link>

                      <Button 
                        variant="outline" 
                        size="lg" 
                        className="w-full"
                        disabled
                      >
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
                          cover: ebook.cover
                        }}
                        variant="button"
                        className="w-full"
                      />
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

                {/* Descrição */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl font-medium">Sobre este e-book</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed mb-6">
                      {ebook.description}
                    </p>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Target className="w-4 h-4 mr-2 text-blue-600" />
                          O que você vai aprender
                        </h4>
                        <ul className="space-y-2">
                          {ebook.benefits.map((benefit, index) => (
                            <li key={index} className="text-sm text-gray-600 flex items-start">
                              <span className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3 flex items-center">
                          <Users className="w-4 h-4 mr-2 text-green-600" />
                          Público-alvo
                        </h4>
                        <p className="text-sm text-gray-600">
                          {ebook.targetAudience}
                        </p>
                      </div>
                    </div>
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
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            onClick={() => handleRating(star)}
                            className="transition-colors"
                          >
                            <Star 
                              className={`w-6 h-6 ${
                                star <= userRating 
                                  ? 'fill-yellow-400 text-yellow-400' 
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Like/Dislike */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Recomenda este conteúdo?
                      </label>
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleLike(true)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                            liked === true
                              ? 'bg-green-50 border-green-200 text-green-700'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          Gostei ({ebook.likes})
                        </button>
                        <button
                          onClick={() => handleLike(false)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                            liked === false
                              ? 'bg-red-50 border-red-200 text-red-700'
                              : 'border-gray-200 text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          <ThumbsDown className="w-4 h-4" />
                          Não gostei ({ebook.dislikes})
                        </button>
                      </div>
                    </div>

                    {/* Comentário */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Comentário (opcional)
                      </label>
                      <Textarea
                        placeholder="Compartilhe sua opinião sobre este e-book..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="resize-none"
                        rows={3}
                      />
                    </div>

                    <Button 
                      onClick={handleSubmitFeedback}
                      disabled={userRating === 0 && liked === null && !comment.trim()}
                      className="w-full sm:w-auto"
                    >
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
    </div>
  );
};

export default EbookDetail;
