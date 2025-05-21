import {useState} from "react"
import {Outlet} from "react-router"
import './user_layout.scss'
import Header from "../Header";
import UserBackground from "../../components/User/UserBackground";
import UserHeader from "../../components/User/UserHeader";
import Menu from "../Menu";
import SideMenu from "../../components/SideMenu";

const UserLayout = () => {
    const [show, setShow] = useState(false)

    return(
        <>
            <SideMenu show={show} setShow={setShow}/>
            <Header setShow={setShow}/>
            <div className="user_layout_container">
                <UserBackground />
                <UserHeader />
                <Menu />
                <Outlet />
            </div>
        </>
    );
}

export default UserLayout;