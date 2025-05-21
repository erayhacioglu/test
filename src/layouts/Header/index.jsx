import "./header.scss"
import logo from "../../assets/img/kavio_logo.png";
import { FaBars } from "react-icons/fa6";

const Header = ({setShow}) => {
    return(
        <header className="header">
            <div className="header_container">
                <div className="logo">
                    <img src={logo} alt="" className="logo_img" />
                </div>
                <button onClick={() => setShow(true)}><FaBars /></button>
            </div>
        </header>
    );
}

export default Header;