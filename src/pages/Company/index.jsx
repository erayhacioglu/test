import { useSelector } from "react-redux";
import { useLocation } from "react-router";
import { updatePageChecker } from "../../helpers";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO";
import CompanyInfo from "./components/CompanyInfo";
import BankInfo from "./components/BankInfo";
import "./company.scss";

const Company = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const { updatedPage } = useSelector((state) => state.updatePage);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);

  return (
    <>
      <SEO
        title={t("companyPage.metaTitle")}
        description={t("companyPage.metaDescription")}
        keywords={t("companyPage.metaKeywords")}
      />
      <div className="page_container">
        <div className="row">
          <div className="col-md-6">
            <CompanyInfo isUpdated={isUpdated} />
          </div>
          <div className="col-md-6">
            <BankInfo isUpdated={isUpdated} />
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

export default Company;
