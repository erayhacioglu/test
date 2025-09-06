import { Fragment, useEffect, useState } from "react";
import "./marketing_assets.scss";
import { useTranslation } from "react-i18next";
import SEO from "../../SEO";
import PageTitle from "../../components/PageTitle";
import MarketingAssetCard from "./components/MarketingAssetCard";
import plus from "../../assets/img/icons/plus.svg";
import { useLocation, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { updatePageChecker } from "../../helpers";
import MarketingAssetModal from "./components/MarketingAssetModal";
import useWindowSize from "../../hooks/useWindow";
import {
  getMarketingAssetsData,
  getOtherMarketingAssetsData,
  resetMarketingAssets,
} from "../../redux/slices/MarketingAssetsSlice";
import toast from "react-hot-toast";
import MarketingAssetsSkeleton from "./components/MarketingAssetsSkeleton";

const MarketingAssests = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const location = useLocation();
  const { updatedPage } = useSelector((state) => state.updatePage);
  const { isLoading, isSuccess, isError, message, data } = useSelector(
    (state) => state.marketingAssets
  );

  const {user} = useSelector(state => state.user);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);

  const [showModal, setShowModal] = useState(false);
  const windowSize = useWindowSize();

  const cardId = user?.cardId;

  const isPublicProfile = location.pathname.startsWith("/user/");
  const [userCardId, setCardId] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    if (isPublicProfile && id) {
      setCardId(id);
    }
  }, [isPublicProfile, id]);

  useEffect(() => {
    if (isPublicProfile && !userCardId) return;
    const controller = new AbortController();

    if (isPublicProfile) {
      dispatch(
        getOtherMarketingAssetsData({
          cardId: userCardId,
          signal: controller.signal,
        })
      );
    } else {
      dispatch(getMarketingAssetsData({ cardId, signal: controller.signal }));
    }

    return () => {
      controller.abort();
    };
  }, [cardId, dispatch, userCardId, isPublicProfile]);

  useEffect(() => {
    if (isSuccess && message) {
      toast.success(message);
    }
    if (isError && message) {
      toast.error(message);
    }
    return () => dispatch(resetMarketingAssets());
  }, [dispatch, isSuccess, isError, message]);

  if(isLoading){
    return(
      <div className="page_container">
        <div className="section_container" style={{ paddingRight: `${windowSize?.width > 768 ? 0 : "35px"}` }}>
          <div className="marketing_assets_container">
            <MarketingAssetsSkeleton />
            <MarketingAssetsSkeleton />
            <MarketingAssetsSkeleton />
            <MarketingAssetsSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={t("marketingAssetsPage.metaTitle")}
        description={t("marketingAssetsPage.metaDescription")}
        keywords={t("marketingAssetsPage.metaKeywords")}
      />
      <div className="page_container">
        <PageTitle title={t("marketingAssetsPage.pageTitle")} />
        <div
          className="section_container"
          style={{ paddingRight: `${windowSize?.width > 768 ? 0 : "35px"}` }}
        >
          <div className="marketing_assets_container">
            {data &&
              data?.length > 0 &&
              data?.map((item, idx) => (
                <Fragment key={idx}>
                  <MarketingAssetCard isUpdated={isUpdated} data={item} />
                </Fragment>
              ))}
          </div>
          {isUpdated && (
            <div
              className="marketing_assets_button"
              onClick={() => setShowModal(true)}
            >
              <div className="marketing_assets_circle">
                <img
                  src={plus}
                  alt=""
                  className="marketing_assets_circle_img"
                />
              </div>
              <span className="marketing_assets_text">
                {t("marketingAssetsPage.addMarketingAssetsButton")}
              </span>
            </div>
          )}
        </div>
      </div>
      <MarketingAssetModal showModal={showModal} setShowModal={setShowModal} />
    </>
  );
};

export default MarketingAssests;
