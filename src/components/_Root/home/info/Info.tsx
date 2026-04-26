import { YouTubeEmbed } from "@next/third-parties/google";
import {
  FiUsers,
  FiActivity,
  FiShield,
  FiBookOpen,
} from "react-icons/fi";

const PILLARS = [
  {
    icon: FiUsers,
    title: "Coordonnés",
    description:
      "Concertation pluriprofessionnelle autour de votre dossier.",
  },
  {
    icon: FiBookOpen,
    title: "Éducation",
    description:
      "ETP : diabète, asthme, BPCO, insuffisance cardiaque, obésité infantile.",
  },
  {
    icon: FiShield,
    title: "Continuité",
    description:
      "Le suivi est assuré par l'équipe en cas d'absence d'un professionnel.",
  },
  {
    icon: FiActivity,
    title: "Accessibilité",
    description: "Conventionnés secteur 1. Tiers payant. Un seul lieu.",
  },
];

const Info = () => {
  return (
    <section className="container-msp">
      <div className="grid gap-10 xl:grid-cols-12 xl:gap-14">
        <div className="xl:col-span-5">
          <p className="eyebrow">À propos</p>
          <h2 className="mt-3 text-base font-semibold leading-tight tracking-tight text-darker md:text-xl lg:text-2xl">
            La Maison de Santé{" "}
            <span className="text-secondary">Pluriprofessionnelle.</span>
          </h2>
          <div className="mt-4 space-y-3 text-sm leading-relaxed text-ink-2 md:text-base">
            <p>
              Structure de soins de proximité réunissant plusieurs
              professionnels de santé en un même lieu.
            </p>
            <p>
              Objectif&nbsp;: un parcours coordonné, accessible et continu
              pour les patients du territoire.
            </p>
          </div>
          <div className="mt-6 overflow-hidden rounded-xl border border-line bg-main">
            <YouTubeEmbed
              params="controls=0&modestbranding=1&rel=0"
              videoid="Rz0zCWxAsqE"
            />
          </div>
        </div>

        <div className="xl:col-span-7">
          <ul className="grid grid-cols-1 divide-y divide-line overflow-hidden rounded-xl border border-line bg-main sm:grid-cols-2 sm:divide-y-0 sm:[&>li:nth-child(odd)]:border-r sm:[&>li]:border-line sm:[&>li:nth-child(n+3)]:border-t">
            {PILLARS.map(({ icon: Icon, title, description }) => (
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
  );
};

export default Info;
