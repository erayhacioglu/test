import "./mobile_social_media.scss";
import plus from "../../../../assets/img/icons/plus.svg";
import addPlus from "../../../../assets/img/icons/add_plus.svg";
import { useSelector } from "react-redux";
import { generateSocialMediaIcon } from "../../../../helpers";

const MobileSocialMedia = ({ isUpdated, setIsOpen, setSelectedSocialMedia }) => {
  const handleOpen = () => setIsOpen(true);
  const {data,socialMediaPlatforms} = useSelector(state => state.socialMedia);

  const handleSelect = (item) => {
    setIsOpen(true);
    setSelectedSocialMedia(item);
  };

  const filteredPlatforms = data && socialMediaPlatforms && socialMediaPlatforms.filter((item) =>
  data?.some((d) => d.platform === item.name)
);

  return (
    <div className="social_icon_container">
      {isUpdated && (
        <button
          className="social_icon social_icon_add"
          onClick={handleOpen}
          aria-label="Add new social media"
        >
          <img src={plus} alt="Add" className="social_icon_add_img" />
        </button>
      )}

      {filteredPlatforms && filteredPlatforms?.map((item) => (
        <button
          className="social_icon"
          key={item?.displayName}
          onClick={() => handleSelect(item)}
          aria-label={`Select ${item?.displayName}`}
        >
          <img
            src={generateSocialMediaIcon(item?.name?.toLowerCase())}
            alt={item?.displayName}
            className="social_icon_img"
          />
          {isUpdated && (
            <div className="social_icon_plus">
              <img
                src={addPlus}
                alt="Plus"
                className="social_icon_plus_img"
              />
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default MobileSocialMedia;
