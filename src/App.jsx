// import { Routes, Route, Navigate } from 'react-router';
// // pages
// import UserLayout from "./layouts/UserLayout";
// import Profile from "./pages/Profile";
// import SocialMedia from "./pages/SocialMedia";
// import Company from "./pages/Company";
// import MarketingAssests from "./pages/MarketingAssets";
// import { useEffect } from 'react';
// import { useTranslation } from 'react-i18next';

import AppRouter from "./router/AppRouter";

// import {applyTheme} from "./hooks/applyTheme";
// import {  useDispatch, useSelector } from 'react-redux';
// // import themesData from "./constants/themes";
// import ProfileLayout from './layouts/ProfileLayout';

// import Login from "./pages/Auth/Login";
// import { getTheme } from './redux/slices/ThemeSlice';
// import DashboardPage from './pages/Analize';

// const App = () => {
//   const dispatch = useDispatch();
//   const {themeDetail} = useSelector(state => state.theme);

//   useEffect(() => {
//     const controller = new AbortController();
//     dispatch(getTheme({id:"2" ,signal: controller.signal }));
//     return () => controller.abort();
//   },[dispatch]);

//   useEffect(() => {
//     if (themeDetail) {
//       applyTheme(themeDetail);
//     }
//   }, [themeDetail]);

//   const {i18n} = useTranslation();

//   useEffect(() => {
//     if(!localStorage.getItem("language")){
//       localStorage.setItem("language","tr")
//       i18n.changeLanguage("tr")
//     }
//   },[i18n]);

//   return (
//     <Routes>
//       <Route path="charts" element={<DashboardPage />} />
//       <Route path="/" element={<UserLayout />}>

//         <Route index element={<Navigate to="profile" replace />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="social-media" element={<SocialMedia />} />
//         <Route path="company" element={<Company />} />
//         <Route path="marketing-assets" element={<MarketingAssests />} />
//       </Route>

//       <Route path="/user/:id" element={<ProfileLayout />}>
//         <Route index element={<Navigate to="profile" replace />} />
//         <Route path="profile" element={<Profile />} />
//         <Route path="social-media" element={<SocialMedia />} />
//         <Route path="company" element={<Company />} />
//         <Route path="marketing-assets" element={<MarketingAssests />} />
//       </Route>

//       <Route path="/login" element={<Login />}/>

//     </Routes>
//   );
// };

// export default App;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getTheme } from "./redux/slices/ThemeSlice";
import { applyTheme } from "./hooks/applyTheme";
import { hydrateAuth } from "./redux/slices/UserSlice";

const App = () => {
  const dispatch = useDispatch();
  const { themeDetail } = useSelector((state) => state.theme);
  const { i18n } = useTranslation();

  // Tema çekme
  useEffect(() => {
    const controller = new AbortController();
    dispatch(getTheme({ id: "2", signal: controller.signal }));
    return () => controller.abort();
  }, [dispatch]);

  // Tema uygula
  useEffect(() => {
    if (themeDetail) applyTheme(themeDetail);
  }, [themeDetail]);

  // Dil ayarı
  useEffect(() => {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "tr");
      i18n.changeLanguage("tr");
    }
  }, [i18n]);

  useEffect(() => {
      dispatch(hydrateAuth());
  }, [dispatch]);

  return (
    <>
      <AppRouter />
    </>
  );
};

export default App;
