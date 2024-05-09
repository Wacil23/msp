import { schema } from "@/src/config/validations/Login";
import { Button, PasswordInput, TextInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { FormEvent } from "react";
import { CiAt } from "react-icons/ci";
import { PiPasswordLight } from "react-icons/pi";

export type Login = {
  email: string;
  password: string;
};

export type AuthFormProps = {
  formClass: string;
  buttonText: string;
  onSubmit: (data: Login) => void;
  linkText: string;
  onButtonClick: () => void;
  loading: boolean;
};

export default function AuthForm({
  formClass,
  buttonText,
  loading,
  onSubmit,
  linkText,
  onButtonClick,
}: AuthFormProps) {
  const form = useForm({
    initialValues: { email: "", password: "" },
    validate: yupResolver(schema),
    validateInputOnChange: true,
  });

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let validation = form.validate();
    if (!validation.hasErrors) {
      onSubmit(form.values);
    }
  };

  return (
    <form className={formClass} onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-3">
        <TextInput
          size="md"
          type="text"
          leftSection={<CiAt />}
          placeholder="Entrer votre adresse email"
          label="Email"
          withAsterisk
          {...form.getInputProps("email")}
        />
        <PasswordInput
          size="md"
          type="password"
          leftSection={<PiPasswordLight />}
          placeholder="Entrer votre mot de passe"
          label="Mot de passe"
          withAsterisk
          {...form.getInputProps("password")}
        />
      </div>
      <div className="flex flex-col gap-5">
        <Button type="submit" loading={loading}>
          {buttonText}
        </Button>
        <Button
          className="text-md underline underline-offset-2 w-fit font-medium text-center"
          variant="transparent"
          onClick={onButtonClick}
        >
          {linkText}
        </Button>
      </div>
    </form>
  );
}
