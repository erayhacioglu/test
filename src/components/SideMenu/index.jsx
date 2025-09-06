import { useSwipeable } from "react-swipeable";
import "./side_menu.scss";
import mobileButtonIcon from "../../assets/img/icons/side_menu_button.svg";
import logo from "../../assets/img/kavio_logo.png";
import avatar from "../../assets/img/avatar.png";
import menuData from "./menuData";
import { FaChevronDown, FaChevronRight, FaChevronUp } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { getAllThemes, setTheme } from "../../redux/slices/ThemeSlice";

const SideMenu = ({ showSideMenu, setShowSideMenu }) => {
  const swipeHandlers = useSwipeable({
    onSwipedRight: (eventData) => {
      if (eventData.initial[0] < 30 && !showSideMenu) {
        setShowSideMenu(true);
      }
    },
    onSwipedLeft: () => {
      if (showSideMenu) {
        setShowSideMenu(false);
      }
    },
    delta: 50,
    preventScrollOnSwipe: true,
    trackTouch: true,
    trackMouse: false,
  });

  const dispatch = useDispatch();
  const { themes } = useSelector((state) => state.theme);
  const { user } = useSelector((state) => state.user);
  const [activeMenu, setActiveMenu] = useState([]);

  console.log('themes', themes)

  const handleClickDropdownMenu = (item) => {
    if (item?.hasChildren) {
      if (activeMenu === item?.key) {
        setActiveMenu("");
      } else {
        setActiveMenu(item?.key);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    dispatch(getAllThemes({signal: controller.signal }));
    return () => {
      controller.abort();
    };
  },[dispatch]);

  return (
    <div {...swipeHandlers}>
      {showSideMenu && (
        <div
          className="side_menu_backdrop active"
          onClick={() => setShowSideMenu(false)}
        />
      )}
      <div className={`side_menu ${showSideMenu ? "active" : "hidden"}`}>
        <div className="side_menu_logo">
          <img src={logo} alt="" className="logo_img" />
        </div>
        {
          user ? <>
          <div className="side_menu_user">
          <div className="side_menu_avatar">
            <img src={avatar} alt="" className="side_menu_avatar_img" />
          </div>
          <div className="side_menu_info">
            <h2 className="side_menu_info_fullname">Eray Hacıoğlu</h2>
            <h5 className="side_menu_info_title">Frontend Developer</h5>
          </div>
        </div>
        <div className="side_menu_content">
          {menuData &&
            menuData?.map((item, idx) => (
              <div className="menu_item" key={idx}>
                <div
                  className="menu_label_container"
                  onClick={() => handleClickDropdownMenu(item)}
                >
                  <div className="menu_label">
                    <img src={item?.icon} alt="" className="menu_item_icon" />
                    <span className="menu_label_text">{item?.label}</span>
                  </div>
                  <div className="menu_item_arrow">
                    {item?.hasChildren ? (
                      <>
                        {activeMenu === item?.key ? (
                          <FaChevronUp size={16} />
                        ) : (
                          <FaChevronDown size={16} />
                        )}
                      </>
                    ) : (
                      <FaChevronRight size={16} />
                    )}
                  </div>
                </div>

                {item?.hasChildren && activeMenu === item?.key && (
                  <div className="menu_children">
                    {item?.key === "themes"
                      ? themes && themes?.length > 0 && themes?.map((el, key) => (
                          <div
                            className={`theme_option`}
                            key={key}
                          >
                            <div
                              className="color_circle"
                              style={{ backgroundColor: el?.primaryColor }}
                            ></div>
                            <span style={{textTransform:"capitalize"}}>{el?.name}</span>
                          </div>
                        ))
                      : item?.children?.map((el, key) => (
                          <Link
                            to={el?.path}
                            key={key}
                            className="menu_children_link"
                          >
                            {el?.label}
                          </Link>
                        ))}
                  </div>
                )}
              </div>
            ))}
        </div>
          
          </>:"BURASI"
        }
        <div
          className="side_menu_mobile_button"
          onClick={() => setShowSideMenu((prev) => !prev)}
        >
          <img src={mobileButtonIcon} alt="Menüyü aç/kapat" />
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
