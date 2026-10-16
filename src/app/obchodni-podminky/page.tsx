import type { Metadata } from "next";
import { LegalPage } from "@/components/legal-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Obchodní podmínky - Obkladerie",
  description: "Obchodní podmínky prodejce Obkladerie / RemodelTO s.r.o.",
  path: "/obchodni-podminky",
});

export default function TermsPage() {
  return (
    <LegalPage title="Obchodní podmínky">
      <p>
        Tyto obchodní podmínky upravují vztahy mezi společností RemodelTO s.r.o.,
        IČO 21048533 (dále jen „prodávající“), a zákazníkem při poptávce a nákupu
        zboží nabízeného na webu Obkladerie.
      </p>
      <h2>Poptávka a nabídka</h2>
      <p>
        Ceny uvedené u produktů jsou orientační. Finální nabídku včetně dostupnosti
        a dopravy připravíme individuálně na základě vaší poptávky.
      </p>
      <h2>Dodání</h2>
      <p>
        Standardní doba dodání je 7–14 dní, pokud není u konkrétní nabídky
        uvedeno jinak. Termín potvrdíme při zpracování objednávky.
      </p>
      <h2>Kontakt</h2>
      <p>
        RemodelTO s.r.o. · IČO 21048533 ·{" "}
        <a href="mailto:info@remodelto.cz">info@remodelto.cz</a> ·{" "}
        <a href="tel:+420606167019">+420 606 167 019</a>
      </p>
    </LegalPage>
  );
}
