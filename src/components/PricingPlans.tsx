
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, Star } from "lucide-react";
import PaymentButton from "@/components/PaymentButton";

const PricingPlans = () => {
  const plans = [
    {
      name: "Gratuito",
      price: "R$ 0",
      period: "/mês",
      description: "Acesso limitado para começar",
      features: [
        "5 e-books por mês",
        "Acesso às 3 categorias",
        "Download offline limitado"
      ],
      limitations: [
        "Sem acesso a conteúdo premium",
        "Anúncios ocasionais"
      ],
      buttonText: "Plano Atual",
      buttonVariant: "outline" as const,
      popular: false,
      current: true
    },
    {
      name: "Premium",
      price: "R$ 29",
      period: "/mês",
      description: "Acesso completo para profissionais",
      features: [
        "E-books ilimitados",
        "Conteúdo exclusivo premium",
        "Download offline ilimitado",
        "Acesso antecipado a novos lançamentos",
        "Suporte prioritário",
        "Sem anúncios"
      ],
      limitations: [],
      buttonText: "Em Breve",
      buttonVariant: "default" as const,
      popular: true,
      current: false
    },
    {
      name: "Estúdio",
      price: "R$ 79",
      period: "/mês",
      description: "Para equipes e escritórios",
      features: [
        "Tudo do plano Premium",
        "Até 5 usuários",
        "Biblioteca compartilhada",
        "Ferramentas de colaboração",
        "Relatórios de uso",
        "Gerenciamento de equipe",
        "Suporte dedicado"
      ],
      limitations: [],
      buttonText: "Em Breve",
      buttonVariant: "outline" as const,
      popular: false,
      current: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            Planos de Assinatura
          </Badge>
          <h2 className="text-3xl md:text-4xl font-light text-blue-900 mb-4">
            Escolha o <span className="font-medium">Plano Ideal</span>
          </h2>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            Comece gratuitamente e evolua conforme suas necessidades profissionais crescem
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative ${plan.popular ? 'border-blue-600 shadow-lg scale-105' : 'border-blue-200'} hover:shadow-lg transition-all duration-300`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-blue-600 text-white px-3 py-1">
                    <Star className="w-3 h-3 mr-1" />
                    Mais Popular
                  </Badge>
                </div>
              )}
              
              <CardHeader className="text-center pb-4">
                <CardTitle className="text-xl font-semibold text-blue-900 mb-2">
                  {plan.name}
                </CardTitle>
                <div className="mb-4">
                  <span className="text-4xl font-light text-blue-900">{plan.price}</span>
                  <span className="text-blue-600">{plan.period}</span>
                </div>
                <p className="text-blue-600 text-sm">{plan.description}</p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <Check className="w-4 h-4 text-blue-600 mr-3 flex-shrink-0" />
                      <span className="text-sm text-blue-700">{feature}</span>
                    </div>
                  ))}
                  
                  {plan.limitations.map((limitation, limitIndex) => (
                    <div key={limitIndex} className="flex items-center opacity-60">
                      <div className="w-4 h-4 mr-3 flex-shrink-0 flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                      </div>
                      <span className="text-sm text-blue-600">{limitation}</span>
                    </div>
                  ))}
                </div>
                
                {plan.current ? (
                  <Button 
                    variant="outline"
                    className="w-full cursor-default border-blue-300 text-blue-600"
                    disabled
                  >
                    Plano Atual
                  </Button>
                ) : plan.name === "Premium" ? (
                  <PaymentButton
                    productType="subscription"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Assinar Premium
                  </PaymentButton>
                ) : (
                  <Button 
                    variant={plan.buttonVariant}
                    className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
                    disabled
                  >
                    {plan.buttonText}
                  </Button>
                )}
                
                {plan.current && (
                  <p className="text-xs text-blue-500 text-center mt-2">
                    Você está usando este plano
                  </p>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-blue-500 mb-4">
            Todos os planos incluem acesso às três categorias especializadas
          </p>
          <p className="text-xs text-blue-400">
            Cancele a qualquer momento • Pagamento seguro via Stripe
          </p>
        </div>
      </div>
    </section>
  );
};

export default PricingPlans;
