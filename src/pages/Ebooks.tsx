
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ContentBadge from "@/components/ContentBadge";
import { Download, BookOpen, Star } from "lucide-react";

const Ebooks = () => {
  const ebooks = [
    {
      id: 1,
      title: "Manual Completo de Arquitetura Residencial",
      author: "Arq. Maria Silva",
      category: "Arquitetura",
      pages: 120,
      rating: 4.8,
      downloads: "2.3k",
      cover: "/placeholder.svg",
      description: "Guia completo para projetos residenciais modernos com técnicas sustentáveis.",
      type: "free" as const,
      featured: true
    },
    {
      id: 2,
      title: "Design de Interiores: Tendências 2024",
      author: "Designer João Santos",
      category: "Design de Interiores",
      pages: 85,
      rating: 4.9,
      downloads: "3.1k",
      cover: "/placeholder.svg",
      description: "As principais tendências em design de interiores para o ano de 2024.",
      type: "premium" as const,
      featured: false
    },
    {
      id: 3,
      title: "Técnicas Avançadas de Marcenaria",
      author: "Mestre Carlos Oliveira",
      category: "Marcenaria",
      pages: 95,
      rating: 4.7,
      downloads: "1.8k",
      cover: "/placeholder.svg",
      description: "Técnicas profissionais para móveis sob medida e acabamentos especiais.",
      type: "premium" as const,
      featured: true
    },
    {
      id: 4,
      title: "Sustentabilidade na Arquitetura",
      author: "Arq. Ana Costa",
      category: "Arquitetura",
      pages: 110,
      rating: 4.8,
      downloads: "2.7k",
      cover: "/placeholder.svg",
      description: "Estratégias para projetos arquitetônicos sustentáveis e eficientes.",
      type: "free" as const,
      featured: false
    },
    {
      id: 5,
      title: "Iluminação para Ambientes",
      author: "Designer Luz Pereira",
      category: "Design de Interiores",
      pages: 75,
      rating: 4.6,
      downloads: "1.9k",
      cover: "/placeholder.svg",
      description: "Como criar projetos de iluminação que transformam ambientes.",
      type: "premium" as const,
      featured: false
    },
    {
      id: 6,
      title: "Móveis Funcionais para Espaços Pequenos",
      author: "Marceneiro Pedro Lima",
      category: "Marcenaria",
      pages: 68,
      rating: 4.5,
      downloads: "1.4k",
      cover: "/placeholder.svg",
      description: "Soluções criativas em marcenaria para otimizar espaços reduzidos.",
      type: "free" as const,
      featured: false
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
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Biblioteca de <span className="font-medium">E-books</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Acesse nossa coleção exclusiva de e-books especializados em arquitetura, design e marcenaria
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ebooks.map((ebook) => (
              <Card key={ebook.id} className={`group hover:shadow-lg transition-all duration-300 ${ebook.featured ? 'ring-2 ring-gray-900 ring-opacity-10' : ''}`}>
                {ebook.featured && (
                  <div className="absolute -top-3 left-4 z-10">
                    <Badge className="bg-gray-900 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Destaque
                    </Badge>
                  </div>
                )}
                
                <div className="relative">
                  <div className="aspect-[3/4] bg-gray-200 rounded-t-lg overflow-hidden">
                    <img 
                      src={ebook.cover} 
                      alt={ebook.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3">
                      <ContentBadge type={ebook.type} />
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getCategoryColor(ebook.category)}`}
                    >
                      {ebook.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="w-4 h-4 mr-1 fill-yellow-400 text-yellow-400" />
                      {ebook.rating}
                    </div>
                  </div>
                  <CardTitle className="text-lg font-medium text-gray-900 leading-snug">
                    {ebook.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">por {ebook.author}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {ebook.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4 text-xs text-gray-500">
                    <div className="flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {ebook.pages} páginas
                    </div>
                    <div className="flex items-center">
                      <Download className="w-4 h-4 mr-1" />
                      {ebook.downloads}
                    </div>
                  </div>

                  <Button className="w-full" variant={ebook.type === 'free' ? 'default' : 'outline'}>
                    {ebook.type === 'free' ? 'Download Gratuito' : 'Acessar Premium'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Ebooks;
