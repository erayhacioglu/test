import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";
import trash from "../../../assets/img/icons/trash.svg";
import plus from "../../../assets/img/icons/plus.svg";
import copy from "../../../assets/img/icons/copy.svg";
import link from "../../../assets/img/icons/link.svg";
import { useDispatch, useSelector } from "react-redux";
import {  useState } from "react";
import { FaCheck } from "react-icons/fa6";
import { setProfileData } from "../../../redux/slices/ProfileSlice";
import CopiedLineSkeleton from "../../../components/SkeletonLoading/CopiedLineSkeleton";
import FormFieldSkeleton from "../../../components/SkeletonLoading/FormFieldSkeleton";

const Links = ({isUpdated}) => {
  const dispatch = useDispatch();
  const { isLoading,data } = useSelector((state) => state.profile);
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
    dispatch(setProfileData({
      ...data,
      links:[...data.links,{
        position:data?.links?.length + 1,
        title:"UNKNOWN",
        value:""
      }]
    }));
  }

  const handleClickDeleteItem = (id) => {
  const updatedLinks = (data?.links || []).filter((el) => el.id !== id);

  dispatch(
    setProfileData({
      ...data,       
      links: updatedLinks, 
    })
  );
};

const handleInputChange = (idx, newValue) => {
  const updatedLinks = [...(data?.links || [])].map((link, index) =>
    index === idx ? { ...link, value: newValue } : link
  );

  dispatch(setProfileData({
    ...data,
    links: updatedLinks
  }));
};



  const sortLinksByPosition = (links = []) =>
  [...links].sort((a, b) => a.position - b.position);

  if(isLoading){
    return(
      <div className="section_container right">
        {
          isUpdated ? <FormFieldSkeleton type="withDelete" count={3} showAddItems={true} addItemCount={1}/> : 
       <CopiedLineSkeleton copied={3}/>
        }
      </div>
    );
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
                   
                </div> {sortLinksByPosition(data?.links) && sortLinksByPosition(data?.links)?.length > 0 && sortLinksByPosition(data?.links)?.map((item,idx) => (
                            <div className="form_group_with_delete" key={idx}>
                              <div className="form_group">
                              <img src={link} alt={item?.value} className="form_icon" />
                              <input type="text" className="form_input" value={item?.value} onChange={(e) => handleInputChange(idx, e.target.value)}/>
                              </div>
                              <button className="form_group_delete_btn" onClick={() => handleClickDeleteItem(item?.id)}><img src={trash} alt="" /></button>
                            </div>
                          ))}</> : sortLinksByPosition(data?.links) && sortLinksByPosition(data?.links)?.length > 0 && sortLinksByPosition(data?.links)?.map((item,idx) => (
                    <div className="copied_line_container" key={idx}>
                                  <div className="copied_line_group">
                                    <img src={link} alt="" className="copied_line_icon"/>
                                    <span className="copied_line_text">{item?.value}</span>
                                  </div>
                                  <button className="copied_button" onClick={() => handleCopy(item?.id,item?.value)}>{copied  && copied === item?.id ? <FaCheck color="#70C094"/> : <img src={copy} alt=""/>}</button>
                                </div>
                  ))
                }
      </div>
    </>
  )
}

export default Links