import { toast } from "react-hot-toast";

let isRedirecting = false;

export default function handleErrors(error) {
  const status = error?.response?.status;

  switch (status) {
    case 401:
      if (!isRedirecting) {
        isRedirecting = true;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.error("Oturum süresi doldu, giriş sayfasına yönlendiriliyorsunuz.");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1000);
      }
      break;

    case 403:
      if (!isRedirecting) {
        isRedirecting = true;
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        toast.error("Yetkiniz bulunmuyor, giriş sayfasına yönlendiriliyorsunuz.");
        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1000);
      }
      break;

    case 500:
      toast.error("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
      break;

    default:
      if (!error.response) {
        toast.error("Bağlantı hatası, sunucuya ulaşılamadı.");
      }
      break;
  }
}

export function resetRedirectFlag() {
  isRedirecting = false;
}
