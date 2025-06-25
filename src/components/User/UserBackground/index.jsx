import "./user_background.scss";
import defaultBackground from "../../../assets/img/kavio_background.jpg";
import { FaImage } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { updatePageChecker } from "../../../helpers";
import { useLocation } from "react-router";
import Axios from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import UserBackgroundSkeleton from "./UserBackgroundSkeleton";

const UserBackground = () => {
  const location = useLocation();
  const { updatedPage } = useSelector((state) => state.updatePage);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);
  const userImagesState = useSelector((state) => state.userImages);

  const cardId = "1";

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("userId", cardId);
      formData.append("img", file);
      Axios.post(`/user/update-banner-img`)
        .then((res) => {
          console.log("res", res);
        })
        .catch((err) => {
          const msg =
            err?.response?.data?.message || "Arka Plan Resmi Değiştirilemedi";
          toast.error(msg);
        });
    }
  };

  if (userImagesState?.isLoading) {
    return <UserBackgroundSkeleton />;
  }

  return (
    <div className={`user_background ${isUpdated ? "update_mode" : ""}`}>
      <img
        src={userImagesState?.bannerImg ?? defaultBackground}
        alt="User background"
        className="user_background_img"
      />
      {isUpdated && (
        <div className="overlay">
          <label className="upload_btn">
            <FaImage size={20} />
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              hidden
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default UserBackground;
