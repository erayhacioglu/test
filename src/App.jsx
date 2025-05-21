import { useEffect } from "react";
import { Routes,Route, Navigate } from "react-router";
//pages
import UserLayout from "./layouts/UserLayout";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import SocialMedia from "./pages/SocialMedia";
import Company from "./pages/Company";
//import { useTheme } from "./hooks/useTheme";


const App = () => {
  //useTheme(themes[0])


  useEffect(() => {
    const localStorageLanguage = localStorage.getItem("language");
    if(!localStorageLanguage){
      localStorage.setItem("language","tr")
    }
  },[]);

  return(
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Navigate to="profile" replace/>} />
        <Route path="profile" element={<Profile />} />
        <Route path="social-media" element={<SocialMedia />} />
        <Route path="company" element={<Company />} />
      </Route>
      <Route path="/login" element={<Login />}/>
    </Routes>
  );
}

export default App;


const themes = [
  // Tema 1 – Canlı Turkuaz ve Koyu Mavi
  {
    primaryColor: '#1ABC9C',               // Canlı turkuaz
    backgroundColor: '#E0F7FA',            // Çok açık cam göbeği
    headerBackgroundColor: '#4DB6AC',      // Açık deniz yeşili
    textColor: '#004D40',                  // Koyu yeşil-mavi
    menuBackgroundColor: '#B2DFDB',        // Pastel deniz yeşili
    activeMenuBackgroundColor: '#26A69A',  // Orta turkuaz
    activeMenuColor: '#004D40',            // Koyu yeşil-mavi
    titleBackground: '#B2EBF2',            // Soluk turkuaz
    submitButtonBackgroundColor: '#009688',// Koyu turkuaz
    linkBackgroundColor: '#80CBC4',        // Yumuşak deniz yeşili
    labelColor: '#00695C',                 // Koyu deniz yeşili
  },

  // Tema 2 – Mor ve Lavanta
  {
    primaryColor: '#9C27B0',               // Canlı mor
    backgroundColor: '#F3E5F5',            // Açık lavanta
    headerBackgroundColor: '#BA68C8',      // Pastel mor
    textColor: '#4A148C',                  // Koyu mor
    menuBackgroundColor: '#E1BEE7',        // Soluk lavanta
    activeMenuBackgroundColor: '#AB47BC',  // Orta mor
    activeMenuColor: '#4A148C',            // Koyu mor
    titleBackground: '#EDE7F6',            // Lavanta çok açık
    submitButtonBackgroundColor: '#8E24AA',// Koyu lavanta
    linkBackgroundColor: '#CE93D8',        // Yumuşak mor
    labelColor: '#6A1B9A',                 // Morun koyusu
  },

  // Tema 3 – Canlı Turuncu ve Koyu Kırmızı
  {
    primaryColor: '#FF5722',               // Canlı turuncu
    backgroundColor: '#FBE9E7',            // Çok açık şeftali
    headerBackgroundColor: '#FF8A65',      // Pastel turuncu
    textColor: '#BF360C',                  // Koyu kırmızı-turuncu
    menuBackgroundColor: '#FFCCBC',        // Soluk turuncu
    activeMenuBackgroundColor: '#FF7043',  // Orta turuncu
    activeMenuColor: '#BF360C',            // Koyu kırmızı-turuncu
    titleBackground: '#FFEBEE',            // Çok açık kırmızı
    submitButtonBackgroundColor: '#E64A19',// Koyu turuncu
    linkBackgroundColor: '#FFAB91',        // Yumuşak turuncu
    labelColor: '#D84315',                 // Turuncu-kırmızı koyu
  },

  // Tema 4 – Nötr Gri ve Soğuk Mavi
  {
    primaryColor: '#607D8B',               // Soğuk gri-mavi
    backgroundColor: '#ECEFF1',            // Çok açık gri
    headerBackgroundColor: '#B0BEC5',      // Pastel gri-mavi
    textColor: '#263238',                  // Koyu mavi-gri
    menuBackgroundColor: '#CFD8DC',        // Açık gri-mavi
    activeMenuBackgroundColor: '#78909C',  // Orta gri-mavi
    activeMenuColor: '#263238',            // Koyu mavi-gri
    titleBackground: '#CFD8DC',            // Açık gri-mavi
    submitButtonBackgroundColor: '#546E7A',// Koyu gri-mavi
    linkBackgroundColor: '#90A4AE',        // Yumuşak gri-mavi
    labelColor: '#37474F',                 // Koyu gri-mavi
  },
];

