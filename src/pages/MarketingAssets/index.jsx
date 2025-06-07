import { Fragment, useState } from "react";
import "./marketing_assets.scss";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO";
import PageTitle from "../../components/PageTitle";
import MarketingAssetCard from "./components/MarketingAssetCard";
import plus from "../../assets/img/icons/plus.svg";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { updatePageChecker } from "../../helpers";
import MarketingAssetModal from "./components/MarketingAssetModal";
import useWindowSize from "../../hooks/useWindow";

const MarketingAssests = () => {
  const { t } = useTranslation();
  const location = useLocation();
   const { updatedPage } = useSelector((state) => state.updatePage);
   const { marketingAssetsData } = useSelector((state) => state.marketingAssets);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);

  const [showModal,setShowModal] = useState(false);
  const windowSize = useWindowSize();

  return (
    <>
      <SEO
        title={t("marketingAssetsPage.metaTitle")}
        description={t("marketingAssetsPage.metaDescription")}
        keywords={t("marketingAssetsPage.metaKeywords")}
      />
      <div className="page_container">
        <PageTitle title={t("marketingAssetsPage.pageTitle")} />
        <div className="section_container" style={{paddingRight:`${windowSize?.width > 768 ? 0 : "35px"}`}}>
          <div className="marketing_assets_container">
            {
              marketingAssetsData && marketingAssetsData?.length > 0 && marketingAssetsData?.map((item,idx) => (
                <Fragment key={idx}>
                  <MarketingAssetCard isUpdated={isUpdated} data={item}/>
                </Fragment>
              ))
            }
          </div>
          {
            isUpdated && 
          <div className="marketing_assets_button" onClick={() => setShowModal(true)}>
            <div className="marketing_assets_circle">
              <img src={plus} alt="" className="marketing_assets_circle_img"/>
            </div>
            <span className="marketing_assets_text">
              {t("marketingAssetsPage.addMarketingAssetsButton")}
            </span>
          </div>
          }
        </div>
      </div>
      <MarketingAssetModal showModal={showModal} setShowModal={setShowModal}/>
    </>
  );
};

export default MarketingAssests;
