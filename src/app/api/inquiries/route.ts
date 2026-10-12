import { NextResponse } from "next/server";
import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const MAX_FILES = 5;
const MAX_FILE_BYTES = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/heic",
  "image/heif",
  "image/avif",
  "image/bmp",
]);
const IMAGE_EXT = /\.(jpe?g|png|webp|gif|heic|heif|bmp|avif)$/i;

function isAllowedImage(file: File) {
  if (ALLOWED_TYPES.has(file.type)) return true;
  if (!file.type && IMAGE_EXT.test(file.name)) return true;
  return file.type.startsWith("image/") && IMAGE_EXT.test(file.name);
}

async function notifyAdminEmail(payload: {
  name: string;
  email: string;
  company: string | null;
  productName: string | null;
  message: string;
  attachmentUrls: string[];
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
          ? `Poptávka - ${payload.productName}`
          : `Nová poptávka - ${payload.name}`,
        text: [
          `Jméno: ${payload.name}`,
          payload.company ? `Firma: ${payload.company}` : null,
          `E-mail: ${payload.email}`,
          payload.productName ? `Produkt: ${payload.productName}` : null,
          "",
          payload.message,
          payload.attachmentUrls.length
            ? [
                "",
                "Přílohy:",
                ...payload.attachmentUrls.map((url, i) => `${i + 1}. ${url}`),
              ].join("\n")
            : null,
        ]
          .filter(Boolean)
          .join("\n"),
      }),
    });
  } catch (error) {
    console.error("[inquiries:notify]", error);
  }
}

async function uploadInquiryFiles(
  supabase: Awaited<ReturnType<typeof createClient>>,
  files: File[],
) {
  if (!files.length) return [] as string[];

  const urls: string[] = [];

  for (const file of files) {
    if (!isAllowedImage(file)) {
      throw new Error("Povolené jsou jen fotky (JPG, PNG, WEBP).");
    }
    if (file.size > MAX_FILE_BYTES) {
      throw new Error("Každá fotka může mít max. 5 MB.");
    }

    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `inquiries/${crypto.randomUUID()}.${ext}`;
    const buffer = Buffer.from(await file.arrayBuffer());
    const { error } = await supabase.storage.from("media").upload(path, buffer, {
      contentType: file.type || "image/jpeg",
      cacheControl: "3600",
      upsert: false,
    });
    if (error) throw new Error(error.message);

    const { data } = supabase.storage.from("media").getPublicUrl(path);
    urls.push(data.publicUrl);
  }

  return urls;
}

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") ?? "";
    let name = "";
    let email = "";
    let message = "";
    let company: string | null = null;
    let productName: string | null = null;
    let website = "";
    let files: File[] = [];

    if (contentType.includes("multipart/form-data")) {
      const form = await request.formData();
      website = String(form.get("website") ?? "").trim();
      name = String(form.get("name") ?? "").trim();
      email = String(form.get("email") ?? "").trim();
      message = String(form.get("message") ?? "").trim();
      company = String(form.get("company") ?? "").trim() || null;
      productName = String(form.get("productName") ?? "").trim() || null;
      files = form
        .getAll("attachments")
        .filter((item): item is File => item instanceof File && item.size > 0);
    } else {
      const body = await request.json();
      website = String(body.website ?? "").trim();
      name = String(body.name ?? "").trim();
      email = String(body.email ?? "").trim();
      message = String(body.message ?? "").trim();
      company = String(body.company ?? "").trim() || null;
      productName = String(body.productName ?? "").trim() || null;
    }

    if (website) {
      return NextResponse.json({ ok: true, stored: false });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Vyplň jméno, e-mail a zprávu." },
        { status: 400 },
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "Neplatný e-mail." }, { status: 400 });
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Můžeš nahrát maximálně ${MAX_FILES} fotek.` },
        { status: 400 },
      );
    }

    if (!hasSupabaseEnv()) {
      return NextResponse.json({ ok: true, stored: false });
    }

    const supabase = await createClient();

    let attachmentUrls: string[] = [];
    try {
      attachmentUrls = await uploadInquiryFiles(supabase, files);
    } catch (error) {
      return NextResponse.json(
        {
          error:
            error instanceof Error
              ? error.message
              : "Nahrání fotek se nepovedlo.",
        },
        { status: 400 },
      );
    }

    const { error } = await supabase.from("inquiries").insert({
      name,
      email,
      company,
      message,
      product_name: productName,
      attachment_urls: attachmentUrls,
      status: "pending",
      is_new: true,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    await notifyAdminEmail({
      name,
      email,
      company,
      productName,
      message,
      attachmentUrls,
    });

    return NextResponse.json({ ok: true, stored: true });
  } catch {
    return NextResponse.json({ error: "Neplatný požadavek." }, { status: 400 });
  }
}
