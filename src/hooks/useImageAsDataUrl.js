
import { useEffect, useState } from "react";

export default function useImageAsDataUrl(url) {
  const [dataUrl, setDataUrl] = useState(null);

  useEffect(() => {
    if (!url) return setDataUrl(null);

    let cancelled = false;

    fetch(url, { mode: "cors" })
      .then(r => {
        if (!r.ok) throw new Error(r.statusText);
        return r.blob();
      })
      .then(blob => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (!cancelled) setDataUrl(reader.result);
        };
        reader.readAsDataURL(blob);
      })
      .catch(err => {
        console.error("Avatar base64’e çevrilemedi:", err);
        setDataUrl(null);
      });

    return () => { cancelled = true; };
  }, [url]);

  return dataUrl;
}
