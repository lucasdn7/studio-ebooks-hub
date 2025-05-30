
import { Button } from '@/components/ui/button';
import { usePayments } from '@/hooks/usePayments';
import { CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface PaymentButtonProps {
  productType: 'ebook' | 'kit' | 'subscription';
  productId?: string;
  price?: number;
  children?: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outline' | 'secondary';
}

const PaymentButton = ({ 
  productType, 
  productId, 
  price, 
  children, 
  className,
  variant = 'default' 
}: PaymentButtonProps) => {
  const { createCheckout, loading } = usePayments();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!user) {
      navigate('/auth');
      return;
    }

    if (productType === 'subscription') {
      await createCheckout('subscription', 'premium', 'subscription');
    } else {
      if (!productId) {
        console.error('Product ID is required for non-subscription payments');
        return;
      }
      await createCheckout(productType, productId, 'payment');
    }
  };

  return (
    <Button 
      onClick={handlePayment}
      disabled={loading}
      className={className}
      variant={variant}
    >
      {loading ? (
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      ) : (
        <CreditCard className="w-4 h-4 mr-2" />
      )}
      {children || (price ? `Comprar por R$ ${price.toFixed(2)}` : 'Assinar Agora')}
    </Button>
  );
};

export default PaymentButton;
