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

import linkedin from "../assets/img/icons/linkedin.svg";
import facebook from "../assets/img/icons/facebook.svg";
import github from "../assets/img/icons/github.svg";
import x from "../assets/img/icons/twitter.svg";
import youtube from "../assets/img/icons/youtube.svg";
import instagram from "../assets/img/icons/instagram.svg";
import pinterest from "../assets/img/icons/pinterest.svg";
import behance from "../assets/img/icons/behance.svg";
import dribbble from "../assets/img/icons/dribbble.svg";
import snapchat from "../assets/img/icons/snapchat.svg";
import spotify from "../assets/img/icons/spotify.svg";

const socialMediaIcons = {
    linkedin,
    facebook,
    github,
    x,
    youtube,
    instagram,
    pinterest,
    behance,
    dribbble,
    snapchat,
    spotify
}

export const generateSocialMediaIcon = (platform) => {
    return socialMediaIcons[platform]
}


export const socialMediaPlatforms = [
    {
        platform:"LINKEDIN",
        icon:linkedin,
        value:"Linkedin"
    },
    {
        platform:"FACEBOOK",
        icon:facebook,
        value:"Facebook"
    },
    {
        platform:"GITHUB",
        icon:github,
        value:"Github"
    },
    {
        platform:"X",
        icon:x,
        value:"X"
    },
    {
        platform:"YOUTUBE",
        icon:youtube,
        value:"Youtube"
    },
    {
        platform:"INSTAGRAM",
        icon:instagram,
        value:"Instagram"
    },
    {
        platform:"PINTEREST",
        icon:pinterest,
        value:"Pinterest"
    },
    {
        platform:"BEHANCE",
        icon:behance,
        value:"Behance"
    },
    {
        platform:"DRIBBBLE",
        icon:dribbble,
        value:"Dribbble"
    },
    {
        platform:"SNAPCHAT",
        icon:snapchat,
        value:"Snapchat"
    },
    {
        platform:"SPOTIFY",
        icon:spotify,
        value:"Spotify"
    },
]


export const generateMessage = (error,frontMessage) => {
    return error?.response?.data?.message || `[${frontMessage}] Beklenmeyen Bir Hata Oluştu`
}