import searchIcon from "../../../../../assets/img/icons/search.svg";
import plusIcon from "../../../../../assets/img/icons/plus.svg";

const SocialMediaPlatforms = ({
  setSelectedSocialMedia,
  search,
  setSearch,
  filteredData,
  filteredSearchChange,
}) => {
  return (
    <div className="bottom_sheet_platforms_container">
      <div className="bottom_sheet_search">
        <div className="bottom_sheet_search_group">
          <input
            type="text"
            className="bottom_sheet_search_input"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              filteredSearchChange(e.target.value);
            }}
          />
          <img src={searchIcon} alt="" className="bottom_sheet_search_icon" />
        </div>
      </div>
      <div className="bottom_sheet_menu">
        {filteredData &&
          filteredData?.map((item, idx) => (
            <div
              className="bottom_sheet_item"
              key={idx}
              onClick={() => setSelectedSocialMedia(item)}
            >
              <span className="bottom_sheet_text">{item?.value}</span>
              <span>
                <img src={plusIcon} alt="" />
              </span>
            </div>
          ))}
      </div>
    </div>
  );
};

export default SocialMediaPlatforms;
