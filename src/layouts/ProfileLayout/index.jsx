import { Outlet } from "react-router";
import "../UserLayout/user_layout.scss";
import UserBackground from "../../components/User/UserBackground";
import UserHeader from "../../components/User/UserHeader";
import Menu from "../../components/Menu";

const ProfileLayout = () => {
  return (
    <>
      <div className="user_layout_container">
        <UserBackground />
        <UserHeader />
        <Menu />
        <Outlet />
      </div>
    </>
  )
}

export default ProfileLayout;