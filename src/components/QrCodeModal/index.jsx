import {  useRef, useState } from "react";
import { Modal, ModalBody, ModalFooter, ModalHeader } from "react-bootstrap";
import html2canvas from "html2canvas";
import ColorWheel from "@uiw/react-color-wheel";
import ShadeSlider from "@uiw/react-color-shade-slider";
import { hsvaToHex } from "@uiw/color-convert";
import "./qr_code_modal.scss";

import downloadIcon from "../../assets/img/icons/download.svg";
import colorPaletteIcon from "../../assets/img/icons/color_palette.svg";
import qrCodeIcon from "../../assets/img/icons/qr_code.svg";
import avatar from "../../assets/img/avatar.png";
import { useSelector } from "react-redux";
import useImageAsDataUrl from "../../hooks/useImageAsDataUrl";

const QrCodeModal = ({ qrCodeModal, setQrCodeModal }) => {
  const [showColorWheel, setShowColorWheel] = useState(false);
  const [hsva, setHsva] = useState({ h: 214, s: 43, v: 90, a: 1 });
  const [selectedHsva, setSelectedHsva] = useState(false);
  const userImagesState = useSelector(state => state.userImages);

  const toggleColorWheel = () => {
    setShowColorWheel(!showColorWheel);
  };

  const bodyRef = useRef(null);

  const handleDownload = async () => {
    if (!bodyRef.current) return;

    const canvas = await html2canvas(bodyRef.current);
    const image = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = image;
    link.download = "modal-body-screenshot.png";
    link.click();
  };

const avatarUrl = userImagesState?.profileImg;
const avatarDataUrl = useImageAsDataUrl(avatarUrl);


  return (
    <Modal
      centered
      show={qrCodeModal}
      onHide={() => setQrCodeModal(false)}
      className="qr_code_modal"
    >
      <ModalHeader closeButton />
      <ModalBody style={{
    "--selectedColor": selectedHsva ? selectedHsva : undefined,
  }} ref={bodyRef}>
        <div className="qr_code_modal_body">
          <div className="user_container">
            <div className="user_avatar">
              <img src={avatarDataUrl ?? avatarUrl ?? avatar}
   alt="" className="user_avatar_img" crossOrigin="anonymous"/>
            </div>
            <div className="user_info">
              <h2 className="user_info_fullname">Eray Hacıoğlu</h2>
              <h5 className="user_info_title">Frontend Developer</h5>
            </div>
          </div>

          <div className="qr_code_container">
            <img src={qrCodeIcon} alt="" className="qr_code_img" />
          </div>

          {showColorWheel && (
            <div className="color_wheel_container">
                <div>
              <ColorWheel
                color={hsva}
                onChange={(color) => setHsva({ ...hsva, ...color.hsva })}
              />
              <ShadeSlider
                hsva={hsva}
                style={{ width: 210, marginTop: 20 }}
                onChange={(newShade) => {
                  setHsva({ ...hsva, ...newShade });
                }}
              />
                </div>
              <div className="color_wheel_footer">
                <div className="color_wheel_color">{hsvaToHex(hsva)}</div>
                <button className="color_wheel_btn" onClick={() => {
                  setShowColorWheel(false)
                  setSelectedHsva(hsvaToHex(hsva));
                }}>Save</button>
              </div>
            </div>
          )}
        </div>
      </ModalBody>

      <ModalFooter>
        <button onClick={toggleColorWheel}>
          <img src={colorPaletteIcon} alt="Color Palette" />
        </button>
        <button onClick={handleDownload}>
          <img src={downloadIcon} alt="Download"/>
        </button>
      </ModalFooter>
    </Modal>
  );
};

export default QrCodeModal;
