import ARS from "../../../../../public/images/MSP partenaires/ARS.png";
import CH from "../../../../../public/images/MSP partenaires/CH.png";
import Denain from "../../../../../public/images/MSP partenaires/Denain.png";
import Hainaut from "../../../../../public/images/MSP partenaires/Hainaut.png";
import CPAM from "../../../../../public/images/MSP partenaires/CPAM.png";
import Ministere from "../../../../../public/images/MSP partenaires/Ministere.png";
import Image from "next/image";

const Partnairs = () => {
  const partenaires = [
    {
      nom: "ARS",
      image: ARS,
      width: 90,
    },
    {
      nom: "CH",
      image: CH,
      width: 50,
    },
    {
      nom: "Denain",
      image: Denain,
      width: 90,
    },
    {
      nom: "Hainaut",
      image: Hainaut,
      width: 90,
    },
    {
      nom: "CPAM",
      image: CPAM,
      width: 90,
    },
    {
      nom: "Ministère",
      image: Ministere,
      width: 90,
    },
  ];
  return (
    <div className="mx-4 flex flex-col gap-8 md:px-20 lg:px-24">
      <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-200px),transparent_100%)]">
        {[...Array(5)].map((_, id) => (
          <ul
            key={id}
            className="flex animate-infinite-scroll items-center justify-center md:justify-start [&_img]:max-w-none [&_li]:mx-8"
          >
            {partenaires.map((partenaire) => {
              return (
                <li key={partenaire.nom}>
                  <Image
                    className="grayscale transition-all duration-500 hover:grayscale-0"
                    width={partenaire.width}
                    height={partenaire.width}
                    src={partenaire.image}
                    alt={partenaire.nom}
                    loading="lazy"
                  />
                </li>
              );
            })}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Partnairs;
