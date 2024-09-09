"use client";
import {
  ParametersPasswordSchema,
  Parameterschema,
} from "@/src/config/validations/Parameter";
import { UpdateMe } from "@/src/lib/services/users/Users";
import {
  Avatar,
  Blockquote,
  Button,
  FileButton,
  Skeleton,
  TextInput,
} from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import { signOut } from "next-auth/react";
import { useEffect } from "react";
import { FiCheck, FiEdit } from "react-icons/fi";
import { notifications } from "@mantine/notifications";
import { CgClose } from "react-icons/cg";
import PasswordForm from "@/src/components/_Root/parameters/password/password";
import { CiWarning } from "react-icons/ci";
import { UploadFiles } from "@/src/lib/services/files/Files";
import { useUserContextProvider } from "@/src/lib/providers/useUserProvider";
import { sleep } from "@directus/sdk";

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
  const { me, mutateMe, session, status, error, isLoading } =
    useUserContextProvider();
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
        email: me?.email ?? "",
        first_name: me?.first_name ?? "",
        last_name: me?.last_name ?? "",
        profession: me?.profession ?? "",
        telephone: me?.telephone ?? "",
      });
    }
  }, [me]);

  if (status === "unauthenticated") {
    notifications.show({
      message: "Veuillez vous reconnecté",
      title: "Vous avez été déconnecté",
      color: "orange",
    });
    signOut();

    return;
  }

  if (error)
    return (
      <div className="grid place-content-center place-items-center">
        Oops ... Il semble qu'il y a eu un petit problème veuillez réessayer
      </div>
    );

  if (!me || isLoading)
    return (
      <Skeleton className="m-10" animate>
        <div className="h-full rounded-md bg-primary/55 p-12">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold">Paramètres</h1>
              <h2>Modifiez vos paramètres de compte</h2>
            </div>
          </div>
          <div className="flex h-full gap-8 py-12">
            <div className="flex flex-col items-center gap-3"></div>
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
    const app = await UpdateMe(session?.acess_token!, updatedFields);
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
    mutateMe();
  };

  //Update password information
  const updatePassword = async () => {
    const updatedUser = formPassword.values;
    const app = await UpdateMe(session?.acess_token!, updatedUser);
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
    mutateMe();
    signOut();
  };

  //Update avatar
  const updateAvatar = async (event: File | null) => {
    const formData = new FormData();
    if (!event) return;

    formData.append("avatar", event);

    const result = await UploadFiles(session?.acess_token!, formData);
    if (result?.id) {
      const updatedUser = await UpdateMe(session?.acess_token!, {
        avatar: result.id,
      });
      if (updatedUser) {
        notifications.show({
          title: "Avatar changé",
          message: "Votre avatar a bien été modifié",
          autoClose: true,
          icon: <FiCheck />,
          color: "primary.1",
        });
        mutateMe();
      }
    } else {
      notifications.show({
        title: "Oops ...",
        message: "Il semblerait qu'il y ai eu une erreur, veuillez réessayer",
        autoClose: true,
        icon: <CgClose />,
        color: "red",
      });
    }
  };

  return (
    <div className="md:m-10">
      <div className="h-full rounded-md p-4 md:p-12">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-extrabold">Paramètres</h1>
            <h2>Modifiez vos paramètres de compte</h2>
          </div>
        </div>
        <div className="flex h-full flex-col gap-8 py-12 md:flex-row">
          <div className="flex flex-col items-center gap-3">
            <Avatar size={"5rem"} src={me?.avatar && directusUrl + me.avatar} />
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
          <div className="flex w-full flex-col gap-10">
            <form className="flex w-full flex-col gap-5">
              <h2 className="text-lg font-semibold">Générale</h2>
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
            <form className="flex w-full flex-col gap-5">
              <h2 className="text-lg font-semibold">Mot de passe</h2>
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
