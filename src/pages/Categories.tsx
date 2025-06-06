
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building, Palette, Home, Lightbulb, Hammer, Zap, Droplets, Scale, Laptop, TrendingUp, DollarSign, Target, GraduationCap, Briefcase } from "lucide-react";
import { Link } from "react-router-dom";

const Categories = () => {
  const categories = [
    {
      id: "arquitetura",
      name: "Arquitetura",
      icon: Building,
      description: "eBooks voltados para projetos arquitetônicos, desenho técnico, normas e metodologias de criação e execução. Aprenda sobre composição espacial, sustentabilidade e inovação em projetos residenciais e comerciais."
    },
    {
      id: "paisagismo",
      name: "Paisagismo",
      icon: Palette,
      description: "Conteúdos sobre design de jardins, espaços verdes urbanos, escolha de plantas e criação de ambientes externos harmoniosos. Descubra técnicas de planejamento paisagístico e manutenção de áreas verdes."
    },
    {
      id: "urbanismo",
      name: "Urbanismo",
      icon: Home,
      description: "Materiais sobre planejamento urbano sustentável, desenvolvimento de cidades inteligentes e organização de espaços públicos. Aprenda sobre mobilidade urbana e gestão territorial."
    },
    {
      id: "design-interiores",
      name: "Design de Interiores",
      icon: Lightbulb,
      description: "Livros sobre estética, composição de ambientes, escolha de materiais, iluminação e tendências. Explore técnicas de decoração, ergonomia e criação de espaços funcionais e belos."
    },
    {
      id: "marcenaria",
      name: "Marcenaria",
      icon: Hammer,
      description: "Técnicas de carpintaria, trabalho em madeira, design de móveis e projetos personalizados. Aprenda sobre ferramentas, acabamentos e criação de peças únicas para ambientes residenciais e comerciais."
    },
    {
      id: "engenharia-civil",
      name: "Engenharia Civil",
      icon: Building,
      description: "Cálculos estruturais, gestão de obras, materiais de construção e normas técnicas. Conteúdo essencial para profissionais que trabalham com planejamento e execução de construções."
    },
    {
      id: "eletrica",
      name: "Elétrica",
      icon: Zap,
      description: "Instalações elétricas prediais, automação residencial, eficiência energética e segurança elétrica. Aprenda sobre dimensionamento de circuitos e tecnologias de smart homes."
    },
    {
      id: "hidrossanitario",
      name: "Hidrossanitário",
      icon: Droplets,
      description: "Sistemas hidráulicos, instalações sanitárias, tratamento de água e sustentabilidade hídrica. Conteúdo sobre dimensionamento de tubulações e eficiência no uso da água."
    },
    {
      id: "legislacao",
      name: "Legislação",
      icon: Scale,
      description: "Normas técnicas, regulamentações do setor, código de obras e legislação ambiental. Mantenha-se atualizado com as leis e normas que regem a construção civil no Brasil."
    },
    {
      id: "tecnologia",
      name: "Tecnologia",
      icon: Laptop,
      description: "Ferramentas digitais para construção civil, softwares de projeto, BIM e inovações tecnológicas. Aprenda sobre automação, IoT e as mais recentes tecnologias do setor."
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: TrendingUp,
      description: "Estratégias de divulgação, marketing digital para arquitetos e engenheiros, branding pessoal e captação de clientes. Aprenda a promover seus serviços e construir uma marca forte no mercado."
    },
    {
      id: "financas",
      name: "Finanças",
      icon: DollarSign,
      description: "Gestão financeira de obras, orçamentos, controle de custos e planejamento econômico. Conteúdo essencial para o sucesso financeiro de projetos e empresas do setor."
    },
    {
      id: "desenvolvimento-pessoal",
      name: "Desenvolvimento Pessoal",
      icon: Target,
      description: "Liderança, habilidades interpessoais, gestão de equipes e crescimento profissional. Desenvolva competências comportamentais para se destacar no mercado da construção civil."
    },
    {
      id: "educacao",
      name: "Educação",
      icon: GraduationCap,
      description: "Metodologias de ensino, didática para profissionais da construção civil e técnicas de treinamento. Conteúdo para quem deseja compartilhar conhecimento e formar novos profissionais."
    },
    {
      id: "negocios",
      name: "Negócios",
      icon: Briefcase,
      description: "Empreendedorismo no setor da construção, gestão empresarial, inovação e estratégias de crescimento. Aprenda a criar e gerir empresas de sucesso na área da construção civil."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="mb-4 bg-blue-100 text-blue-800">
              Categorias Especializadas
            </Badge>
            <h1 className="text-4xl font-light text-blue-900 mb-4">
              Explore por <span className="font-medium">Categoria</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encontre o conteúdo ideal organizado por área de especialização. 
              Cada categoria oferece conhecimentos específicos para acelerar seu aprendizado.
            </p>
          </div>

          {/* Grid de Categorias */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Link key={category.id} to={`/ebooks?category=${category.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 border-blue-200 hover:border-blue-400 group">
                    <CardHeader className="pb-4">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                          <Icon className="w-6 h-6 text-blue-600" />
                        </div>
                        <CardTitle className="text-lg font-medium text-blue-900 group-hover:text-blue-700 transition-colors">
                          {category.name}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    
                    <CardContent className="pt-0">
                      <p className="text-sm text-gray-600 leading-relaxed mb-4">
                        {category.description}
                      </p>
                      
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="w-full border-blue-300 text-blue-600 hover:bg-blue-50 group-hover:border-blue-400"
                      >
                        Explorar eBooks
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          {/* CTA Final */}
          <div className="text-center mt-16">
            <div className="bg-blue-50 rounded-2xl p-8 max-w-2xl mx-auto">
              <h3 className="text-2xl font-light text-blue-900 mb-4">
                Não encontrou o que procura?
              </h3>
              <p className="text-gray-600 mb-6">
                Explore toda nossa biblioteca de conteúdos ou entre em contato conosco.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link to="/ebooks">
                  <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                    Ver Todos os eBooks
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-50 px-6">
                    Entre em Contato
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Categories;
