import { BottomSheet } from "react-spring-bottom-sheet";
import searchIcon from "../../../assets/img/icons/search.svg";
import plus from "../../../assets/img/icons/plus.svg";
import addPlus from "../../../assets/img/icons/add_plus.svg";
import { socialMediaPlatforms } from "../../../helpers";
import { useEffect, useRef, useState } from "react";

const SocialMediaBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedSocialMedia,
  setSelectedSocialMedia,
}) => {
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState(socialMediaPlatforms);

  const searchInputRef = useRef(null);

  const filteredSearchChange = (searchText) => {
    if (searchText) {
      const lowerSearch = searchText.toLowerCase();
      const filtered = socialMediaPlatforms?.filter((el) =>
        el?.value.toLowerCase().includes(lowerSearch)
      );
      setFilteredData(filtered);
    } else {
      setFilteredData(socialMediaPlatforms);
    }
  };

  useEffect(() => {
    const root = document.getElementById("root");

    if (isOpen) {
      // 1. Odağı modal içine taşı
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100); // biraz gecikme ile daha stabil çalışır

      // 2. Arka plan odakta mı? Blur yap
      if (root?.contains(document.activeElement)) {
        document.activeElement.blur();
      }

      // 3. Arka planı erişilemez yap
      root?.setAttribute("inert", "");
    } else {
      // Modal kapandığında arka plan tekrar erişilebilir olmalı
      root?.removeAttribute("inert");
    }
  }, [isOpen]);

  return (
    <BottomSheet
      open={isOpen}
      onDismiss={() => {
        setIsOpen(false);
        setFilteredData(socialMediaPlatforms);
        setSearch("");
        setSelectedSocialMedia(false);
      }}
      defaultSnap={({ maxHeight }) => maxHeight / 2} // Ekranın yarısı
      snapPoints={({ maxHeight }) => [maxHeight / 2, maxHeight]} // Yarı ve tam ekran arasında geçiş
    >
      <div
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {selectedSocialMedia ? (
          <>
            <button className="mobile_social_media_icon">
              <img
                src={selectedSocialMedia?.icon}
                alt={selectedSocialMedia?.value}
                className="mobile_social_media_icon_img"
              />
            </button>
          </>
        ) : (
          <>
            <div className="bottom_sheet_search_container">
              <div className="bottom_sheet_search">
                <input
                  ref={searchInputRef}
                  type="text"
                  className="bottom_sheet_search_input"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    filteredSearchChange(e.target.value);
                  }}
                />
                <img
                  src={searchIcon}
                  alt=""
                  className="bottom_sheet_search_img"
                />
              </div>
            </div>
            <div className="bottom_sheet_social_media_container">
              {filteredData &&
                filteredData?.map((item, idx) => (
                  <div
                    className="bottom_sheet_social_media_item"
                    key={idx}
                    onClick={() => setSelectedSocialMedia(item)}
                  >
                    <span className="bottom_sheet_social_media_text">
                      {item?.value}
                    </span>
                    <img
                      src={plus}
                      alt=""
                      className="bottom_sheet_social_media_img"
                    />
                  </div>
                ))}
            </div>
          </>
        )}
      </div>
    </BottomSheet>
  );
};

export default SocialMediaBottomSheet;
