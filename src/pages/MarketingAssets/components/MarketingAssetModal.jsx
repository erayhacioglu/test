import { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Spinner,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import plus from "../../../assets/img/icons/plus.svg";
import cardBackground from "../../../assets/img/marketing_assets_background.jpg";
import { useDispatch, useSelector } from "react-redux";
import useWindowSize from "../../../hooks/useWindow";
import { FaCheck } from "react-icons/fa6";
import toast from "react-hot-toast";
import Axios from "../../../api/axiosInstance";
import { getMarketingAssetsData } from "../../../redux/slices/MarketingAssetsSlice";

const MarketingAssetModal = ({ showModal, setShowModal }) => {
  const { t, i18n } = useTranslation();
  const { width } = useWindowSize();
  const [loading,setLoading] = useState(false);

  const {user} = useSelector(state => state.user);

  const cardId = user?.cardId;

  const dispatch = useDispatch();
  const [modalData, setModalData] = useState({
    coverPhoto: null,
    url: null,
    name: `${i18n.language === "tr" ? "Örnek Başlık" : "Sample Title"}`,
  });

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    setModalData((prev) => ({ ...prev, coverPhoto: file }));
  };

  const handleChangeUrl = (e) => {
    const file = e.target.files[0];
    setModalData((prev) => ({ ...prev, url: file }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", modalData?.name);
      formData.append("url", modalData?.url);
      formData.append("coverPhoto", modalData?.coverPhoto);
      formData.append("cardId", cardId);
      const res = await Axios.post(`/catalogs`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (res?.status === 200) {
        toast.success("Katalog oluşturuldu");
        setModalData({
          coverPhoto: null,
          url: null,
          name: `${i18n.language === "tr" ? "Örnek Başlık" : "Sample Title"}`,
        });
        setShowModal(false);
        dispatch(getMarketingAssetsData({ cardId }));
      }
    } catch (error) {
      const msg =
        error?.response?.data?.message || "Katalog oluşturulurken hata oluştu";
      toast.error(msg);
    }finally{
      setLoading(false);
    }
  };

  return (
    <Modal
      centered
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
      className="marketing_asset_modal"
    >
      <ModalHeader closeButton>
        <ModalTitle>
          {t("marketingAssetsPage.marketingAssetsModalTitle")}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="marketing_assets_modal_body">
          <div className="configure">
            <div className="configure_input_group">
              <div className="configure_label">
                {t("marketingAssetsPage.marketingAssetsModalLabel")}
              </div>
              <input
                type="text"
                className="configure_input"
                value={modalData?.name}
                maxLength={50}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <span
                className={`configure_size ${
                  modalData?.name?.length === 50 ? "max_size" : ""
                }`}
              >
                {modalData?.name?.length ?? 0}/50
              </span>
            </div>
            <div className="configure_documents">
              <label htmlFor="coverPhoto" className="document">
                <input
                  type="file"
                  accept="*"
                  className="d-none"
                  id="coverPhoto"
                  onChange={handleChangePhoto}
                />
                {width > 768 ? (
                  <div className="add_document_desktop_body">
                    <div className="add_document_button">
                      <div className="circle_plus">
                        <img src={plus} alt="" />
                      </div>
                      <span>
                        {t(
                          "marketingAssetsPage.marketingAssetsModalCoverPhotoButtonText"
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="add_document_mobile_body">
                    {modalData?.coverPhoto ? (
                      <>
                        <span>{modalData?.coverPhoto?.name}&nbsp;</span>
                        <FaCheck color="#70C094" size={18} />
                      </>
                    ) : (
                      <span>
                        {t(
                          "marketingAssetsPage.marketingAssetsModalCoverPhotoButtonText"
                        )}
                      </span>
                    )}
                  </div>
                )}
              </label>
              <label htmlFor="url" className="document">
                <input
                  type="file"
                  accept="*"
                  className="d-none"
                  id="url"
                  onChange={handleChangeUrl}
                />
                {width > 768 ? (
                  <div className="add_document_desktop_body">
                    <div className="add_document_button">
                      <div className="circle_plus">
                        <img src={plus} alt="" />
                      </div>
                      <span>
                        {t(
                          "marketingAssetsPage.marketingAssetsModalPdfButtonText"
                        )}
                      </span>
                    </div>
                  </div>
                ) : (
                  <div className="add_document_mobile_body">
                    {modalData?.url ? (
                      <>
                        <span>{modalData?.url?.name}&nbsp;</span>
                        <FaCheck color="#70C094" size={18} />
                      </>
                    ) : (
                      <span>
                        {t(
                          "marketingAssetsPage.marketingAssetsModalPdfButtonText"
                        )}
                      </span>
                    )}
                  </div>
                )}
              </label>
            </div>
          </div>
          <div className="preview">
            <div className="preview_card">
              <div className="preview_card_header">
                <img
                  src={
                    modalData?.coverPhoto
                      ? URL.createObjectURL(modalData?.coverPhoto)
                      : cardBackground
                  }
                  alt=""
                />
              </div>
              <div className="preview_card_content">{modalData?.name}</div>
            </div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="marketing_asset_cancel_btn"
          onClick={() => {
            setShowModal(false);
            setModalData({
              coverPhoto: null,
              url: null,
              name: `${
                i18n.language === "tr" ? "Örnek Başlık" : "Sample Title"
              }`,
            });
          }}
          disabled={loading}
        >
          {t("buttons.cancelButtonText")}
        </button>
        <button className="marketing_asset_submit_btn" onClick={handleSubmit} disabled={loading}>
          {
            loading ? <Spinner /> : 
          t("buttons.submitButtonText")
          }
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default MarketingAssetModal;
