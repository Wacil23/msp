"use client";
import Hero from "@/src/components/_Root/hero/hero";
import { Button, TextInput, Textarea } from "@mantine/core";
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
      <div className="flex md:mx-24 border rounded-md p-5">
        <form className="flex flex-col gap-3 w-1/2">
          <div className="flex  gap-5">
            <TextInput
              className="w-full"
              type="text"
              label="Nom"
              placeholder="Exemple : Doe"
              required
            />
            <TextInput
              className="w-full"
              type="text"
              label="Prénom"
              placeholder="Exemple : John"
              required
            />
          </div>
          <TextInput
            type="email"
            label="Email"
            placeholder="Votre adresse email"
            required
          />
          <Textarea label="Message" placeholder="Votre message" required />
          <Button className="mt-5">Envoyer</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
