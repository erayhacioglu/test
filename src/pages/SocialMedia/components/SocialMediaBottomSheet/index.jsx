import { BottomSheet } from "react-spring-bottom-sheet";
import searchIcon from "../../../../assets/img/icons/search.svg";
import plus from "../../../../assets/img/icons/plus.svg";
import addPlus from "../../../../assets/img/icons/add_plus.svg";
import { socialMediaPlatforms } from "../../../../helpers";
import { useEffect, useRef, useState } from "react";
import SelectedSocialMedia from "./components/SelectedSocialMedia";
import SocialMediaPlatforms from "./components/SocialMediaPlatforms";
import "./social_media_bottom_sheet.scss";

const SocialMediaBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedSocialMedia,
  setSelectedSocialMedia,
  isUpdated
}) => {
  const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState(socialMediaPlatforms);

    console.log('selectedSocialMedia', selectedSocialMedia)
  
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
        {
            selectedSocialMedia ? <SelectedSocialMedia isUpdated={isUpdated} selectedSocialMedia={selectedSocialMedia}/> : <SocialMediaPlatforms setSelectedSocialMedia={setSelectedSocialMedia} search={search} setSearch={setSearch} filteredData={filteredData} filteredSearchChange={filteredSearchChange}/>
        }
      </div>
    </BottomSheet>
  );
};

export default SocialMediaBottomSheet;
