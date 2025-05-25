import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { setPersonalInfo } from "../../../redux/slices/ProfileSlice";
import { generateProfileIcon } from "../../../helpers";
import copy from "../../../assets/img/icons/copy.svg";
import {FaCheck} from "react-icons/fa6"
import { useState } from "react";

const PersonalInfo = ({ isUpdated }) => {
  const dispatch = useDispatch();
  const { personalInfo,contactInfo } = useSelector((state) => state.profile);
  const { t } = useTranslation();

  const [copied,setCopied] = useState(false);

  const handleCopy = async (idx,textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(idx);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  };

  const handleChange = (e) => {
    const {name,value} = e.target;
    dispatch(setPersonalInfo({
      ...personalInfo,
      [name]:value
    }));
  }

  return(
    <>
      <PageTitle title={t("profilePage.personalInfo.pageTitle")} />
      <div className="section_container">
        {isUpdated ? (
        <>
          <div className="form_group marginBottom">
            <label className="form_label">{t("profilePage.personalInfo.name")}</label>
            <input type="text" className="form_input" name="name" value={personalInfo?.name} onChange={handleChange}/>
          </div>

          <div className="form_group marginBottom">
            <label className="form_label">{t("profilePage.personalInfo.surname")}</label>
            <input type="text" className="form_input" name="surname" value={personalInfo?.surname} onChange={handleChange}/>
          </div>

          <div className="form_group marginBottom">
            <label className="form_label">{t("profilePage.personalInfo.title")}</label>
            <input type="text" className="form_input" name="title" value={personalInfo?.title} onChange={handleChange}/>
          </div>
        </>
      ) : 
        (
          contactInfo && contactInfo?.map((item,idx) => (
            <div className="copied_line_container" key={idx}>
              <div className="copied_line_group">
                <img src={generateProfileIcon(item?.contactType)} alt="" className="copied_line_icon"/>
                <span className="copied_line_text">{item?.value}</span>
              </div>
              <button className="copied_button" onClick={() => handleCopy(idx,item?.value)}>{copied  && copied === idx ? <FaCheck color="#70C094"/> : <img src={copy} alt=""/>}</button>
            </div>
          ))
  )
      }
      </div>
    </>
  );
};

export default PersonalInfo;
