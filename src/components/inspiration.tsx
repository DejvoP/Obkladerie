import Image from "next/image";
import { Reveal } from "@/components/reveal";

export function Inspiration() {
  return (
    <section id="kvalita" className="scroll-mt-24">
      <div className="mx-auto w-full max-w-content px-5 py-14 lg:px-8">
        <Reveal variant="scale">
          <div className="relative overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1800&q=80"
              alt="Kvalitní povrchy Obkladérie"
              fill
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-charcoal/85 via-charcoal/55 to-charcoal/20" />

            <div className="relative z-10 flex min-h-[220px] flex-col justify-center px-6 py-8 sm:min-h-[280px] sm:px-12 sm:py-10 lg:min-h-[320px] lg:px-16">
              <Reveal variant="left" delay={160}>
                <h2 className="max-w-xl font-serif text-3xl leading-[1.1] text-white sm:text-6xl lg:text-7xl">
                  V tomhle
                  <br />
                  jsme nejlepší
                </h2>
              </Reveal>
              <Reveal
                as="p"
                variant="fade"
                delay={280}
                className="mt-3 max-w-md text-sm leading-6 text-dark-text sm:mt-5 sm:max-w-lg sm:text-lg sm:leading-8"
              >
                Obklady a dlažby vybíráme pečlivě - podle kvality, trvanlivosti i
                toho, jak prostor skutečně vypadá.
              </Reveal>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
