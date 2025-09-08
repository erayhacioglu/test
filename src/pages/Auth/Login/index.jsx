import toast from "react-hot-toast";
import {
  getUserInfo,
  login,
  userSliceReset,
} from "../../../redux/slices/UserSlice";
import "./login.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";
import { getValidationSchema } from "./loginValidation";
import { useFormik } from "formik";
import logo from "../../../assets/img/kavio_logo.png";
import { Eye, EyeOff } from "lucide-react";
import { Spinner } from "react-bootstrap";

const customLoginMessage = {
  tr: {
    success: {
      loginSuccessMessage: "Giriş İşlemi Başarılı",
    },
  },
  en: {
    success: {
      loginSuccessMessage: "Login Successful",
    },
  },
};

const Login = () => {
  const dispatch = useDispatch();
  const { isLoading, isError, message } = useSelector(
    (state) => state.user
  );


  const location = useLocation;

  const from = location.state?.from?.pathname || "/";

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const [showPassword,setShowPassword] = useState(false);

  const [searchParams] = useSearchParams();
  const emailFromUrl = searchParams.get("email");

  const { errors, values, handleSubmit, touched, handleBlur, handleChange } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        email: emailFromUrl || "",
        password: "",
      },
      validationSchema: getValidationSchema,
      onSubmit: async (values) => {
        
          if (values?.email && values?.password) {
          const loginRes = await dispatch(login(values)).unwrap();
          if (loginRes?.accessToken) {
            toast.success(
        `${customLoginMessage[i18n?.language]?.success?.loginSuccessMessage}`
      );
            await dispatch(getUserInfo());
            navigate(from || "/", { replace: true });
          }
        }
      },
    });

  useEffect(() => {
    if (isError && message) {
      toast.error(message);
    }
  }, [isError, message]);

  useEffect(() => {
    return () => {
      dispatch(userSliceReset());
    };
  }, [dispatch]);


  return (
    <div className="auth_container">
      <div className="auth_logo">
        <img src={logo} alt="" className="auth_logo_img" />
      </div>
      <div className="auth_body">
        <form className="auth_form" onSubmit={handleSubmit}>
          <div className="auth_form_header">
            <h3 className="auth_form_title">{t("auth.login.title")}</h3>
            <h6 className="auth_form_subtitle">
              {t("auth.login.subtitle")}
            </h6>
          </div>
          <div className="auth_form_body">
            <div className="auth_form_group">
              <label className="auth_form_label">{t("auth.login.emailLabel")}</label>
              <input type="text" className="auth_form_control" name="email" onBlur={handleBlur} onChange={handleChange} value={values?.email}/>
              {
                touched?.email && errors?.email && 
              <div className="auth_form_error">{errors?.email}</div>
              }
            </div>
            <div className="auth_form_group">
              <label className="auth_form_label">{t("auth.login.passwordLabel")}</label>
              <div className="position-relative">
              <input type={`${showPassword ? "text":"password"}`} className="auth_form_control" name="password" onBlur={handleBlur} onChange={handleChange} value={values?.password}/>
              <span className="auth_form_icon_button" onClick={() => setShowPassword(prev => !prev)}>{showPassword ? <EyeOff size={18}/> : <Eye size={18}/>}</span>
              </div>
              {
                touched?.password && errors?.password && 
              <div className="auth_form_error">{errors?.password}</div>
              }
            </div>
            <div className="d-flex align-items-center justify-content-end">
              <Link to="/" className="auth_form_link">{t("auth.login.forgotPasswordText")}</Link>
            </div>
            <button className="auth_form_button" disabled={isLoading}>{isLoading ? <Spinner /> : t("auth.login.submitText")}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
