interface HeroProps {
  title: string;
  subtitle: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-2  my-20">
      <h1 className="text-lg font-medium text-darkLight m-auto">{title}</h1>
      <h2 className="text-4xl m-auto text-darker font-extrabold text-center">
        {subtitle}
      </h2>
    </div>
  );
};

export default Hero;
