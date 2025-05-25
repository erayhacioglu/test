// Menu.jsx
import { Link, useLocation } from "react-router";
import "./menu.scss";
import menuData from "./menuData";

// Icon imports
import UserSvg from "../Icons/UserSvg";
import SocialMediaSvg from "../Icons/SocialMediaSvg";
import CompanySvg from "../Icons/CompanySvg";
import MarketingAssetsSvg from "../Icons/MarketingAssetsSvg";
import { useTranslation } from "react-i18next";

// Icon lookup
const iconData = {
  UserSvg,
  SocialMediaSvg,
  CompanySvg,
  MarketingAssetsSvg
};

const Menu = () => {
  const location = useLocation();

  const isActive = (pathname) => {
    return location?.pathname === pathname ? "active" : "";
  };

  const {t} = useTranslation();

  console.log('t', t("menu.profile"))

  return (
    <nav className="menu_container">
      {menuData.map(({ path, iconName, label }) => {
        const IconComponent = iconData[iconName];
        console.log(label, t(`menu.${label}`));


        return (
          <Link key={path} to={path} className={`menu_item ${isActive(path)}`}>
            {IconComponent && <IconComponent isActive={isActive(path)} />}
            <span className="menu_text">{t(`menu.${label}`)}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Menu;
