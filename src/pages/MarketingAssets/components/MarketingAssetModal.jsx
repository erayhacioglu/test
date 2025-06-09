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

    console.log('width', width)

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
                    <div className="configure_label">{t("marketingAssetsPage.marketingAssetsModalLabel")}</div>
                    <input type="text" className="configure_input" value={modalData?.title} maxLength={50} onChange={(e) => setModalData((prev) => ({...prev,title:e.target.value}))}/>
                    <span className={`configure_size ${modalData?.title?.length === 50 ? "max_size":""}`}>{modalData?.title?.length ?? 0}/50</span>
                </div>
                <div className="configure_documents">
                    <label htmlFor="coverPhoto" className="document">
                        <input type="file" accept="*" className="d-none" id="coverPhoto" onChange={handleChangePhoto}/>
                        {
                            width > 768 ? <div className="add_document_desktop_body">
                                <div className="add_document_button">
                                    <div className="circle_plus">
                                        <img src={plus} alt="" />
                                    </div>
                                    <span>{t(
                        "marketingAssetsPage.marketingAssetsModalCoverPhotoButtonText"
                      )}</span>
                                </div>
                            </div>:
                        <div className="add_document_mobile_body">
                            {
                                modalData?.coverPhoto ? <><span>{modalData?.coverPhoto?.name}&nbsp;
                                                    </span>
                            <FaCheck color="#70C094" size={18}/></> : <span>{t(
                          "marketingAssetsPage.marketingAssetsModalCoverPhotoButtonText"
                        )}</span>
                            }
                            
                        </div>
                        }
                    </label>
                    <label htmlFor="pdf" className="document">
                        <input type="file" accept="*" className="d-none" id="pdf" onChange={handleChangePdf}/>
                        {
                            width > 768 ? <div className="add_document_desktop_body">
                                <div className="add_document_button">
                                    <div className="circle_plus">
                                        <img src={plus} alt="" />
                                    </div>
                                    <span>{t(
                        "marketingAssetsPage.marketingAssetsModalPdfButtonText"
                      )}</span>
                                </div>
                            </div>:
                        <div className="add_document_mobile_body">
                            {
                                modalData?.pdf ? <><span>{modalData?.pdf?.name}&nbsp;
                                                    </span>
                            <FaCheck color="#70C094" size={18}/></> : <span>{t(
                        "marketingAssetsPage.marketingAssetsModalPdfButtonText"
                      )}</span>
                            }
                            
                        </div>
                        }
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
                            <div className="preview_card_content">{modalData?.title}</div>
                          </div>
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
