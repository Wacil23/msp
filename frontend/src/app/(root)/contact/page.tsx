"use client";

import { ContactIconsList } from "@/src/components/_Root/contact/ContactIconsList";
import Hero from "@/src/components/_Root/hero/hero";
import {
  Button,
  Group,
  Paper,
  SimpleGrid,
  Text,
  TextInput,
  Textarea,
} from "@mantine/core";
import React from "react";

const Contact = () => {
  return (
    <div className="flex flex-col gap-8 py-16">
      <Hero
        title="Nous contacter"
        subtitle={
          <>
            Une question ? <br /> Envoyer nous un message{" "}
          </>
        }
      />
      <Paper
        className="mx-4 md:mx-10 lg:mx-16 xl:mx-24"
        shadow="md"
        radius="lg"
      >
        <div className="flex flex-col rounded-lg border border-solid border-gray-200 p-4 md:p-8 lg:flex-row">
          <div className="relative mb-2 box-border flex flex-auto flex-col items-center rounded-lg border border-solid border-transparent bg-light to-90% bg-cover bg-center p-8 pl-8 text-darker md:mb-0">
            <Text fz="lg" fw={700} className="mb-8 md:mb-12" c="darker.1">
              Informations
            </Text>
            <ContactIconsList />
          </div>
          <form
            className="flex flex-col gap-5 border-l-0 p-5 md:p-6 lg:w-1/2 lg:p-8"
            onSubmit={(event) => event.preventDefault()}
          >
            <Text fz="lg" fw={700}>
              Contactez nous
            </Text>
            <div>
              <SimpleGrid cols={{ base: 1, sm: 1, md: 2 }}>
                <TextInput
                  label="Votre nom complet"
                  placeholder="Votre nom complet"
                />
                <TextInput
                  label="Votre email"
                  placeholder="monemail@gmail.com"
                  required
                />
              </SimpleGrid>
              <TextInput
                mt="md"
                label="Objet"
                withAsterisk
                placeholder="Objet"
                required
              />
              <Textarea
                mt="md"
                label="Votre message"
                placeholder="Votre message"
                minRows={3}
                maxRows={6}
                autosize
              />
              <Group justify="flex-end" mt="md">
                <Button type="submit" className="">
                  Envoyer
                </Button>
              </Group>
            </div>
          </form>
        </div>
      </Paper>
    </div>
  );
};

export default Contact;
