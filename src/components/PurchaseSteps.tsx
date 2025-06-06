
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, ShoppingCart, BookOpen } from "lucide-react";

const PurchaseSteps = () => {
  const steps = [
    {
      icon: Search,
      title: "Escolha seu eBook",
      description: "Navegue pelo nosso catálogo e encontre o conteúdo ideal para você.",
      number: "01"
    },
    {
      icon: ShoppingCart,
      title: "Faça a compra",
      description: "Conclua sua compra estando logado em sua conta.",
      number: "02"
    },
    {
      icon: BookOpen,
      title: "Escolha onde ler",
      description: "Leia diretamente no navegador, baixe em PDF ou use nosso app (em desenvolvimento).",
      number: "03"
    }
  ];

  return (
    <section className="py-16 bg-white border-t border-blue-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
            📚 Como Funciona
          </Badge>
          <h2 className="text-3xl font-light text-blue-900 mb-4">
            Etapas da <span className="font-medium">Compra</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Processo simples e seguro para adquirir seus eBooks favoritos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden md:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center px-32">
              <div className="w-32 h-0.5 bg-gradient-to-r from-blue-300 to-blue-500"></div>
              <div className="w-32 h-0.5 bg-gradient-to-r from-blue-500 to-blue-700"></div>
            </div>
          </div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card key={index} className="relative text-center border-blue-200 hover:shadow-lg transition-all duration-300">
                <CardContent className="p-8">
                  {/* Step Number */}
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center text-sm font-bold">
                      {step.number}
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6 mt-4">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-medium text-blue-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 bg-blue-50 px-6 py-3 rounded-full border border-blue-200">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-blue-800 font-medium">
              Processo 100% seguro e criptografado
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PurchaseSteps;
