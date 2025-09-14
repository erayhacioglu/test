import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import "./contact_modal.scss";
import { useFormik } from "formik";
import contactValidationSchema from "./contactValidationSchema";
import Axios from "../../api/axiosInstance";
import {toast} from "react-hot-toast";
import { useParams } from "react-router";

const ContactModal = ({ contactModal, setContactModal }) => {
  const { id } = useParams();
  const {
    values,
    handleSubmit,
    handleChange,
    handleBlur,
    errors,
    touched,
    setValues,
    setFieldValue,
  } = useFormik({
    initialValues: {
      nameSurname: "",
      email: "",
      phone: "",
      note: "",
      agreementChecked: false,
    },
    validationSchema: contactValidationSchema,
    onSubmit: (values) => {
      handleOnSubmit(values);
    },
  });

  const clearModal = () => {
    setValues({
      nameSurname: "",
      email: "",
      phone: "",
      note: "",
      agreementChecked: false,
    });
    setContactModal(false);
  };

  const handleOnSubmit = async (values) => {
    try {
      const res = await Axios.post(`/guest-contact/${id}/send-message`, values);
      if(res?.status === 200){
        toast.success("Mesaj başarıyla gönderildi");
        clearModal();
        window.location.reload();
      }
    } catch (error) {
        console.log('error', error)
      const msg =
        error?.response?.data?.detail ||
        "Mesaj gönderimi sırasında beklenmeyen bir hata oluştu.";
      toast.error(msg);
    }
  };

  return (
    <Modal
      centered
      show={contactModal}
      onHide={() => setContactModal(false)}
      contentClassName="contact_modal"
      size="lg"
    >
      <ModalHeader closeButton>
        <ModalTitle>İletişim</ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="contact_modal_container">
          <div className="contact_form_row">
            <div className="contact_form_group full_width">
              <label className="contact_form_label">Ad Soyad</label>
              <input
                type="text"
                className="contact_form_control"
                name="nameSurname"
                value={values?.nameSurname}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched?.nameSurname && errors?.nameSurname && (
                <div className="contact_invalid_message">
                  {errors?.nameSurname}
                </div>
              )}
            </div>

            <div className="contact_form_group">
              <label className="contact_form_label">E-Mail</label>
              <input
                type="text"
                className="contact_form_control"
                name="email"
                value={values?.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched?.email && errors?.email && (
                <div className="contact_invalid_message">{errors?.email}</div>
              )}
            </div>

            <div className="contact_form_group">
              <label className="contact_form_label">Telefon Numarası</label>
              <input
                type="text"
                className="contact_form_control"
                name="phone"
                value={values?.phone}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched?.phone && errors?.phone && (
                <div className="contact_invalid_message">{errors?.phone}</div>
              )}
            </div>
            <div className="contact_form_group full_width">
              <label className="contact_form_label">Mesaj</label>
              <textarea
                className="contact_form_control textarea"
                name="note"
                value={values?.note}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched?.note && errors?.note && (
                <div className="contact_invalid_message">{errors?.note}</div>
              )}
            </div>
            <div className="contact_form_group full_width">
              <div className="custom_checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={values?.agreementChecked}
                    onChange={(e) =>
                      setFieldValue("agreementChecked", e.target.checked)
                    }
                  />
                  <span className="checkbox_label">
                    Aydınlatma metnini okudum ve onaylıyorum.
                  </span>
                </label>
              </div>
              {touched?.agreementChecked && errors?.agreementChecked && (
                <div className="contact_invalid_message">
                  {errors?.agreementChecked}
                </div>
              )}
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <div className="modal_footer_button_groups">
          <button className="contact_modal_btn cancel_btn" onClick={clearModal}>
            İptal
          </button>
          <button
            className="contact_modal_btn"
            type="button"
            onClick={handleSubmit}
          >
            Gönder
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
};

export default ContactModal;
