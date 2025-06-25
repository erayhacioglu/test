import { BottomSheet } from "react-spring-bottom-sheet";
import { useEffect, useState } from "react";
import SelectedSocialMedia from "./components/SelectedSocialMedia";
import SocialMediaPlatforms from "./components/SocialMediaPlatforms";
import "./social_media_bottom_sheet.scss";
import { useSelector } from "react-redux";

const SocialMediaBottomSheet = ({
  isOpen,
  setIsOpen,
  selectedSocialMedia,
  setSelectedSocialMedia,
  isUpdated,
}) => {
  const [search, setSearch] = useState("");
  const { socialMediaPlatforms } = useSelector((state) => state.socialMedia);
  const [filteredSocialMediaPlatforms, setFilteredSocialMediaPlatforms] =
    useState(socialMediaPlatforms);

  useEffect(() => {
    if (socialMediaPlatforms && socialMediaPlatforms?.length > 0) {
      setFilteredSocialMediaPlatforms(socialMediaPlatforms);
    }
  }, [socialMediaPlatforms]);

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

  return (
    <BottomSheet
      open={isOpen}
      onDismiss={() => {
        setIsOpen(false);
        setFilteredSocialMediaPlatforms(socialMediaPlatforms);
        setSearch("");
        setSelectedSocialMedia(false);
      }}
      defaultSnap={({ maxHeight }) => maxHeight / 2} // Ekranın yarısı
      snapPoints={({ maxHeight }) => [maxHeight / 2, maxHeight]} // Yarı ve tam ekran arasında geçiş
    >
      <div
        data-body-scroll-lock-ignore
        style={{
          padding: "1rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          overflow: "hidden",
          height: "100%",
        }}
      >
        {selectedSocialMedia ? (
          <SelectedSocialMedia
            isUpdated={isUpdated}
            selectedSocialMedia={selectedSocialMedia}
            setSelectedSocialMedia={setSelectedSocialMedia}
            setIsOpen={setIsOpen}
          />
        ) : (
          <SocialMediaPlatforms
            setSelectedSocialMedia={setSelectedSocialMedia}
            search={search}
            setSearch={setSearch}
            filteredData={filteredSocialMediaPlatforms}
            filteredSearchChange={filteredSearchChange}
          />
        )}
      </div>
    </BottomSheet>
  );
};

export default SocialMediaBottomSheet;
