
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpen, Users, Star } from "lucide-react";
import { Link } from "react-router-dom";

const EbookHighlightSection = () => {
  const highlights = [
    {
      title: "E-books Premium Disponíveis",
      description: "Acesse nossa biblioteca exclusiva de conteúdos especializados",
      value: "50+",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Membros Ativos",
      description: "Profissionais conectados em nossa comunidade",
      value: "2.5k+",
      icon: Users,
      color: "text-green-600"
    },
    {
      title: "Avaliação Média",
      description: "Nota dos nossos conteúdos avaliados pelos usuários",
      value: "4.9",
      icon: Star,
      color: "text-yellow-600"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <Badge variant="secondary" className="mb-4">
            Conteúdo Exclusivo
          </Badge>
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Biblioteca <span className="font-medium">Especializada</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Acesse nossa coleção curada de e-books, pacotes exclusivos e 
            certificados digitais para acelerar seu desenvolvimento profissional.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {highlights.map((highlight, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-8 pb-6">
                <highlight.icon className={`w-12 h-12 mx-auto mb-4 ${highlight.color}`} />
                <div className="text-3xl font-light text-gray-900 mb-2">{highlight.value}</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-sm text-gray-600">{highlight.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center space-y-4">
          <Link to="/ebooks">
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800 mr-4">
              Explorar E-books
            </Button>
          </Link>
          <Link to="/ebook-bundles">
            <Button variant="outline" size="lg">
              Ver Pacotes
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default EbookHighlightSection;
