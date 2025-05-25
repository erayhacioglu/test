import React from 'react'
import trash from "../../../assets/img/icons/trash.svg";
import cardBackground from "../../../assets/img/marketing_assets_background.jpg"

const MarketingAssetCard = () => {
  return (
    <div className='col-md-3 col-sm-6 col-xs-6 justify-content-end'>
        <div className="marketing_assets_card_container">
            <div className="marketing_assets_card">
                <div className='marketing_assets_card_header'><img src={cardBackground} alt="" className='marketing_assets_card_header_img'/></div>
                <p className='marketing_assets_card_content'>New Metallic Colors</p>
            </div>
            <button className="marketing_assets_card_delete">
                <img src={trash} alt=""/>
            </button>
        </div>
    </div>
  )
}

export default MarketingAssetCard