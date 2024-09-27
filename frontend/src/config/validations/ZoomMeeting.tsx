import * as yup from "yup";

const ZoomMeetingValidation = yup.object().shape({
  title: yup
    .string()
    .min(2, "2 caractères minimum")
    .required("Un titre est requis"),
  participants: yup
    .array()
    .min(1, "Au moins un membre est requis")
    .required("Le champ participants est requis"),
});

export { ZoomMeetingValidation };
