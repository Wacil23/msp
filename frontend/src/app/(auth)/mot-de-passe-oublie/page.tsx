"use client";
import React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import Image from "next/image";
import LoginImg from "../../../../public/images/Doctor-pana.svg";
import SnackBar, { SnackType } from "@/src/components/_Root/snackbar/snackbar";
import ForgotPasswordForm from "@/src/components/_Root/form/ForgotPasswordForm";
import { passwordReset } from "@directus/sdk";
import { directus } from "@/src/lib/directus";
import { notifications } from "@mantine/notifications";

type Credentials = {
  password: string;
  passwordConfirm: string;
};
const ForgotPassword = () => {
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const tokenUrl = params.get("token");

  const handleFormSubmit = async (data: Credentials) => {
    const api = directus();
    setLoading(true);
    try {
      setError("");

      if (!tokenUrl) {
        throw Error("Le token est expiré");
      }

      await api.request(passwordReset(tokenUrl, data.password));

      setLoading(false);
      notifications.show({
        message: "Votre mot de passe a été réinitialisé avec succes.",
        title: "Mot de passe réinitialisé",
        color: "primary.1",
      });
      router.replace("/");
    } catch (error) {
      console.error("Erreur lors de la réinitialisation du mot de passe");
      setLoading(false);
      setError("Veuillez réessayer dans quelques minutes");
    }
  };

  return (
    <div>
      <div className="h-dvh md:p-4 lg:flex">
        <div className="bg-primary-200 hidden rounded-xl lg:flex lg:w-3/5 xl:w-2/5">
          <Image className="mx-auto" src={LoginImg} alt="Image connexion" />
        </div>
        <div className="mx-auto flex flex-col gap-16">
          <Link
            className="flex items-center gap-2 pl-8 pt-5 font-semibold text-darker"
            href={"/"}
          >
            <FiArrowLeft /> Revenir à l'acceuil
          </Link>
          <div className="m-auto px-10 py-5 md:mx-12 md:rounded-lg md:px-20 md:shadow md:shadow-slate-100">
            <h1 className="mb-5 text-center text-xl font-bold text-darker md:text-4xl">
              Nouveau mot de passe
            </h1>
            <div className="my-4 flex flex-col gap-6 py-5 md:my-8">
              {error && (
                <SnackBar
                  message={error}
                  title="Une erreur est survenue..."
                  type={SnackType.Danger}
                />
              )}
              <ForgotPasswordForm
                formClass="flex flex-col gap-7"
                onSubmit={handleFormSubmit}
                buttonText="Réinitialiser mon mot de passe"
                loading={loading}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
