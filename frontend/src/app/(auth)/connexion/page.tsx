"use client";
import AuthForm from "@/src/components/_Root/form/AuthForm";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import React from "react";
import { FiArrowLeft, FiInfo } from "react-icons/fi";
import Image from "next/image";
import LoginImg from "../../../../public/images/Doctor-pana.svg";
import SnackBar, { SnackType } from "@/src/components/_Root/snackbar/snackbar";
import { Blockquote, Button, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { EmailValidation } from "@/src/config/validations/Login";
import { passwordRequest } from "@directus/sdk";
import { directus } from "@/src/lib/directus";
import { notifications } from "@mantine/notifications";

type LoginCredentials = {
  email: string;
  password: string;
};

const Connexion = () => {
  const router = useRouter();
  const url = process.env.NEXT_PUBLIC_URL;
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [forgotPassword, setForgotPassword] = React.useState(false);
  const requestPasswordResetForm = useForm({
    initialValues: { email: "" },
    validate: yupResolver(EmailValidation),
    validateInputOnChange: true,
  });

  const { value: email } = requestPasswordResetForm.getInputProps("email");

  const handleFormSubmit = async (data: LoginCredentials) => {
    setLoading(true);
    try {
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
    } catch (e) {
      console.error("Une erreur est surevenue lors de la connexion", e);
    }
  };

  const handleRequestPasswordReset = async (email: string) => {
    setLoading(true);
    const api = directus();
    try {
      if (email === "") {
        setError("Entrez un email");
        return;
      }
      await api.request(passwordRequest(email, url + "/mot-de-passe-oublie"));
      setLoading(false);
      setError("");
      notifications.show({
        message: "Un email vous a été envoyé",
        title: "Email envoyé",
        color: "primary.1",
      });
      router.replace("/");
    } catch (e) {
      console.error("Une erreur est surevenue", e);
    }
  };

  return (
    <div className="h-dvh md:p-4 lg:flex">
      <div className="bg-primary-200 hidden rounded-xl lg:flex lg:w-3/5 xl:w-2/5">
        <Image className="mx-auto" src={LoginImg} alt="Image connexion" />
      </div>
      {forgotPassword ? (
        <div className="flex h-full w-full flex-col lg:w-3/4">
          <Link
            className="flex items-center gap-2 pl-8 pt-5 font-semibold text-darker"
            href={"/"}
          >
            <FiArrowLeft /> Revenir à l'acceuil
          </Link>
          <div className="my-auto px-10 py-5 md:m-auto md:rounded-lg md:px-20 md:shadow md:shadow-slate-100">
            <h1 className="group mb-5 text-center text-xl font-bold text-darker md:text-4xl">
              Mot de passe oublié
            </h1>
            <div className="flex flex-col gap-5">
              <Blockquote
                color="primary.1"
                radius="md"
                icon={<FiInfo size={30} />}
                iconSize={40}
                mt="xl"
              >
                Si votre email est connu de notre base de donnée, vous recevrez
                un mail pour réinitialiser votre mot de passe.
              </Blockquote>
              {error && (
                <SnackBar
                  message={error}
                  title="Une erreur est survenue..."
                  type={SnackType.Danger}
                />
              )}
            </div>
            <form>
              <div className="my-4 flex flex-col gap-6 py-5">
                <TextInput
                  label="Votre email"
                  type="email"
                  withAsterisk
                  name="email"
                  required
                  placeholder="Votre email de connexion"
                  {...requestPasswordResetForm.getInputProps("email")}
                />
                <Button
                  loading={loading}
                  onClick={() => handleRequestPasswordReset(email)}
                >
                  Réinitialiser mon mot de passe
                </Button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="mx-auto flex flex-col gap-16">
          <Link
            className="flex items-center gap-2 pl-8 pt-5 font-semibold text-darker"
            href={"/"}
          >
            <FiArrowLeft /> Revenir à l'acceuil
          </Link>
          <div className="m-auto px-10 py-5 md:mx-12 md:rounded-lg md:px-20 md:shadow md:shadow-slate-100">
            <h1 className="mb-5 text-center text-xl font-bold text-darker md:text-4xl">
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

            <div className="my-4 flex flex-col gap-6 py-5 md:my-8">
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Connexion;
