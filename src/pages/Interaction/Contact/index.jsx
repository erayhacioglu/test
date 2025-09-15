import "../interaction.scss";
import { Link } from "react-router";
import { Ban, Check, X } from "lucide-react";
import useWindowSize from "../../../hooks/useWindow";
import PageTitle from "../../../components/PageTitle";
import InteractionSkeleton from "../InteractionSkeleton";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import Axios from "../../../api/axiosInstance";
import NoRecord from "../../../components/NoRecord";

const Contact = () => {
  const windowSize = useWindowSize();
  const [contactDataLoading, setContactDataLoading] = useState(false);
  const [contactData,setContactData] = useState([]);

  console.log('contactData', contactData)

  const {user} = useSelector(state => state.user);

  

  const getAllContactData = async () => {
    try {
      setContactDataLoading(true);
      const res = await Axios.get(`/guest-contact/card/${user?.cardId}`);
      if(res?.status === 200){
        setContactData(res?.data);
      }
    } catch (error) {
        const msg = error?.reponse?.data?.detail || "Beklenmeyen Bir Hata Oluştu";
        toast.error(msg);
    } finally {
      setContactDataLoading(false);
    }
  };

  useEffect(() => {
    getAllContactData();
  },[]);

  const generalLoading = contactDataLoading;

  if (generalLoading) {
    return (
      <div className="page_container">
        <div className="section_container">
          <InteractionSkeleton cardControlSize={3} />
        </div>
      </div>
    );
  }

  return (
    <div className="page_container">
      <PageTitle title="İletişim" />
      <div
        className="section_container"
        style={{ paddingRight: `${windowSize?.width > 768 ? 0 : "35px"}` }}
      >
        {
            contactData && contactData?.length === 0 ? <NoRecord /> : <div className="interaction_container">{
                contactData?.map((item,idx) => (
                    <div className="mini_user_card_container" key={idx}>
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
                <Check size="12" />
              </button>
              <button className="mini_user_card_btn">
                <X size="12" />
              </button>
              <button className="mini_user_card_btn">
                <Ban size="12" />
              </button>
            </div>
          </div>
            ))
            }</div>
        }
      </div>
    </div>
  );
};

export default Contact;
