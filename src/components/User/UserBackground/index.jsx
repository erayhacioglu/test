import background from "../../../assets/img/kavio_background.jpg";
import "./user_background.scss"

const UserBackground = () => {
    return(
        <div className="user_background">
            <img src={background} alt="" className="user_background_img" />
        </div>
    );
}

export default UserBackground;