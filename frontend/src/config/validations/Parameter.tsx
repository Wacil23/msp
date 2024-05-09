import * as yup from "yup";

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const Parameterschema = yup.object().shape({
  email: yup
    .string()
    .required("Votre email est requis")
    .email("Votre email est invalide"),

  first_name: yup
    .string()
    .min(2, "Votre prénom doit avoir au moins 2 caractères")
    .required("Veuillez saisir votre prénom"),
  last_name: yup
    .string()
    .min(2, "Votre mot de passe doit avoir au moins 2 caractères")
    .required("Veuillez saisir votre nom"),
  profession: yup
    .string()
    .min(2, "Votre profession doit avoir au moins 2 caractères")
    .required("Veuillez saisir votre profession"),
  telephone: yup
    .string()
    .nullable()
    .matches(phoneRegExp, "Veuillez saisir un numéro de téléphone valide"),
});

const ParametersPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .min(8, "Votre mot de passe doit avoir au moins 8 caractères")
    .matches(/[0-9]/, "Votre mot de passe doit avoir au moins 1 chiffre")
    .matches(/[A-Z]/, "Votre mot de passe doit avoir au moins 1 majuscule")
    .matches(/[a-z]/, "Votre mot de passe doit avoir au moins 1 minuscule")
    .required("Veuillez entrer votre mot de passe"),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref("password")], "Vos mots de passe ne correspondent pas"),
});

export { Parameterschema, ParametersPasswordSchema };
