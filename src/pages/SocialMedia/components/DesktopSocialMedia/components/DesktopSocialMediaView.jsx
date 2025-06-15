import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { generateSocialMediaIcon } from "../../../../../helpers";

const DesktopSocialMediaView = () => {
  const [openDropdownMenu, setOpenDropdownMenu] = useState("");
  const dropdownRefs = useRef({});
  const {isLoading,data,socialMediaPlatforms} = useSelector(state => state.socialMedia);

  const handleToggleDropdownMenu = (item) => {
    setOpenDropdownMenu((prev) => (prev === item ? "" : item));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isInsideAnyDropdown = Object.values(dropdownRefs.current).some(
        (ref) => ref && ref.contains(event.target)
      );
      if (!isInsideAnyDropdown) {
        setOpenDropdownMenu("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const filteredPlatforms = data && socialMediaPlatforms && socialMediaPlatforms.filter((item) =>
  data?.some((d) => d.platform === item.name)
);

  return (
    <div className="social_media_view_container">
      {filteredPlatforms &&
        filteredPlatforms.map((item, idx) => (
          <div
            className="social_media_view_item"
            key={idx}
            ref={(el) => (dropdownRefs.current[item?.displayName] = el)}
          >
            <div
              className="social_media_view_label"
              onClick={() => handleToggleDropdownMenu(item?.displayName)}
            >
              <img
                src={generateSocialMediaIcon(item?.name?.toLowerCase())}
                alt={item?.displayName}
                className="social_media_view_icon"
              />
              <span className="social_media_view_text">{item?.displayName}</span>
            </div>
              <span className="d-flex align-items-center">
                <FaChevronDown />
              </span>

            <div
              className={`social_media_dropdown_menu ${
                openDropdownMenu === item?.displayName ? "open" : ""
              }`}
            >
              {
                data && data?.filter(el => el.platform === item?.name)?.map((el,i) => (
                  <a href={el?.usernameOrUrl} target="_blank" className="social_media_dropdown_menu_item" key={i}>
                  <div className="social_media_dropdown_menu_label">
                    <FaUser />
                    <span className="social_media_dropdown_menu_text">
                      {el?.usernameOrUrl}
                    </span>
                  </div>
                  <span className="d-flex align-items-center">
                    <FaChevronDown />
                  </span>
                </a>
                ))
              }
            </div>
          </div>
        ))}
    </div>
  );
};

export default DesktopSocialMediaView;
