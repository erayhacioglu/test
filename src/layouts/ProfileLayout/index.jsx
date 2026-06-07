import { Outlet, useParams } from "react-router";
import "../UserLayout/user_layout.scss";
import UserBackground from "../../components/User/UserBackground";
import UserHeader from "../../components/User/UserHeader";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import ContactModal from "../../components/ContactModal";
import { getCardTheme } from "../../redux/slices/ThemeSlice";
import { applyTheme } from "../../hooks/applyTheme";
import Axios from "../../api/axiosInstance";

const ProfileLayout = () => {
  const [contactModal, setContactModal] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    Axios.get(`/card/theme/${id}`, { signal: controller.signal })
      .then((res) => {
        if (res?.data) {
          applyTheme(res.data);
        }
      })
      .catch(() => {});
    return () => controller.abort();
  }, [id]);

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
