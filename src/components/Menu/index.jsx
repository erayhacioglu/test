import { Link, useLocation, useParams } from "react-router";
import "./menu.scss";
import { profileMenuData } from "./menuData";

import UserSvg from "../Icons/UserSvg";
import SocialMediaSvg from "../Icons/SocialMediaSvg";
import CompanySvg from "../Icons/CompanySvg";
import MarketingAssetsSvg from "../Icons/MarketingAssetsSvg";
import { useTranslation } from "react-i18next";

const iconData = {
  UserSvg,
  SocialMediaSvg,
  CompanySvg,
  MarketingAssetsSvg,
};

const Menu = ({userMenuData=[]}) => {
  const location = useLocation();
  const params = useParams();
  const { t } = useTranslation();

  const isPublicProfile = location.pathname.startsWith("/user/");

  const isActive = (fullPath) => location.pathname === fullPath ? "active" : "";

  const menuItems = isPublicProfile
    ? (profileMenuData.length ? profileMenuData : userMenuData)
    : userMenuData;

  return (
    <nav className="menu_container">
      {menuItems?.map(({ path, iconName, label }) => {
        const IconComponent = iconData[iconName];

        // Public profilde dinamik path oluştur
        const fullPath = isPublicProfile
          ? `/user/${params.id}/${path}`
          : path;

        return (
          <Link key={fullPath} to={fullPath} className={`menu_item ${isActive(fullPath)}`}>
            {IconComponent && <IconComponent isActive={isActive(fullPath)} />}
            <span className="menu_text">{t(`menu.${label}`)}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default Menu;
