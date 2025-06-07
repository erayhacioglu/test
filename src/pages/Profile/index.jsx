//components
import PersonalInfo from "./components/PersonalInfo";
import ContactInfo from "./components/ContactInfo";
import Links from "./components/Links";
import SEO from "../../SEO";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { updatePageChecker } from "../../helpers";
import { useSelector } from "react-redux";

const Profile = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { updatedPage } = useSelector((state) => state.updatePage);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);

  return (
    <>
      <SEO
        title={t("profilePage.metaTitle")}
        description={t("profilePage.metaDescription")}
        keywords={t("profilePage.metaKeywords")}
      />
      <div className="page_container">
        <div className="row">
          <div className="col-md-6">
            <PersonalInfo isUpdated={isUpdated} />
            {isUpdated && <ContactInfo />}
          </div>
          <div className="col-md-6">
            <Links isUpdated={isUpdated} />
          </div>
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
    </>
  );
};

export default Profile;
