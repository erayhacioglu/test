import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getTheme } from "./redux/slices/ThemeSlice";
import { applyTheme } from "./hooks/applyTheme";
import { hydrateAuth } from "./redux/slices/UserSlice";
import AppRouter from "./router/AppRouter";

const App = () => {
  const dispatch = useDispatch();
  const { themeDetail } = useSelector((state) => state.theme);
  const { i18n } = useTranslation();
  const {user} = useSelector(state => state.user);


  // Tema çekme
  useEffect(() => {
    if(!user) return
    const controller = new AbortController();
    dispatch(getTheme({ id: "1", signal: controller.signal }));
    return () => controller.abort();
  }, [dispatch,user]);

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
