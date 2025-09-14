import * as Yup from "yup"

const contactValidationSchema = Yup.object().shape({
    nameSurname:Yup.string().required("Ad soyad alanı zorunludur"),
    email:Yup.string().required("E-Mail alanı zorunludur").email("Geçersiz email"),
    phone:Yup.string().required("telefon numarası alanı zorunludur"),
    note:Yup.string().required("Not alanı zorunludur"),
    agreementChecked: Yup.boolean()
    .oneOf([true], "Aydınlatma metnini onaylamanız gerekir"),
});

export default contactValidationSchema;