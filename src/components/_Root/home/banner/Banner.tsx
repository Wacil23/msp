import Image from "next/image";
import Link from "next/link";
import BannerImage from "../../../../../public/images/World Health Day Illustration.svg";

const Banner = () => {
  return (
    <section className="container-msp">
      <div className="grid items-center gap-8 rounded-xl border border-light bg-primary p-6 md:grid-cols-12 md:gap-12 md:p-10 lg:p-14">
        <div className="md:col-span-4 lg:col-span-5">
          <Image
            src={BannerImage}
            alt=""
            className="mx-auto w-full max-w-[260px] md:max-w-xs"
            priority={false}
          />
        </div>
        <div className="md:col-span-8 lg:col-span-7">
          <p className="eyebrow">Formation & engagement</p>
          <h2 className="mt-3 text-base font-semibold leading-tight tracking-tight text-darker md:text-xl lg:text-2xl">
            Former, prévenir,{" "}
            <span className="text-secondary">accompagner.</span>
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-2 md:text-base">
            Lieu de stage pour les internes en médecine générale (Faculté de
            Lille) et les étudiants infirmiers (IFMS Valenciennes). Programmes
            ETP&nbsp;: diabète de type 2, obésité infantile (MRTC), asthme,
            BPCO, insuffisance cardiaque.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <Link
              href="/qui-sommes-nous"
              className="rounded-md bg-secondary px-3 py-1.5 text-xs font-medium text-cream shadow-sage transition-colors hover:bg-forest md:px-4 md:py-2 md:text-sm"
            >
              L'équipe
            </Link>
            <Link
              href="/blog"
              className="rounded-md border border-line bg-main px-3 py-1.5 text-xs font-medium text-darker transition-colors hover:border-secondary/40 hover:text-forest md:px-4 md:py-2 md:text-sm"
            >
              Conseils santé
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
