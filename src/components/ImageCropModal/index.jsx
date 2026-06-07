import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import { Modal } from "react-bootstrap";
import getCroppedImg from "../../helpers/cropImage";
import "./image_crop_modal.scss";
import { useTranslation } from "react-i18next";

const ImageCropModal = ({ show, onHide, imageSrc, aspect, cropShape, onCropComplete }) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { t } = useTranslation();

  const onCropChange = useCallback((location) => {
    setCrop(location);
  }, []);

  const onZoomChange = useCallback((z) => {
    setZoom(z);
  }, []);

  const onCropAreaComplete = useCallback((_, croppedPixels) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!croppedAreaPixels) return;
    setIsProcessing(true);
    try {
      const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
      onCropComplete(croppedBlob);
      handleClose();
    } catch {
      // silent
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
    onHide();
  };

  if (!imageSrc) return null;

  return (
    <Modal show={show} onHide={handleClose} centered size="lg" className="image_crop_modal">
      <Modal.Header closeButton>
        <Modal.Title className="crop_modal_title">
          {cropShape === "round"
            ? t("imageCrop.profileTitle")
            : t("imageCrop.bannerTitle")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="crop_modal_body">
        <div className="crop_container">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={aspect}
            cropShape={cropShape || "rect"}
            showGrid={cropShape !== "round"}
            onCropChange={onCropChange}
            onZoomChange={onZoomChange}
            onCropComplete={onCropAreaComplete}
          />
        </div>
        <div className="zoom_control">
          <span className="zoom_label">-</span>
          <input
            type="range"
            min={1}
            max={3}
            step={0.05}
            value={zoom}
            onChange={(e) => setZoom(Number(e.target.value))}
            className="zoom_slider"
          />
          <span className="zoom_label">+</span>
        </div>
      </Modal.Body>
      <Modal.Footer className="crop_modal_footer">
        <button className="crop_cancel_btn" onClick={handleClose} disabled={isProcessing}>
          {t("buttons.cancelButtonText")}
        </button>
        <button className="crop_save_btn" onClick={handleSave} disabled={isProcessing}>
          {isProcessing
            ? t("imageCrop.processing")
            : t("imageCrop.save")}
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ImageCropModal;
