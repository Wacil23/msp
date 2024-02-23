"use client";

import { Button, Input, TextInput } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { FiArrowRight } from "react-icons/fi";
import { useForm } from "@mantine/form";
import { yupResolver } from "mantine-form-yup-resolver";
import { schema } from "@/app/_lib/config/validations/Login";

const Connexion = () => {
  const form = useForm({
    initialValues: {
      email: "",
      password: "",
    },
    validate: yupResolver(schema),
  });

  return (
    <div className="py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-5">Connexion</h1>
      <span>
        Petit rappelle : Vous devez être membre de la MSP de Denain pour pouvoir
        créer un compte et vous connecter.
      </span>
      <Link
        href={"/"}
        className="underline text-primary-700 text-center w-fit flex items-center justify-start gap-2 cursor-pointer"
      >
        Devenir adhérent <FiArrowRight />{" "}
      </Link>
      <div className="border rounded-lg p-5 my-8">
        <h2 className="font-semibold text-xl text-center">
          Ravi de vous revoir !
        </h2>
        <form
          className="flex flex-col gap-4"
          onSubmit={form.onSubmit((values) => console.log(values))}
        >
          <TextInput
            type="email"
            placeholder="Entrer votre adresse email"
            label="Email"
            withAsterisk
            {...form.getInputProps("email")}
          />
          <TextInput
            type="password"
            placeholder="Entrer votre mot de passe"
            label="Mot de passe"
            withAsterisk
            {...form.getInputProps("password")}
          />
          <Button type="submit" w={"100%"}>
            Se connecter
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Connexion;
