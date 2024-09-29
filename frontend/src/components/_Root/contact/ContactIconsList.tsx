import { Text, Box, Stack, rem } from "@mantine/core";
import { IconType } from "react-icons/lib";
import { FiAtSign, FiMapPin, FiPhone, FiSun } from "react-icons/fi";

interface ContactIconProps
  extends Omit<React.ComponentPropsWithoutRef<"div">, "title"> {
  icon: IconType;
  title: React.ReactNode;
  componant: React.ReactNode;
}

function ContactIcon({
  icon: Icon,
  title,
  componant,
  ...others
}: ContactIconProps) {
  return (
    <div className="flex items-center text-darker" {...others}>
      <Box mr="md">
        <Icon color="darker" style={{ width: rem(24), height: rem(24) }} />
      </Box>
      <div>
        <Text size={"sm"} className="font-semibold text-darker">
          {title}
        </Text>
        {componant}
      </div>
    </div>
  );
}

const MOCKDATA = [
  {
    title: "Email",
    icon: FiAtSign,
    componant: (
      <Text
        component="a"
        href="mailto:contact@docmsp.fr"
        className="text-xs text-darker md:text-base"
      >
        contact@docmsp.fr
      </Text>
    ),
  },
  {
    title: "Tel",
    icon: FiPhone,
    componant: (
      <Text
        component="a"
        href="tel:0327067898"
        className="text-xs text-darker md:text-base"
      >
        03 27 06 78 98
      </Text>
    ),
  },
  {
    title: "Adresse",
    description: "570 rue Arthur Brunet, 59220 Denain",
    icon: FiMapPin,
    componant: (
      <Text
        component="a"
        href="https://www.google.com/maps/search/?api=1&query=570rueArthurBrunet,59220Denain"
        className="text-xs text-darker md:text-base"
      >
        570 rue Arthur Brunet, 59220 Denain
      </Text>
    ),
  },
  {
    title: "Horraires",
    description: "8h00 – 19h00",
    icon: FiSun,
    componant: (
      <Text className="text-xs text-darker md:text-base">8h00 – 19h00</Text>
    ),
  },
];

export function ContactIconsList() {
  const items = MOCKDATA.map((item, index) => (
    <ContactIcon key={index} {...item} />
  ));
  return <Stack>{items}</Stack>;
}
