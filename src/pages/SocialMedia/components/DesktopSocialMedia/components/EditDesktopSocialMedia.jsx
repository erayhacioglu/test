import searchIcon from "../../../../../assets/img/icons/search.svg";
import plusIcon from "../../../../../assets/img/icons/plus.svg";
import trash from "../../../../../assets/img/icons/trash.svg";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { generateSocialMediaIcon } from "../../../../../helpers";
import {
  setAddedSocialMediaPlatforms,
  setUpdateSocialMedia,
} from "../../../../../redux/slices/SocialMediaSlice";

const EditDesktopSocialMedia = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const { isLoading, data, socialMediaPlatforms, addedSocialMediaPlatforms } =
    useSelector((state) => state.socialMedia);
  const [filteredSocialMediaPlatforms, setFilteredSocialMediaPlatforms] =
    useState(socialMediaPlatforms);

  const filteredSearchChange = (searchText) => {
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      const filtered = socialMediaPlatforms?.filter((el) =>
        el?.name.toLowerCase().includes(lowerSearch)
      );
      setFilteredSocialMediaPlatforms(filtered);
    } else {
      setFilteredSocialMediaPlatforms(socialMediaPlatforms);
    }
  };

  const handleAddedSocialMediaPlatforms = (item) => {
    const newItem = {
      usernameOrUrl: "",
      platform: item?.name,
    };

    dispatch(
      setAddedSocialMediaPlatforms([
        ...(addedSocialMediaPlatforms || []),
        newItem,
      ])
    );
  };

  const handleDeleteSocialMediaPlatforms = (index) => {
    dispatch(
      setAddedSocialMediaPlatforms(
        addedSocialMediaPlatforms?.filter((_, i) => i !== index)
      )
    );
  };

  const handleDeleteSocialMediaData = (index) => {
    dispatch(setUpdateSocialMedia(data?.filter((_, i) => i !== index)));
  };

  const handleChangeSocailMediaPlatforms = (index, value) => {
    const updatedList = [...addedSocialMediaPlatforms];
    updatedList[index] = {
      ...updatedList[index],
      usernameOrUrl: value,
    };

    dispatch(setAddedSocialMediaPlatforms(updatedList));
  };

  const handleChangeSocailMediaData = (index, value) => {
    const updatedList = [...data];
    updatedList[index] = {
      ...updatedList[index],
      usernameOrUrl: value,
    };

    dispatch(setUpdateSocialMedia(updatedList));
  };

  return (
    <div className="social_media_edit_container">
      <div className="social_media_edit_menu">
        <div className="search_container">
          <div className="search_input_group">
            <input
              type="text"
              className="search_input"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                filteredSearchChange(e.target.value);
              }}
            />
            <span className="search_icon">
              <img src={searchIcon} alt="" />
            </span>
          </div>
        </div>
        <div className="social_media_edit_menu_items">
          {filteredSocialMediaPlatforms &&
            filteredSocialMediaPlatforms?.map((item, idx) => (
              <div
                className={`social_media_edit_menu_item ${
                  addedSocialMediaPlatforms &&
                  addedSocialMediaPlatforms?.find(
                    (el) => el?.platform === item?.name
                  )
                    ? "selected"
                    : ""
                }`}
                key={idx}
                onClick={() => {
                  handleAddedSocialMediaPlatforms(item);
                }}
              >
                <span className="social_media_edit_menu_item_text">
                  {item?.displayName}
                </span>
                <span>
                  <img src={plusIcon} alt="" />
                </span>
              </div>
            ))}
        </div>
      </div>
      <div className="social_media_edit_content">
        {addedSocialMediaPlatforms &&
          addedSocialMediaPlatforms?.map((el, index) => (
            <div className="social_media_edit_input_group_item" key={index}>
              <div className="social_media_edit_input_group">
                <label className="social_media_edit_label">
                  {
                    socialMediaPlatforms?.find((e) => e.name === el?.platform)
                      ?.displayName
                  }
                </label>
                <input
                  type="text"
                  className="social_media_edit_input"
                  value={el?.usernameOrUrl}
                  onChange={(e) =>
                    handleChangeSocailMediaPlatforms(index, e.target.value)
                  }
                />
                <img
                  src={generateSocialMediaIcon(
                    socialMediaPlatforms
                      ?.find((e) => e.name === el?.platform)
                      ?.name?.toLowerCase()
                  )}
                  alt=""
                  className="social_media_edit_icon"
                />
              </div>
              <div
                className="social_media_edit_item_button"
                onClick={() => handleDeleteSocialMediaPlatforms(index)}
              >
                <FaTimes color="#ED5E5E" />
              </div>
            </div>
          ))}
        {data &&
          data?.map((item, idx) => (
            <div className="social_media_edit_input_group_item" key={idx}>
              <div className="social_media_edit_input_group">
                <label className="social_media_edit_label">
                  {
                    socialMediaPlatforms?.find(
                      (el) => el.name === item?.platform
                    )?.displayName
                  }
                </label>
                <input
                  type="text"
                  className="social_media_edit_input"
                  value={item?.usernameOrUrl}
                  onChange={(e) =>
                    handleChangeSocailMediaData(idx, e.target.value)
                  }
                />
                <img
                  src={generateSocialMediaIcon(
                    socialMediaPlatforms
                      ?.find((el) => el.name === item?.platform)
                      ?.name?.toLowerCase()
                  )}
                  alt=""
                  className="social_media_edit_icon"
                />
              </div>
              <div
                className="social_media_edit_item_button"
                onClick={() => handleDeleteSocialMediaData(idx)}
              >
                <img src={trash} alt="" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default EditDesktopSocialMedia;
