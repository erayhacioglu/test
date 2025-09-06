import "./user_background.scss";
import defaultBackground from "../../../assets/img/kavio_background.jpg";
import { FaImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { updatePageChecker } from "../../../helpers";
import { useLocation } from "react-router";
import Axios from "../../../api/axiosInstance";
import toast from "react-hot-toast";
import UserBackgroundSkeleton from "./UserBackgroundSkeleton";
import { getUserImages } from "../../../redux/slices/UserImagesSlice";

const UserBackground = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { updatedPage } = useSelector((state) => state.updatePage);
  const { user } = useSelector((state) => state.user);

  const isUpdated = updatePageChecker(location.pathname, updatedPage);
  const userImagesState = useSelector((state) => state.userImages);

  const cardId = user?.cardId;

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("userId", cardId);
      formData.append("img", file);
      Axios.post(`/user/update-banner-img`,formData,{
        headers:{
          "Content-Type":"multipart/form-data"
        }
      })
        .then((res) => {
          if(res?.status === 200){
          toast.success(res?.data);
          dispatch(getUserImages({ cardId }));
        }
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
