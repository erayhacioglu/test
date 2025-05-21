import PageTitle from "../../../components/PageTitle";
import plusIcon from "../../../assets/img/icons/plus.svg";


const ContactInfo = () => {
    const linkData = ["Mobil","Whatsapp","Mail","Konum","Fax"]
    return(
       <div className="col-md-6">
            <PageTitle title="İletişim Bilgileri"/>
            <div className="section_container">
            <div className="add_info_container">
                {
                    linkData?.map((el,idx) => (
                        <button className="add_info" key={idx}>{el}&nbsp;<img src={plusIcon} alt="" /></button>
                    ))
                }
            </div>
            </div>
        </div>
    );
}

export default ContactInfo;