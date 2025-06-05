
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/useAuth';
import { usePayments } from '@/hooks/usePayments';
import { CreditCard, Download, User, Mail } from 'lucide-react';
import type { Tables } from '@/integrations/supabase/types';

type Ebook = Tables<'ebooks'>;
type EbookType = 'free' | 'premium';

interface EbookPaymentFlowProps {
  ebook: Ebook;
  ebookType: EbookType;
  onSuccess?: () => void;
}

const EbookPaymentFlow = ({ ebook, ebookType, onSuccess }: EbookPaymentFlowProps) => {
  const { user } = useAuth();
  const { createCheckout, loading } = usePayments();
  const [guestEmail, setGuestEmail] = useState('');
  const [guestName, setGuestName] = useState('');
  const [showGuestForm, setShowGuestForm] = useState(false);

  const handlePayment = async () => {
    if (ebookType === 'free') {
      // Para e-books gratuitos, não precisa de pagamento
      if (onSuccess) onSuccess();
      return;
    }

    // Para e-books premium
    await createCheckout('ebook', ebook.id.toString(), 'payment');
  };

  const handleGuestPurchase = async () => {
    if (!guestEmail || !guestName) return;
    
    // Implementar compra como visitante
    await createCheckout('ebook', ebook.id.toString(), 'payment');
  };

  if (ebookType === 'free' && !user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">E-book Gratuito</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Este e-book é gratuito para usuários cadastrados!
          </p>
          <p className="text-sm text-gray-500">
            Faça seu cadastro para acessar este e todos os outros e-books gratuitos.
          </p>
          <Button className="w-full" onClick={() => window.location.href = '/auth'}>
            <User className="w-4 h-4 mr-2" />
            Fazer Cadastro Gratuito
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (ebookType === 'free' && user) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-green-700">E-book Gratuito</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-gray-600">
            Este e-book está incluído no seu cadastro gratuito!
          </p>
          <Button className="w-full" onClick={handlePayment}>
            <Download className="w-4 h-4 mr-2" />
            Baixar E-book
          </Button>
        </CardContent>
      </Card>
    );
  }

  // E-book premium
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-center">E-book Premium</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            R$ {ebook.price?.toString().replace('.', ',') || '0,00'}
          </div>
          <p className="text-sm text-gray-600">Pagamento único - Acesso vitalício</p>
        </div>

        {user ? (
          <div className="space-y-3">
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-700">
                ✓ Download imediato após pagamento
              </p>
              <p className="text-sm text-blue-700">
                ✓ Armazenado na sua conta
              </p>
              <p className="text-sm text-blue-700">
                ✓ Acesso ao modo leitura (se disponível)
              </p>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handlePayment}
              disabled={loading}
            >
              <CreditCard className="w-4 h-4 mr-2" />
              {loading ? 'Processando...' : 'Comprar Agora'}
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {!showGuestForm ? (
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  onClick={() => window.location.href = '/auth'}
                >
                  <User className="w-4 h-4 mr-2" />
                  Entrar/Cadastrar
                </Button>
                
                <div className="text-center">
                  <span className="text-sm text-gray-500">ou</span>
                </div>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => setShowGuestForm(true)}
                >
                  Comprar como Visitante
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="guest-name">Nome completo</Label>
                  <Input
                    id="guest-name"
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Seu nome completo"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="guest-email">E-mail</Label>
                  <Input
                    id="guest-email"
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="seu@email.com"
                  />
                  <p className="text-xs text-gray-500">
                    O link de download será enviado para este e-mail
                  </p>
                </div>
                
                <Button 
                  className="w-full"
                  onClick={handleGuestPurchase}
                  disabled={loading || !guestEmail || !guestName}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {loading ? 'Processando...' : 'Finalizar Compra'}
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="w-full"
                  onClick={() => setShowGuestForm(false)}
                >
                  Voltar
                </Button>
              </div>
            )}
            
            <div className="bg-yellow-50 p-3 rounded-lg">
              <p className="text-sm text-yellow-700">
                💡 Criando uma conta você também terá acesso aos e-books gratuitos!
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EbookPaymentFlow;
