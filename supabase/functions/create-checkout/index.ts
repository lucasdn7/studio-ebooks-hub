
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.45.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const logStep = (step: string, details?: any) => {
  const detailsStr = details ? ` - ${JSON.stringify(details)}` : '';
  console.log(`[CREATE-CHECKOUT] ${step}${detailsStr}`);
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
    logStep("Function started");

    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("No authorization header provided");

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseClient.auth.getUser(token);
    if (userError) throw new Error(`Authentication error: ${userError.message}`);
    const user = userData.user;
    if (!user?.email) throw new Error("User not authenticated or email not available");

    logStep("User authenticated", { userId: user.id, email: user.email });

    const { product_type, product_id, payment_type } = await req.json();
    logStep("Request data", { product_type, product_id, payment_type });

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });

    // Check if customer exists
    const customers = await stripe.customers.list({ email: user.email, limit: 1 });
    let customerId;
    if (customers.data.length > 0) {
      customerId = customers.data[0].id;
    }

    let sessionConfig: any = {
      customer: customerId,
      customer_email: customerId ? undefined : user.email,
      client_reference_id: user.id,
      success_url: `${req.headers.get("origin")}/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get("origin")}/payment-cancelled`,
    };

    if (payment_type === "subscription") {
      // Subscription payment
      sessionConfig.mode = "subscription";
      sessionConfig.line_items = [
        {
          price_data: {
            currency: "brl",
            product_data: { name: "Plano Premium" },
            unit_amount: 2990, // R$ 29,90
            recurring: { interval: "month" },
          },
          quantity: 1,
        },
      ];
    } else {
      // One-time payment
      sessionConfig.mode = "payment";
      
      let price = 0;
      let productName = "";

      if (product_type === "kit") {
        const { data: kit } = await supabaseClient
          .from("kits")
          .select("*")
          .eq("id", product_id)
          .single();
        
        if (!kit) throw new Error("Kit not found");
        price = Math.round(kit.price * 100); // Convert to cents
        productName = kit.title;
      } else if (product_type === "ebook") {
        const { data: ebook } = await supabaseClient
          .from("ebooks")
          .select("*")
          .eq("id", product_id)
          .single();
        
        if (!ebook) throw new Error("Ebook not found");
        price = Math.round((ebook.price || 0) * 100); // Convert to cents
        productName = ebook.title;
      }

      sessionConfig.line_items = [
        {
          price_data: {
            currency: "brl",
            product_data: { name: productName },
            unit_amount: price,
          },
          quantity: 1,
        },
      ];

      // Create order record
      const { data: order, error: orderError } = await supabaseClient.from("orders").insert({
        user_id: user.id,
        product_type,
        product_id,
        amount: price,
        status: "pending",
        currency: "brl",
      }).select().single();

      if (orderError) {
        logStep("Error creating order", orderError);
        throw new Error(`Failed to create order: ${orderError.message}`);
      }
      
      logStep("Order created", { orderId: order.id });
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);
    
    // Update order with session ID for one-time payments
    if (payment_type !== "subscription") {
      await supabaseClient
        .from("orders")
        .update({ stripe_session_id: session.id })
        .eq("user_id", user.id)
        .eq("product_id", product_id)
        .eq("status", "pending");
    }

    logStep("Checkout session created", { sessionId: session.id });

    return new Response(JSON.stringify({ url: session.url }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    logStep("ERROR", { message: errorMessage });
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
