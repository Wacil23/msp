"use client";
import AuthForm from "@/src/components/_Root/form/AuthForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React from "react";
import { FiArrowLeft, FiArrowRight, FiInfo } from "react-icons/fi";
import Image from "next/image";
import LoginImg from "../../../../public/images/Doctor-pana.svg";
import SnackBar, { SnackType } from "@/src/components/_Root/snackbar/snackbar";
import { Blockquote, Button, Divider, TextInput } from "@mantine/core";

type Credentials = {
  email: string;
  password: string;
};

const Connexion = () => {
  const router = useRouter();
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [forgotPassword, setForgotPassword] = React.useState(false);

  const handleFormSubmit = async (data: Credentials) => {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      callbackUrl: "/dashboard",
      redirect: false,
    });
    setLoading(false);
    if (res?.error) {
      setError(res?.error);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex  h-dvh md:p-4">
      <div className="bg-primary-200 hidden lg:w-3/5 xl:w-2/5 lg:flex rounded-xl">
        <Image className="mx-auto" src={LoginImg} alt="Image connexion" />
      </div>
      {forgotPassword ? (
        <div className="flex flex-col w-3/4 ">
          <Link
            className="flex items-center gap-2 pl-8 pt-5 font-semibold text-darker"
            href={"/"}
          >
            <FiArrowLeft /> Revenir à l'acceuil
          </Link>
          <div className="md:rounded-lg py-5 md:px-20 px-10 md:shadow-slate-100 m-auto md:mx-12 md:shadow">
            <h1 className="text-xl md:text-4xl group text-darker font-bold text-center mb-5">
              Mot de passe oublié
            </h1>

            <div className="flex flex-col gap-6 py-5 md:my-8 my-4">
              <TextInput
                label="Votre email"
                type="email"
                withAsterisk
                required
                placeholder="Votre email de connexion"
              />
              <Button>Réinitialiser mon mot de passe</Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col mx-auto">
          <Link
            className="flex items-center gap-2 pl-8 pt-5 font-semibold text-darker"
            href={"/"}
          >
            <FiArrowLeft /> Revenir à l'acceuil
          </Link>
          <div className="md:rounded-lg py-5 md:px-20 px-10 md:shadow-slate-100 m-auto md:mx-12 md:shadow">
            <h1 className="text-xl md:text-4xl text-darker font-bold text-center mb-5">
              Accès Professionnel
            </h1>
            <Blockquote
              color="blue"
              radius="md"
              icon={<FiInfo size={30} />}
              iconSize={40}
              mt="xl"
            >
              Vous devez être membre de la MSP de Denain pour pouvoir créer un
              compte et vous connecter.
            </Blockquote>

            <div className="flex flex-col gap-6 py-5 md:my-8 my-4">
              {error && (
                <SnackBar
                  message={error}
                  title="Une erreur est survenue..."
                  type={SnackType.Danger}
                />
              )}
              <AuthForm
                formClass="flex flex-col gap-7"
                onSubmit={handleFormSubmit}
                buttonText="Connexion"
                linkText="Mot de passe oublié ?"
                onButtonClick={() => setForgotPassword((prev) => !prev)}
                loading={loading}
              />
              <Divider />
            </div>
            <p className="flex flex-col items-center  font-semibold justify-center">
              Vous êtes professionnel ?
              <Link
                href={"/"}
                className="underline text-primary-700 text-center w-fit flex items-center justify-start gap-2 cursor-pointer"
              >
                Devenir adhérent <FiArrowRight />{" "}
              </Link>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connexion;
