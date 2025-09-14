// SocialMediaModal.jsx
import Modal from "react-bootstrap/Modal";
import "./social_media_modal.scss";

const SocialMediaModal = ({ socialMediaModal, setSocialMediaModal }) => {
  return (
    <Modal
      show={socialMediaModal}
      onHide={() => setSocialMediaModal(false)}
      centered
      contentClassName="social_media_modal"  // <-- sınıfı modal-content’e bas
      // dialogClassName="social_media_dialog" // istersen dialog’a da ver
      // backdropClassName="social_media_backdrop" // backdrop için
    >
      <Modal.Header closeButton>
        <Modal.Title>TITLE</Modal.Title>
      </Modal.Header>
      <Modal.Body>BURASIII</Modal.Body>
    </Modal>
  );
};

export default SocialMediaModal;
