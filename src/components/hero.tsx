"use client";

import Image from "next/image";
import { useInquiry } from "@/components/inquiry-provider";
import { Reveal } from "@/components/reveal";

export function Hero() {
  const { openInquiry } = useInquiry();

  return (
    <section className="relative h-svh w-full overflow-hidden">
      <Image
        src="/hero.png"
        alt="Prémiové obklady a dlažby Obkladérie"
        fill
        priority
        sizes="100vw"
        className="object-cover scale-x-[-1]"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-charcoal/10" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-content flex-col justify-center px-5 py-24 sm:py-16 lg:px-8">
        <Reveal
          as="h1"
          variant="up"
          immediate
          className="max-w-5xl font-serif text-[2.35rem] leading-[1.05] text-white sm:text-6xl md:text-7xl lg:text-[7.5rem]"
        >
          Prémiové obklady.
          <br />
          Za outletové ceny.
        </Reveal>
        <Reveal
          as="p"
          variant="fade"
          immediate
          delay={140}
          className="mt-5 max-w-xl text-base leading-7 text-dark-text sm:mt-8 sm:text-lg sm:leading-8"
        >
          Kvalitní keramika od renomovaných italských výrobců za ceny, které
          vznikají z předchozích kolekcí - ne kompromisem v kvalitě.
        </Reveal>
        <Reveal
          as="p"
          variant="fade"
          immediate
          delay={200}
          className="mt-3 max-w-xl text-xs leading-5 tracking-[0.04em] text-white/70 sm:mt-4 sm:text-sm sm:leading-normal"
        >
          Dodání 7-14 dní · Ověření italští výrobci · Výrazně nižší ceny
        </Reveal>
        <Reveal
          variant="up"
          immediate
          delay={260}
          className="mt-8 flex w-full max-w-md flex-col gap-3 sm:mt-10 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-4"
        >
          <a
            href="#katalog"
            className="inline-flex items-center justify-center bg-accent px-6 py-3.5 text-sm font-medium text-charcoal transition hover:bg-accent-hover sm:px-7 sm:text-base"
          >
            Prohlédnout katalog
          </a>
          <button
            type="button"
            onClick={() => openInquiry()}
            className="inline-flex items-center justify-center bg-white px-6 py-3.5 text-sm font-medium text-charcoal transition hover:bg-white/90 sm:px-7 sm:text-base"
          >
            Poptat se
          </button>
        </Reveal>
      </div>
    </section>
  );
}
