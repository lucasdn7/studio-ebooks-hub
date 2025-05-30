
import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle, ArrowRight } from 'lucide-react';
import { usePayments } from '@/hooks/usePayments';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [paymentStatus, setPaymentStatus] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const { verifyPayment } = usePayments();

  useEffect(() => {
    const checkPayment = async () => {
      if (sessionId) {
        try {
          const result = await verifyPayment(sessionId);
          setPaymentStatus(result.status);
        } catch (error) {
          console.error('Error verifying payment:', error);
        }
      }
      setLoading(false);
    };

    checkPayment();
  }, [sessionId, verifyPayment]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Verificando pagamento...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="text-center">
            <CardContent className="py-12">
              <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-3xl font-light text-gray-900 mb-4">
                Pagamento <span className="font-medium">Confirmado!</span>
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Seu pagamento foi processado com sucesso. Agora você pode acessar todo o conteúdo premium!
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild className="bg-gray-900 hover:bg-gray-800">
                  <Link to="/member-area">
                    Ir para Área do Membro
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link to="/ebooks">
                    Explorar E-books
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

export default PaymentSuccess;
