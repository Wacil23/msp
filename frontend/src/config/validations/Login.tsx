import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .required("Votre email est requis")
    .email("Votre email est invalide"),
});

export { schema };
