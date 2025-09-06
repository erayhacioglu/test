import { useDispatch, useSelector } from "react-redux";
import trash from "../../../assets/img/icons/trash.svg";
import cardBackground from "../../../assets/img/marketing_assets_background.jpg";
import { deleteMarketingAssetsData, getMarketingAssetsData } from "../../../redux/slices/MarketingAssetsSlice";

const MarketingAssetCard = ({isUpdated,data}) => {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const cardId = user?.cardId;

  const handleDeleteItem = async (id) => {
    const res = await dispatch(deleteMarketingAssetsData({catalogId:id}));
    if(res?.meta?.requestStatus === "fulfilled"){
      dispatch(getMarketingAssetsData({ cardId }));
    }
  }

  return (
    <div className={`marketing_assets_card_container ${isUpdated ? "update":""}`}>
      <div className="marketing_assets_card">
        <div className="marketing_assets_card_header">
          <img
            src={data?.coverPhoto ?? cardBackground}
            alt=""
            className="marketing_assets_card_header_img"
          />
        </div>
        <div className="marketing_assets_card_content">
          <p className="marketing_assets_card_content_text">
            {data?.name}
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
