import dynamic from "next/dynamic";
import Link from "next/link";
import { FaArrowRightLong } from "react-icons/fa6";
import { FiPhone } from "react-icons/fi";
import { CONTACT, DOCTOLIB_URL, QUICK_FACTS } from "@/src/lib/data/site";

const Partnairs = dynamic(() => import("../partnairs/Partnairs"), {
  ssr: false,
});

const Hero = () => {
  return (
    <section className="container-msp">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
        <div className="lg:col-span-7">
          <p className="eyebrow">Pôle Santé du Denaisis</p>
          <h1 className="mt-4 text-lg font-semibold leading-[1.15] tracking-tight text-darker md:text-2xl lg:text-3xl xl:text-4xl">
            Une médecine de proximité,
            <br className="hidden md:block" />
            <span className="text-secondary"> coordonnée et continue.</span>
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-ink-2 md:mt-5 md:text-base">
            Maison de Santé Pluriprofessionnelle. Médecins traitants, soins
            infirmiers, kinésithérapie et spécialités, en un seul lieu, à
            Denain.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 md:mt-8">
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-md bg-secondary px-4 py-2.5 text-xs font-medium text-cream shadow-sage transition-colors hover:bg-forest md:px-5 md:py-3 md:text-sm"
            >
              Prendre rendez-vous
              <FaArrowRightLong
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={CONTACT.phoneHref}
              className="inline-flex items-center gap-2 rounded-md border border-line bg-main px-4 py-2.5 text-xs font-medium text-darker transition-colors hover:border-secondary/40 hover:text-forest md:px-5 md:py-3 md:text-sm"
            >
              <FiPhone size={12} />
              {CONTACT.phone}
            </a>
          </div>
        </div>

        <div className="lg:col-span-5">
          <dl className="grid grid-cols-2 divide-x divide-y divide-line overflow-hidden rounded-xl border border-line bg-main">
            {QUICK_FACTS.map((fact, i) => (
              <div
                key={fact.label}
                className={`flex flex-col gap-1 px-4 py-4 md:px-5 md:py-5 ${
                  i < 2 ? "border-t-0" : ""
                } ${i % 2 === 0 ? "border-l-0" : ""}`}
              >
                <dt className="text-2xs font-medium uppercase tracking-wider text-ink-2 md:text-xs">
                  {fact.label}
                </dt>
                <dd className="text-base font-semibold tracking-tight text-darker md:text-xl">
                  <span className="bg-gradient-to-r from-darker to-secondary bg-clip-text text-transparent">
                    {fact.value}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
          <Link
            href="/qui-sommes-nous"
            className="group mt-3 flex items-center justify-between rounded-xl border border-line bg-main px-5 py-4 text-darker transition-colors hover:border-secondary/40"
          >
            <span className="flex flex-col">
              <span className="text-2xs font-medium uppercase tracking-wider text-secondary">
                Découvrir
              </span>
              <span className="text-sm font-medium">L'équipe complète</span>
            </span>
            <span
              aria-hidden
              className="text-ink-3 transition-transform group-hover:translate-x-1 group-hover:text-secondary"
            >
              →
            </span>
          </Link>
        </div>
      </div>

      <div className="mt-14 border-t border-line pt-8 md:mt-20 md:pt-10">
        <p className="eyebrow text-center">Soutenu par</p>
        <div className="mt-5 md:mt-6">
          <Partnairs />
        </div>
      </div>
    </section>
  );
};

export default Hero;
