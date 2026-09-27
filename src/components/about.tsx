import Image from "next/image";

const stats = [
  { value: "15", suffix: "+", label: "Let s materiály" },
  { value: "200", suffix: "+", label: "Vzorků ve skladu" },
  { value: "1:1", suffix: "", label: "Osobní výběr" },
];

export function About() {
  return (
    <section id="o-nas" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid w-full max-w-content items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
        <div className="relative w-full">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-[5/6] lg:aspect-square">
            <Image
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1400&q=80"
              alt="Vzorky materiálů ve showroomu Obkladérie"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/55 via-transparent to-transparent" />
            <div className="absolute right-0 bottom-0 left-0 p-6 sm:p-8">
              <p className="text-[11px] font-medium tracking-[0.22em] text-accent uppercase">
                Showroom · Sklad
              </p>
              <p className="mt-2 font-serif text-2xl text-white sm:text-3xl">
                Pardubice
              </p>
            </div>
          </div>
        </div>

        <div className="w-full lg:py-4">
          <h2 className="font-serif text-5xl leading-[1.05] text-charcoal sm:text-6xl lg:text-7xl">
            Detaily tvoří prostor
          </h2>

          <p className="mt-6 text-base leading-8 text-muted sm:text-lg">
            Obkladérie spojuje showroom a sklad. Neprodáváme jen katalog -
            pomáháme vybrat povrch, který sedí ke světlu, provozu i
            architektuře projektu.
          </p>
          <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
            Přijďte si materiály osahat naživo. Od jemného kamene po robustní
            dlažbu máme vzorky připravené k porovnání ještě před realizací.
          </p>

          <div className="mt-10 flex w-full justify-between gap-6 border-t border-line pt-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="flex items-center justify-center font-sans text-5xl leading-none text-charcoal sm:text-6xl lg:text-7xl">
                  <span>{stat.value}</span>
                  {stat.suffix ? (
                    <span className="text-[0.85em] leading-none">{stat.suffix}</span>
                  ) : null}
                </p>
                <p className="mt-2 text-xs leading-5 text-muted sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
