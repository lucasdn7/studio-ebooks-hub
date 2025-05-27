
import { Certificate } from '@/types/achievements';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Download, CheckCircle, BookOpen } from 'lucide-react';

interface CertificateCardProps {
  certificate: Certificate;
}

const CertificateCard = ({ certificate }: CertificateCardProps) => {
  const progressPercentage = (certificate.completedEbooks.length / certificate.requiredEbooks.length) * 100;
  
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Arquitetura': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Design de Interiores': return 'bg-green-100 text-green-800 border-green-200';
      case 'Marcenaria': return 'bg-amber-100 text-amber-800 border-amber-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className={`${
      certificate.completed 
        ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-300' 
        : 'bg-white'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="outline" className={`text-xs ${getCategoryColor(certificate.category)}`}>
            {certificate.category}
          </Badge>
          {certificate.completed && (
            <CheckCircle className="w-5 h-5 text-green-500" />
          )}
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-3xl">{certificate.icon}</div>
          <div>
            <CardTitle className="text-lg font-medium text-gray-900">
              {certificate.title}
            </CardTitle>
            <p className="text-sm text-gray-600">{certificate.description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-gray-600">Progresso</span>
              <span className="font-medium">
                {certificate.completedEbooks.length}/{certificate.requiredEbooks.length} e-books
              </span>
            </div>
            <Progress value={progressPercentage} className="h-2" />
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 mb-2">E-books necessários:</h4>
            <ul className="space-y-1">
              {certificate.requiredEbooks.map((ebook, index) => (
                <li key={index} className="text-xs text-gray-600 flex items-center">
                  {certificate.completedEbooks.includes(ebook) ? (
                    <CheckCircle className="w-3 h-3 mr-2 text-green-500" />
                  ) : (
                    <BookOpen className="w-3 h-3 mr-2 text-gray-400" />
                  )}
                  {ebook}
                </li>
              ))}
            </ul>
          </div>

          {certificate.completed && (
            <div className="pt-2">
              <Button size="sm" className="w-full bg-gray-900 hover:bg-gray-800">
                <Download className="w-4 h-4 mr-2" />
                Baixar Certificado
              </Button>
              {certificate.completedAt && (
                <p className="text-xs text-gray-500 text-center mt-2">
                  Conquistado em {certificate.completedAt.toLocaleDateString('pt-BR')}
                </p>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default CertificateCard;
