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
import { resetProfile,updateProfileData,getProfileData } from "../../../redux/slices/ProfileSlice";
import { resetCompany,updateCompanyData,getCompanyData } from "../../../redux/slices/CompanySlice";
import { resetSocialMedia,updateSocialMedia,getSocialMediaPlatformsData,getSocialMediaData } from "../../../redux/slices/SocialMediaSlice";
import { useTranslation } from "react-i18next";

const UserHeader = ({setQrCodeModal}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { updatedPage } = useSelector((state) => state.updatePage);
  const profileState = useSelector(state => state.profile);
  const companyState = useSelector(state => state.company);
  const socialMediaState = useSelector(state => state.socialMedia);

  const cardId = "1";

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
        // dispatch(setAvatarImage(reader?.result));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getProfileData({ cardId, signal: controller.signal }));

    return () => {
      controller.abort();
    };
  }, [cardId, dispatch]);

  const handleUpdateData = async () => {
    if(location?.pathname === "/profile"){
      const res = await dispatch(updateProfileData(profileState?.data))
    if(res?.meta?.requestStatus === "fulfilled"){
      dispatch(getProfileData({ cardId }));
      dispatch(setUpdatedPage(null));
      dispatch(resetProfile())
    }
    }
    else if(location?.pathname === "/company"){
      const res = await dispatch(updateCompanyData({cardId,updatedData:companyState?.data}))
      if(res?.meta?.requestStatus === "fulfilled"){
        dispatch(getCompanyData({ cardId }));
        dispatch(setUpdatedPage(null));
        dispatch(resetCompany())
      }
    }
    else if(location?.pathname === "/social-media"){
      const mergedData = [...socialMediaState.data, ...socialMediaState.addedSocialMediaPlatforms];
    const res = await dispatch(updateSocialMedia({ cardId, updatedData:mergedData }));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getSocialMediaData({ cardId }));
      dispatch(getSocialMediaPlatformsData({ cardId }));
      dispatch(setUpdatedPage(null));
      dispatch(resetSocialMedia());
    }
    }
  }

  return (
    <div className="user_header">
      <div className="user_profile_info">
        <div className="avatar">
          <img src={defaultAvatar} alt="" className="avatar_img" />
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
          <h2 className="fullname">{profileState?.data?.userInfo?.firstName + " " + profileState?.data?.userInfo?.lastName}</h2>
          <p className="job">{profileState?.data?.userInfo?.bio}</p>
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
            <button className="user_action_submit_button" onClick={handleUpdateData}>{t("buttons.submitButtonText")}</button>
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
            <button className="user_action_button" onClick={() => setQrCodeModal(true)}>
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
