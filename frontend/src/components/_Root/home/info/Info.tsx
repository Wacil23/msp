import { YouTubeEmbed } from "@next/third-parties/google";

const Info = () => {
  return (
    <div className="mx-4 mb-8 flex flex-col gap-12 md:mx-8 xl:mx-8 xl:my-40">
      <h2 className="text-xl font-normal text-darker md:text-2xl lg:text-4xl">
        Qu'est ce qu'une MSP ?
      </h2>
      <div className="flex flex-col items-center gap-12 md:gap-20 lg:gap-28 xl:flex-row">
        <div className="flex flex-col items-start xl:w-[55%]">
          <p className="text-md md:text-lg">
            Les maisons de santé pluriprofessionnelles sont des structure de
            soins de proximité qui regroupent des professionnels de santé
            médicaux notamment des médecins généralistes et paramédicaux comme
            des infirmiers, des kinésithérapeutes ou des orthophonistes.
            <br />
            <br />
            Le travail en coordination des différents professionnels est
            inhérent au fonctionnement des MSP. Le regroupement de plusieurs
            types de professionnels en un même lieu – comme c’est le plus
            souvent le cas - et leur coordination permettent un accès aux soins
            facilité, une continuité des soins en cas d’absence ou
            indisponibilité du professionnel et d’une prise en charge globale et
            coordonnée entre les différents acteurs autour des besoins du
            patient.
          </p>
        </div>
        <div className="w-full rounded-3xl xl:w-1/2">
          <YouTubeEmbed
            style="border-radius: 1.5rem; margin:auto"
            params="controls=0&loop=1&modestbranding=1"
            videoid="Rz0zCWxAsqE"
          />
        </div>
      </div>
    </div>
  );
};

export default Info;
