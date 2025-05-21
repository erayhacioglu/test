import PageTitle from "../../../components/PageTitle";
import plusIcon from "../../../assets/img/icons/plus.svg";
import deleteIcon from "../../../assets/img/icons/trash.svg";
import { generateProfileIcon, linkData } from "../helper";


const ContactInfo = ({profileData,setProfileData}) => {
    
    const handleAddLink = (type) => {
        if(type){
            setProfileData((prev) => ({
                ...prev,
                contactInfo:[...prev.contactInfo,{
                    type,
                    info:""
                }]
            }))
        }
    }

    const handleClickDeleteItem = (index) => {
        if(index){
            setProfileData((prev) => ({
                ...prev,
                contactInfo:prev.contactInfo?.filter((_,idx) => idx + 1 !== index)
            }));
        }
    }

    return(
       <div className="col-md-6">
            <PageTitle title="İletişim Bilgileri"/>
            <div className="section_container">
                <div className="add_info_container">
                    {
                        linkData?.map((el,idx) => (
                            <button className="add_info" key={idx} onClick={() => handleAddLink(el?.type)}>{el?.link}&nbsp;<img src={plusIcon} alt="" /></button>
                        ))
                    }
                </div>
                <div style={{marginTop:"30px"}}>
                    {
                    profileData && profileData?.contactInfo?.map((item,idx) => (
                        <div className="editable_container">
                            <div className="editable_input_group" key={idx}>
                                <img src={generateProfileIcon(item?.type)} alt="" className="editable_input_icon"/>
                                <input type="text" className="editable_input" value={item?.info}/>
                            </div>
                            <button className="editable_input_delete_button" onClick={() => handleClickDeleteItem(idx + 1)}>
                                <img src={deleteIcon} alt=""/>
                            </button>
                        </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
}

export default ContactInfo;