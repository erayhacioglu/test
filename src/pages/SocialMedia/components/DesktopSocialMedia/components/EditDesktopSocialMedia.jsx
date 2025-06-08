import searchIcon from "../../../../../assets/img/icons/search.svg";
import plusIcon from "../../../../../assets/img/icons/plus.svg";
import trash from "../../../../../assets/img/icons/trash.svg";
import { socialMediaPlatforms } from "../../../../../helpers";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";

const EditDesktopSocialMedia = () => {
    const [selectedSocialMediaPlatform,setSelectedSocialMediaPlatform] = useState("");
    const [search, setSearch] = useState("");
  const [filteredSocialMediaPlatforms, setFilteredSocialMediaPlatforms] = useState(socialMediaPlatforms);

  const filteredSearchChange = (searchText) => {
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      const filtered = socialMediaPlatforms?.filter((el) =>
        el?.value.toLowerCase().includes(lowerSearch)
      );
      setFilteredSocialMediaPlatforms(filtered);
    } else {
      setFilteredSocialMediaPlatforms(socialMediaPlatforms);
    }
  };

  const mockData = [
    {
        platform:"INSTAGRAM",
        link:"erayhacioglu"
    },
    {
        platform:"INSTAGRAM",
        link:"erayhacioglu"
    },
    {
        platform:"YOUTUBE",
        link:"erayhacioglu"
    },
    {
        platform:"PINTEREST",
        link:"erayhacioglu"
    },
    {
        platform:"PINTEREST",
        link:"erayhacioglu"
    },
    {
        platform:"DRIBBBLE",
        link:"erayhacioglu"
    },
    {
        platform:"DRIBBBLE",
        link:"erayhacioglu"
    },
    {
        platform:"SNAPCHAT",
        link:"erayhacioglu"
    },
    {
        platform:"SNAPCHAT",
        link:"erayhacioglu"
    },
    {
        platform:"FACEBOOK",
        link:"erayhacioglu"
    },
    {
        platform:"FACEBOOK",
        link:"erayhacioglu"
    },
  ]
    
  return (
    <div className='social_media_edit_container'>
        <div className="social_media_edit_menu">
            <div className="search_container">
                <div className="search_input_group">
                    <input type="text" className="search_input" value={search} onChange={(e) => {
                    setSearch(e.target.value);
                    filteredSearchChange(e.target.value);
                  }}/>
                    <span className="search_icon">
                        <img src={searchIcon} alt=""/>
                    </span>
                </div>
            </div>
            <div className="social_media_edit_menu_items">
                {
                    filteredSocialMediaPlatforms && filteredSocialMediaPlatforms?.map((item,idx) => (

                <div className={`social_media_edit_menu_item ${selectedSocialMediaPlatform?.platform === item?.platform ? "selected":""}`} key={idx} onClick={() => setSelectedSocialMediaPlatform(item)}>
                    <span className="social_media_edit_menu_item_text">{item?.value}</span>
                    <span>
                        <img src={plusIcon} alt=""/>
                    </span>
                </div>
                    ))
                }
            </div>
        </div>
        <div className="social_media_edit_content">
            {
                selectedSocialMediaPlatform && <div className="social_media_edit_input_group_item">
            <div className="social_media_edit_input_group">
                <label className="social_media_edit_label">{socialMediaPlatforms?.find(el => el.platform === selectedSocialMediaPlatform?.platform)?.value}</label>
                <input type="text" className="social_media_edit_input"/>
                <img src={socialMediaPlatforms?.find(el => el.platform === selectedSocialMediaPlatform?.platform)?.icon} alt="" className="social_media_edit_icon"/>
            </div>
            {/* <>
            <div className="social_media_edit_item_button">
                <FaCheck />
            </div>
            <div className="social_media_edit_item_button">
                <FaTimes />
            </div>
            </> */}
            <div className="social_media_edit_item_button" onClick={() => setSelectedSocialMediaPlatform("")}>
                <FaTimes color="#ED5E5E"/>
            </div>
            </div>
            }
            {
                mockData?.map((item,idx) => (
            <div className="social_media_edit_input_group_item" key={idx}>
            <div className="social_media_edit_input_group">
                <label className="social_media_edit_label">{socialMediaPlatforms?.find(el => el.platform === item?.platform)?.value}</label>
                <input type="text" className="social_media_edit_input" value={item?.link}/>
                <img src={socialMediaPlatforms?.find(el => el.platform === item?.platform)?.icon} alt="" className="social_media_edit_icon"/>
            </div>
            <div className="social_media_edit_item_button">
                <img src={trash} alt="" />
            </div>
            </div>
                ))
            }
        </div>
    </div>
  )
}

export default EditDesktopSocialMedia