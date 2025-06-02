import notice from "../../assets/img/icons/notice.svg";
import saves from "../../assets/img/icons/saves.svg";
import visitors from "../../assets/img/icons/visitors.svg";
import themes from "../../assets/img/icons/themes.svg";
import settings from "../../assets/img/icons/settings.svg";

const menuData = [
    {
        icon:notice,
        label:"Notice",
        hasChildren:false,
    },
    {
        icon:saves,
        label:"Saves",
        hasChildren:false,
    },
    {
        icon:visitors,
        label:"Visitors",
        hasChildren:false,
    },
    {
        icon:themes,
        label:"Themes",
        hasChildren:true,
        key:"themes",
        children:[
            {
                color:"#273034",
                label:"Default"
            },
            {
                color:"#2F4F4F",
                label:"Forest"
            },
            {
                color:"#176C8D",
                label:"Ocean"
            },
            {
                color:"#D35400",
                label:"Sunset"
            },
            {
                color:"#6A5ACD",
                label:"Lavander"
            },
            {
                color:"#C19A6B",
                label:"Desert"
            },
            {
                color:"#4ECDC4",
                label:"Aurora"
            },
            {
                color:"#FF6F61",
                label:"Coral Reef"
            },
            {
                color:"#3EB489",
                label:"Mint Breeze"
            },
        ]
    },
    {
    icon: settings,
    label: "Settings",
    hasChildren: true,
    key: "settings",
    children: [
      { label: "Account Settings" },
      { label: "Notification Settings" },
      { label: "Privacy Settings" }
    ]
  }
];

export default menuData;