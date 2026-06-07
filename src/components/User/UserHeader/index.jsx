import "./user_header.scss";
import defaultAvatar from "../../../assets/img/avatar.png";
import editIcon from "../../../assets/img/icons/edit.svg";
import qrIcon from "../../../assets/img/icons/qr.svg";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedPage } from "../../../redux/slices/UpdatePageSlice";
import { useEffect, useRef, useState } from "react";
import { updatePageChecker, editablePaths } from "../../../helpers";
import { FaCamera } from "react-icons/fa6";
import {
  resetProfile,
  updateProfileData,
  getProfileData,
  getOtherProfileData,
} from "../../../redux/slices/ProfileSlice";
import {
  resetCompany,
  updateCompanyData,
  getCompanyData,
} from "../../../redux/slices/CompanySlice";
import {
  resetSocialMedia,
  updateSocialMedia,
  getSocialMediaPlatformsData,
  getSocialMediaData,
} from "../../../redux/slices/SocialMediaSlice";
import { useTranslation } from "react-i18next";
import {
  getUserImages,
  getOtherUserImages,
  getDownloadOtherProfilesVCF,
} from "../../../redux/slices/UserImagesSlice";
import Axios from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import UserHeaderSkeleton from "./components/UserHeaderSkeleton";
import ImageCropModal from "../../ImageCropModal";

const UserHeader = ({ setQrCodeModal, setContactModal }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { updatedPage } = useSelector((state) => state.updatePage);
  const profileState = useSelector((state) => state.profile);
  const companyState = useSelector((state) => state.company);
  const socialMediaState = useSelector((state) => state.socialMedia);
  const userImagesState = useSelector((state) => state.userImages);
  const { user } = useSelector((state) => state.user);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);

  const fileInputRef = useRef(null);

  const { t } = useTranslation();

  const userId = user && user?.id;
  const cardId = user && user?.cardId;

  const isPublicProfile = location.pathname.startsWith("/user/");
  const [userCardId, setCardId] = useState(null);

  const [cropModalOpen, setCropModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { id } = useParams();

  const canEditPhoto = !isPublicProfile && !!user;

  const handleClickUpdate = () => {
    dispatch(setUpdatedPage(true));
  };

  useEffect(() => {
    if (updatedPage && !editablePaths.includes(location.pathname)) {
      dispatch(setUpdatedPage(null));
    }
  }, [location.pathname, updatedPage, dispatch]);

  const handleCancelUpdatePage = () => {
    dispatch(setUpdatedPage(null));
    dispatch(resetProfile());
  };

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
      fileInputRef.current.click();
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
        setCropModalOpen(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCropComplete = (croppedBlob) => {
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("img", croppedBlob, "profile.jpg");
    Axios.post(`user/update-profile-img`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res?.status === 200) {
          toast.success(res?.data);
          dispatch(getUserImages({ cardId }));
        }
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message || "Profil Resmi Değiştirilemedi";
        toast.error(msg);
      });
  };

  useEffect(() => {
    if (isPublicProfile && id) {
      setCardId(id);
    }
  }, [isPublicProfile, id]);

  useEffect(() => {
    if (isPublicProfile && !userCardId) return;

    if (isPublicProfile) {
      dispatch(getOtherProfileData({ cardId: userCardId }));
      dispatch(getOtherUserImages({ cardId: userCardId }));
    } else {
      dispatch(getProfileData({ cardId }));
      dispatch(getUserImages({ cardId }));
    }
  }, [cardId, dispatch, userCardId, isPublicProfile]);

  const handleUpdateData = async () => {
    if (location?.pathname === "/profile") {
      const res = await dispatch(updateProfileData(profileState?.data));
      if (res?.meta?.requestStatus === "fulfilled") {
        dispatch(getProfileData({ cardId }));
        dispatch(setUpdatedPage(null));
        dispatch(resetProfile());
      }
    } else if (location?.pathname === "/company") {
      const res = await dispatch(
        updateCompanyData({ cardId, updatedData: companyState?.data })
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        dispatch(getCompanyData({ cardId }));
        dispatch(setUpdatedPage(null));
        dispatch(resetCompany());
      }
    } else if (location?.pathname === "/social-media") {
      const mergedData = [
        ...socialMediaState.data,
        ...socialMediaState.addedSocialMediaPlatforms,
      ];
      const res = await dispatch(
        updateSocialMedia({ cardId, updatedData: mergedData })
      );
      if (res?.meta?.requestStatus === "fulfilled") {
        dispatch(getSocialMediaData({ cardId }));
        dispatch(getSocialMediaPlatformsData({ cardId }));
        dispatch(setUpdatedPage(null));
        dispatch(resetSocialMedia());
      }
    }
  };

  if (userImagesState?.isLoading) {
    return <UserHeaderSkeleton />;
  }

  return (
    <div className="user_header">
      <div className="user_profile_info">
        <div className="avatar">
          <img
            src={userImagesState?.profileImg ?? defaultAvatar}
            alt=""
            className="avatar_img"
          />
          {isUpdated && canEditPhoto && (
            <>
              <div className="avatar_overlay">
                <button
                  className="change_avatar_button"
                  onClick={handleAvatarClick}
                >
                  <FaCamera />
                </button>
              </div>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileSelect}
              />
            </>
          )}
        </div>
        <div className="user_info">
          <h2 className="fullname">
            {`${profileState?.data?.userInfo?.firstName ?? ""} ${
              profileState?.data?.userInfo?.lastName ?? ""
            }`.trim()}
          </h2>

          <p className="job">{profileState?.data?.userInfo?.bio}</p>
        </div>
      </div>
      <div className="user_actions">
        {isPublicProfile ? (
          <>
            {(!user?.card?.company ||
              (user?.card?.company && user?.card?.company?.showConnect)) && (
              <button
                className="user_action_button"
                onClick={() => setContactModal(true)}
              >
                <img src={editIcon} alt="Düzenle ikon" />
                <span className="user_action_button_text">Bağlantı</span>
              </button>
            )}
            <button className="user_action_button" onClick={() => dispatch(getDownloadOtherProfilesVCF({cardId:userCardId}))}>
              <img src={qrIcon} alt="QR ikon" />
              <span className="user_action_button_text">İndir</span>
            </button>
          </>
        ) : isUpdated ? (
          <>
            <button
              className="user_action_submit_button"
              onClick={handleUpdateData}
            >
              {t("buttons.submitButtonText")}
            </button>
            <button
              className="user_action_submit_button cancel"
              onClick={handleCancelUpdatePage}
            >
              {t("buttons.cancelButtonText")}
            </button>
          </>
        ) : (
          <>
            {(!user?.card?.company ||
              (user?.card?.company && user?.card?.company?.editableUser)) && (
              <button
                className="user_action_button"
                onClick={handleClickUpdate}
              >
                <img src={editIcon} alt="Düzenle ikon" />
                <span className="user_action_button_text">
                  {t("buttons.editButtonText")}
                </span>
              </button>
            )}
            <button
              className="user_action_button"
              onClick={() => setQrCodeModal(true)}
            >
              <img src={qrIcon} alt="QR ikon" />
              <span className="user_action_button_text">
                {t("buttons.createQrButtonText")}
              </span>
            </button>
          </>
        )}
      </div>

      <ImageCropModal
        show={cropModalOpen}
        onHide={() => setCropModalOpen(false)}
        imageSrc={selectedImage}
        aspect={1}
        cropShape="round"
        onCropComplete={handleCropComplete}
      />
    </div>
  );
};

export default UserHeader;
