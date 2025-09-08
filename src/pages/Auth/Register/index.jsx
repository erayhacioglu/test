import toast from "react-hot-toast";
import { register, userSliceReset } from "../../../redux/slices/UserSlice";
import "../Login/login.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import logo from "../../../assets/img/kavio_logo.png";
import { Eye, EyeOff } from "lucide-react";
import { getValidationSchema } from "./registerValidation";

const Register = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector((state) => state.user);

  const [showPassword, setShowPassword] = useState(false);

  const { uniqueId } = useParams();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const { errors, values, handleSubmit, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        name: "",
        surname: "",
        email: "",
        password: "",
      },
      validationSchema: getValidationSchema,
      onSubmit: async (values) => {
        if (
          values?.email &&
          values?.password &&
          values?.name &&
          values?.surname
        ) {
          const res = await dispatch(
            register({ registerData: values, uniqueId })
          );
          if (res?.meta?.requestStatus === "fulfilled") {
            toast.success(`${t("auth.register.successMessage")}`);
            setTimeout(() => {
              window.location.href = `/auth/login?email=${values?.email}`;
            }, 2500);
          }
        }
      },
    });

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
    return () => {
      dispatch(userSliceReset());
    };
  }, [dispatch, isError, message, navigate]);

  return (
    <div className="auth_container">
      <div className="auth_logo">
        <img src={logo} alt="" className="auth_logo_img" />
      </div>
      <div className="auth_body register">
        <form className="auth_form" onSubmit={handleSubmit}>
          <div className="auth_form_header">
            <h3 className="auth_form_title">{t("auth.register.title")}</h3>
          </div>
          <div className="auth_form_body">
            <div className="auth_form_group">
              <label className="auth_form_label">
                {t("auth.register.nameLabel")}
              </label>
              <input
                type="text"
                className="auth_form_control"
                name="name"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.name}
              />
              {touched?.name && errors?.name && (
                <div className="auth_form_error">{errors?.name}</div>
              )}
            </div>
            <div className="auth_form_group">
              <label className="auth_form_label">
                {t("auth.register.surnameLabel")}
              </label>
              <input
                type="text"
                className="auth_form_control"
                name="surname"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.surname}
              />
              {touched?.surname && errors?.surname && (
                <div className="auth_form_error">{errors?.surname}</div>
              )}
            </div>
            <div className="auth_form_group">
              <label className="auth_form_label">
                {t("auth.register.emailLabel")}
              </label>
              <input
                type="text"
                className="auth_form_control"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values?.email}
              />
              {touched?.email && errors?.email && (
                <div className="auth_form_error">{errors?.email}</div>
              )}
            </div>
            <div className="auth_form_group">
              <label className="auth_form_label">
                {t("auth.register.passwordLabel")}
              </label>
              <div className="position-relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  className="auth_form_control"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values?.password}
                />
                <span
                  className="auth_form_icon_button"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </span>
              </div>
              {touched?.password && errors?.password && (
                <div className="auth_form_error">{errors?.password}</div>
              )}
            </div>
            <div className="d-flex align-items-center justify-content-end"></div>
            <button className="auth_form_button">
              {isLoading ? <Spinner /> : t("auth.register.submitText")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
