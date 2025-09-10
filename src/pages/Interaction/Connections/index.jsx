import "../interaction.scss";
import { Link } from "react-router";
import { Ban, UserRoundX } from "lucide-react";
import useWindowSize from "../../../hooks/useWindow";
import PageTitle from "../../../components/PageTitle";
import InteractionSkeleton from "../InteractionSkeleton";

const Connections = () => {
  const windowSize = useWindowSize();

    const force = false;

    if(force){
        return <InteractionSkeleton cardControlSize={2}/>
    }

  return (
    <div className="page_container">
      <PageTitle title="Bağlantılarım" />
      <div
        className="section_container"
        style={{ paddingRight: `${windowSize?.width > 768 ? 0 : "35px"}` }}
      >
        <div className="interaction_container">
          <div className="mini_user_card_container">
            <Link to="/" className="mini_user_card">
              <div className="mini_user_card_avatar">
                <img
                  src="http://localhost:5173/src/assets/img/avatar.png"
                  alt=""
                  className="mini_user_card_img"
                />
              </div>
              <div className="mini_user_card_content">
                <h2 className="mini_user_card_fullname">Eray Hacıoğlu</h2>
                <h6 className="mini_user_card_job">Eray Hacıoğlu</h6>
              </div>
            </Link>
            <div className="mini_user_card_controls">
              <button className="mini_user_card_btn">
                <UserRoundX size="12" />
              </button>
              <button className="mini_user_card_btn">
                <Ban size="12" />
              </button>
            </div>
          </div>
          <div className="mini_user_card_container">
            <Link to="/" className="mini_user_card">
              <div className="mini_user_card_avatar">
                <img
                  src="http://localhost:5173/src/assets/img/avatar.png"
                  alt=""
                  className="mini_user_card_img"
                />
              </div>
              <div className="mini_user_card_content">
                <h2 className="mini_user_card_fullname">Eray Hacıoğlu</h2>
                <h6 className="mini_user_card_job">Eray Hacıoğlu</h6>
              </div>
            </Link>
            <div className="mini_user_card_controls">
              <button className="mini_user_card_btn">
                <UserRoundX size="12" />
              </button>
              <button className="mini_user_card_btn">
                <Ban size="12" />
              </button>
            </div>
          </div>
          <div className="mini_user_card_container">
            <Link to="/" className="mini_user_card">
              <div className="mini_user_card_avatar">
                <img
                  src="http://localhost:5173/src/assets/img/avatar.png"
                  alt=""
                  className="mini_user_card_img"
                />
              </div>
              <div className="mini_user_card_content">
                <h2 className="mini_user_card_fullname">Eray Hacıoğlu</h2>
                <h6 className="mini_user_card_job">Eray Hacıoğlu</h6>
              </div>
            </Link>
            <div className="mini_user_card_controls">
              <button className="mini_user_card_btn">
                <UserRoundX size="12" />
              </button>
              <button className="mini_user_card_btn">
                <Ban size="12" />
              </button>
            </div>
          </div>
          <div className="mini_user_card_container">
            <Link to="/" className="mini_user_card">
              <div className="mini_user_card_avatar">
                <img
                  src="http://localhost:5173/src/assets/img/avatar.png"
                  alt=""
                  className="mini_user_card_img"
                />
              </div>
              <div className="mini_user_card_content">
                <h2 className="mini_user_card_fullname">Eray Hacıoğlu</h2>
                <h6 className="mini_user_card_job">Eray Hacıoğlu</h6>
              </div>
            </Link>
            <div className="mini_user_card_controls">
              <button className="mini_user_card_btn">
                <UserRoundX size="12" />
              </button>
              <button className="mini_user_card_btn">
                <Ban size="12" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Connections;
