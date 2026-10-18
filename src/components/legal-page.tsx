import { SiteShell } from "@/components/site-shell";
import type { ReactNode } from "react";

type LegalPageProps = {
  title: string;
  children: ReactNode;
};

export function LegalPage({ title, children }: LegalPageProps) {
  return (
    <SiteShell solidHeader>
      <main className="flex flex-1 flex-col">
        <section className="flex flex-1 flex-col bg-white pt-28 pb-20">
          <div className="mx-auto w-full max-w-content px-5 lg:px-8">
            <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted">
              <a href="/" className="transition hover:text-charcoal">
                Domů
              </a>
              <span>/</span>
              <span className="text-charcoal">{title}</span>
            </div>
            <h1 className="font-serif text-4xl text-charcoal sm:text-5xl">
              {title}
            </h1>
            <div className="mt-8 space-y-5 text-base leading-7 text-muted [&_a]:text-charcoal [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:font-serif [&_h2]:text-2xl [&_h2]:text-charcoal [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
              {children}
            </div>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
