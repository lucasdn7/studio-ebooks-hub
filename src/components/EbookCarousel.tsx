
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import ContentBadge from "@/components/ContentBadge";
import { Star, Download, BookOpen, TrendingUp, Flame, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const EbookCarousel = () => {
  const carouselSections = [
    {
      title: "Novidades",
      icon: Sparkles,
      color: "text-blue-600",
      books: [
        {
          id: 7,
          title: "Arquitetura Biofílica: Conectando Natureza e Design",
          author: "Arq. Marina Verde",
          category: "Arquitetura",
          rating: 4.9,
          downloads: "1.2k",
          cover: "/placeholder.svg",
          type: "premium" as const
        },
        {
          id: 8,
          title: "Inteligência Artificial na Arquitetura",
          author: "Dr. Carlos Tech",
          category: "Tendências",
          rating: 4.8,
          downloads: "890",
          cover: "/placeholder.svg",
          type: "premium" as const
        },
        {
          id: 9,
          title: "Design Regenerativo: O Futuro Sustentável",
          author: "Eco Studio",
          category: "Sustentabilidade",
          rating: 4.7,
          downloads: "756",
          cover: "/placeholder.svg",
          type: "free" as const
        }
      ]
    },
    {
      title: "Mais Baixados",
      icon: TrendingUp,
      color: "text-green-600",
      books: [
        {
          id: 1,
          title: "Manual Completo de Arquitetura Residencial",
          author: "Arq. Maria Silva",
          category: "Arquitetura",
          rating: 4.8,
          downloads: "5.3k",
          cover: "/placeholder.svg",
          type: "free" as const
        },
        {
          id: 2,
          title: "Design de Interiores: Tendências 2024",
          author: "Designer João Santos",
          category: "Design de Interiores",
          rating: 4.9,
          downloads: "4.1k",
          cover: "/placeholder.svg",
          type: "premium" as const
        },
        {
          id: 4,
          title: "Sustentabilidade na Arquitetura",
          author: "Arq. Ana Costa",
          category: "Arquitetura",
          rating: 4.8,
          downloads: "3.7k",
          cover: "/placeholder.svg",
          type: "free" as const
        }
      ]
    },
    {
      title: "Em Destaque",
      icon: Flame,
      color: "text-orange-600",
      books: [
        {
          id: 3,
          title: "Técnicas Avançadas de Marcenaria",
          author: "Mestre Carlos Oliveira",
          category: "Marcenaria",
          rating: 4.7,
          downloads: "2.8k",
          cover: "/placeholder.svg",
          type: "premium" as const
        },
        {
          id: 5,
          title: "Iluminação para Ambientes",
          author: "Designer Luz Pereira",
          category: "Design de Interiores",
          rating: 4.6,
          downloads: "2.9k",
          cover: "/placeholder.svg",
          type: "premium" as const
        },
        {
          id: 6,
          title: "Móveis Funcionais para Espaços Pequenos",
          author: "Marceneiro Pedro Lima",
          category: "Marcenaria",
          rating: 4.5,
          downloads: "2.4k",
          cover: "/placeholder.svg",
          type: "free" as const
        }
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Arquitetura":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Design de Interiores":
        return "bg-green-100 text-green-700 border-green-200";
      case "Marcenaria":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Sustentabilidade":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
      case "Tendências":
        return "bg-purple-100 text-purple-700 border-purple-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {carouselSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <section.icon className={`w-6 h-6 ${section.color}`} />
                <h2 className="text-2xl font-light text-gray-900">
                  {section.title}
                </h2>
              </div>
              <Link to="/ebooks">
                <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                  Ver todos
                </Button>
              </Link>
            </div>
            
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {section.books.map((book) => (
                  <CarouselItem key={book.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <Link to={`/ebook/${book.id}`}>
                      <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer">
                        <div className="relative">
                          <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
                            <img 
                              src={book.cover} 
                              alt={book.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                            <div className="absolute top-3 right-3">
                              <ContentBadge type={book.type} />
                            </div>
                          </div>
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex items-center justify-between mb-2">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getCategoryColor(book.category)}`}
                            >
                              {book.category}
                            </Badge>
                            <div className="flex items-center text-sm text-gray-500">
                              <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                              {book.rating}
                            </div>
                          </div>
                          <CardTitle className="text-lg font-medium text-gray-900 leading-snug line-clamp-2">
                            {book.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600">por {book.author}</p>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <div className="flex items-center">
                              <Download className="w-4 h-4 mr-1" />
                              {book.downloads}
                            </div>
                            <Button 
                              size="sm" 
                              variant={book.type === 'free' ? 'default' : 'outline'}
                              className="text-xs"
                            >
                              {book.type === 'free' ? 'Baixar' : 'Acessar'}
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        ))}
        
        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="bg-gray-50 rounded-2xl p-12 max-w-3xl mx-auto">
            <h3 className="text-3xl font-light text-gray-900 mb-4">
              Pronto para expandir seus conhecimentos?
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Acesse nossa biblioteca completa com mais de 50 e-books especializados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/ebooks">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800 px-8">
                  Explore nossa biblioteca
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="px-8">
                  Comece a aprender
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EbookCarousel;
