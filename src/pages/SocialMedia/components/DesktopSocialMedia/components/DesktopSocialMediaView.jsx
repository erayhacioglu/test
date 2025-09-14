import { useState } from "react";
import { useSelector } from "react-redux";
import { generateSocialMediaIcon } from "../../../../../helpers";
import SocialMediaModal from "../../SocialMediaModal";
import { Share2 } from "lucide-react";

const DesktopSocialMediaView = () => {
  const [socialMediaModal, setSocialMediaModal] = useState(false);
  const [selectedSocialMedia, setSelectedSocialMedia] = useState(false);
  const { data, socialMediaPlatforms } = useSelector(
    (state) => state.socialMedia
  );

  const filteredPlatforms =
    data &&
    socialMediaPlatforms &&
    socialMediaPlatforms.filter((item) =>
      data?.some((d) => d.platform === item.name)
    );

  return (
    <>
      <div className="social_media_view_container">
        {filteredPlatforms &&
          filteredPlatforms.map((item, idx) => (
            <div
              className="social_media_view_item"
              key={idx}
              onClick={() => {
                setSocialMediaModal(true);
                setSelectedSocialMedia(item);
              }}
            >
              <div className="social_media_view_label">
                <img
                  src={generateSocialMediaIcon(item?.name?.toLowerCase())}
                  alt={item?.displayName}
                  className="social_media_view_icon"
                />
                <span className="social_media_view_text">
                  {item?.displayName}
                </span>
              </div>
              <span className="d-flex align-items-center">
                <Share2 size={20} />
              </span>
            </div>
          ))}
      </div>
      <SocialMediaModal
        socialMediaModal={socialMediaModal}
        setSocialMediaModal={setSocialMediaModal}
        selectedSocialMedia={selectedSocialMedia}
        data={data}
      />
    </>
  );
};

export default DesktopSocialMediaView;
