
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Input sanitization helper
const sanitizeString = (input: string): string => {
  if (typeof input !== 'string') return '';
  return input.trim().replace(/[<>]/g, '').substring(0, 100);
};

const sanitizePrice = (price: number): number | null => {
  if (typeof price !== 'number' || isNaN(price) || price < 0 || price > 10000) {
    return null;
  }
  return Math.round(price * 100) / 100;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
    { auth: { persistSession: false } }
  );

  try {
    // Get authenticated user
    const authHeader = req.headers.get('Authorization')!;
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser(token);

    if (authError || !user) {
      throw new Error('Unauthorized');
    }

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const { product_type, product_id, payment_type } = await req.json();

    // Input validation and sanitization
    const sanitizedProductType = sanitizeString(product_type);
    const sanitizedProductId = product_id ? sanitizeString(product_id) : null;
    const sanitizedPaymentType = sanitizeString(payment_type);

    // Validate inputs
    if (!['ebook', 'kit', 'subscription'].includes(sanitizedProductType)) {
      throw new Error('Invalid product type');
    }

    if (!['payment', 'subscription'].includes(sanitizedPaymentType)) {
      throw new Error('Invalid payment type');
    }

    if (sanitizedProductType !== 'subscription' && !sanitizedProductId) {
      throw new Error('Product ID is required for non-subscription payments');
    }

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    let lineItems;
    let mode: 'payment' | 'subscription' = 'payment';

    if (sanitizedProductType === 'subscription') {
      mode = 'subscription';
      lineItems = [{
        price_data: {
          currency: 'brl',
          recurring: { interval: 'month' },
          product_data: { name: 'Clube do eBook Premium' },
          unit_amount: 2997, // R$ 29.97
        },
        quantity: 1,
      }];
    } else {
      // Fetch product details securely
      let productData;
      let productPrice;

      if (sanitizedProductType === 'ebook') {
        const { data: ebook, error } = await supabaseClient
          .from('ebooks')
          .select('id, title, price')
          .eq('id', parseInt(sanitizedProductId!))
          .single();

        if (error || !ebook) throw new Error('Ebook not found');
        
        productData = ebook;
        productPrice = sanitizePrice(parseFloat(ebook.price?.toString() || '0'));
        
        if (productPrice === null || productPrice <= 0) {
          throw new Error('Invalid product price');
        }
      } else if (sanitizedProductType === 'kit') {
        const { data: kit, error } = await supabaseClient
          .from('kits')
          .select('id, title, price')
          .eq('id', sanitizedProductId)
          .single();

        if (error || !kit) throw new Error('Kit not found');
        
        productData = kit;
        productPrice = sanitizePrice(parseFloat(kit.price?.toString() || '0'));
        
        if (productPrice === null || productPrice <= 0) {
          throw new Error('Invalid product price');
        }
      } else {
        throw new Error('Invalid product type');
      }

      lineItems = [{
        price_data: {
          currency: 'brl',
          product_data: { name: productData.title },
          unit_amount: Math.round(productPrice * 100), // Convert to cents
        },
        quantity: 1,
      }];

      // Create order record with validated data
      const { error: orderError } = await supabaseClient
        .from('orders')
        .insert({
          user_id: user.id,
          product_type: sanitizedProductType,
          product_id: sanitizedProductId,
          amount: Math.round(productPrice * 100),
          status: 'pending',
          currency: 'brl'
        });

      if (orderError) {
        console.error('Order creation error:', orderError);
        throw new Error('Failed to create order');
      }
    }

    const session = await stripe.checkout.sessions.create({
      client_reference_id: user.id,
      line_items: lineItems,
      mode,
      success_url: `${req.headers.get('origin')}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/payment-cancelled`,
      customer_email: user.email,
      payment_method_types: ['card'],
      billing_address_collection: 'required',
      locale: 'pt-BR',
    });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error('Checkout error:', error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
