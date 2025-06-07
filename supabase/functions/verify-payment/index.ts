
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
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) throw new Error("STRIPE_SECRET_KEY is not set");

    const { session_id } = await req.json();
    const sanitizedSessionId = sanitizeString(session_id);
    
    if (!sanitizedSessionId) throw new Error("Session ID is required");

    const stripe = new Stripe(stripeKey, { apiVersion: "2023-10-16" });
    const session = await stripe.checkout.sessions.retrieve(sanitizedSessionId);

    if (!session.client_reference_id) {
      throw new Error("No user reference found in session");
    }

    if (session.payment_status === "paid") {
      if (session.mode === "subscription") {
        // Handle subscription
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        
        // Validate subscription data before inserting
        if (!subscription.id || !subscription.customer) {
          throw new Error("Invalid subscription data");
        }
        
        await supabaseClient.from("subscriptions").upsert({
          user_id: session.client_reference_id,
          stripe_customer_id: subscription.customer as string,
          stripe_subscription_id: subscription.id,
          plan_type: "premium",
          status: subscription.status,
          current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
          current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
        });

        // Update user_stats to premium
        await supabaseClient
          .from("user_stats")
          .update({ is_premium: true })
          .eq("user_id", session.client_reference_id);

        // Log the action for audit purposes
        await supabaseClient
          .from("audit_logs")
          .insert({
            user_id: session.client_reference_id,
            action: "subscription_created",
            table_name: "subscriptions",
            record_id: subscription.id,
            new_values: { plan_type: "premium", status: subscription.status }
          });
      } else {
        // Handle one-time payment
        const { error: updateError } = await supabaseClient
          .from("orders")
          .update({ 
            status: "paid",
            stripe_session_id: sanitizedSessionId,
            updated_at: new Date().toISOString()
          })
          .eq("stripe_session_id", sanitizedSessionId);

        if (updateError) {
          console.error("Order update error:", updateError);
        }

        // Log the payment for audit purposes
        await supabaseClient
          .from("audit_logs")
          .insert({
            user_id: session.client_reference_id,
            action: "payment_completed",
            table_name: "orders",
            record_id: sanitizedSessionId,
            new_values: { status: "paid", amount: session.amount_total }
          });
      }
    }

    return new Response(JSON.stringify({ 
      status: session.payment_status,
      mode: session.mode 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return new Response(JSON.stringify({ 
      error: error instanceof Error ? error.message : 'Unknown error' 
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 500,
    });
  }
});
