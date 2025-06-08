import "./mobile_social_media.scss";
import { socialMediaPlatforms } from "../../../../helpers";
import plus from "../../../../assets/img/icons/plus.svg";
import addPlus from "../../../../assets/img/icons/add_plus.svg";

const MobileSocialMedia = ({ isUpdated, setIsOpen, setSelectedSocialMedia }) => {
  const handleOpen = () => setIsOpen(true);

  const handleSelect = (item) => {
    setIsOpen(true);
    setSelectedSocialMedia(item);
  };

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

      {socialMediaPlatforms?.map((item) => (
        <button
          className="social_icon"
          key={item.value}
          onClick={() => handleSelect(item)}
          aria-label={`Select ${item.label}`}
        >
          <img
            src={item.icon}
            alt={item.label}
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
