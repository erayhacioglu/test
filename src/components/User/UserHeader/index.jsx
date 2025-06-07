import "./user_header.scss";
import defaultAvatar from "../../../assets/img/avatar.png";
import editIcon from "../../../assets/img/icons/edit.svg";
import qrIcon from "../../../assets/img/icons/qr.svg";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedPage } from "../../../redux/slices/UpdatePageSlice";
import { useEffect, useRef } from "react";
import { updatePageChecker } from "../../../helpers";
import { FaImage } from "react-icons/fa6";
import { resetProfile, setAvatarImage } from "../../../redux/slices/ProfileSlice";
import { useTranslation } from "react-i18next";

const UserHeader = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { updatedPage } = useSelector((state) => state.updatePage);
  const {avatarImage} = useSelector(state => state.profile);

  const isPublicProfile = location.pathname.startsWith("/user/");

  const isUpdated = updatePageChecker(location.pathname, updatedPage);

  const fileInputRef = useRef(null);

  const {t} = useTranslation();

  const handleClickUpdate = () => {
    if (location.pathname) {
      dispatch(setUpdatedPage(location.pathname));
    }
  };

  useEffect(() => {
    if (location.pathname !== updatedPage) {
      dispatch(setUpdatedPage(null));
    }
  }, [location.pathname, updatedPage, dispatch]);

  const handleCancelUpdatePage = () => {
    dispatch(setUpdatedPage(null));
    dispatch(resetProfile());
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        dispatch(setAvatarImage(reader?.result));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="user_header">
      <div className="user_profile_info">
        <div className="avatar">
          <img src={avatarImage ?? defaultAvatar} alt="" className="avatar_img" />
          {isUpdated && (
            <>
              <div className="avatar_overlay">
                <button className="change_avatar_button" onClick={handleAvatarClick}>
                  <FaImage/>
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </>
          )}
        </div>
        <div className="user_info">
          <h2 className="fullname">Eray Hacıoğlu</h2>
          <p className="job">Frontend Developer</p>
        </div>
      </div>
      <div className="user_actions">
        {
          isPublicProfile ? <>
             <button className="user_action_button">
              <img src={editIcon} alt="Düzenle ikon" />
              <span className="user_action_button_text">Bağlantı</span>
            </button>
            <button className="user_action_button">
              <img src={qrIcon} alt="QR ikon" />
              <span className="user_action_button_text">İndir</span>
            </button>
          </> :
        isUpdated ? (
          <>
            <button className="user_action_submit_button">{t("buttons.submitButtonText")}</button>
            <button
              className="user_action_submit_button cancel"
              onClick={handleCancelUpdatePage}
            >
              {t("buttons.cancelButtonText")}
            </button>
          </>
        ) : (
          <>
            <button className="user_action_button" onClick={handleClickUpdate}>
              <img src={editIcon} alt="Düzenle ikon" />
              <span className="user_action_button_text">{t("buttons.editButtonText")}</span>
            </button>
            <button className="user_action_button">
              <img src={qrIcon} alt="QR ikon" />
              <span className="user_action_button_text">{t("buttons.createQrButtonText")}</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
