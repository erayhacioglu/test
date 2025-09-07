import toast from "react-hot-toast";
import {
  register,
  userSliceReset,
} from "../../../redux/slices/UserSlice";
import "../Login/login.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useNavigate, useParams } from "react-router";
import { useTranslation } from "react-i18next";
// import { getValidationSchema } from "./registerValidation";
import { useFormik } from "formik";

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
const Register = () => {
    const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message, user } = useSelector(
    (state) => state.user
  );

  const {uniqueId} = useParams();

  const navigate = useNavigate();

  const { t, i18n } = useTranslation();

  const { errors, values, handleSubmit, touched, handleBlur, handleChange } =
    useFormik({
      initialValues: {
        name:"",
        surname:"",
        email: "",
        password: "",
      },
    //   validationSchema: getValidationSchema,
      onSubmit: async (values) => {
        if (values?.email && values?.password && values?.name && values?.surname) {
          const res = await dispatch(register({registerData:values,uniqueId}));
          if(res?.meta?.requestStatus === "fulfilled"){
            toast.success("Kart tanımlama işlemi başarıyla tamamlandı.Artık hesabınıza giriş yapabilirsiniz.");
            setTimeout(() => {
                window.location.href = "/auth/login";
            },2500)
          }
        }
      },
    });

  useEffect(() => {
    if (isSuccess && user) {
      toast.success(
        `${customLoginMessage[i18n?.language]?.success?.loginSuccessMessage}`
      );
      navigate("/");
    }
    if (isError && message) {
      toast.error(message);
    }
    return () => {
      dispatch(userSliceReset());
    };
  }, [dispatch, isSuccess, isError, message, navigate, i18n?.language, user]);

  return (
    <div className="login_container">
      <div className="card">
        <div className="card-header">
          <h5 className="card-title text-center">Kayıt</h5>
        </div>
        <div className="card-body">
          <div className="form-group">
            <label className="form-label d-block">Ad</label>
            <input
              type="text"
              className="border w-100 p-1"
              name="name"
              value={values?.name}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          {/* {touched?.email && errors?.email && (
            <div className="text-danger">{errors?.email}</div>
          )} */}
          <div className="form-group">
            <label className="form-label d-block">Soyad</label>
            <input
              type="text"
              className="border w-100 p-1"
              name="surname"
              value={values?.surname}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          {/* {touched?.email && errors?.email && (
            <div className="text-danger">{errors?.email}</div>
          )} */}
          <div className="form-group">
            <label className="form-label d-block">E-Posta</label>
            <input
              type="text"
              className="border w-100 p-1"
              name="email"
              value={values?.email}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          {touched?.email && errors?.email && (
            <div className="text-danger">{errors?.email}</div>
          )}
          <div className="form-group mt-2">
            <label className="form-label">Şifre</label>
            <input
              type="password"
              className="border w-100 p-1"
              name="password"
              value={values?.password}
              onBlur={handleBlur}
              onChange={handleChange}
            />
          </div>
          {touched?.password && errors?.password && (
            <div className="text-danger">{errors?.password}</div>
          )}
          <button className="btn btn-sm btn-success w-100 mt-3" onClick={handleSubmit}>
            Kayıt Ol
          </button>
        </div>
      </div>
    </div>
  )
}

export default Register