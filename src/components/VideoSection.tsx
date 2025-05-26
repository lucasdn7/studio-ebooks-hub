import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Clock, Eye } from "lucide-react";
import ContentBadge from "@/components/ContentBadge";

const VideoSection = () => {
  const videos = [
    {
      id: 1,
      title: "Técnicas Fundamentais de Marcenaria",
      category: "Marcenaria",
      duration: "12:30",
      views: "2.3k",
      thumbnail: "/placeholder.svg",
      author: "Mestre Carpinteiro",
      description: "Aprenda as técnicas básicas essenciais para começar na marcenaria profissional.",
      type: "free" as const
    },
    {
      id: 2,
      title: "Princípios de Design de Interiores",
      category: "Design de Interiores",
      duration: "8:45",
      views: "5.1k",
      thumbnail: "/placeholder.svg",
      author: "Studio Design",
      description: "Conceitos fundamentais para criar ambientes harmoniosos e funcionais.",
      type: "free" as const
    },
    {
      id: 3,
      title: "Arquitetura Sustentável Moderna",
      category: "Arquitetura",
      duration: "15:20",
      views: "3.7k",
      thumbnail: "/placeholder.svg",
      author: "Arquiteto Verde",
      description: "Estratégias para desenvolver projetos arquitetônicos sustentáveis.",
      type: "premium" as const
    },
    {
      id: 4,
      title: "Ferramentas Essenciais para Marcenaria",
      category: "Marcenaria",
      duration: "10:15",
      views: "1.8k",
      thumbnail: "/placeholder.svg",
      author: "Oficina Pro",
      description: "Guia completo das ferramentas indispensáveis para o marceneiro.",
      type: "free" as const
    },
    {
      id: 5,
      title: "Paleta de Cores para Interiores",
      category: "Design de Interiores",
      duration: "6:30",
      views: "4.2k",
      thumbnail: "/placeholder.svg",
      author: "Color Expert",
      description: "Como escolher e combinar cores para criar ambientes únicos.",
      type: "premium" as const
    },
    {
      id: 6,
      title: "Projetos Residenciais Compactos",
      category: "Arquitetura",
      duration: "13:45",
      views: "6.5k",
      thumbnail: "/placeholder.svg",
      author: "Micro Arquitetura",
      description: "Soluções inteligentes para maximizar espaços pequenos.",
      type: "free" as const
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
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Conteúdo Exclusivo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Vídeos <span className="font-medium">Educativos</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acesse nossa biblioteca de vídeos curtos com dicas práticas, 
            tutoriais e insights de especialistas nas três áreas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {videos.map((video) => (
            <Card key={video.id} className="group hover:shadow-lg transition-all duration-300 bg-white border-gray-200">
              <div className="relative">
                <div className="aspect-video bg-gray-200 rounded-t-lg relative overflow-hidden">
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100">
                      <Play className="w-4 h-4 mr-2" />
                      Assistir
                    </Button>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute top-2 left-2">
                    <ContentBadge type={video.type} />
                  </div>
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${getCategoryColor(video.category)}`}
                  >
                    {video.category}
                  </Badge>
                  <div className="flex items-center text-xs text-gray-500">
                    <Eye className="w-3 h-3 mr-1" />
                    {video.views}
                  </div>
                </div>
                <CardTitle className="text-lg font-medium text-gray-900 leading-snug">
                  {video.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {video.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">por {video.author}</span>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock className="w-3 h-3 mr-1" />
                    {video.duration}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button variant="outline" size="lg" className="px-8">
            Ver Todos os Vídeos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
