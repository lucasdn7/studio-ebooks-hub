
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  HelpCircle, 
  MessageCircle, 
  Mail,
  Phone,
  Send,
  ExternalLink
} from "lucide-react";

const SupportHelp = () => {
  const faqs = [
    {
      question: "Como baixar meus eBooks?",
      answer: "Acesse a seção 'Meus eBooks' e clique no botão 'Baixar novamente' em qualquer título adquirido."
    },
    {
      question: "Posso ler os eBooks offline?",
      answer: "Sim! Após o download, você pode ler seus eBooks offline em qualquer dispositivo."
    },
    {
      question: "Como cancelar minha assinatura?",
      answer: "Vá em 'Assinatura' e clique em 'Cancelar assinatura'. O acesso permanece até o fim do período pago."
    },
    {
      question: "Quais são os formatos disponíveis?",
      answer: "Oferecemos eBooks em formato PDF de alta qualidade, otimizados para leitura em qualquer dispositivo."
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-light text-gray-900">
        Suporte e <span className="font-medium">Ajuda</span>
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MessageCircle className="w-5 h-5 mr-2" />
              Entre em contato
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="subject">Assunto</Label>
              <Input
                id="subject"
                placeholder="Descreva brevemente sua dúvida"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                placeholder="Descreva detalhadamente sua dúvida ou problema..."
                className="mt-1 resize-none"
                rows={4}
              />
            </div>

            <Button className="w-full bg-gray-900 hover:bg-gray-800">
              <Send className="w-4 h-4 mr-2" />
              Enviar mensagem
            </Button>

            <div className="pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">Outras formas de contato:</p>
              
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail className="w-4 h-4" />
                  <span>contato@studiohalldesign.com</span>
                </div>
                
                <Button variant="outline" size="sm" className="w-full justify-start">
                  <Phone className="w-4 h-4 mr-2" />
                  WhatsApp: (11) 99999-9999
                  <ExternalLink className="w-3 h-3 ml-auto" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <HelpCircle className="w-5 h-5 mr-2" />
              Perguntas frequentes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="pb-4 border-b border-gray-100 last:border-b-0 last:pb-0">
                  <h4 className="font-medium text-gray-900 mb-2">{faq.question}</h4>
                  <p className="text-sm text-gray-600">{faq.answer}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-100">
              <p className="text-sm text-gray-600 mb-3">Não encontrou sua resposta?</p>
              <Button variant="outline" className="w-full">
                Ver todas as perguntas frequentes
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Tips */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-4">
          <h4 className="font-medium text-blue-900 mb-2">💡 Dicas rápidas</h4>
          <ul className="text-sm text-blue-700 space-y-1">
            <li>• Seus eBooks ficam disponíveis para sempre, mesmo após cancelar a assinatura</li>
            <li>• Use a busca para encontrar rapidamente seus títulos favoritos</li>
            <li>• Marque como favorito os eBooks que você mais gosta</li>
            <li>• Respondemos em até 24h úteis</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportHelp;
