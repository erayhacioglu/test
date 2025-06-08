import { useTranslation } from "react-i18next";
import SEO from  "../../SEO";
import PageTitle from "../../components/PageTitle";
import useWindowSize from "../../hooks/useWindow";
import "./social_media.scss";
import { socialMediaPlatforms, updatePageChecker } from "../../helpers";
import addPlus from "../../assets/img/icons/add_plus.svg";
import plus from "../../assets/img/icons/plus.svg";
import { useState } from "react";
// import SocialMediaBottomSheet from "./components/SocialMediaBottomSheet";
import SocialMediaBottomSheet from "./components/SocialMediaBottomSheet";
import DesktopSocialMedia from "./components/DesktopSocialMedia";
import MobileSocialMedia from "./components/MobileSocialMedia";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";

const SocialMedia = () => {
  const {t} = useTranslation();
  const {width} = useWindowSize();
  const [isOpen,setIsOpen] = useState(false);
  const [selectedSocialMedia,setSelectedSocialMedia] = useState(false);

  const location = useLocation();
    const {updatedPage} = useSelector((state) => state.updatePage);

    const isUpdated = updatePageChecker(location.pathname, updatedPage);

  return (
    <>
      <SEO title={t("socialMediaPage.metaTitle")}
        description={t("socialMediaPage.metaDescription")}
        keywords={t("socialMediaPage.metaKeywords")}/>
        <div className="page_container">
          <PageTitle title={t("socialMediaPage.pageTitle")}/>
          <div className="section_container" style={{paddingRight:`${width > 768 ? 0 : "35px"}`}}>
            {
              width > 768 ? <DesktopSocialMedia isUpdated={isUpdated}/> : <MobileSocialMedia isUpdated={isUpdated} setIsOpen={setIsOpen} setSelectedSocialMedia={setSelectedSocialMedia}/>
            }
          </div>
          {isUpdated && (
          <div className="section_container">
            <div className="d-flex align-items-center">
              <button className="user_action_submit_button mobile me-3">
                Kaydet
              </button>
              <button className="user_action_submit_button cancel mobile">
                İptal
              </button>
            </div>
          </div>
        )}
        </div>
        <SocialMediaBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} isUpdated={isUpdated} selectedSocialMedia={selectedSocialMedia} setSelectedSocialMedia={setSelectedSocialMedia}/>
    </>
  )
}

export default SocialMedia