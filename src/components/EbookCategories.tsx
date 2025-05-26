
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const categories = [
  {
    title: "Arquitetura",
    description: "Projetos residenciais, comerciais, teoria arquitetônica e tendências contemporâneas",
    ebooksCount: "45+ e-books",
    topics: ["Projetos Residenciais", "Arquitetura Comercial", "Sustentabilidade", "História da Arquitetura"],
    color: "bg-blue-50 border-blue-200",
    badge: "bg-blue-100 text-blue-800"
  },
  {
    title: "Design de Interiores",
    description: "Ambientação, cores, mobiliário, iluminação e técnicas de design de espacial",
    ebooksCount: "38+ e-books",
    topics: ["Ambientação", "Paleta de Cores", "Mobiliário", "Iluminação"],
    color: "bg-emerald-50 border-emerald-200",
    badge: "bg-emerald-100 text-emerald-800"
  },
  {
    title: "Marcenaria",
    description: "Técnicas de marcenaria, projetos de móveis, materiais e acabamentos especializados",
    ebooksCount: "29+ e-books",
    topics: ["Técnicas", "Projetos de Móveis", "Madeiras", "Acabamentos"],
    color: "bg-amber-50 border-amber-200",
    badge: "bg-amber-100 text-amber-800"
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
                <p className="text-gray-600 text-sm leading-relaxed">
                  {category.description}
                </p>
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
                
                <Button 
                  className="w-full group-hover:bg-gray-900 transition-colors" 
                  variant="outline"
                >
                  Explorar {category.title}
                </Button>
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
              Tenha acesso completo a todos os e-books e novos lançamentos mensais
            </p>
            <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
              Iniciar Assinatura Premium
            </Button>
            <p className="text-sm text-gray-500 mt-4">
              Cancele a qualquer momento • Sem compromisso
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EbookCategories;
