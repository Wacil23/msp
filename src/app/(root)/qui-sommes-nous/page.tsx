import Link from "next/link";
import {
  FiUsers,
  FiBookOpen,
  FiActivity,
  FiAward,
  FiTarget,
  FiHeart,
} from "react-icons/fi";

import Hero from "@/src/components/_Root/hero/hero";
import {
  TEAM_GROUPS,
  TEAM_MEMBERS,
  initialsFor,
} from "@/src/lib/data/team";
import { CONTACT, DOCTOLIB_URL } from "@/src/lib/data/site";
import { getPageSeo } from "@/src/lib/services/page/Page";

export async function generateMetadata() {
  const page = await getPageSeo("about");
  return {
    title: page.seo.meta_title,
    description: page.seo.meta_description,
  };
}

const VALUES = [
  {
    icon: FiHeart,
    title: "Écoute",
    description: "Une médecine humaine, fondée sur le dialogue.",
  },
  {
    icon: FiUsers,
    title: "Pluriprofessionnel",
    description: "21 professionnels concertés autour de votre dossier.",
  },
  {
    icon: FiAward,
    title: "Conventionnés secteur 1",
    description: "Tarifs Sécurité sociale. Tiers payant.",
  },
  {
    icon: FiBookOpen,
    title: "Éducation thérapeutique",
    description: "Programmes ETP pour mieux vivre avec sa pathologie.",
  },
  {
    icon: FiActivity,
    title: "Continuité",
    description: "Un parcours fluide entre les intervenants.",
  },
  {
    icon: FiTarget,
    title: "Proximité",
    description: "Un seul lieu à Denain pour vos consultations et soins.",
  },
];

const QuiSommesNous = () => {
  const groups = TEAM_GROUPS.map((group) => ({
    group,
    members: TEAM_MEMBERS.filter((m) => m.group === group),
  })).filter((g) => g.members.length > 0);

  return (
    <div className="flex flex-col gap-14 py-10 md:gap-20 md:py-14">
      <Hero
        eyebrow="L'équipe"
        title={
          <>
            21 professionnels de santé.
            <br className="hidden md:block" />
            <span className="text-secondary"> Un seul lieu, à Denain.</span>
          </>
        }
        description="Médecins généralistes, spécialistes, infirmiers, kinésithérapeute, diététicienne. Une équipe coordonnée pour un suivi continu."
      />

      <section className="container-msp">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="eyebrow">Histoire</p>
            <h2 className="mt-3 text-base font-semibold leading-tight tracking-tight text-darker md:text-xl lg:text-2xl">
              Une médecine de proximité,
              <br />
              <span className="text-secondary">depuis 2018.</span>
            </h2>
            <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-2 md:text-base">
              <p>
                Le Pôle Santé du Denaisis rassemble en un même lieu des
                professionnels qui croient en la coordination et l'écoute.
              </p>
              <p>
                Engagement&nbsp;: garantir la continuité des soins, faciliter
                le parcours grâce au tiers payant et aux tarifs conventionnés
                secteur 1.
              </p>
              <p>
                Lieu de formation&nbsp;: internes en médecine générale (Faculté
                de Lille), étudiants infirmiers (IFMS Valenciennes).
              </p>
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-main sm:grid-cols-2 sm:divide-y-0 sm:[&>li:nth-child(odd)]:border-r sm:[&>li]:border-line sm:[&>li:nth-child(n+3)]:border-t sm:[&>li:nth-child(n+5)]:border-t">
              {VALUES.map(({ icon: Icon, title, description }) => (
                <li
                  key={title}
                  className="group flex flex-col gap-2 p-5 transition-colors hover:bg-primary md:p-6"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-md border border-light bg-light text-secondary transition-colors group-hover:bg-secondary group-hover:text-cream">
                    <Icon size={14} />
                  </span>
                  <h3 className="text-sm font-semibold text-darker md:text-base">
                    {title}
                  </h3>
                  <p className="text-xs leading-relaxed text-ink-2 md:text-sm">
                    {description}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-msp">
        <div className="border-b border-line pb-3">
          <p className="eyebrow">Tous les membres</p>
          <h2 className="mt-3 text-base font-semibold leading-tight tracking-tight text-darker md:text-xl lg:text-2xl">
            <span className="text-secondary">{TEAM_MEMBERS.length}</span>{" "}
            professionnels engagés.
          </h2>
        </div>

        <div className="mt-6 space-y-10 md:mt-8 md:space-y-12">
          {groups.map(({ group, members }) => (
            <div key={group}>
              <div className="mb-3 flex items-baseline justify-between border-b border-line pb-2">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-darker md:text-sm">
                  {group}
                </h3>
                <span className="text-2xs text-secondary md:text-xs">
                  {String(members.length).padStart(2, "0")}
                </span>
              </div>
              <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-2 md:gap-3">
                {members.map((member) => (
                  <div
                    key={member.firstName + member.lastName}
                    className="flex items-center gap-3 rounded-lg border border-line bg-main p-3 transition-colors hover:border-secondary/40"
                  >
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-light text-2xs font-semibold text-forest md:text-xs">
                      {initialsFor(member)}
                    </span>
                    <div className="min-w-0 flex-1 leading-snug">
                      <p className="break-words text-xs font-medium text-darker md:text-sm">
                        {member.firstName} {member.lastName}
                      </p>
                      <p className="mt-0.5 truncate text-2xs text-ink-2 md:text-xs">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="container-msp">
        <div className="grid items-center gap-6 rounded-xl border border-light bg-primary p-6 md:grid-cols-12 md:gap-10 md:p-10">
          <div className="md:col-span-8">
            <p className="eyebrow">Devenir patient</p>
            <h2 className="mt-3 text-base font-semibold leading-tight tracking-tight text-darker md:text-xl lg:text-2xl">
              Prenez <span className="text-secondary">rendez-vous.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-2 md:text-base">
              Réservez avec l'un de nos médecins généralistes. Vous serez
              ensuite orienté vers les autres professionnels selon vos besoins.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:col-span-4 md:items-end">
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-secondary px-4 py-2 text-center text-xs font-medium text-cream shadow-sage transition-colors hover:bg-forest md:text-sm"
            >
              Doctolib
            </a>
            <Link
              href="/contact"
              className="rounded-md border border-line bg-main px-4 py-2 text-center text-xs font-medium text-darker transition-colors hover:border-secondary/40 hover:text-forest md:text-sm"
            >
              Nous contacter
            </Link>
            <a
              href={CONTACT.phoneHref}
              className="text-2xs text-ink-2 hover:text-forest md:text-xs"
            >
              ou {CONTACT.phone}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuiSommesNous;
