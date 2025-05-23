import {useState} from "react";
import PersonalInfo from "./components/PersonalInfo";
import Links from "./components/Links";
import ContactInfo from "./components/ContactInfo";
import "./profile.scss";
import { useLocation } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatedPage } from "../../redux/slices/UpdateDataSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const pathname = location?.pathname?.split("/")[1];
    const {updatedPage} = useSelector(state => state?.updateData);

    const [profileData,setProfileData] = useState({
        personalInfo:
            {
                name:"Eray",
                surname:"Hacıoğlu",
                title:"Frontend Developer"
            },
        links:[
            "sedanursahintas.com.tr",
            "kavio.com.tr",
            "loremipsum.com.tr"
        ],
        contactInfo:[
            {
                type:"phone",
                info:"+90 545 678 90 02"
            },
            {
                type:"phone",
                info:"+90 545 678 90 02"
            },
            {
                type:"whatsapp",
                info:"+90 545 678 90 02"
            },
            {
                type:"email",
                info:"eray.hacioglu@ibb.gov.tr"
            },
            {
                type:"location",
                info:"Gaziosmanpaşa - İstanbul"
            }
        ]
        
    });

    return(
        <div className="page_container">
            <div className="row">
                <div className="col-md-6">
                <PersonalInfo profileData={profileData} setProfileData={setProfileData}/>
                {
                    pathname === updatedPage && 
                <ContactInfo profileData={profileData} setProfileData={setProfileData}/>
                }
                </div>
                <div className="col-md-6">
                <Links profileData={profileData} setProfileData={setProfileData}/>
                </div>
            </div>
            {
                pathname === updatedPage && 
            <div className="section_container">
                <div className="d-flex align-items-center justify-content-end"><button className="user_action_submit_button cancel mobile" onClick={() => dispatch(setUpdatedPage(""))}>İptal</button><button className="user_action_submit_button mobile ms-3">Kaydet</button></div>
            </div>
            }
        </div>
    );
}

export default Profile;