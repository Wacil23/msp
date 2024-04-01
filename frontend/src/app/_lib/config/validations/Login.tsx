import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Votre email est requis")
    .email("Votre email est invalide"),
  name: yup
    .string()
    .min(2, "Votre nom doit avoir au moins 2 lettres")
    .required("Veuillez entrer votre nom"),
  password: yup
    .string()
    .min(8, "Votre mot de passe doit avoir au moins 8 caractères")
    .required("Veuillez entrer votre mot de passe"),
});

export { schema };
