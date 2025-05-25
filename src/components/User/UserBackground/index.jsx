import "./user_background.scss";
import defaultBackground from "../../../assets/img/kavio_background.jpg";
import { FaImage } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {setBackgroundImage} from "../../../redux/slices/ProfileSlice";
import { updatePageChecker } from "../../../helpers";
import { useLocation } from "react-router";

const UserBackground = () => {
  const dispatch = useDispatch();
    const location = useLocation();
    const {updatedPage} = useSelector((state) => state.updatePage);

    const isUpdated = updatePageChecker(location.pathname, updatedPage);
  const {backgroundImage} = useSelector(state => state.profile);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      dispatch(setBackgroundImage(imageUrl));
    }
  };

  return (
    <div className={`user_background ${isUpdated ? "update_mode" : ""}`}>
      <img src={backgroundImage ?? defaultBackground} alt="User background" className="user_background_img" />
      {isUpdated && (
        <div className="overlay">
          <label className="upload_btn">
            <FaImage size={20}/>
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
