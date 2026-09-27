import Image from "next/image";
import { Reveal } from "@/components/reveal";

const stats = [
  { value: "15", suffix: "+", label: "Let s materiály" },
  { value: "200", suffix: "+", label: "Vzorků ve skladu" },
  { value: "1:1", suffix: "", label: "Osobní výběr" },
];

export function About() {
  return (
    <section id="o-nas" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid w-full max-w-content items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
        <Reveal variant="left" className="relative w-full">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-[5/6] lg:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
              alt="Vzorky materiálů ve showroomu Obkladérie"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="w-full lg:py-4">
          <Reveal as="h2" variant="right" className="font-serif text-5xl leading-[1.05] text-charcoal sm:text-6xl lg:text-7xl">
            Detaily tvoří prostor
          </Reveal>

          <Reveal
            as="p"
            variant="fade"
            delay={100}
            className="mt-6 text-base leading-8 text-muted sm:text-lg"
          >
            Obkladérie spojuje showroom a sklad. Neprodáváme jen katalog -
            pomáháme vybrat povrch, který sedí ke světlu, provozu i
            architektuře projektu.
          </Reveal>
          <Reveal
            as="p"
            variant="fade"
            delay={180}
            className="mt-4 text-base leading-8 text-muted sm:text-lg"
          >
            Přijďte si materiály osahat naživo. Od jemného kamene po robustní
            dlažbu máme vzorky připravené k porovnání ještě před realizací.
          </Reveal>

          <div className="mt-10 flex w-full justify-between gap-6 border-t border-line pt-8">
            {stats.map((stat, index) => (
              <Reveal
                key={stat.label}
                variant="up"
                delay={120 + index * 100}
                className="text-center"
              >
                <p className="flex items-center justify-center font-sans text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">
                  <span>{stat.value}</span>
                  {stat.suffix ? (
                    <span className="text-[0.85em] leading-none">{stat.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted sm:text-sm">
                  {stat.label}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}