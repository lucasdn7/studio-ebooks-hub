
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Certificate } from "@/types/achievements";
import { Award, Download, ExternalLink } from "lucide-react";

interface CertificatesSectionProps {
  certificates: Certificate[];
}

const CertificatesSection = ({ certificates }: CertificatesSectionProps) => {
  const availableCertifications = [
    {
      id: 'arch-residential',
      title: 'Especialista em Arquitetura Residencial',
      description: 'Complete 5 e-books sobre arquitetura residencial',
      progress: 3,
      total: 5,
      category: 'Arquitetura'
    },
    {
      id: 'design-expert',
      title: 'Expert em Design de Interiores',
      description: 'Complete 4 e-books sobre design de interiores',
      progress: 2,
      total: 4,
      category: 'Design'
    },
    {
      id: 'sustainability-master',
      title: 'Mestre em Sustentabilidade',
      description: 'Complete 3 e-books sobre construção sustentável',
      progress: 1,
      total: 3,
      category: 'Sustentabilidade'
    }
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-gray-900 dark:text-gray-100">
            <Award className="w-5 h-5 text-yellow-600" />
            <span>Certificados Digitais</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {certificates.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              {certificates.map((cert) => (
                <Card key={cert.id} className="bg-gradient-to-br from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-yellow-200 dark:border-yellow-700">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <Award className="w-8 h-8 text-yellow-600" />
                      <Badge className="bg-yellow-600 text-white">Concluído</Badge>
                    </div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-2">{cert.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{cert.description}</p>
                    <div className="flex space-x-2">
                      <Button size="sm" className="flex-1">
                        <Download className="w-4 h-4 mr-2" />
                        Baixar PDF
                      </Button>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Award className="w-16 h-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400 mb-4">Você ainda não possui certificados</p>
              <p className="text-sm text-gray-400 dark:text-gray-500">Complete séries de e-books para ganhar certificados digitais</p>
            </div>
          )}

          <div>
            <h4 className="font-medium text-gray-900 dark:text-gray-100 mb-4">Certificações Disponíveis</h4>
            <div className="space-y-4">
              {availableCertifications.map((cert) => (
                <Card key={cert.id} className="bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 dark:text-gray-100">{cert.title}</h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{cert.description}</p>
                      </div>
                      <Badge variant="outline" className="ml-2">{cert.category}</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400">Progresso</span>
                        <span className="text-gray-900 dark:text-gray-100">{cert.progress}/{cert.total}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-yellow-600 h-2 rounded-full transition-all duration-300" 
                          style={{width: `${(cert.progress / cert.total) * 100}%`}}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CertificatesSection;
