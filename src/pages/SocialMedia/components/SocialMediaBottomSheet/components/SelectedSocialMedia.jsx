import { useState } from "react";
import addPlusIcon from "../../../../../assets/img/icons/add_plus.svg";
import inputAddIcon from "../../../../../assets/img/icons/input_add.svg";
import editIcon from "../../../../../assets/img/icons/edit.svg";
import trashIcon from "../../../../../assets/img/icons/trash.svg";
import {  FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";

const SelectedSocialMedia = ({isUpdated,selectedSocialMedia}) => {
  const [addSocialMedia,setAddSocialMedia] = useState(false);
  const [updateSocialMedia,setUpdateSocialMedia] = useState(false);
  const {socialMediaData} = useSelector(state => state.socialMedia);

  const handleAddSocialMedia = (addedSocialMedia) => {
    if(isUpdated && addedSocialMedia){
      if(findSocialMedia(socialMediaData,selectedSocialMedia)?.length < 3){
        setAddSocialMedia(addedSocialMedia);
      }else{
        toast.error("En fazla 3 adet sosyal medya hesabı eklenebilir")
      }
    }
  }

  const findSocialMedia = (socialMediaData,selectedSocialMedia) => {
    return socialMediaData?.filter(el => el.platform === selectedSocialMedia?.platform)
  }

  return (
    <div className="selected_social_media_container">
      <div className="selected_social_media_header">
        <div className="selected_social_media_icon" onClick={() => handleAddSocialMedia(selectedSocialMedia)}>
          <img src={selectedSocialMedia?.icon} alt={selectedSocialMedia?.value} className="icon_img"/>
          {
            isUpdated && 
          <img src={addPlusIcon} alt="" className="plus_icon_img"/>
          }
        </div>
      </div>
      <div className="selected_social_media_body">
        {
          addSocialMedia && 
        <div className="selected_social_media_item add">
        <div className="selected_social_media_group edit">
          <input className="selected_social_media_input" />
          <img src={inputAddIcon} alt="" className="selected_social_media_icon"/>
        </div>
        <span className="selected_social_media_button">Ekle</span>
        <span className="selected_social_media_button trash ms-1" onClick={() => setAddSocialMedia(false)}><FaTimes/></span>
        </div>
        }
        {
          findSocialMedia(socialMediaData,selectedSocialMedia)?.map((item,idx) => (
            <div className="selected_social_media_item" key={idx}>
        <div className={`selected_social_media_group ${idx === updateSocialMedia ? "edit":""}`}>
          <input className="selected_social_media_input" value={item?.link} disabled={idx !== updateSocialMedia}/>
        </div>
        

        {
          isUpdated && 
            idx === updateSocialMedia ? <>
            <span className="selected_social_media_button trash">
            <FaCheck color="#70C094"/>
        </span> <span className="selected_social_media_button trash" onClick={() => setUpdateSocialMedia(false)}>
            <FaTimes />
        </span>
            </> : <>
            <span className="selected_social_media_button trash" onClick={() => setUpdateSocialMedia(idx)}>
            <img src={editIcon} alt="" />
        </span>
        <span className="selected_social_media_button trash ms-1" >
          <img src={trashIcon} alt="" />
        </span>
            </>
          
        }
        
        </div>
          ))
        }
      </div>
    </div>
  )
}

export default SelectedSocialMedia