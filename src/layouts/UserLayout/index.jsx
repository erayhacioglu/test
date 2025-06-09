import { Outlet } from "react-router";
import "./user_layout.scss";
import Header from "../Header";
import UserBackground from "../../components/User/UserBackground";
import UserHeader from "../../components/User/UserHeader";
import Menu from "../../components/Menu";
import SideMenu from "../../components/SideMenu";
import QrCodeModal from "../../components/QrCodeModal";
import { useState } from "react";

const UserLayout = () => {
  const [showSideMenu,setShowSideMenu] = useState(false);
  const [qrCodeModal,setQrCodeModal] = useState(false);
  return (
    <>
      <SideMenu showSideMenu={showSideMenu} setShowSideMenu={setShowSideMenu}/>
      <Header setShowSideMenu={setShowSideMenu}/>
      <div className="user_layout_container">
        <UserBackground />
        <UserHeader setQrCodeModal={setQrCodeModal}/>
        <Menu />
        <Outlet />
      </div>
      <QrCodeModal qrCodeModal={qrCodeModal} setQrCodeModal={setQrCodeModal}/>
    </>
  )
}

export default UserLayout;