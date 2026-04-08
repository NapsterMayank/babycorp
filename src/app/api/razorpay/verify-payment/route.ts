import { NextResponse } from "next/server";
import { verifyPaymentSignature } from "@/lib/razorpay-server";
import { createServerSupabaseClient } from "@/lib/supabase-server";
import { PLAN_PRICES, ADDON_PRICES } from "@/types/database";
import type { SubscriptionPlan, SubscriptionCycle, AddonType } from "@/types/database";

export async function POST(request: Request) {
  const supabase = await createServerSupabaseClient();
  const { data: { session } } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    type,
    childId,
    plan,
    cycle,
    addonType,
  } = body as {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
    type: "subscription" | "addon";
    childId: string;
    plan?: SubscriptionPlan;
    cycle?: SubscriptionCycle;
    addonType?: AddonType;
  };

  // Verify signature
  const valid = verifyPaymentSignature({
    orderId: razorpay_order_id,
    paymentId: razorpay_payment_id,
    signature: razorpay_signature,
  });

  if (!valid) {
    return NextResponse.json({ error: "Invalid payment signature" }, { status: 400 });
  }

  if (type === "subscription") {
    if (!plan || !cycle) {
      return NextResponse.json({ error: "plan and cycle required" }, { status: 400 });
    }

    const amount = PLAN_PRICES[plan][cycle];
    const start = new Date();
    const end = new Date(start);
    if (cycle === "annual") {
      end.setFullYear(end.getFullYear() + 1);
    } else if (cycle === "quarterly") {
      end.setMonth(end.getMonth() + 3);
    } else {
      end.setMonth(end.getMonth() + 1);
    }

    // Cancel any existing active subscription for this child
    await supabase
      .from("subscriptions")
      .update({ status: "cancelled", cancelled_at: new Date().toISOString() })
      .eq("child_id", childId)
      .eq("status", "active");

    // Create new subscription
    const { data: sub, error } = await supabase.from("subscriptions").insert({
      parent_id: session.user.id,
      child_id: childId,
      plan,
      cycle,
      status: "active",
      current_period_start: start.toISOString().split("T")[0],
      current_period_end: end.toISOString().split("T")[0],
      razorpay_payment_id,
      amount_paid: amount,
    }).select().single();

    if (error) {
      console.error("Subscription insert error:", error);
      return NextResponse.json({ error: "Failed to activate subscription" }, { status: 500 });
    }

    return NextResponse.json({ success: true, subscriptionId: sub.id });
  } else {
    // Add-on purchase
    if (!addonType) {
      return NextResponse.json({ error: "addonType required" }, { status: 400 });
    }

    const amount = ADDON_PRICES[addonType];

    const { data: addon, error } = await supabase.from("addons").insert({
      parent_id: session.user.id,
      child_id: childId,
      type: addonType,
      status: "pending",
      razorpay_payment_id,
      amount_paid: amount,
    }).select().single();

    if (error) {
      console.error("Addon insert error:", error);
      return NextResponse.json({ error: "Failed to record add-on" }, { status: 500 });
    }

    return NextResponse.json({ success: true, addonId: addon.id });
  }
}
