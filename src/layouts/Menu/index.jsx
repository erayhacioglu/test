import { Link, useLocation } from "react-router";
import "./menu.scss";
import menuData from "./menuData";
//icons
import profileIcon from "../../assets/img/icons/profile.svg";
import socialMediaIcon from "../../assets/img/icons/social_media.svg";
import companyIcon from "../../assets/img/icons/company.svg";

const iconData = {
    profileIcon,
    socialMediaIcon,
    companyIcon
}

const Menu = () => {
    const location = useLocation();

    const isActive = (pathname) => {
        const currentPathname = location?.pathname;
        return pathname === currentPathname ? "active" : "";
    }


    return(
        <nav className="menu_container">
            {
                menuData && menuData?.map((menu,idx) => (        
            <Link to={menu?.path} className={`menu_item ${isActive(menu?.path)}`} key={idx}>
                <img src={iconData[menu?.icon]} alt="" className="menu_icon"/>
                <span className="menu_text">{menu?.link}</span>
            </Link>
                ))
            }
        </nav>
    );
}

export default Menu;