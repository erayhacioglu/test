import { useTranslation } from "react-i18next";
import PageTitle from "../../../../../../../Documents/GitHub/kavio-profile/src/components/PageTitle";
import { useDispatch, useSelector } from "react-redux";
import { generateProfileIcon, linkData } from "../../../helpers";
import trash from "../../../assets/img/icons/trash.svg";
import plus from "../../../assets/img/icons/plus.svg";
import { setContactInfo } from "../../../redux/slices/ProfileSlice";

const ContactInfo = () => {
  const dispatch = useDispatch();
  const {contactInfo} = useSelector(state => state.profile);
  const {t} = useTranslation();

  const handleAddFormItem = (item) => {
    dispatch(setContactInfo([
      ...contactInfo,
      {
        contactType:item?.contactType,
        value:""
      }
    ]));
  }

  const handleClickDeleteItem = (index) => {
    dispatch(setContactInfo(contactInfo?.filter((_,i) => i !== index)))
  }

  return (
    <>
      <PageTitle title={t("profilePage.contactInfo.pageTitle")} />
      <div className="section_container">
        <div className="add_form_item_container">
          {
            linkData?.map((item,idx) => (
              <button className="add_form_item" key={idx} onClick={() => handleAddFormItem(item)}>
                {item?.value}&nbsp;<img src={plus} alt=""/>
              </button>
            ))
          }
        </div>

      {
        contactInfo?.length > 0 && contactInfo?.map((item,idx) => (
          <div className="form_group_with_delete" key={idx}>
            <div className="form_group">
            <img src={generateProfileIcon(item?.contactType)} alt={item?.value} className="form_icon" />
            <input type="text" className="form_input" value={item?.value}/>
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