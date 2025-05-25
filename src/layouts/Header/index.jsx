import "./header.scss";
import logo from "../../assets/img/kavio_logo.png";
import { FaBars } from "react-icons/fa6";

const Header = ({setShowSideMenu}) => {
  return (
    <header>
      <div className="header_container">
        <div className="logo">
          <img src={logo} alt="" className="logo_img"/>
        </div>
        <button className="header_side_menu_button" onClick={() => setShowSideMenu(true)}><FaBars /></button>
      </div>
    </header>
  )
}

export default Header