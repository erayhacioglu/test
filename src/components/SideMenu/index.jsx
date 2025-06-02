import { useSwipeable } from 'react-swipeable';
import './side_menu.scss';
import mobileButtonIcon from "../../assets/img/icons/side_menu_button.svg";
import logo from "../../assets/img/kavio_logo.png";
import avatar from "../../assets/img/avatar.png";
import menuData from './menuData';
import { useState } from 'react';
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from "../../redux/slices/ThemeSlice";

const SideMenu = ({ showSideMenu, setShowSideMenu }) => {
  const swipeHandlers = useSwipeable({
    onSwipedRight: (eventData) => {
      if (eventData.initial[0] < 30 && !showSideMenu) setShowSideMenu(true);
    },
    onSwipedLeft: () => {
      if (showSideMenu) setShowSideMenu(false);
    },
    delta: 50,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  const dispatch = useDispatch();
  const { theme } = useSelector(state => state.theme);
  const [openMenus, setOpenMenus] = useState({});

  const toggleMenu = (key) => {
    setOpenMenus((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div {...swipeHandlers}>
      {showSideMenu && (
        <div className="side_menu_backdrop active" onClick={() => setShowSideMenu(false)} />
      )}

      <div className={`side_menu ${showSideMenu ? "active" : "hidden"}`}>
        <div className="side_menu_logo">
          <img src={logo} alt="Logo" className='side_menu_logo_img' />
        </div>

        <div className="side_menu_user">
          <div className="side_menu_avatar">
            <img src={avatar} alt="User Avatar" className='side_menu_avatar_img' />
          </div>
          <div className='side_menu_info'>
            <p>Eray Hacıoğlu</p>
            <span>Frontend Developer</span>
          </div>
        </div>

        <div className="side_menu_body">
          {menuData.map((item, idx) => (
            <div className='menu_item' key={idx}>
              <div className='menu_label' onClick={() => item.hasChildren && toggleMenu(item.key || item.label)}>
                <span className='menu_icon'><img src={item.icon} alt={item.label} /></span>
                <span className='menu_text'>{item.label}</span>
                {item.hasChildren ? (
                  openMenus[item.key || item.label] ? <FaChevronUp size={16} /> : <FaChevronDown size={16} /> 
                ): <FaChevronRight size={16}/>}
              </div>

              {item.children && openMenus[item.key || item.label] && (
                <div className="menu_children">
                  {item.key === 'themes' ? (
                    item.children.map((sub, i) => (
                      <div
                        className={`theme_option ${sub.label.toLowerCase() === theme.toLowerCase() ? "selected" : ""}`}
                        key={i}
                        onClick={() => dispatch(setTheme(sub.label.toLowerCase()))}
                      >
                        <div className="color_circle" style={{ backgroundColor: sub.color }}></div>
                        <span>{sub.label}</span>
                      </div>
                    ))
                  ) : (
                    item.children.map((sub, i) => (
                      <div className='submenu_link' key={i}>{sub.label}</div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="side_menu_mobile_button" onClick={() => setShowSideMenu(prev => !prev)}>
          <img src={mobileButtonIcon} alt="Menüyü aç/kapat" />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;