import { FormPasswordValues } from "@/src/app/(dashboard)/dashboard/parametres/page";
import { PasswordInput } from "@mantine/core";
import { UseFormReturnType, useForm, yupResolver } from "@mantine/form";
import React from "react";

interface PasswordFormProps {
  formPassword: UseFormReturnType<FormPasswordValues>;
}

const PasswordForm: React.FC<PasswordFormProps> = ({ formPassword }) => {
  return (
    <>
      <PasswordInput
        type="password"
        label="Nouveau mot de passe"
        {...formPassword.getInputProps("password")}
        placeholder="Entrer votre mot de passe"
      />
      <PasswordInput
        type="password"
        label="Confirmez votre nouveau mot de passe"
        {...formPassword.getInputProps("passwordConfirm")}
        placeholder="Répétez votre mot de passe"
      />
    </>
  );
};

export default PasswordForm;
