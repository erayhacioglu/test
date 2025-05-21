import './side_menu.scss';
import mobileButtonIcon from "../../assets/img/icons/side_menu_button.svg";

const SideMenu = ({show,setShow}) => {
    return(
        <>
        {show && <div className="side_menu_backdrop" onClick={() => setShow(false)}></div>}
        <div className={`side_menu ${show ? "active":"hidden"}`}>
          Burası
          <div className="side_menu_mobile_button" onClick={() => setShow(prev => !prev)}>
            <img src={mobileButtonIcon} alt="" />
          </div>
        </div>
        </>
    );
}

export default SideMenu;