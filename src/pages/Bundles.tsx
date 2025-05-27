
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { BookOpen, CheckCircle, Star, Package } from "lucide-react";

const Bundles = () => {
  const bundles = [
    {
      id: 1,
      title: "Kit Arquitetura Residencial Completo",
      description: "Tudo que você precisa para dominar projetos residenciais",
      price: 89.90,
      originalPrice: 150.00,
      discount: 40,
      ebooks: [
        "Manual Completo de Arquitetura Residencial",
        "Sustentabilidade na Arquitetura",
        "Projetos Residenciais Compactos"
      ],
      bonus: [
        "Checklist de Projeto Residencial",
        "Templates de Plantas Baixas",
        "Acesso a Webinar Exclusivo"
      ],
      category: "Arquitetura",
      featured: true,
      popular: true
    },
    {
      id: 2,
      title: "Pack Design de Interiores Premium",
      description: "Transforme espaços com técnicas profissionais",
      price: 75.90,
      originalPrice: 120.00,
      discount: 37,
      ebooks: [
        "Design de Interiores: Tendências 2024",
        "Iluminação para Ambientes",
        "Paleta de Cores Profissional"
      ],
      bonus: [
        "Kit de Texturas HD",
        "Guia de Medidas Padrão",
        "Calculadora de Tintas"
      ],
      category: "Design de Interiores",
      featured: true,
      popular: false
    },
    {
      id: 3,
      title: "Bundle Sustentabilidade e Eficiência",
      description: "Construa o futuro com consciência ambiental",
      price: 65.90,
      originalPrice: 100.00,
      discount: 34,
      ebooks: [
        "Arquitetura Sustentável Avançada",
        "Eficiência Energética em Edificações",
        "Materiais Ecológicos na Construção"
      ],
      bonus: [
        "Calculadora de Pegada de Carbono",
        "Lista de Fornecedores Sustentáveis",
        "Certificação Verde - Guia Prático"
      ],
      category: "Sustentabilidade",
      featured: false,
      popular: false
    },
    {
      id: 4,
      title: "Kit Marcenaria Profissional",
      description: "Domine a arte da marcenaria sob medida",
      price: 69.90,
      originalPrice: 110.00,
      discount: 36,
      ebooks: [
        "Técnicas Avançadas de Marcenaria",
        "Móveis Funcionais para Espaços Pequenos",
        "Acabamentos Especiais em Madeira"
      ],
      bonus: [
        "Calculadora de Materiais",
        "Projeto de Móveis Básicos",
        "Guia de Ferramentas Essenciais"
      ],
      category: "Marcenaria",
      featured: false,
      popular: false
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Arquitetura":
        return "bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-700";
      case "Design de Interiores":
        return "bg-green-100 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-700";
      case "Marcenaria":
        return "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-700";
      case "Sustentabilidade":
        return "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-700";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <Header />
      
      <section className="py-16 bg-white dark:bg-gray-800 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4">
              Pacotes Especiais
            </Badge>
            <h1 className="text-3xl md:text-4xl font-light text-gray-900 dark:text-gray-100 mb-4">
              Kits de <span className="font-medium">E-books</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Pacotes completos com e-books, checklists e materiais extras para acelerar seu aprendizado
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {bundles.map((bundle) => (
              <Card key={bundle.id} className={`group hover:shadow-xl transition-all duration-300 relative overflow-hidden bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${bundle.featured ? 'ring-2 ring-gray-900 dark:ring-gray-100 ring-opacity-10' : ''}`}>
                {bundle.popular && (
                  <div className="absolute -top-3 left-4 z-10">
                    <Badge className="bg-orange-500 text-white">
                      <Star className="w-3 h-3 mr-1" />
                      Mais Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="outline" className={`text-xs ${getCategoryColor(bundle.category)}`}>
                      {bundle.category}
                    </Badge>
                    <Badge className="bg-red-500 text-white text-xs">
                      -{bundle.discount}%
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-medium text-gray-900 dark:text-gray-100 leading-snug mb-2">
                    {bundle.title}
                  </CardTitle>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {bundle.description}
                  </p>

                  <div className="flex items-baseline space-x-2 mt-4">
                    <span className="text-3xl font-light text-gray-900 dark:text-gray-100">
                      R$ {bundle.price.toFixed(2).replace('.', ',')}
                    </span>
                    <span className="text-lg text-gray-500 dark:text-gray-400 line-through">
                      R$ {bundle.originalPrice.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                      <BookOpen className="w-4 h-4 mr-2" />
                      E-books Inclusos ({bundle.ebooks.length})
                    </h4>
                    <ul className="space-y-2">
                      {bundle.ebooks.map((ebook, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-500 flex-shrink-0 mt-0.5" />
                          {ebook}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-3 flex items-center">
                      <Package className="w-4 h-4 mr-2" />
                      Bônus Exclusivos
                    </h4>
                    <ul className="space-y-2">
                      {bundle.bonus.map((bonus, index) => (
                        <li key={index} className="flex items-start text-sm text-gray-600 dark:text-gray-400">
                          <Star className="w-4 h-4 mr-2 text-yellow-500 flex-shrink-0 mt-0.5" />
                          {bonus}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button className="w-full bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-200">
                    Adquirir Pacote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Card className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 border-gray-200 dark:border-gray-600">
              <CardContent className="py-12">
                <h3 className="text-2xl font-light text-gray-900 dark:text-gray-100 mb-4">
                  Não encontrou o que procurava?
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-2xl mx-auto">
                  Entre em contato conosco para criar um pacote personalizado de acordo com suas necessidades específicas.
                </p>
                <Button variant="outline" size="lg">
                  Solicitar Pacote Personalizado
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Bundles;
