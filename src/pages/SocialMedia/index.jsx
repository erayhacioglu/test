import { useTranslation } from "react-i18next";
import SEO from "../../SEO";
import PageTitle from "../../components/PageTitle";
import useWindowSize from "../../hooks/useWindow";
import "./social_media.scss";
import { updatePageChecker } from "../../helpers";
import { useEffect, useState } from "react";
import SocialMediaBottomSheet from "./components/SocialMediaBottomSheet";
import DesktopSocialMedia from "./components/DesktopSocialMedia";
import MobileSocialMedia from "./components/MobileSocialMedia";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  getSocialMediaData,
  getSocialMediaPlatformsData,
  resetSocialMedia,
  updateSocialMedia,
} from "../../redux/slices/SocialMediaSlice";
import toast from "react-hot-toast";
import { setUpdatedPage } from "../../redux/slices/UpdatePageSlice";

const SocialMedia = () => {
  const { t } = useTranslation();
  const { width } = useWindowSize();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(false);

  const location = useLocation();
  const dispatch = useDispatch();
  const { updatedPage } = useSelector((state) => state.updatePage);

  const { isSuccess, isError, message, data, addedSocialMediaPlatforms } =
    useSelector((state) => state.socialMedia);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);

  const cardId = "1";

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getSocialMediaData({ cardId, signal: controller.signal }));
    dispatch(getSocialMediaPlatformsData({ signal: controller.signal }));

    return () => {
      controller.abort();
    };
  }, [cardId, dispatch]);

  const handleUpdateSocialMedia = async (cardId, updatedData, draftData) => {
    const mergedData = [...updatedData, ...draftData];
    const res = await dispatch(updateSocialMedia({ cardId, mergedData }));
    if (res?.meta?.requestStatus === "fulfilled") {
      dispatch(getSocialMediaData({ cardId }));
      dispatch(getSocialMediaPlatformsData({ cardId }));
      dispatch(setUpdatedPage(null));
      dispatch(resetSocialMedia());
    }
  };

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
    }
    if (isError && message) {
      toast.error(message);
    }
    return () => dispatch(resetSocialMedia);
  }, [dispatch, isSuccess, isError, message]);

  return (
    <>
      <SEO
        title={t("socialMediaPage.metaTitle")}
        description={t("socialMediaPage.metaDescription")}
        keywords={t("socialMediaPage.metaKeywords")}
      />
      <div className="page_container">
        <PageTitle title={t("socialMediaPage.pageTitle")} />
        <div
          className="section_container"
          style={{ paddingRight: `${width > 768 ? 0 : "35px"}` }}
        >
          {width > 768 ? (
            <DesktopSocialMedia isUpdated={isUpdated} />
          ) : (
            <MobileSocialMedia
              isUpdated={isUpdated}
              setIsOpen={setIsOpen}
              setSelectedSocialMedia={setSelectedSocialMedia}
            />
          )}
        </div>
        {isUpdated && width > 768 && (
          <div className="section_container">
            <div className="d-flex align-items-center">
              <button
                className="user_action_submit_button mobile me-3"
                onClick={() =>
                  handleUpdateSocialMedia(
                    cardId,
                    data,
                    addedSocialMediaPlatforms
                  )
                }
              >
                Kaydet
              </button>
              <button className="user_action_submit_button cancel mobile">
                İptal
              </button>
            </div>
          </div>
        )}
      </div>
      <SocialMediaBottomSheet
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        isUpdated={isUpdated}
        selectedSocialMedia={selectedSocialMedia}
        setSelectedSocialMedia={setSelectedSocialMedia}
      />
    </>
  );
};

export default SocialMedia;
