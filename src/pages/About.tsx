
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Users, Target, Award, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const stats = [
    { label: "E-books Disponíveis", value: "120+", icon: BookOpen },
    { label: "Profissionais Atendidos", value: "5000+", icon: Users },
    { label: "Categorias Especializadas", value: "3", icon: Target },
    { label: "Anos de Experiência", value: "10+", icon: Award }
  ];

  const team = [
    {
      name: "Lucas do Nascimento",
      role: "Fundadora & Arquiteto",
      description: "8 anos de experiência em arquitetura, projetos residenciais, criação de conteúdo e documentação de projetos.",
      image: "/placeholder.svg"
    },
    {
      name: "Maria Luiza",
      role: "Designer de Interiores",
      description: "Especialista em design de interiores com foco em espaços residenciais.",
      image: "/placeholder.svg"
    },

  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Nossa História
            </Badge>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Sobre o <span className="font-medium">Studio Ebooks</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Nascemos da paixão por democratizar o conhecimento especializado em arquitetura, 
              design de interiores e marcenaria, oferecendo conteúdo premium para profissionais exigentes.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <stat.icon className="w-8 h-8 mx-auto mb-4 text-gray-700" />
                  <div className="text-3xl font-light text-gray-900 mb-2">{stat.value}</div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h2 className="text-3xl font-light text-gray-900 mb-6">Nossa Missão</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Acreditamos que o conhecimento de qualidade deve ser acessível a todos os profissionais 
                que desejam se destacar em suas áreas. Por isso, a Studio Hall criou uma plataforma que reúne os 
                melhores conteúdos em arquitetura, design de interiores e marcenaria.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Trabalhamos com especialistas reconhecidos no mercado para entregar e-books e vídeos 
                que realmente fazem a diferença na prática profissional.
              </p>
              <Link to="/planos">
                <Button size="lg" className="bg-gray-900 hover:bg-gray-800">
                  Comece Agora
                </Button>
              </Link>
            </div>
            <div className="bg-gray-200 aspect-square rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Imagem da Equipe</span>
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Nossa Equipe</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 overflow-hidden">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-medium text-gray-900 mb-2">{member.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{member.role}</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{member.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
