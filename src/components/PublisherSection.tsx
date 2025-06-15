
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  PenTool, 
  BookOpen, 
  Users, 
  TrendingUp,
  DollarSign,
  Mail,
  CheckCircle
} from "lucide-react";

const PublisherSection = () => {
  const benefits = [
    {
      icon: <DollarSign className="w-5 h-5 text-blue-600" />,
      title: "Monetize seu conteúdo",
      description: "Defina preços para seus eBooks ou publique gratuitamente para ganhar visibilidade"
    },
    {
      icon: <Users className="w-5 h-5 text-blue-600" />,
      title: "Alcance nossa audiência",
      description: "Conecte-se com milhares de leitores interessados em arquitetura e design"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-blue-600" />,
      title: "Analytics detalhados",
      description: "Acompanhe downloads, avaliações e receita através do nosso painel"
    },
    {
      icon: <CheckCircle className="w-5 h-5 text-blue-600" />,
      title: "Processo simples",
      description: "Upload fácil, revisão rápida e publicação automática após aprovação"
    }
  ];

  const handleContactClick = () => {
    window.location.href = "mailto:publicacao@arquiteturaacessivel.com?subject=Interesse em publicar eBook&body=Olá! Tenho interesse em publicar meu eBook na plataforma. Gostaria de conversar sobre o processo e condições.";
  };

  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <PenTool className="w-8 h-8 text-blue-900 mr-3" />
            <BookOpen className="w-8 h-8 text-blue-600" />
          </div>
          <h2 className="text-3xl font-light text-blue-900 mb-4">
            Publique seu <span className="font-medium">eBook</span> conosco
          </h2>
          <p className="text-lg text-blue-600 max-w-2xl mx-auto">
            Compartilhe seu conhecimento com nossa comunidade. Oferecemos uma plataforma completa 
            para autores e editoras publicarem conteúdo de qualidade.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {benefits.map((benefit, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow border-blue-200">
              <CardContent className="p-6">
                <div className="flex justify-center mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-medium text-blue-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-blue-600">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-blue-900 to-blue-800 text-white border-blue-700">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-light">
              Pronto para publicar?
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Entre em contato conosco para conhecer nossos planos de publicação, 
              desde opções gratuitas até parcerias comerciais exclusivas.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                Publicação Gratuita
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                Planos Comerciais
              </Badge>
              <Badge variant="outline" className="bg-white/10 text-white border-white/20">
                Parcerias Exclusivas
              </Badge>
            </div>

            <Button 
              onClick={handleContactClick}
              className="bg-white text-blue-900 hover:bg-blue-50"
              size="lg"
            >
              <Mail className="w-4 h-4 mr-2" />
              Entrar em contato
            </Button>
            
            <p className="text-sm text-blue-200 mt-4">
              Resposta em até 24 horas úteis
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default PublisherSection;
