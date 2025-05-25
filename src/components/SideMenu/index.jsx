// import './side_menu.scss';
// import mobileButtonIcon from "../../assets/img/icons/side_menu_button.svg";

// const SideMenu = ({showSideMenu,setShowSideMenu}) => {
//     return(
//         <>
//         {showSideMenu && <div className="side_menu_backdrop" onClick={() => setShowSideMenu(false)}></div>}
//         <div className={`side_menu ${showSideMenu ? "active":"hidden"}`}>
//           Burası
//           <div className="side_menu_mobile_button" onClick={() => setShowSideMenu(prev => !prev)}>
//             <img src={mobileButtonIcon} alt="" />
//           </div>
//         </div>
//         </>
//     );
// }

// export default SideMenu;


import { useSwipeable } from 'react-swipeable';
import './side_menu.scss';
import mobileButtonIcon from "../../assets/img/icons/side_menu_button.svg";

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

  return (
    <div {...swipeHandlers}>
      {showSideMenu && (
        <div
          className="side_menu_backdrop active"
          onClick={() => setShowSideMenu(false)}
        />
      )}
      <div className={`side_menu ${showSideMenu ? "active" : "hidden"}`}>
        Menü İçeriği Burada
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
