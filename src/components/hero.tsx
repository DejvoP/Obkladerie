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

      <div className="relative z-10 mx-auto flex h-full w-full max-w-content flex-col justify-center px-5 py-16 lg:px-8">
        <Reveal
          as="h1"
          variant="up"
          immediate
          className="max-w-5xl font-serif text-6xl leading-[1.02] text-white sm:text-8xl lg:text-[7.5rem]"
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
          className="mt-8 max-w-xl text-lg leading-8 text-dark-text"
        >
          Kvalitní keramika od renomovaných italských výrobců za ceny, které
          vznikají z předchozích kolekcí - ne kompromisem v kvalitě.
        </Reveal>
        <Reveal
          as="p"
          variant="fade"
          immediate
          delay={200}
          className="mt-4 text-sm tracking-[0.04em] text-white/70"
        >
          Dodání 7-14 dní · Ověření italští výrobci · Výrazně nižší ceny
        </Reveal>
        <Reveal
          variant="up"
          immediate
          delay={260}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <a
            href="#katalog"
            className="inline-flex bg-accent px-7 py-3.5 text-base font-medium text-charcoal transition hover:bg-accent-hover"
          >
            Prohlédnout katalog
          </a>
          <button
            type="button"
            onClick={() => openInquiry()}
            className="inline-flex bg-white px-7 py-3.5 text-base font-medium text-charcoal transition hover:bg-white/90"
          >
            Poptat se
          </button>
        </Reveal>
      </div>
    </section>
  );
}
