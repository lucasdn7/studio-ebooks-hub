
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

export const usePayments = () => {
  const [loading, setLoading] = useState(false);

  const createCheckout = async (productType: string, productId: string, paymentType: 'payment' | 'subscription' = 'payment') => {
    setLoading(true);
    try {
      console.log('Creating checkout:', { productType, productId, paymentType });
      
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: {
          product_type: productType,
          product_id: productId,
          payment_type: paymentType
        }
      });

      if (error) {
        console.error('Checkout error:', error);
        throw error;
      }

      if (data?.url) {
        // Open Stripe checkout in a new tab
        window.open(data.url, '_blank');
      } else {
        throw new Error('No checkout URL returned');
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Erro no pagamento",
        description: "Não foi possível iniciar o processo de pagamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyPayment = async (sessionId: string) => {
    try {
      const { data, error } = await supabase.functions.invoke('verify-payment', {
        body: { session_id: sessionId }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const openCustomerPortal = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error('Error opening customer portal:', error);
      toast({
        title: "Erro",
        description: "Não foi possível abrir o portal do cliente.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return {
    createCheckout,
    verifyPayment,
    openCustomerPortal,
    loading
  };
};
