import {useState} from "react";
import PageTitle from "../../../components/PageTitle";
import copyIcon from "../../../assets/img/icons/copy.svg";

import { FaCheck } from "react-icons/fa6";
import {generateProfileIcon} from "../helper";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";



const PersonalInfo = ({profileData}) => {
    const [copied, setCopied] = useState(false);
    const location = useLocation();
    const pathname = location?.pathname?.split("/")[1];
    const {updatedPage} = useSelector(state => state.updateData);

    const handleCopy = async (idx,textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(idx);
      setTimeout(() => setCopied(false), 2000); 
    } catch (err) {
      console.error('Kopyalama hatası:', err);
    }
  };

    return(
       <div className="col-md-6">
            <PageTitle title="Kişisel Bilgiler"/>
            <div className="section_container">
            {
              pathname === updatedPage ? <>
              <div className="profile_input_group">
                <label className="profile_input_label">Ad</label>
                <input type="text" className="profile_input" value="Eray"/>
              </div>
              <div className="profile_input_group">
                <label className="profile_input_label">Soyad</label>
                <input type="text" className="profile_input" value="Hacıoğlu"/>
              </div>
              <div className="profile_input_group">
                <label className="profile_input_label">Ünvan</label>
                <input type="text" className="profile_input" value="Frontend Developer"/>
              </div>
              </> :
                profileData && profileData?.contactInfo?.map((item,idx) => (
                    <div className="info_line" key={idx}>
                        <div className="info_line_content"><img src={generateProfileIcon(item?.type)} alt=""/><span className="info_line_content_text">{item?.info}</span></div>
                        <button className="info_line_copy_button" onClick={() => handleCopy(idx + 1,item?.info)}>{copied && copied === idx + 1 ? <FaCheck color="#70C094"/>:<img src={copyIcon} alt=""/>}</button>
                    </div>
                ))
            }
            </div>
        </div>
    );
}

export default PersonalInfo;