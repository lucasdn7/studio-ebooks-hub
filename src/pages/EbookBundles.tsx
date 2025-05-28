
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, BookOpen, Star, CheckCircle, Gift } from "lucide-react";

const EbookBundles = () => {
  const bundles = [
    {
      id: 1,
      title: "Kit Arquitetura Residencial Completo",
      description: "Tudo que você precisa para dominar projetos residenciais",
      price: "R$ 79,90",
      originalPrice: "R$ 139,70",
      discount: "40%",
      ebooks: [
        "Manual Completo de Arquitetura Residencial",
        "Sustentabilidade na Arquitetura",
        "Projetos Residenciais Compactos"
      ],
      bonus: ["Checklist de Projeto Residencial", "Guia de Materiais Sustentáveis"],
      category: "Arquitetura",
      featured: true,
      totalPages: 340
    },
    {
      id: 2,
      title: "Pacote Design de Interiores Premium",
      description: "Transforme ambientes com técnicas profissionais",
      price: "R$ 79,90",
      originalPrice: "R$ 119,70",
      discount: "33%",
      ebooks: [
        "Design de Interiores: Tendências 2024",
        "Iluminação para Ambientes",
        "Paleta de Cores para Interiores"
      ],
      bonus: [],
      category: "Design de Interiores",
      featured: false,
      totalPages: 260
    },
    {
      id: 3,
      title: "Master Kit Marcenaria Profissional",
      description: "Do básico ao avançado em marcenaria",
      price: "R$ 59,90",
      originalPrice: "R$ 89,70",
      discount: "30%",
      ebooks: [
        "Técnicas Avançadas de Marcenaria",
        "Móveis Funcionais para Espaços Pequenos",
        "Ferramentas Essenciais para Marcenaria"
      ],
      bonus: ["Guia de Madeiras", "Projetos Prontos", "Lista de Fornecedores"],
      category: "Marcenaria",
      featured: false,
      totalPages: 280
    }
  ];

  const upcomingFeatures = [
    {
      title: "Audiobooks",
      description: "Escute seus e-books favoritos em qualquer lugar",
      icon: "🎧",
      status: "Em breve"
    },
    {
      title: "Integração Kindle",
      description: "Sincronize sua biblioteca diretamente com o Kindle",
      icon: "📱",
      status: "2024"
    },
    {
      title: "Realidade Aumentada",
      description: "Visualize projetos em 3D através do seu celular",
      icon: "🥽",
      status: "2024"
    },
    {
      title: "Consultoria IA",
      description: "Assistant inteligente para seus projetos",
      icon: "🤖",
      status: "Em desenvolvimento"
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
              Pacotes de <span className="font-medium">E-books</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kits completos com e-books, checklists e materiais bonus para acelerar seu aprendizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {bundles.map((bundle) => (
              <Card key={bundle.id} className={`group hover:shadow-lg transition-all duration-300 ${bundle.featured ? 'ring-2 ring-gray-900 ring-opacity-10' : ''}`}>
                {bundle.featured && (
                  <div className="absolute -top-3 left-4 z-10">
                    <Badge className="bg-gray-900 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${getCategoryColor(bundle.category)}`}
                    >
                      {bundle.category}
                    </Badge>
                    <Badge variant="secondary" className="bg-red-100 text-red-700">
                      -{bundle.discount}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-medium text-gray-900 leading-snug">
                    {bundle.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{bundle.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">{bundle.price}</span>
                      <span className="text-sm text-gray-500 line-through">{bundle.originalPrice}</span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {bundle.totalPages} páginas no total
                    </div>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2">E-books inclusos:</h4>
                    <ul className="space-y-1">
                      {bundle.ebooks.map((ebook, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                          {ebook}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-900 mb-2 flex items-center">
                      <Gift className="w-4 h-4 mr-1 text-orange-500" />
                      Bônus inclusos:
                    </h4>
                    <ul className="space-y-1">
                      {bundle.bonus.map((bonus, index) => (
                        <li key={index} className="text-xs text-gray-600 flex items-center">
                          <CheckCircle className="w-3 h-3 mr-2 text-orange-500" />
                          {bonus}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gray-900 hover:bg-gray-800">
                    <Download className="w-4 h-4 mr-2" />
                    Comprar Pacote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <section className="bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-light text-gray-900 mb-4">
                Próximas <span className="font-medium">Funcionalidades</span>
              </h2>
              <p className="text-lg text-gray-600">
                Estamos sempre inovando para melhorar sua experiência
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {upcomingFeatures.map((feature, index) => (
                <Card key={index} className="text-center">
                  <CardContent className="pt-6">
                    <div className="text-4xl mb-3">{feature.icon}</div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                      {feature.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default EbookBundles;
