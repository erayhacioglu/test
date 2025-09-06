import { useEffect, useState } from "react";
import addPlusIcon from "../../../../../assets/img/icons/add_plus.svg";
import inputAddIcon from "../../../../../assets/img/icons/input_add.svg";
import editIcon from "../../../../../assets/img/icons/edit.svg";
import trashIcon from "../../../../../assets/img/icons/trash.svg";
import { FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { generateSocialMediaIcon } from "../../../../../helpers";
import {
  getSocialMediaData,
  getSocialMediaPlatformsData,
  resetSocialMedia,
  updateSocialMedia,
} from "../../../../../redux/slices/SocialMediaSlice";
import { setUpdatedPage } from "../../../../../redux/slices/UpdatePageSlice";

const SelectedSocialMedia = ({
  isUpdated,
  selectedSocialMedia,
  setSelectedSocialMedia,
  setIsOpen,
}) => {
  const [addSocialMedia, setAddSocialMedia] = useState(false);
  const [addSocialMediaData, setAddSocialMediaData] = useState({
    platform: "",
    usernameOrUrl: "",
  });
  const [updateSocialMedia2, setUpdateSocialMedia2] = useState(false);
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.socialMedia);
  const {user} = useSelector(state => state.user);

  const cardId = user?.cardId;

  const handleAddSocialMedia = (addedSocialMedia) => {
    if (isUpdated && addedSocialMedia) {
      if (findSocialMedia(data, selectedSocialMedia)?.length < 3) {
        setAddSocialMedia(addedSocialMedia);
      } else {
        toast.error("En fazla 3 adet sosyal medya hesabı eklenebilir");
      }
    }
  };

  const findSocialMedia = (data, selectedSocialMedia) => {
    return data?.filter((el) => el.platform === selectedSocialMedia?.name);
  };

  const [findedSocialMedias, setFindedSocialMedias] = useState(
    findSocialMedia(data, selectedSocialMedia)
  );

  useEffect(() => {
    setFindedSocialMedias(findSocialMedia(data, selectedSocialMedia));
  }, [data, selectedSocialMedia]);

  const handleAddSocialMediaData = async () => {
    if (!addSocialMediaData?.usernameOrUrl) {
      toast.error("Boş sosyal medya hesabı eklenemez");
    }
    const mergedData = [...data, addSocialMediaData];
    const res = await dispatch(
      updateSocialMedia({ cardId, updatedData: mergedData })
    );
    if (res?.meta?.requestStatus === "fulfilled") {
      setAddSocialMedia(false);
      setAddSocialMediaData({
        platform: "",
        usernameOrUrl: "",
      });
      setSelectedSocialMedia(false);
      setIsOpen(false);
      dispatch(getSocialMediaData({ cardId }));
      dispatch(getSocialMediaPlatformsData({ cardId }));
      dispatch(setUpdatedPage(null));
      dispatch(resetSocialMedia());
    }
  };

  const handleCurrentSocialMediaUpdate = async () => {
    const newData = data.map((item) =>
      item.id === updateSocialMedia2?.id ? updateSocialMedia2 : item
    );
    const res = await dispatch(
      updateSocialMedia({ cardId, updatedData: newData })
    );
    if (res?.meta?.requestStatus === "fulfilled") {
      setUpdateSocialMedia2(false);
      setSelectedSocialMedia(false);
      setIsOpen(false);
      dispatch(getSocialMediaData({ cardId }));
      dispatch(getSocialMediaPlatformsData({ cardId }));
      dispatch(setUpdatedPage(null));
      dispatch(resetSocialMedia());
    }
  };

  const handleCurrentSocialMediaDelete = async (id) => {
    const newData = data.filter((item) => item.id !== id);
    const res = await dispatch(
      updateSocialMedia({ cardId, updatedData: newData })
    );
    if (res?.meta?.requestStatus === "fulfilled") {
      setUpdateSocialMedia2(false);
      setSelectedSocialMedia(false);
      setIsOpen(false);
      dispatch(getSocialMediaData({ cardId }));
      dispatch(getSocialMediaPlatformsData({ cardId }));
      dispatch(setUpdatedPage(null));
      dispatch(resetSocialMedia());
    }
  };

  return (
    <div className="selected_social_media_container">
      <div className="selected_social_media_header">
        <div
          className="selected_social_media_icon"
          onClick={() => handleAddSocialMedia(selectedSocialMedia)}
        >
          <img
            src={generateSocialMediaIcon(
              selectedSocialMedia?.name?.toLowerCase()
            )}
            alt={selectedSocialMedia?.value}
            className="icon_img"
          />
          {isUpdated && (
            <img src={addPlusIcon} alt="" className="plus_icon_img" />
          )}
        </div>
      </div>
      <div className="selected_social_media_body">
        {addSocialMedia && (
          <div className="selected_social_media_item add">
            <div className="selected_social_media_group edit">
              <input
                className="selected_social_media_input"
                value={addSocialMediaData?.usernameOrUrl}
                onChange={(e) => {
                  setAddSocialMediaData({
                    platform: addSocialMedia?.name,
                    usernameOrUrl: e.target.value,
                  });
                }}
              />
              <img
                src={inputAddIcon}
                alt=""
                className="selected_social_media_icon"
              />
            </div>
            <span
              className="selected_social_media_button"
              onClick={handleAddSocialMediaData}
            >
              Ekle
            </span>
            <span
              className="selected_social_media_button trash ms-1"
              onClick={() => setAddSocialMedia(false)}
            >
              <FaTimes />
            </span>
          </div>
        )}
        {findedSocialMedias &&
          findedSocialMedias?.map((item, idx) => (
            <div className="selected_social_media_item" key={idx}>
              {isUpdated ? (
                <div
                  className={`selected_social_media_group ${
                    item?.id === updateSocialMedia2?.id ? "edit" : ""
                  }`}
                >
                  <input
                    className="selected_social_media_input"
                    value={
                      item?.id === updateSocialMedia2?.id
                        ? updateSocialMedia2?.usernameOrUrl
                        : item?.usernameOrUrl
                    }
                    disabled={item?.id !== updateSocialMedia2?.id}
                    onChange={(e) =>
                      setUpdateSocialMedia2((prev) => ({
                        ...prev,
                        usernameOrUrl: e.target.value,
                      }))
                    }
                  />
                </div>
              ) : (
                <a
                  href={item?.usernameOrUrl}
                  target="_blank"
                  className={`selected_social_media_group text-white`}
                >
                  {item?.usernameOrUrl}
                </a>
              )}

              {isUpdated ? (
                item?.id === updateSocialMedia2?.id ? (
                  <>
                    <span
                      className="selected_social_media_button trash"
                      onClick={handleCurrentSocialMediaUpdate}
                    >
                      <FaCheck color="#70C094" />
                    </span>{" "}
                    <span
                      className="selected_social_media_button trash ms-1"
                      onClick={() => setUpdateSocialMedia2(false)}
                    >
                      <FaTimes />
                    </span>
                  </>
                ) : (
                  <>
                    <span
                      className="selected_social_media_button trash"
                      onClick={() => setUpdateSocialMedia2(item)}
                    >
                      <img src={editIcon} alt="" />
                    </span>
                    <span
                      className="selected_social_media_button trash ms-1"
                      onClick={() => handleCurrentSocialMediaDelete(item?.id)}
                    >
                      <img src={trashIcon} alt="" />
                    </span>
                  </>
                )
              ) : null}
            </div>
          ))}
      </div>
    </div>
  );
};

export default SelectedSocialMedia;
