import * as Yup from "yup";
import i18next from "../../../i18n";

export const getValidationSchema = () =>
  Yup.object().shape({
    name:Yup.string().required(i18next.t("auth.register.validation.required_name")),
    surname:Yup.string().required(i18next.t("auth.register.validation.required_surname")),
    email: Yup.string()
      .required(i18next.t("auth.register.validation.required_email"))
      .email(i18next.t("auth.register.validation.invalid_email")),
    password: Yup.string().required(
      i18next.t("auth.register.validation.required_password")
    ),
  });