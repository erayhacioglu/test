import {useState} from "react";
import {FaCheck} from "react-icons/fa6";
import {useLocation} from "react-router";
import {useSelector} from "react-redux";
import PageTitle from "../../../components/PageTitle";
import plusIcon from "../../../assets/img/icons/plus.svg";
import linkIcon from "../../../assets/img/icons/link.svg";
import copyIcon from "../../../assets/img/icons/copy.svg";

const Links = ({profileData}) => {
    const location = useLocation();
    const pathname = location?.pathname?.split("/")[1];
    const {updatedPage} = useSelector(state => state?.updateData);

    const [copied, setCopied] = useState(false);
    
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
            <PageTitle title="Linkler"/>
            <div className="section_container">
                {
                    pathname === updatedPage ? <>
                    <div className="add_info_container">
                <button className="add_info">Link&nbsp;<img src={plusIcon} alt=""/></button>
            </div>
                    </> : 
                                    profileData && profileData?.links?.map((item,idx) => (
                                        <div className="info_line" key={idx}>
                                            <div className="info_line_content"><img src={linkIcon} alt=""/><span className="info_line_content_text">{item}</span></div>
                                            <button className="info_line_copy_button" onClick={() => handleCopy(idx + 1,item)}>{copied && copied === idx + 1 ? <FaCheck color="#70C094"/>:<img src={copyIcon} alt=""/>}</button>
                                        </div>
                                    ))
                                
                }
            </div>
        </div>
    );
}

export default Links;