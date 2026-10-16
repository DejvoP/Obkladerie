import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Cookies - Obkladerie",
  description: "Informace o používání cookies na webu Obkladerie.",
  path: "/cookies",
});

export default function CookiesPage() {
  return (
    <LegalPage title="Cookies">
      <p>
        Na webu Obkladerie používáme pouze technicky nezbytné cookies, které jsou
        potřeba pro základní fungování stránky (například zapamatování volby
        cookies nebo přihlášení do administrace).
      </p>
      <h2>Jaké cookies používáme</h2>
      <ul>
        <li>
          <strong className="font-medium text-charcoal">Nezbytné</strong> —
          zajišťují chod webu a zapamatování vaší volby ohledně cookies.
        </li>
      </ul>
      <p>
        Nepoužíváme reklamní ani analytické cookies třetích stran. Bližší
        informace o zpracování údajů najdete v{" "}
        <a href="/ochrana-osobnich-udaju">ochraně osobních údajů</a>.
      </p>
    </LegalPage>
  );
}
