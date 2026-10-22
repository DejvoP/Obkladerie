import { Logo } from "@/components/logo";
import { Reveal } from "@/components/reveal";

type FooterCategory = {
  title: string;
  slug: string;
};

type SiteFooterProps = {
  categories?: FooterCategory[];
};

export function SiteFooter({ categories = [] }: SiteFooterProps) {
  const productLinks =
    categories.length > 0
      ? categories.map((item) => ({
          href: `/produkty/${item.slug}`,
          label: item.title,
        }))
      : [
          { href: "/produkty/obklady", label: "Obklady" },
          { href: "/produkty/dlazby", label: "Dlažby" },
          { href: "/produkty/betonove-sterky", label: "Betonové stěrky" },
          { href: "/produkty/epoxidove-sterky", label: "Epoxidové stěrky" },
        ];

  const legalLinks = [
    { href: "/obchodni-podminky", label: "Obchodní podmínky" },
    { href: "/ochrana-osobnich-udaju", label: "Ochrana osobních údajů" },
  ];

  return (
    <footer id="kontakt" className="scroll-mt-24 bg-charcoal text-white">
      <div className="mx-auto grid w-full max-w-content gap-10 px-5 py-14 sm:grid-cols-2 lg:grid-cols-5 lg:px-8">
        <Reveal variant="up">
          <a href="/" className="inline-flex items-center" aria-label="Obkladerie">
            <Logo className="h-9 w-auto" variant="inverted" />
          </a>
          <p className="mt-4 max-w-xs text-sm leading-6 text-dark-text">
            Kvalitní italská keramika za outletové ceny.
          </p>
        </Reveal>
        <Reveal variant="up" delay={80}>
          <p className="text-sm font-medium text-white">Produkty</p>
          <ul className="mt-4 space-y-2 text-sm text-dark-text">
            {productLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal variant="up" delay={140}>
          <p className="text-sm font-medium text-white">Právní informace</p>
          <ul className="mt-4 space-y-2 text-sm text-dark-text">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="transition hover:text-accent">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal variant="up" delay={200}>
          <p className="text-sm font-medium text-white">Studio</p>
          <ul className="mt-4 space-y-2 text-sm text-dark-text">
            <li>
              <a href="/#o-nas" className="transition hover:text-accent">
                Náš příběh
              </a>
            </li>
            <li>
              <a href="/#kvalita" className="transition hover:text-accent">
                Proč my
              </a>
            </li>
            <li>
              <a href="/#kontakt" className="transition hover:text-accent">
                Kontakt
              </a>
            </li>
          </ul>
        </Reveal>
        <Reveal variant="up" delay={260}>
          <p className="text-sm font-medium text-white">Kontakt</p>
          <ul className="mt-4 space-y-2 text-sm text-dark-text">
            <li>RemodelTO s.r.o.</li>
            <li>IČO: 21048533</li>
            <li>
              <a href="tel:+420606167019" className="transition hover:text-accent">
                +420 606 167 019
              </a>
            </li>
            <li>
              <a
                href="mailto:info@remodelto.cz"
                className="transition hover:text-accent"
              >
                info@remodelto.cz
              </a>
            </li>
          </ul>
        </Reveal>
      </div>
      <div className="mx-auto w-full max-w-content px-5 lg:px-8">
        <Reveal
          variant="fade"
          delay={100}
          className="flex items-center justify-between gap-4 border-t border-white/15 py-5 text-xs text-dark-text"
        >
          <p>© 2026 Obkladerie. Všechna práva vyhrazena.</p>
          <a
            href="https://www.rezit.cz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Built by rezit"
            className="group relative inline-grid shrink-0"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rezitsignature1light.webp"
              alt=""
              className="col-start-1 row-start-1 h-7 w-auto max-w-[9rem] object-contain object-right opacity-100 transition-opacity duration-300 ease-out group-hover:opacity-0"
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/rezitsignature2light.webp"
              alt=""
              className="col-start-1 row-start-1 h-7 w-auto max-w-[9rem] object-contain object-right opacity-0 transition-opacity duration-300 ease-out group-hover:opacity-100"
            />
          </a>
        </Reveal>
      </div>
    </footer>
  );
}
