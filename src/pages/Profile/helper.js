import phoneIcon from "../../assets/img/icons/phone.svg";
import emailIcon from "../../assets/img/icons/email.svg";
import locationIcon from "../../assets/img/icons/location.svg";
import wpIcon from "../../assets/img/icons/wp.svg";

export const profileDataIcon = [
    {
        type:"phone",
        icon:phoneIcon
    },
    {
        type:"email",
        icon:emailIcon
    },
    {
        type:"whatsapp",
        icon:wpIcon
    },
    {
        type:"location",
        icon:locationIcon
    }
]

export const generateProfileIcon = (type) => {
    if(type){
        const findIcon = profileDataIcon && profileDataIcon?.find(el => el?.type === type)
        return findIcon?.icon
    }
}