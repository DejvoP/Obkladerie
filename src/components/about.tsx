import Image from "next/image";
import { Reveal } from "@/components/reveal";

const argumentsList = [
  {
    title: "Italské značky",
    text: "Renomovaní výrobci a prověřená kvalita.",
  },
  {
    title: "Outletové ceny",
    text: "Výhodná cena díky doprodeji kolekcí, ne kvůli horší kvalitě.",
  },
  {
    title: "7-14 dní",
    text: "Standardní doba dodání objednávky.",
  },
];

export function About() {
  return (
    <section id="o-nas" className="scroll-mt-24 bg-white">
      <div className="mx-auto grid w-full max-w-content items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-20 lg:px-8 lg:py-24">
        <Reveal variant="left" className="relative w-full">
          <div className="relative aspect-[4/5] overflow-hidden bg-charcoal sm:aspect-[5/6] lg:aspect-square">
            <Image
              src="/about.png"
              alt="Kvalitní keramika Obkladérie"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div className="w-full lg:py-4">
          <Reveal
            as="h2"
            variant="right"
            className="font-serif text-4xl leading-[1.05] text-charcoal sm:text-6xl lg:text-7xl"
          >
            Kvalita, která nestárne.
            <br />
            Cena, která dává smysl.
          </Reveal>

          <Reveal
            as="p"
            variant="fade"
            delay={100}
            className="mt-6 text-base leading-8 text-muted sm:text-lg"
          >
            Kolekce se mění. Kvalita materiálu ne. Vybíráme obklady a dlažby
            renomovaných výrobců, které byly nahrazeny novějšími kolekcemi.
            Díky tomu je můžeme nabídnout za výrazně výhodnější ceny.
          </Reveal>

          <div className="mt-10">
            {argumentsList.map((item, index) => (
              <Reveal
                key={item.title}
                variant="up"
                delay={120 + index * 100}
                className={`flex items-center justify-between gap-6 py-5 ${
                  index < argumentsList.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <p className="shrink-0 font-serif text-2xl text-charcoal sm:text-[1.65rem]">
                  {item.title}
                </p>
                <p className="min-w-0 text-right text-sm leading-6 text-muted whitespace-nowrap sm:text-[15px]">
                  {item.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
