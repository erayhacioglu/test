import { useDispatch, useSelector } from "react-redux";
import trash from "../../../assets/img/icons/trash.svg";
import cardBackground from "../../../assets/img/marketing_assets_background.jpg";
import { setMarketingAssetsData } from "../../../redux/slices/MarketingAssetsSlice";

const MarketingAssetCard = ({isUpdated,data}) => {
  const dispatch = useDispatch();
  const { marketingAssetsData } = useSelector((state) => state.marketingAssets);
  const handleDeleteItem = (id) => {
    dispatch(setMarketingAssetsData(marketingAssetsData?.filter(el => el?.id !== id)));
  }

  return (
    <div className={`marketing_assets_card_container ${isUpdated ? "update":""}`}>
      <div className="marketing_assets_card">
        <div className="marketing_assets_card_header">
          <img
            src={data?.coverPhoto ? URL.createObjectURL(data?.coverPhoto) : cardBackground}
            alt=""
            className="marketing_assets_card_header_img"
          />
        </div>
        <div className="marketing_assets_card_content">
          <p className="marketing_assets_card_content_text">
            {data?.title}
          </p>
        </div>
      </div>
      <button className="marketing_assets_card_delete_button" onClick={() => handleDeleteItem(data?.id)}>
        <img src={trash} alt="" className="marketing_assets_card_delete_button_img"/>
      </button>
    </div>
  );
};

export default MarketingAssetCard;
