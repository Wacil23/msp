interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  /**
   * @deprecated retained for compat — use `description`.
   */
  subtitle?: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({
  eyebrow,
  title,
  description,
  subtitle,
}) => {
  const main = title ?? subtitle;
  return (
    <section className="container-msp">
      <div className="border-b border-line pb-8 pt-2 md:pb-12 md:pt-4">
        {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
        <h1 className="max-w-2xl text-lg font-semibold leading-tight tracking-tight text-darker md:text-2xl lg:text-3xl">
          {main}
        </h1>
        {description && (
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-ink-2 md:mt-4 md:text-base">
            {description}
          </p>
        )}
      </div>
    </section>
  );
};

export default Hero;
