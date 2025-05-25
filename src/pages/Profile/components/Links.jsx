import { useTranslation } from "react-i18next";
import PageTitle from "../../../../../../../Documents/GitHub/kavio-profile/src/components/PageTitle";
import trash from "../../../assets/img/icons/trash.svg";
import plus from "../../../assets/img/icons/plus.svg";
import copy from "../../../assets/img/icons/copy.svg";
import link from "../../../assets/img/icons/link.svg";
import { setLinks } from "../../../redux/slices/ProfileSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { FaCheck } from "react-icons/fa6";

const Links = ({isUpdated}) => {
  const dispatch = useDispatch();
  const {links} = useSelector(state => state.profile);
  const {t} = useTranslation();

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

  const handleAddFormItem = () => {
    dispatch(setLinks([
      ...links,
      {
        title:"",
        url:""
      }
    ]));
  }

  const handleClickDeleteItem = (index) => {
    dispatch(setLinks(links?.filter((_,i) => i !== index )));
  }
  

  return (
    <>
      <PageTitle title={t("profilePage.links.pageTitle")} />
      <div className="section_container right">
                {
                  isUpdated ? <> <div className="add_form_item_container">
                      <button className="add_form_item" onClick={handleAddFormItem}>
                        Link&nbsp;<img src={plus} alt=""/>
                      </button>
                   
                </div> {links && links?.length > 0 && links?.map((item,idx) => (
                            <div className="form_group_with_delete" key={idx}>
                              <div className="form_group">
                              <img src={link} alt={item?.value} className="form_icon" />
                              <input type="text" className="form_input" value={item?.url}/>
                              </div>
                              <button className="form_group_delete_btn" onClick={() => handleClickDeleteItem(idx)}><img src={trash} alt="" /></button>
                            </div>
                          ))}</> : links && links?.length > 0 && links?.map((item,idx) => (
                    <div className="copied_line_container" key={idx}>
                                  <div className="copied_line_group">
                                    <img src={link} alt="" className="copied_line_icon"/>
                                    <span className="copied_line_text">{item?.url}</span>
                                  </div>
                                  <button className="copied_button" onClick={() => handleCopy(idx,item?.url)}>{copied  && copied === idx ? <FaCheck color="#70C094"/> : <img src={copy} alt=""/>}</button>
                                </div>
                  ))
                }
      </div>
    </>
  )
}

export default Links