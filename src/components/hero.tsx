"use client";

import Image from "next/image";
import { useInquiry } from "@/components/inquiry-provider";

export function Hero() {
  const { openInquiry } = useInquiry();

  return (
    <section className="relative h-svh w-full overflow-hidden">
      <Image
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=2200&q=80"
        alt="Moderní interiér s kamennými povrchy a velkými okny"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-charcoal/80 via-charcoal/40 to-charcoal/10" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-content flex-col justify-center px-5 py-16 lg:px-8">
        <h1 className="max-w-5xl font-serif text-7xl leading-[1.02] text-white sm:text-8xl lg:text-[7.5rem]">
          Povrchy,
          <br />
          které tvoří
          <br />
          prostor.
        </h1>
        <p className="mt-8 max-w-lg text-lg leading-8 text-dark-text">
          Nadčasové materiály pro moderní interiéry i exteriéry.
          Pomůžeme vám vybrat obklady a dlažby, které sedí k prostoru,
          světlu i způsobu bydlení - od koupelny po terasu.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <a
            href="#katalog"
            className="inline-flex bg-accent px-7 py-3.5 text-base font-medium text-charcoal transition hover:bg-accent-hover"
          >
            Prohlédnout katalog
          </a>
          <button
            type="button"
            onClick={() => openInquiry()}
            className="inline-flex cursor-pointer bg-white px-7 py-3.5 text-base font-medium text-charcoal transition hover:bg-white/90"
          >
            Poptat se
          </button>
        </div>
      </div>
    </section>
  );
}
