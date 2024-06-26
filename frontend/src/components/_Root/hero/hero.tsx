interface HeroProps {
  title: string;
  subtitle: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <div className="mx-80 my-20 flex flex-col gap-2">
      <h1 className="text-darkLight m-auto text-lg font-medium text-darker">
        {title}
      </h1>
      <h2 className="m-auto text-center text-4xl font-extrabold text-darker">
        {subtitle}
      </h2>
    </div>
  );
};

export default Hero;
