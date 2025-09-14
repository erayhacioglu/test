import { Outlet, useLocation } from "react-router";
import "./user_layout.scss";
import Header from "../Header";
import UserBackground from "../../components/User/UserBackground";
import UserHeader from "../../components/User/UserHeader";
import Menu from "../../components/Menu";
import SideMenu from "../../components/SideMenu";
import QrCodeModal from "../../components/QrCodeModal";
import { useEffect, useMemo, useState } from "react";
import { userMenuData, interactionData } from "../../components/Menu/menuData";

const UserLayout = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const location = useLocation();
  const pathname = location?.pathname || "/";

  // 1) Path listeleri
  // Buraya uygulamandaki ilgili rotaları ekleyebilirsin.
  const userPaths = useMemo(
    () => [
      "/",                    // ana sayfa
      "/profile",
      "/social-media",
      "/company",
      "/marketing-assets",
    ],
    []
  );

  const interactionPaths = useMemo(
    () => [
      "/connections",
      "/contact",
    ],
    []
  );

  // 2) Yardımcı eşleştirme: tam eşleşme veya alt rota
  const matchAny = (path, bases) =>
    bases.some((base) => path === base || path.startsWith(base + "/"));

  // 3) Seçili menü datası
  const [selectedMenuData, setSelectedMenuData] = useState(userMenuData);

  useEffect(() => {
    if (matchAny(pathname, interactionPaths)) {
      setSelectedMenuData(interactionData);
    } else if (matchAny(pathname, userPaths)) {
      setSelectedMenuData(userMenuData);
    } else {
      // Hiçbirine uymuyorsa default olarak user menüyü göster
      setSelectedMenuData(userMenuData);
    }
  }, [pathname, userPaths, interactionPaths]);

  return (
    <>
      <SideMenu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu} />
      <Header setShowSideMenu={setShowSideMenu} />
      <div className="user_layout_container">
        <UserBackground />
        <UserHeader setQrCodeModal={setQrCodeModal} />
        <Menu userMenuData={selectedMenuData} />
        <Outlet />
      </div>
      <QrCodeModal qrCodeModal={qrCodeModal} setQrCodeModal={setQrCodeModal} />
    </>
  );
};

export default UserLayout;
