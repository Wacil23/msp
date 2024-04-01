import Image from "next/image";
import React from "react";
import MspDenain from "@/public/images/msp_denain.png";
import sss from "@/public/images/Health professional team-amico.png";

const HeroCard = () => {
  return (
    <>
      <div className="absolute top-0 border rounded-lg right-0">
        <Image
          className="rounded-lg object-cover"
          height={350}
          src={sss}
          alt=""
        />
      </div>
      <div className="absolute top-20 right-52">
        <Image
          className="rounded-lg object-cover"
          height={350}
          src={MspDenain}
          alt=""
        />
      </div>
      <div className="absolute top-40 right-32">
        <Image
          className="rounded-lg object-cover"
          height={350}
          src={MspDenain}
          alt=""
        />
      </div>
    </>
  );
};

export default HeroCard;
