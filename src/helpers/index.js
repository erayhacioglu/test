export const updatePageChecker = (pathname, updatedPage) => {
    return pathname === updatedPage;
}

import phoneIcon from "../assets/img/icons/phone.svg";
import emailIcon from "../assets/img/icons/email.svg";
import locationIcon from "../assets/img/icons/location.svg";
import wpIcon from "../assets/img/icons/wp.svg";

export const profileDataIcon = [
    {
        contactType:"phone",
        icon:phoneIcon
    },
    {
        contactType:"email",
        icon:emailIcon
    },
    {
        contactType:"whatsapp",
        icon:wpIcon
    },
    {
        contactType:"location",
        icon:locationIcon
    }
]

export const generateProfileIcon = (contactType) => {
    if(contactType){
        const findIcon = profileDataIcon && profileDataIcon?.find(el => el?.contactType === contactType)
        return findIcon?.icon
    }
}

export const linkData = [
    {
        value: "Mobil",
        contactType: "phone"
    },
    {
        value: "Whatsapp",
        contactType: "whatsapp"
    },
    {
        value: "Mail",
        contactType: "email"
    },
    {
        value: "Konum",
        contactType: "location"
    },
    {
        value: "Fax",
        contactType: "fax"
    }
];