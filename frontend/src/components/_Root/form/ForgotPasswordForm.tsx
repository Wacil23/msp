import { ForgotPasswordSchema } from "@/src/config/validations/ForgotPassword";
import { Button, PasswordInput } from "@mantine/core";
import { useForm, yupResolver } from "@mantine/form";
import React, { FormEvent } from "react";
import { PiPasswordLight } from "react-icons/pi";

export type Passwords = {
  password: string;
  passwordConfirm: string;
};

export type ForgotPasswordFormProps = {
  formClass: string;
  buttonText: string;
  onSubmit: (data: Passwords) => void;
  loading: boolean;
};

export default function ForgotPasswordForm({
  formClass,
  buttonText,
  loading,
  onSubmit,
}: ForgotPasswordFormProps) {
  const form = useForm({
    initialValues: { password: "", passwordConfirm: "" },
    validate: yupResolver(ForgotPasswordSchema),
    validateInputOnChange: true,
  });
  const { isValid, validate } = form;
  const [disabled, setDisabled] = React.useState(true);

  React.useEffect(() => {
    const formValid = isValid();
    if (formValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [isValid]);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(form.values);
  };

  return (
    <form className={formClass} onSubmit={handleFormSubmit}>
      <div className="flex flex-col gap-3">
        <PasswordInput
          size="md"
          type="password"
          leftSection={<PiPasswordLight />}
          label="Votre nouveau mot de passe"
          withAsterisk
          {...form.getInputProps("password")}
        />
        <PasswordInput
          size="md"
          type="password"
          leftSection={<PiPasswordLight />}
          label="Confirmer votre mot de passe"
          withAsterisk
          {...form.getInputProps("passwordConfirm")}
        />
      </div>
      <div className="flex flex-col gap-5">
        <Button disabled={disabled} type="submit" loading={loading}>
          {buttonText}
        </Button>
      </div>
    </form>
  );
}
