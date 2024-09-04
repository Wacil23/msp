interface HeroProps {
  title: string;
  subtitle: React.ReactNode;
}

const Hero: React.FC<HeroProps> = ({ title, subtitle }) => {
  return (
    <div className="flex flex-col gap-2 lg:mx-52 lg:my-16 xl:mx-80 xl:my-20">
      <h1 className="text-darkLight text-md m-auto font-medium text-darker md:text-lg">
        {title}
      </h1>
      <h2 className="m-auto text-center text-xl font-extrabold text-darker md:text-4xl">
        {subtitle}
      </h2>
    </div>
  );
};

export default Hero;
