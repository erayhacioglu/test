//components
import PersonalInfo from "./components/PersonalInfo";
import ContactInfo from "./components/ContactInfo";
import Links from "./components/Links";
import SEO from "../../SEO";
import { useTranslation } from "react-i18next";
import { useLocation, useParams } from "react-router";
import { updatePageChecker } from "../../helpers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getProfileData, resetProfile, updateProfileData,getOtherProfileData } from "../../redux/slices/ProfileSlice";
import toast from "react-hot-toast";
import { setUpdatedPage } from "../../redux/slices/UpdatePageSlice";


const Profile = () => {
  const location = useLocation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { updatedPage } = useSelector((state) => state.updatePage);
  const { isSuccess,isError,message,data } = useSelector((state) => state.profile);

  
  const isUpdated = updatePageChecker(location.pathname, updatedPage);
  
  const cardId = "1";
  
  const isPublicProfile = location.pathname.startsWith("/user/");
  const [userCardId,setCardId] = useState(null);

  const {id} = useParams();

  useEffect(() => {
    if(isPublicProfile && id){
      setCardId(id);
    }
  },[isPublicProfile,id]);

  useEffect(() => {
    if (isPublicProfile && !userCardId) return;
    const controller = new AbortController();

    if(isPublicProfile){
      dispatch(getOtherProfileData({ cardId:userCardId, signal: controller.signal }));
    }else{
      dispatch(getProfileData({ cardId, signal: controller.signal }));
    }

    return () => {
      controller.abort();
    };
  }, [cardId, dispatch,userCardId,isPublicProfile]);

  const handleProfileDataUpdate = async (updatedData) => {
    const res = await dispatch(updateProfileData(updatedData))
    if(res?.meta?.requestStatus === "fulfilled"){
      dispatch(getProfileData({ cardId }));
      dispatch(setUpdatedPage(null));
      dispatch(resetProfile)
    }
  }

  useEffect(() => {
    if(isSuccess && message){
      toast.success(message);
    }
    if(isError && message){
      toast.error(message);
    }
    return () => dispatch(resetProfile)
  },[dispatch,isSuccess,isError,message]);

  return (
    <>
      <SEO
        title={t("profilePage.metaTitle")}
        description={t("profilePage.metaDescription")}
        keywords={t("profilePage.metaKeywords")}
      />
      <div className="page_container">
        <div className="row">
          <div className="col-md-6">
            <PersonalInfo isUpdated={isUpdated} />
            {isUpdated && <ContactInfo />}
          </div>
          <div className="col-md-6">
            <Links isUpdated={isUpdated} />
          </div>
        </div>
        {isUpdated && (
          <div className="section_container">
            <div className="d-flex align-items-center">
              <button className="user_action_submit_button mobile me-3" onClick={() => handleProfileDataUpdate(data)}>
                Kaydet
              </button>
              <button className="user_action_submit_button cancel mobile" onClick={() => dispatch(setUpdatedPage(null))}>
                İptal
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Profile;
