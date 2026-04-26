import {
  FiPhone,
  FiMail,
  FiMapPin,
  FiClock,
  FiAlertTriangle,
} from "react-icons/fi";

import Hero from "@/src/components/_Root/hero/hero";
import { CONTACT, DOCTOLIB_URL } from "@/src/lib/data/site";
import { getPageSeo } from "@/src/lib/services/page/Page";

export async function generateMetadata() {
  const page = await getPageSeo("contact");
  return {
    title: page.seo.meta_title,
    description: page.seo.meta_description,
  };
}

const InfoItem = ({
  icon: Icon,
  label,
  primary,
  href,
}: {
  icon: React.ComponentType<{ size?: number }>;
  label: string;
  primary: React.ReactNode;
  href?: string;
}) => {
  const inner = (
    <>
      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-light bg-light text-secondary">
        <Icon size={14} />
      </span>
      <div className="flex min-w-0 flex-col">
        <span className="text-2xs font-medium uppercase tracking-wider text-secondary">
          {label}
        </span>
        <span className="mt-0.5 text-xs font-medium text-darker md:text-sm">
          {primary}
        </span>
      </div>
    </>
  );
  return href ? (
    <a
      href={href}
      target={href.startsWith("http") ? "_blank" : undefined}
      rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
      className="flex items-center gap-3 rounded-lg border border-line bg-main p-3.5 transition-colors hover:border-secondary/40 md:p-4"
    >
      {inner}
    </a>
  ) : (
    <div className="flex items-center gap-3 rounded-lg border border-line bg-main p-3.5 md:p-4">
      {inner}
    </div>
  );
};

const Contact = () => {
  return (
    <div className="flex flex-col gap-14 py-10 md:gap-20 md:py-14">
      <Hero
        eyebrow="Contact"
        title={
          <>
            Adresse, horaires
            <br className="hidden md:block" />
            <span className="text-secondary"> et accès.</span>
          </>
        }
        description="Pour les rendez-vous, privilégiez Doctolib. Pour les questions administratives, contactez-nous par téléphone ou par e-mail."
      />

      <section className="container-msp">
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-6">
          <div className="flex flex-col gap-2.5">
            <InfoItem
              icon={FiPhone}
              label="Téléphone"
              primary={CONTACT.phone}
              href={CONTACT.phoneHref}
            />
            <InfoItem
              icon={FiMail}
              label="E-mail"
              primary={CONTACT.email}
              href={CONTACT.emailHref}
            />
            <InfoItem
              icon={FiMapPin}
              label="Adresse"
              primary={CONTACT.address}
              href={CONTACT.addressHref}
            />
            <div className="flex items-start gap-3 rounded-lg border border-line bg-main p-3.5 md:p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-light bg-light text-secondary">
                <FiClock size={14} />
              </span>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <span className="text-2xs font-medium uppercase tracking-wider text-secondary">
                  Horaires
                </span>
                <ul className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs md:text-sm">
                  {CONTACT.hours.map((h) => (
                    <li key={h.day} className="contents">
                      <span className="text-ink-2">{h.day}</span>
                      <span className="text-right font-medium text-darker">
                        {h.time}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-lg border border-clay/40 bg-clay/[0.06] p-3.5 md:p-4">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-md border border-clay/40 bg-main text-clay">
                <FiAlertTriangle size={14} />
              </span>
              <div>
                <p className="text-2xs font-semibold uppercase tracking-wider text-clay">
                  {CONTACT.emergency.label}
                </p>
                <p className="mt-1 text-xs text-darker md:text-sm">
                  Composez le{" "}
                  <a
                    href={`tel:${CONTACT.emergency.number}`}
                    className="font-semibold text-darker underline"
                  >
                    {CONTACT.emergency.number}
                  </a>{" "}
                  — {CONTACT.emergency.description}.
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-xl border border-line bg-main">
            <iframe
              title="Plan d'accès — MSP de Denain"
              src="https://www.google.com/maps?q=570+rue+Arthur+Brunet+59220+Denain&output=embed"
              width="100%"
              height="100%"
              style={{ minHeight: 360, border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="md:min-h-[480px]"
            />
          </div>
        </div>
      </section>

      <section className="container-msp">
        <div className="grid items-center gap-6 rounded-xl border border-light bg-primary p-6 md:grid-cols-12 md:gap-10 md:p-10">
          <div className="md:col-span-8">
            <p className="eyebrow">Doctolib</p>
            <h2 className="mt-3 text-base font-semibold leading-tight tracking-tight text-darker md:text-xl lg:text-2xl">
              Le plus rapide pour{" "}
              <span className="text-secondary">réserver.</span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-2 md:text-base">
              Tous nos professionnels gèrent leur planning sur Doctolib.
              Choisissez votre praticien, le motif et un créneau.
            </p>
          </div>
          <div className="flex flex-col gap-2 md:col-span-4 md:items-end">
            <a
              href={DOCTOLIB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-md bg-secondary px-4 py-2 text-center text-xs font-medium text-cream shadow-sage transition-colors hover:bg-forest md:text-sm"
            >
              Prendre rendez-vous
            </a>
            <a
              href={CONTACT.phoneHref}
              className="rounded-md border border-line bg-main px-4 py-2 text-center text-xs font-medium text-darker transition-colors hover:border-secondary/40 hover:text-forest md:text-sm"
            >
              Nous appeler
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
