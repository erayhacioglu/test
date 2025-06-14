import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { updatePageChecker } from "../../helpers";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO";
import CompanyInfo from "./components/CompanyInfo";
import BankInfo from "./components/BankInfo";
import "./company.scss";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { getCompanyData, resetCompany, updateCompanyData } from "../../redux/slices/CompanySlice";
import { setUpdatedPage } from "../../redux/slices/UpdatePageSlice";

const Company = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { updatedPage } = useSelector((state) => state.updatePage);
  const { isSuccess,isError,message,data } = useSelector((state) => state.company);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);

  const cardId = "1";

  useEffect(() => {
    const controller = new AbortController();

    dispatch(getCompanyData({ cardId, signal: controller.signal }));

    return () => {
      controller.abort();
    };
  }, [cardId, dispatch]);

  const handleCompanyDataUpdate = async (cardId,updatedData) => {
      const res = await dispatch(updateCompanyData({cardId,updatedData}))
      if(res?.meta?.requestStatus === "fulfilled"){
        dispatch(getCompanyData({ cardId }));
        dispatch(setUpdatedPage(null));
        dispatch(resetCompany())
      }
    }

  useEffect(() => {
    if(isSuccess && message){
      toast.success(message);
    }
    if(isError && message){
      toast.error(message);
    }
    return () => dispatch(resetCompany)
  },[dispatch,isSuccess,isError,message]);

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
              <button className="user_action_submit_button mobile me-3" onClick={() => handleCompanyDataUpdate(cardId,data)}>
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
