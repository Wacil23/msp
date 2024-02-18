"use client";
import { Badge, Button, Paper, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import "@mantine/carousel/styles.css";
interface CardProps {
  image: string;
  title: string;
  category: string;
}

const data = [
  {
    image:
      "https://images.unsplash.com/photo-1508193638397-1c4234db14d8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Best forests to visit in North America",
    category: "nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1559494007-9f5847c49d94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Hawaii beaches review: better than you think",
    category: "beach",
  },
  {
    image:
      "https://images.unsplash.com/photo-1608481337062-4093bf3ed404?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Mountains at night: 12 best locations to enjoy the view",
    category: "nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Aurora in Norway: when to visit for best experience",
    category: "nature",
  },
  {
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Best places to visit this winter",
    category: "tourism",
  },
  {
    image:
      "https://images.unsplash.com/photo-1582721478779-0ae163c05a60?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&q=80",
    title: "Active volcanos reviews: travel at your own risk",
    category: "nature",
  },
];

const ActuCards: React.FC<CardProps> = ({
  image,
  title,
  category,
}: CardProps) => {
  return (
    <Paper
      shadow="md"
      p="xl"
      radius="md"
      style={{ backgroundImage: `url(${image})` }}
      className="h-96 flex flex-col gap-8 items-start bg-cover bg-center"
    >
      <div className="flex flex-col justify-around h-full gap-5">
        <Badge
          color="darker"
          className="font-black text-white opacity-85 mt-2 cursor-default"
        >
          {category}
        </Badge>
        <Title
          order={3}
          size={30}
          className="text-white text-3xl font-bold cursor-default"
        >
          {title}
        </Title>
        <Button>Read article</Button>
      </div>
    </Paper>
  );
};

const CarouselActu: React.FC = () => {
  const slides = data.map((item) => (
    <Carousel.Slide key={item.title}>
      <ActuCards {...item} />
    </Carousel.Slide>
  ));

  return (
    <Carousel
      align="start"
      slidesToScroll={1}
      slideSize={{ base: "80%" }}
      slideGap={{ base: "md" }}
    >
      {slides}
    </Carousel>
  );
};

export default CarouselActu;
