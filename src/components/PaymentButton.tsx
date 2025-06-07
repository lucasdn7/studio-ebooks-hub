
import { Button } from '@/components/ui/button';
import { usePayments } from '@/hooks/usePayments';
import { CreditCard, Loader2 } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { sanitizeString, sanitizePrice } from '@/utils/inputSanitizer';

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

    // Input validation and sanitization
    if (productType !== 'subscription' && (!productId || typeof productId !== 'string')) {
      console.error('Product ID is required for non-subscription payments');
      return;
    }

    // Sanitize inputs
    const sanitizedProductType = sanitizeString(productType);
    const sanitizedProductId = productId ? sanitizeString(productId) : undefined;
    const sanitizedPrice = price ? sanitizePrice(price) : undefined;

    // Validate product type
    if (!['ebook', 'kit', 'subscription'].includes(sanitizedProductType)) {
      console.error('Invalid product type');
      return;
    }

    // Validate price if provided
    if (sanitizedPrice !== undefined && (sanitizedPrice === null || sanitizedPrice < 0)) {
      console.error('Invalid price');
      return;
    }

    try {
      if (productType === 'subscription') {
        await createCheckout('subscription', 'premium', 'subscription');
      } else {
        if (!sanitizedProductId) {
          console.error('Product ID is required for non-subscription payments');
          return;
        }
        await createCheckout(sanitizedProductType, sanitizedProductId, 'payment');
      }
    } catch (error) {
      console.error('Payment error:', error);
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
