import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { generateProfileIcon } from "../../../helpers";
import copy from "../../../assets/img/icons/copy.svg";
import {FaCheck} from "react-icons/fa6"
import { useState } from "react";
import { setProfileData } from "../../../redux/slices/ProfileSlice";
import CopiedLineSkeleton from "../../../components/SkeletonLoading/CopiedLineSkeleton";
import FormFieldSkeleton from "../../../components/SkeletonLoading/FormFieldSkeleton";

const PersonalInfo = ({ isUpdated }) => {
  const dispatch = useDispatch();
  const { isLoading,data } = useSelector((state) => state.profile);
  const { t } = useTranslation();

  const [copied,setCopied] = useState(false); 

  const handleCopy = async (id,textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(id);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  };

  const handleChange = (e) => {
    const {name,value} = e.target;
    dispatch(setProfileData({
      ...data,
      userInfo:{...data.userInfo,[name]:value}
    }));
  }

  if(isLoading){
    return(
      <div className="section_container">
        {
          isUpdated ? <FormFieldSkeleton type="basic" count={3}/> : 
       <CopiedLineSkeleton copied={3}/>
        }
      </div>
    )
  }

  return(
    <>
      <PageTitle title={t("profilePage.personalInfo.pageTitle")} />
      <div className="section_container">
        {isUpdated ? (
        <>
          <div className="form_group marginBottom">
            <label className="form_label">{t("profilePage.personalInfo.name")}</label>
            <input type="text" className="form_input" name="firstName" value={data?.userInfo?.firstName} onChange={handleChange}/>
          </div>

          <div className="form_group marginBottom">
            <label className="form_label">{t("profilePage.personalInfo.surname")}</label>
            <input type="text" className="form_input" name="lastName" value={data?.userInfo?.lastName} onChange={handleChange}/>
          </div>

          <div className="form_group marginBottom">
            <label className="form_label">{t("profilePage.personalInfo.title")}</label>
            <input type="text" className="form_input" name="bio" value={data?.userInfo?.bio} onChange={handleChange}/>
          </div>
        </>
      ) : 
        (
          
          data?.contactInfos?.length > 0 && data?.contactInfos?.map((item,idx) => (
            <div className="copied_line_container" key={idx}>
              <div className="copied_line_group">
                <img src={generateProfileIcon(item?.contactType)} alt="" className="copied_line_icon"/>
                <span className="copied_line_text">{item?.value}</span>
              </div>
              <button className="copied_button" onClick={() => handleCopy(item?.id,item?.value)}>{copied && copied === item?.id ? <FaCheck color="#70C094"/> : <img src={copy} alt=""/>}</button>
            </div>
          ))
  )
      }
      </div>
    </>
  );
};

export default PersonalInfo;
