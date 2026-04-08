import { NextResponse } from "next/server";
import { getRazorpay } from "@/lib/razorpay-server";
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
  const { type, childId, plan, cycle, addonType } = body as {
    type: "subscription" | "addon";
    childId: string;
    plan?: SubscriptionPlan;
    cycle?: SubscriptionCycle;
    addonType?: AddonType;
  };

  let amountPaise: number;
  let receipt: string;
  let notes: Record<string, string>;

  if (type === "subscription") {
    if (!plan || !cycle) {
      return NextResponse.json({ error: "plan and cycle required" }, { status: 400 });
    }
    amountPaise = PLAN_PRICES[plan][cycle] * 100;
    receipt = `sub_${childId.slice(0, 8)}_${Date.now()}`;
    notes = { type: "subscription", childId, plan, cycle, parentId: session.user.id };
  } else {
    if (!addonType) {
      return NextResponse.json({ error: "addonType required" }, { status: 400 });
    }
    amountPaise = ADDON_PRICES[addonType] * 100;
    receipt = `addon_${childId.slice(0, 8)}_${Date.now()}`;
    notes = { type: "addon", childId, addonType, parentId: session.user.id };
  }

  try {
    const order = await getRazorpay().orders.create({
      amount: amountPaise,
      currency: "INR",
      receipt,
      notes,
    });

    return NextResponse.json({
      orderId: order.id,
      amount: amountPaise,
      currency: "INR",
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (err) {
    console.error("Razorpay order error:", err);
    return NextResponse.json({ error: "Failed to create order" }, { status: 500 });
  }
}
