import { useTranslation } from "react-i18next";
import SEO from  "../../SEO";
import PageTitle from "../../components/PageTitle";
import useWindowSize from "../../hooks/useWindow";
import "./social_media.scss";
import { socialMediaPlatforms } from "../../helpers";
import addPlus from "../../assets/img/icons/add_plus.svg";
import plus from "../../assets/img/icons/plus.svg";
import { useState } from "react";
import SocialMediaBottomSheet from "./components/SocialMediaBottomSheet";

const SocialMedia = () => {
  const {t} = useTranslation();
  const {width} = useWindowSize();
  const [isOpen,setIsOpen] = useState(false);
  const [selectedSocialMedia,setSelectedSocialMedia] = useState(false);

  return (
    <>
      <SEO title={t("socialMediaPage.metaTitle")}
        description={t("socialMediaPage.metaDescription")}
        keywords={t("socialMediaPage.metaKeywords")}/>
        <div className="page_container">
          <PageTitle title={t("socialMediaPage.pageTitle")}/>
          <div className="section_container">
            {
              width > 768 ? "DESKTOP" : <div className="mobile_social_media_icons_container">
                <div className="mobile_social_media_icon add_btn" onClick={() => setIsOpen(true)}>
                  <img src={plus} alt="" width={20} height={20}/>
                </div>
                {
                  socialMediaPlatforms && socialMediaPlatforms?.map((item,idx) => (
                    <button className="mobile_social_media_icon" key={idx} onClick={() => {
                      setIsOpen(true);
                      setSelectedSocialMedia(item)
                    }}>
                      <img src={item?.icon} alt={item?.value} className="mobile_social_media_icon_img"/>
                      <div className="mobile_social_media_icon_plus_btn">
                        <img src={addPlus} alt="" className="mobile_social_media_icon_plus_btn_img"/>
                      </div>
                    </button>
                  ))
                }
              </div>
            }
          </div>
        </div>
        <SocialMediaBottomSheet isOpen={isOpen} setIsOpen={setIsOpen} selectedSocialMedia={selectedSocialMedia} setSelectedSocialMedia={setSelectedSocialMedia}/>
    </>
  )
}

export default SocialMedia