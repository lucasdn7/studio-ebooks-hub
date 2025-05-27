
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Calendar, Clock, Eye, ArrowRight } from "lucide-react";

const ConstructionNews = () => {
  const featuredNews = {
    id: 1,
    title: "Revolução Verde: Materiais Sustentáveis Transformam a Construção Civil",
    excerpt: "Descubra como novos materiais ecológicos estão mudando o paradigma da construção, reduzindo custos e impacto ambiental.",
    content: "A indústria da construção civil está passando por uma transformação sem precedentes...",
    author: "Eng. Maria Sustentável",
    date: "2024-01-15",
    readTime: "5 min",
    views: "2.1k",
    category: "Sustentabilidade",
    image: "/placeholder.svg",
    featured: true
  };

  const news = [
    {
      id: 2,
      title: "Tecnologia BIM Acelera Projetos de Infraestrutura no Brasil",
      excerpt: "Building Information Modeling reduz em 30% o tempo de execução de grandes obras.",
      author: "Arq. Carlos Tech",
      date: "2024-01-14",
      readTime: "4 min",
      views: "1.8k",
      category: "Tecnologia",
      image: "/placeholder.svg"
    },
    {
      id: 3,
      title: "Mercado Imobiliário: Tendências para 2024",
      excerpt: "Análise completa das previsões e oportunidades no setor imobiliário brasileiro.",
      author: "Economista Ana Dados",
      date: "2024-01-13",
      readTime: "6 min",
      views: "3.2k",
      category: "Mercado",
      image: "/placeholder.svg"
    },
    {
      id: 4,
      title: "Inovações em Concreto: Mais Resistente e Ecológico",
      excerpt: "Pesquisadores desenvolvem novo tipo de concreto com 40% menos emissão de CO2.",
      author: "Dr. Pedro Materiais",
      date: "2024-01-12",
      readTime: "3 min",
      views: "1.5k",
      category: "Materiais",
      image: "/placeholder.svg"
    },
    {
      id: 5,
      title: "Robôs na Construção: Automação Chega aos Canteiros",
      excerpt: "Empresas pioneiras testam robôs para alvenaria e acabamentos com resultados promissores.",
      author: "Eng. Robot Silva",
      date: "2024-01-11",
      readTime: "7 min",
      views: "2.7k",
      category: "Tecnologia",
      image: "/placeholder.svg"
    },
    {
      id: 6,
      title: "Normas de Segurança: Mudanças na NR-18",
      excerpt: "Novas regulamentações de segurança entram em vigor e impactam obras em todo país.",
      author: "Esp. Segurança Lima",
      date: "2024-01-10",
      readTime: "5 min",
      views: "4.1k",
      category: "Regulamentação",
      image: "/placeholder.svg"
    }
  ];

  const categories = [
    { name: "Todas", count: "142", active: true },
    { name: "Tecnologia", count: "34", active: false },
    { name: "Sustentabilidade", count: "28", active: false },
    { name: "Mercado", count: "41", active: false },
    { name: "Materiais", count: "23", active: false },
    { name: "Regulamentação", count: "16", active: false }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Tecnologia":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Sustentabilidade":
        return "bg-green-100 text-green-700 border-green-200";
      case "Mercado":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Materiais":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Regulamentação":
        return "bg-red-100 text-red-700 border-red-200";
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
            <Badge variant="secondary" className="mb-4">
              Últimas Notícias
            </Badge>
            <h1 className="text-4xl font-light text-gray-900 mb-4">
              Notícias da <span className="font-medium">Construção Civil</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fique atualizado com as principais novidades, tendências e inovações do setor
            </p>
          </div>

          {/* Notícia Destaque */}
          <Card className="mb-12 overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2">
                <div className="aspect-video md:aspect-square bg-gray-200">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="md:w-1/2 p-8">
                <Badge 
                  variant="outline" 
                  className={`mb-4 ${getCategoryColor(featuredNews.category)}`}
                >
                  {featuredNews.category}
                </Badge>
                <h2 className="text-3xl font-light text-gray-900 mb-4 leading-tight">
                  {featuredNews.title}
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  {featuredNews.excerpt}
                </p>
                <div className="flex items-center justify-between mb-6 text-sm text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span>por {featuredNews.author}</span>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-1" />
                      {new Date(featuredNews.date).toLocaleDateString('pt-BR')}
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <Clock className="w-4 h-4 mr-1" />
                      {featuredNews.readTime}
                    </div>
                    <div className="flex items-center">
                      <Eye className="w-4 h-4 mr-1" />
                      {featuredNews.views}
                    </div>
                  </div>
                </div>
                <Button className="bg-gray-900 hover:bg-gray-800">
                  Ler Notícia Completa
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </Card>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Filtros por Categoria */}
            <div className="lg:w-1/4">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="text-lg font-light">Categorias</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {categories.map((category, index) => (
                      <button 
                        key={index}
                        className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                          category.active 
                            ? 'bg-gray-900 text-white' 
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span>{category.name}</span>
                          <span className="text-xs opacity-70">{category.count}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Lista de Notícias */}
            <div className="lg:w-3/4">
              <div className="grid gap-6">
                {news.map((article) => (
                  <Card key={article.id} className="hover:shadow-lg transition-shadow">
                    <div className="md:flex">
                      <div className="md:w-1/3">
                        <div className="aspect-video bg-gray-200 rounded-l-lg overflow-hidden">
                          <img 
                            src={article.image} 
                            alt={article.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                      <div className="md:w-2/3 p-6">
                        <Badge 
                          variant="outline" 
                          className={`mb-3 ${getCategoryColor(article.category)}`}
                        >
                          {article.category}
                        </Badge>
                        <h3 className="text-xl font-medium text-gray-900 mb-3 leading-tight">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-sm text-gray-500">
                          <div className="flex items-center space-x-3">
                            <span>por {article.author}</span>
                            <div className="flex items-center">
                              <Calendar className="w-4 h-4 mr-1" />
                              {new Date(article.date).toLocaleDateString('pt-BR')}
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center">
                              <Clock className="w-4 h-4 mr-1" />
                              {article.readTime}
                            </div>
                            <div className="flex items-center">
                              <Eye className="w-4 h-4 mr-1" />
                              {article.views}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Carregar Mais Notícias
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ConstructionNews;
