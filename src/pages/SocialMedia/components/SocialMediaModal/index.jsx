import Modal from "react-bootstrap/Modal";
import "./social_media_modal.scss";
import { Check, Copy, Link } from "lucide-react";
import { useState } from "react";
import copy from "../../../../assets/img/icons/copy.svg";

const SocialMediaModal = ({
  socialMediaModal,
  setSocialMediaModal,
  selectedSocialMedia,
  data,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (text, textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(text);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Kopyalama hatası:", err);
    }
  };
  return (
    <Modal
      show={socialMediaModal}
      onHide={() => setSocialMediaModal(false)}
      centered
      contentClassName="social_media_modal"
    >
      <Modal.Header closeButton>
        <Modal.Title>{selectedSocialMedia?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="social_media_modal_item_container">
          {data &&
            selectedSocialMedia &&
            data
              ?.filter((el) => el.platform === selectedSocialMedia?.name)
              ?.map((el, idx) => (
                <div className="social_media_modal_item" key={idx}>
                  <span className="social_media_modal_item_text">
                    {el?.usernameOrUrl ?? "-"}
                  </span>
                  <div className="social_media_modal_item_controls">
                    <span
                      className="social_media_modal_item_btn"
                      onClick={() => handleCopy(el?.usernameOrUrl,el?.usernameOrUrl)}
                    >
                      {copied && copied === el?.usernameOrUrl ? (
                        <Check size={20} color="#70C094" />
                      ) : (
                        <img src={copy} alt="" />
                      )}
                    </span>
                    <a
                      href="https://youtube.com"
                      target="_blank"
                      className="social_media_modal_item_btn"
                    >
                      <Link size={18} />
                    </a>
                  </div>
                </div>
              ))}
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default SocialMediaModal;
