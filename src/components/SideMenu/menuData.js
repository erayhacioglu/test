import notice from "../../assets/img/icons/notice.svg";
import saves from "../../assets/img/icons/saves.svg";
import visitors from "../../assets/img/icons/visitors.svg";
import themes from "../../assets/img/icons/themes.svg";
import settings from "../../assets/img/icons/settings.svg";
import {LogOut} from "lucide-react";

const menuData = [
  {
    icon: notice,
    label: "Notice",
    hasChildren: false,
  },
  {
    icon: saves,
    label: "Saves",
    hasChildren: true,
    key: "saves",
    children: [{ label: "Saves 1" ,path:"/"}, { label: "Saves 2",path:"/" }],
  },
  {
    icon: visitors,
    label: "Visitors",
    hasChildren: true,
    key: "visitors",
    children: [
      { label: "Visitors 1",path:"/" },
      { label: "Visitors 2",path:"/" },
      { label: "Visitors 3" ,path:"/"},
      { label: "Visitors 4",path:"/" },
      { label: "Visitors 5",path:"/" },
    ],
  },
  {
    icon: themes,
    label: "Themes",
    hasChildren: true,
    key: "themes",
    children: [
      {
        color: "#273034",
        label: "Default",
        value:"default"
      },
      {
        color: "#2F4F4F",
        label: "Forest",
        value:"forest"
      },
      {
        color: "#176C8D",
        label: "Ocean",
        value:"ocean"
      },
      {
        color: "#D35400",
        label: "Sunset",
        value:"sunset"
      },
      {
        color: "#6A5ACD",
        label: "Lavender",
        value:"lavender"
      },
      {
        color: "#C19A6B",
        label: "Desert",
        value:"desert"
      },
      {
        color: "#4ECDC4",
        label: "Aurora",
        value:"aurora"
      },
      {
        color: "#FF6F61",
        label: "Coral",
        value:"coral"
      },
      {
        color: "#3EB489",
        label: "Mint",
        value:"mint"
      },
    ],
  },
  {
    icon: settings,
    label: "Settings",
    hasChildren: false,
  }
];

export default menuData;
