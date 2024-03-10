import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Votre email est requis")
    .email("Votre email est invalide"),
  password: yup
    .string()
    .min(8, "Votre mot de passe doit avoir au moins 8 caractères")
    .matches(/[0-9]/, "Votre mot de passe doit avoir au moins 1 chiffre")
    .matches(/[A-Z]/, "Votre mot de passe doit avoir au moins 1 majuscule")
    .matches(/[a-z]/, "Votre mot de passe doit avoir au moins 1 minuscule")
    .required("Veuillez entrer votre mot de passe"),
});

export { schema };
