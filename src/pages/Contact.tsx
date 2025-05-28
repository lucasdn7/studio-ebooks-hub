
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, Phone, MapPin, Clock } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      info: "contato@studioebooks.com",
      description: "Resposta em até 48 horas"
    },
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 9999-9999",
      description: "Seg a Sex: 13h às 18h"
    },
    {
      icon: MapPin,
      title: "Endereço",
      info: "Florianópolis, SC",
      description: "Atendimento online"
    },
    {
      icon: Clock,
      title: "Horário",
      info: "13h às 18h",
      description: "Segunda a Sexta-feira"
    }
  ];

  const faqs = [
    {
      question: "Como posso acessar os e-books premium?",
      answer: "Após assinar um plano premium, você terá acesso imediato a toda biblioteca de e-books exclusivos através da sua área de membro."
    },
    {
      question: "Posso fazer download dos materiais?",
      answer: "Sim! Todos os e-books podem ser baixados para leitura offline."
    },
    {
      question: "Como funciona o período gratuito?",
      answer: "Você pode acessar conteúdos gratuitos sem limitação de tempo. Para conteúdo premium, oferecemos testes gratuitos de alguns materiais."
    },
    {
      question: "Os conteúdos são atualizados?",
      answer: "Sim! Adicionamos novos e-books, sempre com as últimas tendências e técnicas do mercado."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Badge variant="secondary" className="mb-4">
              Fale Conosco
            </Badge>
            <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-6">
              Entre em <span className="font-medium">Contato</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Estamos aqui para ajudar você a aproveitar ao máximo nossa plataforma
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-2xl font-light text-gray-900 mb-8">Informações de Contato</h2>
              <div className="space-y-6">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-gray-700" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.title}</h3>
                      <p className="text-gray-700 font-medium">{item.info}</p>
                      <p className="text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-light">Envie sua Mensagem</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Nome</label>
                    <input 
                      type="text" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input 
                      type="email" 
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Assunto</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900">
                    <option>Dúvida sobre planos</option>
                    <option>Suporte técnico</option>
                    <option>Sugestão de conteúdo</option>
                    <option>Parcerias</option>
                    <option>Outros</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Mensagem</label>
                  <textarea 
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                    placeholder="Escreva sua mensagem..."
                  ></textarea>
                </div>
                <Button className="w-full bg-gray-900 hover:bg-gray-800">
                  Enviar Mensagem
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-20">
            <h2 className="text-2xl font-light text-gray-900 mb-8 text-center">Perguntas Frequentes</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="pt-6">
                    <h3 className="font-medium text-gray-900 mb-3">{faq.question}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{faq.answer}</p>
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

export default Contact;
