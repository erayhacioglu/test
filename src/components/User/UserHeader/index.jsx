import "./user_header.scss";
import defaultAvatar from "../../../assets/img/avatar.png";
import editIcon from "../../../assets/img/icons/edit.svg";
import qrIcon from "../../../assets/img/icons/qr.svg";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedPage } from "../../../redux/slices/UpdatePageSlice";
import { useEffect, useRef, useState } from "react";
import { updatePageChecker } from "../../../helpers";
import { FaImage } from "react-icons/fa6";
import { resetProfile,updateProfileData,getProfileData, getOtherProfileData } from "../../../redux/slices/ProfileSlice";
import { resetCompany,updateCompanyData,getCompanyData } from "../../../redux/slices/CompanySlice";
import { resetSocialMedia,updateSocialMedia,getSocialMediaPlatformsData,getSocialMediaData } from "../../../redux/slices/SocialMediaSlice";
import { useTranslation } from "react-i18next";
import { getUserImages,getOtherUserImages } from "../../../redux/slices/UserImagesSlice";
import Axios from "../../../api/axiosInstance";
import toast from "react-hot-toast";

const UserHeader = ({setQrCodeModal}) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { updatedPage } = useSelector((state) => state.updatePage);
  const profileState = useSelector(state => state.profile);
  const companyState = useSelector(state => state.company);
  const socialMediaState = useSelector(state => state.socialMedia);
  const userImagesState = useSelector(state => state.userImages);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);

  const fileInputRef = useRef(null);

  const {t} = useTranslation();

  const cardId = "1";

  const isPublicProfile = location.pathname.startsWith("/user/");
  const [userCardId,setCardId] = useState(null);

  const {id} = useParams();

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
      const formData = new FormData();
      formData.append("userId",cardId);
      formData.append("img",file);
      Axios.post(`user/update-profile-img`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      }).then(res => {
        if(res?.status === 200){
          toast.success(res?.data);
          dispatch(getUserImages({ cardId }));
        }
      }).catch(err => {
        const msg = err?.response?.data?.message || "Profil Resmi Değiştirilemedi"
        toast.error(msg);
      })
    }
  };

  useEffect(() => {
    if(isPublicProfile && id){
      setCardId(id);
    }
  },[isPublicProfile,id]);

  useEffect(() => {
    if (isPublicProfile && !userCardId) return;
    const controller = new AbortController();

    if(isPublicProfile){
      dispatch(getOtherProfileData({ cardId:userCardId, signal: controller.signal }));
      dispatch(getOtherUserImages({ cardId:userCardId, signal: controller.signal }));
    }else{
      dispatch(getProfileData({ cardId, signal: controller.signal }));
      dispatch(getUserImages({ cardId, signal: controller.signal }));
    }

    return () => {
      controller.abort();
    };
  }, [cardId, dispatch,userCardId,isPublicProfile]);

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
          <img src={userImagesState?.profileImg ?? defaultAvatar} alt="" className="avatar_img" />
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
