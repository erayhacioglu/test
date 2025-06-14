import { toast } from "react-hot-toast";

export default function handleErrors(error) {
  const status = error?.response?.status;

  switch (status) {
    case 401:
      toast.warning("Oturum süresi doldu • Lütfen tekrar giriş yapın", {
        icon: "🔒",
      });
      break;

    case 403:
      toast.error("Yetkisiz • Bu işlemi yapmaya yetkiniz yok", {
        icon: "⛔",
      });
      break;

    case 500:
      toast.error("Sunucu hatası • Lütfen daha sonra deneyin", {
        icon: "💥",
      });
      break;

    default:
      // ağ hatası (örn. fetch failed)
      if (!error.response) {
        toast.error("Bağlantı hatası • Sunucuya ulaşılamadı", {
          icon: "📡",
        });
      }
      break;
  }
}
