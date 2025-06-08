import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaUser } from "react-icons/fa6";
import { socialMediaPlatforms } from "../../../../../helpers";

const DesktopSocialMediaView = () => {
  const [openDropdownMenu, setOpenDropdownMenu] = useState("");
  const dropdownRefs = useRef({});

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

  return (
    <div className="social_media_view_container">
      {socialMediaPlatforms &&
        socialMediaPlatforms.map((item, idx) => (
          <div
            className="social_media_view_item"
            key={idx}
            ref={(el) => (dropdownRefs.current[item.value] = el)}
          >
            {/* Sadece bu kısma tıklanınca açılır/kapanır */}
            <div
              className="social_media_view_label"
              onClick={() => handleToggleDropdownMenu(item.value)}
            >
              <img
                src={item.icon}
                alt={item.value}
                className="social_media_view_icon"
              />
              <span className="social_media_view_text">{item.value}</span>
            </div>
              <span className="d-flex align-items-center">
                <FaChevronDown />
              </span>

            <div
              className={`social_media_dropdown_menu ${
                openDropdownMenu === item.value ? "open" : ""
              }`}
            >
              {/* İçerik sabit örnek */}
              {[...Array(3)].map((_, i) => (
                <div className="social_media_dropdown_menu_item" key={i}>
                  <div className="social_media_dropdown_menu_label">
                    <FaUser />
                    <span className="social_media_dropdown_menu_text">
                      erayhacioglu
                    </span>
                  </div>
                  <span className="d-flex align-items-center">
                    <FaChevronDown />
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DesktopSocialMediaView;
