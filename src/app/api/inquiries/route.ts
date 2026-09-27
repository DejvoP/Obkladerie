import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

async function notifyAdminEmail(payload: {
  name: string;
  email: string;
  company: string | null;
  productName: string | null;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_NOTIFY_EMAIL || process.env.ADMIN_EMAIL;
  if (!apiKey || !to) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from:
          process.env.INQUIRY_FROM_EMAIL ||
          "Obkladérie <onboarding@resend.dev>",
        to: [to],
        subject: payload.productName
          ? `Poptávka — ${payload.productName}`
          : `Nová poptávka — ${payload.name}`,
        text: [
          `Jméno: ${payload.name}`,
          payload.company ? `Firma: ${payload.company}` : null,
          `E-mail: ${payload.email}`,
          payload.productName ? `Produkt: ${payload.productName}` : null,
          "",
          payload.message,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
  } catch (error) {
    console.error("[inquiries:notify]", error);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (String(body.website ?? "").trim()) {
      return NextResponse.json({ ok: true, stored: false });
    }

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const message = String(body.message ?? "").trim();
    const company = String(body.company ?? "").trim() || null;
    const productName = String(body.productName ?? "").trim() || null;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vyplň jméno, e-mail a zprávu." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Neplatný e-mail." }, { status: 400 });
    }

    if (!hasSupabaseEnv()) {
      return NextResponse.json({ ok: true, stored: false });
    }

    const supabase = await createClient();
    const { error } = await supabase.from("inquiries").insert({
      name,
      email,
      company,
      message,
      product_name: productName,
      status: "pending",
      is_new: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await notifyAdminEmail({ name, email, company, productName, message });

    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }
}
