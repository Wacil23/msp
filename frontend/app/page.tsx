import CarouselActu from "@/lib/micro/ActuCard";
import TeamsCard from "@/lib/micro/TeamsCard";
import { ActionIcon, Button, Card, CardSection } from "@mantine/core";
import React from "react";
import { FiCalendar, FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const Home: React.FC = () => {
  const contactCard = [
    {
      name: "Téléphone",
      icon: <FiPhone className="text-xl text-primary-700" />,
      value: "03 27 30 33 33",
    },
    {
      name: "Email",
      icon: <FiMail className="text-xl text-primary-700" />,
      value: "contact@mspdenain.fr",
    },
    {
      name: "Lieu",
      icon: <FiMapPin className="text-xl text-primary-700" />,
      value: "570 rue Arthur Brunet, 59220 Denain",
    },
  ];

  return (
    <div className="flex flex-col gap-20">
      <div className="py-20 px-10 flex gap-7 bg-primary-700 flex-col">
        <h1 className="font-extrabold text-white text-center text-2xl text-pretty ">
          Unis pour votre bien-être <br />
          <span className="font-semibold text-xl">
            Des soins coordonnés au cœur de votre communauté
          </span>
        </h1>
        <Button color="secondary.9" rightSection={<FiCalendar />}>
          Prendre rendez-vous
        </Button>
      </div>
      <div className="flex px-10 flex-col items-center gap-5 w-full">
        {contactCard.map((contact, index) => (
          <Card
            className="w-full"
            shadow="sm"
            padding="lg"
            radius="md"
            withBorder
          >
            <CardSection>
              <div className="flex flex-col gap-8">
                <div key={index} className="flex flex-col gap-3 items-center">
                  <ActionIcon
                    className="hover:-translate-y-1 py-4 transition-transform duration-150"
                    variant="outline"
                    color="primary.7"
                    size={45}
                  >
                    {contact.icon}
                  </ActionIcon>
                  <p className="font-semibold text-gray-800">{contact.value}</p>
                </div>
              </div>
            </CardSection>
          </Card>
        ))}
      </div>
      <div className="bg-primary-800  py-8">
        <div className="px-10">
          <h2 className="font-bold text-2xl text-white mb-5">Les équipes</h2>
          <p className="text-white font-normal">
            Les équipes de la MSP sont composés de plusieurs professionnels de
            santé provenant de secteur différent. La msp recrute des internes en
            médecine à Lille et des infirmières issu de la formation de l'IFSI
            de Valenciennes.
          </p>
        </div>
        <TeamsCard />
      </div>
      <div className="">
        <h2 className="px-10 font-bold text-2xl text-gray-800 mb-5">
          Les Actus
        </h2>
        <CarouselActu />
      </div>
    </div>
  );
};

export default Home;
