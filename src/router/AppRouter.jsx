import { Routes, Route, Navigate } from "react-router";
import { Suspense, lazy } from "react";

import ProtectedRoute from "./guards/ProtectedRoute";
import GuestRoute from "./guards/GuestRoute";
import Register from "../pages/Auth/Register";

// Fallback Loader
// import PageLoader from "./components/PageLoader";

// Layouts
const Layout = lazy(() => import("../layouts/UserLayout"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const ProfileLayout = lazy(() => import("../layouts/ProfileLayout"));

// Pages
const Login = lazy(() => import("../pages/Auth/Login"));
const DashboardPage = lazy(() => import("../pages/Analize"));
const Profile = lazy(() => import("../pages/Profile"));
const SocialMedia = lazy(() => import("../pages/SocialMedia"));
const Company = lazy(() => import("../pages/Company"));
const MarketingAssets = lazy(() => import("../pages/MarketingAssets"));
// const Forbidden = lazy(() => import("./pages/Forbidden"));
// const NotFound = lazy(() => import("./pages/NotFound"));

const AppRouter = () => {
  return (
    <Suspense>
      <Routes>
        {/* GUEST ROUTES */}
        <Route element={<GuestRoute />}>
          {/* Auth Sayfaları */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register/:uniqueId" element={<Register />} />
          </Route>
        </Route>

        {/* Kamuya açık kullanıcı profili */}
          <Route path="/user/:id" element={<ProfileLayout />}>
            <Route index element={<Navigate to="profile" replace />} />
            <Route path="profile" element={<Profile />} />
            <Route path="social-media" element={<SocialMedia />} />
            <Route path="company" element={<Company />} />
            <Route path="marketing-assets" element={<MarketingAssets />} />
          </Route>

        {/* PROTECTED ROUTES */}
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Layout />}>
            {/* Root */}
            <Route index element={<Navigate to="profile" replace />} />

            {/* Dashboard & Genel Sayfalar */}
            <Route path="charts" element={<DashboardPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="social-media" element={<SocialMedia />} />
            <Route path="company" element={<Company />} />
            <Route path="marketing-assets" element={<MarketingAssets />} />

            {/* <Route path="forbidden" element={<Forbidden />} /> */}
          </Route>
        </Route>

        {/* 404 */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </Suspense>
  );
};

export default AppRouter;
