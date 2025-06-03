
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import ContentBadge from "@/components/ContentBadge";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Arquitetura",
    description: "Projetos residenciais, comerciais, teoria arquitetônica e tendências contemporâneas",
    ebooksCount: "1+ e-books",
    topics: ["Projetos Residenciais", "Arquitetura Comercial", "Sustentabilidade", "História da Arquitetura"],
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-800",
    freeContent: 0,
    premiumContent: 1
  },
  {
    title: "Design de Interiores",
    description: "Ambientação, cores, mobiliário, iluminação e técnicas de design de espacial",
    ebooksCount: "1+ e-books",
    topics: ["Ambientação", "Paleta de Cores", "Mobiliário", "Iluminação"],
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800",
    freeContent: 0,
    premiumContent: 1
  },
  {
    title: "Marcenaria",
    description: "Técnicas de marcenaria, projetos de móveis, materiais e acabamentos especializados",
    ebooksCount: "1+ e-books",
    topics: ["Técnicas", "Projetos de Móveis", "Madeiras", "Acabamentos"],
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-800",
    freeContent: 0,
    premiumContent: 1
  }
];

const EbookCategories = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Categorias Especializadas
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conteúdo organizado por especialidade para facilitar seu aprendizado e referência profissional
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Card key={index} className={`${category.color} border-2 hover:shadow-lg transition-all duration-300 group`}>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-2">
                  <CardTitle className="text-xl font-semibold text-gray-900">
                    {category.title}
                  </CardTitle>
                  <Badge className={category.badge}>
                    {category.ebooksCount}
                  </Badge>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {category.description}
                </p>
                
                <div className="flex gap-2 mb-4">
                  <div className="flex items-center gap-1">
                    <ContentBadge type="free" />
                    <span className="text-xs text-gray-600">{category.freeContent}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ContentBadge type="premium" />
                    <span className="text-xs text-gray-600">{category.premiumContent}</span>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-3">Tópicos inclusos:</h4>
                  <div className="flex flex-wrap gap-2">
                    {category.topics.map((topic, topicIndex) => (
                      <Badge key={topicIndex} variant="secondary" className="text-xs">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <Link to={`/ebooks?category=${encodeURIComponent(category.title)}`}>
                  <Button 
                    className="w-full group-hover:bg-gray-900 transition-colors" 
                    variant="outline"
                  >
                    Explorar {category.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 max-w-2xl mx-auto">
            <h3 className="text-2xl font-light text-gray-900 mb-4">
              Pronto para começar?
            </h3>
            <p className="text-gray-600 mb-6">
              Comece gratuitamente e tenha acesso aos melhores conteúdos de arquitetura e design
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/login">
                <Button size="lg" variant="outline">
                  Começar Grátis
                </Button>
              </Link>
              <Link to="/plans">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
                  Ver Planos Premium
                </Button>
              </Link>
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Sem cartão de crédito • Cancele a qualquer momento • Teste por 7 dias grátis
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EbookCategories;
