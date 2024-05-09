"use client";
import {
  ParametersPasswordSchema,
  Parameterschema,
} from "@/src/config/validations/Parameter";
import { UpdateMe, getMe } from "@/src/lib/services/users/Users";
import {
  Avatar,
  Blockquote,
  Button,
  FileButton,
  PasswordInput,
  Skeleton,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { FiCheck, FiEdit } from "react-icons/fi";
import { Notifications, notifications } from "@mantine/notifications";
import useSWR, { useSWRConfig } from "swr";
import { CgClose } from "react-icons/cg";
import Password from "@/src/components/_Root/parameters/password/password";
import PasswordForm from "@/src/components/_Root/parameters/password/password";
import { CiWarning } from "react-icons/ci";
import { UploadFiles } from "@/src/lib/services/files/Files";

type FormGeneralValues = {
  email: string;
  first_name: string;
  last_name: string;
  profession?: string;
  telephone?: string;
};

export type FormPasswordValues = {
  password: string;
  passwordConfirm: string;
};

const Parametres = () => {
  const directusUrl = process.env.NEXT_PUBLIC_DIRECTUS_ASSETS;
  const [file, setFile] = useState<File | null>(null);
  const { data: user, status } = useSession();
  const fetcher = () => (user?.acess_token ? getMe(user.acess_token) : null);
  const { mutate } = useSWRConfig();
  const { data: me, error } = useSWR(
    user?.acess_token ? "users/me" : null,
    fetcher
  );

  const form = useForm<FormGeneralValues>({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      profession: "",
      telephone: "",
    },
    validate: yupResolver(Parameterschema),
    validateInputOnChange: true,
  });

  const formPassword = useForm<FormPasswordValues>({
    initialValues: {
      password: "",
      passwordConfirm: "",
    },
    validate: yupResolver(ParametersPasswordSchema),
    validateInputOnChange: true,
  });

  useEffect(() => {
    if (me) {
      form.setValues({
        email: me.email ?? "",
        first_name: me.first_name ?? "",
        last_name: me.last_name ?? "",
        profession: me.profession ?? "",
        telephone: me.telephone ?? "",
      });
    }
  }, [me]);

  if (status === "unauthenticated") {
    return (
      <div>
        <p>Vous avez été déconnecté...</p>
        <Button onClick={() => signOut()}>Se reconnecter</Button>
      </div>
    );
  }

  if (error)
    return (
      <div className="grid place-items-center place-content-center">
        Oops ... Il semble qu'il y a eu un petit problème veuillez réessayer
      </div>
    );

  if (!me)
    return (
      <Skeleton className="m-10" animate>
        <div className="p-12  rounded-md bg-primary/55 h-full">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="font-extrabold text-2xl">Paramètres</h1>
              <h2>Modifiez vos paramètres de compte</h2>
            </div>
          </div>
          <div className="py-12 flex gap-8 h-full">
            <div className="flex flex-col gap-3 items-center"></div>
          </div>
        </div>
      </Skeleton>
    );

  //Update général informations
  const updateGeneral = async () => {
    const updatedUser = form.values;
    const updatedFields: Partial<FormGeneralValues> = {};
    Object.keys(updatedUser).forEach((key) => {
      const field = key as keyof FormGeneralValues;
      if (me[field] !== updatedUser[field]) {
        updatedFields[field] = updatedUser[field];
      }
    });
    const app = await UpdateMe(user?.acess_token!, updatedFields);
    if (app) {
      notifications.show({
        title: "Profile modifié",
        message: "Vos nouvelles informations ont bien été modifié",
        autoClose: true,
        icon: <FiCheck />,
        color: "teal",
      });
    } else {
      notifications.show({
        title: "Oops ...",
        message: "Il semblerait qu'il y ai eu une erreur, veuillez réessayer",
        autoClose: true,
        icon: <CgClose />,
        color: "red",
      });
    }
    mutate("users/me", fetcher);
  };

  //Update password information
  const updatePassword = async () => {
    const updatedUser = formPassword.values;
    const app = await UpdateMe(user?.acess_token!, updatedUser);
    if (app) {
      notifications.show({
        title: "Mot de passe modifié",
        message: "Votre mot de passe a bien été modifié",
        autoClose: true,
        icon: <FiCheck />,
        color: "teal",
      });
    } else {
      notifications.show({
        title: "Oops ...",
        message: "Il semblerait qu'il y ai eu une erreur, veuillez réessayer",
        autoClose: true,
        icon: <CgClose />,
        color: "red",
      });
    }
    mutate("users/me", fetcher);
    signOut();
  };

  //Update avatar
  const updateAvatar = async (event: File | null) => {
    const formData = new FormData();
    if (!event) return;
    formData.append("avatar", event);
    const result = await UploadFiles(user?.acess_token!, formData);
    await UpdateMe(user?.acess_token!, {
      avatar: result.id,
    });
    mutate("users/me", fetcher);
  };
  console.log(user?.user.avatar);
  return (
    <div className="md:m-10">
      <Notifications position="top-right" />
      <div className="md:p-12 p-4  rounded-md bg-primary/55 h-full">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="font-extrabold text-2xl">Paramètres</h1>
            <h2>Modifiez vos paramètres de compte</h2>
          </div>
        </div>
        <div className="py-12 flex flex-col md:flex-row gap-8 h-full">
          <div className="flex flex-col gap-3 items-center">
            <Avatar
              size={"5rem"}
              src={user?.user.avatar && directusUrl + user.user.avatar}
            />
            <FileButton
              onChange={(event) => updateAvatar(event)}
              accept="image/png,image/jpeg, image/avif, image/svg"
            >
              {(props) => (
                <Button
                  variant="transparent"
                  leftSection={<FiEdit />}
                  color="green"
                  {...props}
                >
                  Modifier ma photo de profile
                </Button>
              )}
            </FileButton>
          </div>
          <div className="flex flex-col gap-10 w-full">
            <form className="w-full flex flex-col gap-5">
              <h2 className="font-semibold text-lg">Générale</h2>
              <div className="flex gap-4">
                <TextInput
                  className="w-full"
                  label="Prénom"
                  {...form.getInputProps("first_name")}
                />
                <TextInput
                  className="w-full"
                  label="Nom"
                  {...form.getInputProps("last_name")}
                />
              </div>
              <TextInput label="Email" {...form.getInputProps("email")} />
              <TextInput
                label="Profession"
                {...form.getInputProps("profession")}
              />
              <TextInput
                label="Numéro de téléphone"
                {...form.getInputProps("telephone")}
              />
              <Button
                disabled={
                  form.isTouched() && form.isDirty() && form.isValid()
                    ? false
                    : true
                }
                onClick={updateGeneral}
              >
                Enregistrer les modifications
              </Button>
            </form>
            <form className="w-full flex flex-col gap-5">
              <h2 className="font-semibold text-lg">Mot de passe</h2>
              <Blockquote
                color="orange"
                radius="md"
                icon={<CiWarning size={30} />}
                iconSize={40}
                mt="sm"
              >
                Attention ! Après la modification de votre mot de passe vous
                serez déconnecter... <br /> Vous devrez vous reconnecter pour
                continuer
              </Blockquote>
              <PasswordForm formPassword={formPassword} />
              <Button
                disabled={
                  formPassword.isTouched() &&
                  formPassword.isDirty() &&
                  formPassword.isValid()
                    ? false
                    : true
                }
                onClick={updatePassword}
              >
                Enregistrer mon nouveau mot de passe
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Parametres;
