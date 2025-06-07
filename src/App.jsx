import { Routes, Route, Navigate } from 'react-router';
// pages
import UserLayout from "./layouts/UserLayout";
import Profile from "./pages/Profile";
import SocialMedia from "./pages/SocialMedia";
import Company from "./pages/Company";
import MarketingAssests from "./pages/MarketingAssets";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import {applyTheme} from "./hooks/applyTheme";
import {  useSelector } from 'react-redux';
import themesData from "./constants/themes";
import ProfileLayout from './layouts/ProfileLayout';

const App = () => {
  const {theme} = useSelector(state => state.theme);

  useEffect(() => {
    
    const selectedTheme = themesData[theme];

    if (selectedTheme) {
      applyTheme(selectedTheme);
      localStorage.setItem("theme", theme);
    } 
  }, [theme]);


  const {i18n} = useTranslation();

  useEffect(() => {
    if(!localStorage.getItem("language")){
      localStorage.setItem("language","tr")
      i18n.changeLanguage("tr")
    }
  },[i18n]);

  return (
    <Routes>
      <Route path="/" element={<UserLayout />}>
        <Route index element={<Navigate to="profile" replace />} />
        <Route path="profile" element={<Profile />} />
        <Route path="social-media" element={<SocialMedia />} />
        <Route path="company" element={<Company />} />
        <Route path="marketing-assets" element={<MarketingAssests />} />
      </Route>

      <Route path="/user/:id" element={<ProfileLayout />}>
        <Route index path='profile' element={<Profile />}/>
        <Route path="social-media" element={<SocialMedia />} />
        <Route path="company" element={<Company />} />
        <Route path="marketing-assets" element={<MarketingAssests />} />
      </Route>

    </Routes>
  );
};

export default App;



