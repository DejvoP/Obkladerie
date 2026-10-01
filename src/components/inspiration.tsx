import Image from "next/image";
import { Reveal } from "@/components/reveal";

const points = [
  "Renomovaní výrobci",
  "Bez kompromisu v kvalitě",
  "Dodání 7-14 dní",
];

export function Inspiration() {
  return (
    <section id="kvalita" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-content px-5 py-14 lg:px-8">
        <Reveal variant="scale">
          <div className="relative overflow-hidden">
            <Image
              src="/o_nas.png"
              alt="Outletová keramika prémiové kvality"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/20" />

            <div className="relative z-10 flex min-h-[240px] flex-col justify-center px-6 py-8 sm:min-h-[300px] sm:px-12 sm:py-10 lg:min-h-[340px] lg:px-16">
              <Reveal variant="left" delay={160}>
                <h2 className="max-w-xl font-serif text-3xl leading-[1.1] text-white sm:text-6xl lg:text-7xl">
                  Top kvalita.
                  <br />
                  Outletová cena.
                </h2>
              </Reveal>
              <Reveal
                as="p"
                variant="fade"
                delay={280}
                className="mt-3 max-w-xl text-sm leading-6 text-dark-text sm:mt-5 sm:text-lg sm:leading-8"
              >
                Nabízíme kvalitní keramiku renomovaných, zejména italských
                výrobců z předchozích kolekcí a doprodejů skladových zásob.
                Stejná kvalita, výrazně lepší cena.
              </Reveal>
              <Reveal
                variant="up"
                delay={360}
                className="mt-6 flex flex-col gap-2 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-2"
              >
                {points.map((point) => (
                  <p
                    key={point}
                    className="text-sm font-medium tracking-[0.04em] text-white/85 sm:text-[15px]"
                  >
                    {point}
                  </p>
                ))}
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
