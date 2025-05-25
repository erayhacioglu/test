import "./marketing_assets.scss";
import { useTranslation } from "react-i18next"
import SEO from "../../SEO"
import PageTitle from "../../../../../../Documents/GitHub/kavio-profile/src/components/PageTitle";
import MarketingAssetCard from "./components/MarketingAssetCard";
import plus from "../../assets/img/icons/plus.svg";

const MarketingAssests = () => {
  const {t} = useTranslation();
  return (
    <>
        <SEO title={t("marketingAssetsPage.metaTitle")}
        description={t("marketingAssetsPage.metaDescription")}
        keywords={t("marketingAssetsPage.metaKeywords")}/>
        <div className="page_container">
          <PageTitle title={t("marketingAssetsPage.pageTitle")}/>
          <div className="section_container" style={{paddingRight:"0"}}>
          <div className="row">
            <MarketingAssetCard />
            <MarketingAssetCard />
            <MarketingAssetCard />
            <MarketingAssetCard />
          </div>
          </div>
          <div className="section_container">
            <div className="marketing_assets_add_button">
              <div className="marketing_assets_add_circle"><img src={plus} alt=""/></div>
              <p className="marketing_assets_add_text">{t("marketingAssetsPage.addMarketingAssetsButton")}</p>
            </div>
          </div>
        </div>
    </>
  )
}

export default MarketingAssests