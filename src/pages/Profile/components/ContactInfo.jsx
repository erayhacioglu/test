import { useTranslation } from "react-i18next";
import PageTitle from "../../../components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { generateProfileIcon, linkData } from "../../../helpers";
import trash from "../../../assets/img/icons/trash.svg";
import plus from "../../../assets/img/icons/plus.svg";
import { setProfileData } from "../../../redux/slices/ProfileSlice";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const { isLoading,data } = useSelector((state) => state.profile);
  const {t} = useTranslation();

  const handleContactInfoChange = (idx, newValue) => {
  const updated = data.contactInfos.map((item, i) =>
    i === idx ? { ...item, value: newValue } : item
  );

  dispatch(setProfileData({ ...data, contactInfos: updated }));
};


// Eklemek
const handleAddFormItem = (contactType) => {
  dispatch(
    setProfileData({
      ...data,
      contactInfos: [
        ...(Array.isArray(data?.contactInfos) ? data.contactInfos : []),
        {
          
          contactType,
          value: ""
        }
      ]
    })
  );
};

// Silmek
const handleClickDeleteItem = (index) => {
  const updatedContactInfos = (data?.contactInfos || []).filter((_,i) => i !== index
  );

  dispatch(
    setProfileData({
      ...data,
      contactInfos: updatedContactInfos,
    })
  );
};





  return (
    <>
      <PageTitle title={t("profilePage.contactInfo.pageTitle")} />
      <div className="section_container">
        <div className="add_form_item_container">
          {
            linkData?.map((item,idx) => (
              <button className="add_form_item" key={idx} onClick={() => handleAddFormItem(item?.contactType)}>
                {item?.value}&nbsp;<img src={plus} alt=""/>
              </button>
            ))
          }
        </div>

      {
        data?.contactInfos?.length > 0 && data?.contactInfos?.map((item,idx) => (
          <div className="form_group_with_delete" key={idx}>
            <div className="form_group">
            <img src={generateProfileIcon(item?.contactType)} alt={item?.value} className="form_icon" />
            <input type="text" className="form_input" value={item?.value} onChange={(e) => handleContactInfoChange(idx, e.target.value)}/>
            </div>
            <button className="form_group_delete_btn" onClick={() => handleClickDeleteItem(idx)}><img src={trash} alt="" /></button>
          </div>
        ))
      }
      </div>
    </>
  ) 
}

export default ContactInfo