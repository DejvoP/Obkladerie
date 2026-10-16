import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ochrana osobních údajů - Obkladerie",
  description:
    "Zásady ochrany osobních údajů webu Obkladerie / RemodelTO s.r.o.",
  path: "/ochrana-osobnich-udaju",
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Ochrana osobních údajů">
      <p>
        Správcem osobních údajů je RemodelTO s.r.o., IČO 21048533, e-mail{" "}
        <a href="mailto:info@remodelto.cz">info@remodelto.cz</a>.
      </p>
      <h2>Jaké údaje zpracováváme</h2>
      <p>
        Zpracováváme údaje, které nám sami poskytnete v poptávkovém formuláři —
        zejména jméno, e-mail, případně firmu, telefon a obsah zprávy včetně
        dobrovolně nahraných fotografií.
      </p>
      <h2>Účel a právní důvod</h2>
      <p>
        Údaje zpracováváme za účelem vyřízení poptávky a komunikace s vámi
        (oprávněný zájem / plnění smlouvy nebo předsmluvních jednání).
      </p>
      <h2>Doba uchování</h2>
      <p>
        Poptávky uchováváme po dobu potřebnou k vyřízení a případné další
        komunikaci, nejdéle však po dobu stanovenou právními předpisy.
      </p>
      <h2>Cookies</h2>
      <p>
        Používáme pouze nezbytné cookies. Podrobnosti jsou na stránce{" "}
        <a href="/cookies">Cookies</a>.
      </p>
      <h2>Vaše práva</h2>
      <p>
        Máte právo na přístup, opravu, výmaz, omezení zpracování a vznesení
        námitky. Žádost můžete zaslat na{" "}
        <a href="mailto:info@remodelto.cz">info@remodelto.cz</a>.
      </p>
    </LegalPage>
  );
}
