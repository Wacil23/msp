"use client";
import Image from "next/image";

import ARS from "../../../../../public/images/MSP partenaires/ARS.png";
import CH from "../../../../../public/images/MSP partenaires/CH.png";
import Denain from "../../../../../public/images/MSP partenaires/Denain.png";
import Hainaut from "../../../../../public/images/MSP partenaires/Hainaut.png";
import CPAM from "../../../../../public/images/MSP partenaires/CPAM.png";
import Ministere from "../../../../../public/images/MSP partenaires/Ministere.png";

const PARTNERS = [
  { name: "ARS", image: ARS, width: 70 },
  { name: "CH Denain", image: CH, width: 40 },
  { name: "Ville de Denain", image: Denain, width: 70 },
  { name: "Hainaut", image: Hainaut, width: 70 },
  { name: "CPAM", image: CPAM, width: 70 },
  { name: "Ministère de la Santé", image: Ministere, width: 70 },
];

const Partnairs = () => {
  return (
    <div className="-mx-5 md:-mx-8">
      <div className="inline-flex w-full flex-nowrap overflow-hidden [mask-image:linear-gradient(to_right,transparent_0,_black_96px,_black_calc(100%-96px),transparent_100%)]">
        {[...Array(4)].map((_, id) => (
          <ul
            key={id}
            className="flex animate-infinite-scroll items-center [&_img]:max-w-none [&_li]:mx-7 md:[&_li]:mx-9"
            aria-hidden={id !== 0}
          >
            {PARTNERS.map((p) => (
              <li key={p.name}>
                <Image
                  className="opacity-50 grayscale transition-all duration-500 hover:opacity-90 hover:grayscale-0"
                  width={p.width}
                  height={p.width}
                  src={p.image}
                  alt={p.name}
                  loading="lazy"
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default Partnairs;
