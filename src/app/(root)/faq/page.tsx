"use client";

import { useState } from "react";
import { FiChevronDown, FiPhone, FiMail } from "react-icons/fi";

import Hero from "@/src/components/_Root/hero/hero";
import { FAQ_SECTIONS } from "@/src/lib/data/faq";
import { CONTACT } from "@/src/lib/data/site";

const Faq = () => {
  return (
    <div className="flex flex-col gap-14 py-10 md:gap-20 md:py-14">
      <Hero
        eyebrow="Foire aux questions"
        title={
          <>
            Questions fréquentes.
            <br className="hidden md:block" />
            <span className="text-secondary"> Réponses concises.</span>
          </>
        }
        description="Vous ne trouvez pas votre réponse ? Notre équipe est joignable du lundi au vendredi."
      />

      <section className="container-msp">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-10">
          <aside className="lg:sticky lg:top-24 lg:col-span-4">
            <div className="rounded-xl border border-line bg-main p-5">
              <p className="eyebrow">Sommaire</p>
              <ul className="mt-3 flex flex-col gap-1">
                {FAQ_SECTIONS.map((section, i) => (
                  <li key={section.title}>
                    <a
                      href={`#section-${i}`}
                      className="group flex items-center justify-between rounded-md px-3 py-2 text-xs font-medium text-darker transition-colors hover:bg-primary hover:text-forest md:text-sm"
                    >
                      {section.title}
                      <span
                        aria-hidden
                        className="text-ink-3 transition-transform group-hover:translate-x-0.5 group-hover:text-secondary"
                      >
                        →
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-5 border-t border-line pt-4">
                <p className="text-xs font-semibold text-darker md:text-sm">
                  Besoin d'aide&nbsp;?
                </p>
                <p className="mt-1 text-2xs text-ink-2 md:text-xs">
                  Du lundi au vendredi.
                </p>
                <div className="mt-3 flex flex-col gap-1.5 text-xs">
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-1.5 text-ink-2 hover:text-forest"
                  >
                    <FiPhone size={12} />
                    {CONTACT.phone}
                  </a>
                  <a
                    href={CONTACT.emailHref}
                    className="inline-flex items-center gap-1.5 text-ink-2 hover:text-forest"
                  >
                    <FiMail size={12} />
                    {CONTACT.email}
                  </a>
                </div>
              </div>
            </div>
          </aside>

          <div className="lg:col-span-8">
            {FAQ_SECTIONS.map((section, i) => (
              <FaqSection key={section.title} id={`section-${i}`} {...section} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const FaqSection: React.FC<{
  id: string;
  title: string;
  description?: string;
  items: { question: string; reponse: string }[];
}> = ({ id, title, description, items }) => {
  return (
    <section id={id} className="scroll-mt-24 py-4 first:pt-0">
      <h2 className="text-base font-semibold tracking-tight text-darker md:text-xl">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-2xl text-xs text-ink-2 md:text-sm">
          {description}
        </p>
      )}
      <div className="mt-4 flex flex-col gap-2">
        {items.map((item, i) => (
          <FaqRow key={item.question} index={i} {...item} />
        ))}
      </div>
    </section>
  );
};

const FaqRow: React.FC<{ index: number; question: string; reponse: string }> = ({
  question,
  reponse,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={`rounded-lg border bg-main transition-colors ${
        open ? "border-secondary/50" : "border-line"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-start gap-3 px-4 py-3.5 text-left md:px-5 md:py-4"
      >
        <span className="flex-1 text-xs font-medium text-darker md:text-sm">
          {question}
        </span>
        <span
          className={`grid h-6 w-6 shrink-0 place-items-center rounded-md border transition-all ${
            open
              ? "rotate-180 border-secondary bg-light text-forest"
              : "border-line text-darker"
          }`}
        >
          <FiChevronDown size={14} />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-out ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p className="border-t border-line px-4 py-3 text-xs leading-relaxed text-ink-2 md:px-5 md:py-4 md:text-sm">
            {reponse}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Faq;
