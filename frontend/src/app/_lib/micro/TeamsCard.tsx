import { Avatar, Badge } from "@mantine/core";

const TeamsCard: React.FC = () => {
  const MspTeams = [
    {
      medecin: [
        { name: "Docteur Gilbert MBOCK" },
        { name: "Docteur Antoine DEUDON" },
        { name: "Docteur Ali ZEKRAOUI" },
        { name: "Docteur Jean Philippe BRICQUET" },
      ],
      infirmier: [
        { name: "Mme Céline ANDERSZ" },
        { name: "Mme Céline GRESSIER" },
        { name: "Mme Sandrine FLAMENT" },
        { name: "Mr Cyprien LECLERCQ" },
        { name: "Mr Rabbah ZEKRAOUI" },
        { name: "Mme Allison LECLERCQ" },
        { name: "Mme Audrey DELAHAYE" },
        { name: "Mme Marine HAMMOU" },
        { name: "Mme Isabelle ANDRE" },
        { name: "Mme Fatima SAIDI" },
        { name: "Mme Barbara SAMPE" },
        { name: "Mme Sarah BOULANGER" },
        { name: "Mr Sébastien CAPDEVILLE" },
        { name: "Mme Aline CAFFART" },
      ],
      dieteticien: [{ name: "Mme Anne Sophie ZIELINSKI" }],
      kine: [{ name: "Mr Edouard JANDREZ" }],
      cardiologue: [{ name: "Dr Cécile DONFACK" }],
    },
  ];
  return (
    <div className="px-5">
      <div className="flex gap-12 overflow-auto my-5">
        {MspTeams.map((team) => {
          return team.medecin.map((medecin) => (
            <div className="hover:-translate-y-1 py-4 transition-transform duration-150  flex flex-col gap-2 items-center">
              <Avatar size={50} color="primary.1">
                {medecin.name.split(" ")[1].at(0) +
                  "" +
                  medecin.name.split(" ")[2].at(0)}
              </Avatar>
              <Badge variant="outline" color="darker">
                Médecin Généraliste
              </Badge>
              <p className="text-sm text-nowrap text-white font-bold">
                {medecin.name}
              </p>
            </div>
          ));
        })}
      </div>
      <div className="flex gap-12 overflow-auto my-5">
        {MspTeams.map((team) => {
          return team.infirmier.map((medecin) => (
            <div className="hover:-translate-y-1 py-4 transition-transform duration-150  flex flex-col gap-2 items-center">
              <Avatar size={50} color="primary.1">
                {medecin.name.split(" ")[1].at(0) +
                  "" +
                  medecin.name.split(" ")[2].at(0)}
              </Avatar>
              <Badge variant="outline" color="darker">
                Infirmier
              </Badge>
              <p className="text-sm text-nowrap text-white font-bold">
                {medecin.name}
              </p>
            </div>
          ));
        })}
      </div>
      <div className="flex gap-12 overflow-auto my-5">
        {MspTeams.map((team) => {
          return team.kine.map((medecin) => (
            <div className="hover:-translate-y-1 py-4 transition-transform duration-150  flex flex-col gap-2 items-center">
              <Avatar size={50} color="primary.1">
                {medecin.name.split(" ")[1].at(0) +
                  "" +
                  medecin.name.split(" ")[2].at(0)}
              </Avatar>
              <Badge variant="outline" color="darker">
                Kinésithérapeuthe
              </Badge>
              <p className="text-sm text-nowrap text-white font-bold">
                {medecin.name}
              </p>
            </div>
          ));
        })}
        {MspTeams.map((team) => {
          return team.cardiologue.map((medecin) => (
            <div className="hover:-translate-y-1 py-4 transition-transform duration-150  flex flex-col gap-2 items-center">
              <Avatar size={50} color="primary.1">
                {medecin.name.split(" ")[1].at(0) +
                  "" +
                  medecin.name.split(" ")[2].at(0)}
              </Avatar>
              <Badge variant="outline" color="darker">
                Cardiologue
              </Badge>
              <p className="text-sm text-nowrap text-white font-bold">
                {medecin.name}
              </p>
            </div>
          ));
        })}
        {MspTeams.map((team) => {
          return team.dieteticien.map((medecin) => (
            <div className="hover:-translate-y-1 py-4 transition-transform duration-150 flex text-white flex-col gap-2 items-center">
              <Avatar size={50} color="primary.1">
                {medecin.name.split(" ")[1].at(0) +
                  "" +
                  medecin.name.split(" ")[2].at(0)}
              </Avatar>
              <Badge variant="outline" color="darker">
                Diététicienne
              </Badge>
              <p className="text-sm text-nowrap text-white font-bold">
                {medecin.name}
              </p>
            </div>
          ));
        })}
      </div>
    </div>
  );
};

export default TeamsCard;
