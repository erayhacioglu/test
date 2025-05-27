import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
} from "react-bootstrap";
import { useTranslation } from "react-i18next";
import plus from "../../../assets/img/icons/plus.svg";
import cardBackground from "../../../assets/img/marketing_assets_background.jpg";
import { useDispatch, useSelector } from "react-redux";
import { setMarketingAssetsData } from "../../../redux/slices/MarketingAssetsSlice";
import useWindowSize from "../../../hooks/useWindow";
import { FaCheck } from "react-icons/fa6";

const MarketingAssetModal = ({ showModal, setShowModal }) => {
  const { t, i18n } = useTranslation();
  const { width } = useWindowSize();
  const dispatch = useDispatch();
  const { marketingAssetsData } = useSelector((state) => state.marketingAssets);
  const [modalData, setModalData] = useState({
    coverPhoto: null,
    pdf: null,
    title: `${i18n.language === "tr" ? "Örnek Başlık" : "Sample Title"}`,
  });

  console.log("modalData", modalData);

  const handleChangePhoto = (e) => {
    const file = e.target.files[0];
    setModalData((prev) => ({ ...prev, coverPhoto: file }));
  };

  const handleChangePdf = (e) => {
    const file = e.target.files[0];
    setModalData((prev) => ({ ...prev, pdf: file }));
  };

  const handleSubmit = () => {
    dispatch(
      setMarketingAssetsData([
        ...marketingAssetsData,
        {
          id: marketingAssetsData?.length + 1,
          coverPhoto: modalData.coverPhoto,
          pdf: modalData.pdf,
          title: modalData.title,
        },
      ])
    );
    setModalData({
      coverPhoto: null,
      pdf: null,
      title: `${i18n.language === "tr" ? "Örnek Başlık" : "Sample Title"}`,
    });
    setShowModal(false);
  };

  return (
    <Modal
      centered
      size="lg"
      show={showModal}
      onHide={() => setShowModal(false)}
    >
      <ModalHeader closeButton>
        <ModalTitle>
          {t("marketingAssetsPage.marketingAssetsModalTitle")}
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <div className="marketing_asset_body">
          <div className="marketing_asset_configure">
            <div className="configure_input_group">
              <label className="configure_label">
                {t("marketingAssetsPage.marketingAssetsModalLabel")}
              </label>
              <input
                type="text"
                className="configure_input"
                maxLength={54}
                value={modalData?.title}
                onChange={(e) =>
                  setModalData((prev) => ({ ...prev, title: e.target.value }))
                }
              />
              <span
                className={`configure_input_group_size ${
                  modalData?.title?.length === 54 ? "max_size" : ""
                }`}
              >
                {modalData?.title?.length > 0 ? modalData?.title?.length : 0}/54
              </span>
            </div>
            {width > 768 ? (
              <>
                <div className="configure_add_btn photo-button">
                  <input
                    type="file"
                    accept="image/*"
                    id="photo-button"
                    className="d-none"
                    onChange={handleChangePhoto}
                  />
                  <label
                    htmlFor="photo-button"
                    className="marketing_assets_button"
                    onClick={() => setShowModal(true)}
                  >
                    <div className="marketing_assets_circle">
                      <img
                        src={plus}
                        alt=""
                        className="marketing_assets_circle_img"
                      />
                    </div>
                    <span className="marketing_assets_text">
                      {t(
                        "marketingAssetsPage.marketingAssetsModalCoverPhotoButtonText"
                      )}
                    </span>
                  </label>
                </div>
                <div className="configure_add_btn pdf-button">
                  <input
                    type="file"
                    accept=".pdf"
                    id="pdf-button"
                    className="d-none"
                    onChange={handleChangePdf}
                  />
                  <label
                    htmlFor="pdf-button"
                    className="marketing_assets_button"
                  >
                    <div className="marketing_assets_circle">
                      <img
                        src={plus}
                        alt=""
                        className="marketing_assets_circle_img"
                      />
                    </div>
                    <span className="marketing_assets_text">
                      {t(
                        "marketingAssetsPage.marketingAssetsModalPdfButtonText"
                      )}
                    </span>
                  </label>
                </div>
              </>
            ) : (
              <>
                <label
                  htmlFor="photo-button"
                  className="mobile_configure_add_btn photo-btn"
                >
                  <input
                    type="file"
                    accept="image/*"
                    id="photo-button"
                    className="d-none"
                    onChange={handleChangePhoto}
                  />
                  <div className="mobile_configure_add_btn_text">
                    {modalData?.coverPhoto ? (
                      <span>
                        {modalData?.coverPhoto?.name}&nbsp;
                        <FaCheck color="#70C094" />
                      </span>
                    ) : (
                      <span>
                        {t(
                          "marketingAssetsPage.marketingAssetsModalCoverPhotoButtonText"
                        )}
                      </span>
                    )}
                  </div>
                </label>
                <label
                  htmlFor="pdf-button"
                  className="mobile_configure_add_btn pdf-btn"
                >
                  <input
                    type="file"
                    accept=".pdf"
                    id="pdf-button"
                    className="d-none"
                    onChange={handleChangePhoto}
                  />
                  {modalData?.pdf ? (
                    <span>
                      {modalData?.pdf?.name}&nbsp;
                      <FaCheck color="#70C094" />
                    </span>
                  ) : (
                    <span>
                      {t(
                        "marketingAssetsPage.marketingAssetsModalPdfButtonText"
                      )}
                    </span>
                  )}
                </label>
              </>
            )}
          </div>
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
            <div className="preview_card_content">{modalData?.title}</div>
          </div>
        </div>
      </ModalBody>
      <ModalFooter>
        <button
          className="marketing_asset_cancel_btn"
          onClick={() => setShowModal(false)}
        >
          {t("buttons.cancelButtonText")}
        </button>
        <button className="marketing_asset_submit_btn" onClick={handleSubmit}>
          {t("buttons.submitButtonText")}
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default MarketingAssetModal;
