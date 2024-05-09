import { Text, Box, Stack, rem } from "@mantine/core";
import { IconType } from "react-icons/lib";
import { FiAtSign, FiMapPin, FiPhone, FiSun } from "react-icons/fi";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: IconType;
  title: React.ReactNode;
  description: React.ReactNode;
}

function ContactIcon({
  icon: Icon,
  title,
  description,
  ...others
}: ContactIconProps) {
  return (
    <div className="flex items-center text-white" {...others}>
      <Box mr="md">
        <Icon style={{ width: rem(24), height: rem(24) }} />
      </Box>

      <div>
        <Text size="xs" className="text-blue-500">
          {title}
        </Text>
        <Text className="text-white">{description}</Text>
      </div>
    </div>
  );
}

const MOCKDATA = [
  { title: "Email", description: "contact@docmsp.fr", icon: FiAtSign },
  { title: "Tel", description: "03 27 06 78 98", icon: FiPhone },
  {
    title: "Adresse",
    description: "570 rue Arthur Brunet, 59220 Denain",
    icon: FiMapPin,
  },
  { title: "Horraires", description: "8h00 – 19h00", icon: FiSun },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
