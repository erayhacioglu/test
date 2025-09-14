import { Outlet } from "react-router";
import "../UserLayout/user_layout.scss";
import UserBackground from "../../components/User/UserBackground";
import UserHeader from "../../components/User/UserHeader";
import Menu from "../../components/Menu";
import { useState } from "react";
import ContactModal from "../../components/ContactModal";

const ProfileLayout = () => {
  const [contactModal, setContactModal] = useState(false);
  return (
    <>
      <div className="user_layout_container">
        <UserBackground />
        <UserHeader setContactModal={setContactModal}/>
        <Menu />
        <Outlet />
      </div>
      <ContactModal contactModal={contactModal} setContactModal={setContactModal}/>
    </>
  )
}

export default ProfileLayout;