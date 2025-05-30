
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { XCircle, ArrowLeft } from 'lucide-react';

const PaymentCancelled = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="py-12">
              <XCircle className="w-16 h-16 text-red-600 mx-auto mb-6" />
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Pagamento <span className="font-medium">Cancelado</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                O pagamento foi cancelado. Você pode tentar novamente quando quiser.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gray-900 hover:bg-gray-800">
                  <Link to="/plans">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Voltar aos Planos
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/">
                    Página Inicial
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PaymentCancelled;
