
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Headphones, Smartphone, Calendar, Lightbulb } from "lucide-react";

const UpcomingFeatures = () => {
  const features = [
    {
      icon: Headphones,
      title: "Audiobooks",
      description: "Ouça seus e-books favoritos enquanto trabalha ou viaja",
      status: "Em Desenvolvimento",
      eta: "Q2 2024",
      color: "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700"
    },
    {
      icon: Smartphone,
      title: "Integração com Kindle",
      description: "Sincronize sua biblioteca e progresso com dispositivos Kindle",
      status: "Planejado",
      eta: "Q3 2024", 
      color: "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700"
    },
    {
      icon: Calendar,
      title: "App Mobile",
      description: "Aplicativo nativo para iOS e Android com sincronização offline",
      status: "Em Análise",
      eta: "Q4 2024",
      color: "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-400 dark:border-purple-700"
    },
    {
      icon: Lightbulb,
      title: "AI Assistant",
      description: "Assistente inteligente para recomendações personalizadas",
      status: "Pesquisa",
      eta: "2025",
      color: "bg-orange-100 text-orange-700 border-orange-200 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-700"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Novidades em Breve
          </Badge>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
            Próximas <span className="font-medium">Funcionalidades</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Estamos constantemente inovando para melhorar sua experiência de aprendizado
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                  <feature.icon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                </div>
                <CardTitle className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {feature.description}
                </p>
                <div className="space-y-2">
                  <Badge variant="outline" className={`text-xs ${feature.color}`}>
                    {feature.status}
                  </Badge>
                  <div className="text-xs text-gray-500 dark:text-gray-500">
                    Previsão: {feature.eta}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Card className="bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600 max-w-2xl mx-auto">
            <CardContent className="py-8">
              <h3 className="text-xl font-medium text-gray-900 dark:text-gray-100 mb-4">
                Tem alguma sugestão?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Sua opinião é muito importante para nós. Compartilhe suas ideias para novas funcionalidades.
              </p>
              <Button variant="outline">
                Enviar Sugestão
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UpcomingFeatures;
