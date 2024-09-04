import Hero from "@/src/components/_Root/hero/hero";
import React from "react";

const QuiSommesNous = () => {
  return (
    <div className="flex flex-col gap-8 py-16">
      <Hero
        title="Qui sommes nous"
        subtitle={
          <>
            Tout savoir sur la
            <br /> MSP de Denain{" "}
          </>
        }
      />
    </div>
  );
};

export default QuiSommesNous;
