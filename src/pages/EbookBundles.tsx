import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Download, BookOpen, Star, CheckCircle, Gift } from "lucide-react";
import { useKits } from "@/hooks/useKits";
import PaymentButton from "@/components/PaymentButton";

const EbookBundles = () => {
  const { data: kits, isLoading } = useKits();

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
      status: "Em breve"
    },
    {
      title: "Realidade Aumentada",
      description: "Visualize projetos em 3D através do seu celular",
      icon: "🥽",
      status: "Em breve"
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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
            <p className="mt-4 text-gray-600">Carregando kits...</p>
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
              Pacotes de <span className="font-medium">E-books</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kits completos com e-books, checklists e materiais bonus para acelerar seu aprendizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {kits?.map((kit) => (
              <Card key={kit.id} className="group hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {kit.is_premium ? 'Premium' : 'Padrão'}
                    </Badge>
                    {kit.is_premium && (
                      <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">
                        Premium
                      </Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg font-medium text-gray-900 leading-snug">
                    {kit.title}
                  </CardTitle>
                  <p className="text-sm text-gray-600">{kit.description}</p>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold text-gray-900">
                        R$ {kit.price.toFixed(2)}
                      </span>
                    </div>
                    <div className="text-xs text-gray-500 flex items-center">
                      <BookOpen className="w-4 h-4 mr-1" />
                      {kit.ebook_ids?.length || 0} e-books inclusos
                    </div>
                  </div>

                  <PaymentButton
                    productType="kit"
                    productId={kit.id}
                    price={kit.price}
                    className="w-full bg-gray-900 hover:bg-gray-800"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Comprar Kit
                  </PaymentButton>
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
