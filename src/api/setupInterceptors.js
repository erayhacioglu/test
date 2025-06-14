// setupInterceptors.js
import attachAuthToken from "./interceptors/request/attachAuthToken";
import handleErrors    from "./interceptors/response/handleErrors";
import retryRequest    from "./interceptors/response/retryRequest";

export default function setupInterceptors(axiosInstance) {
  /* ---------- REQUEST ---------- */
  axiosInstance.interceptors.request.use(
    (config) => {
      if (!config.signal && typeof AbortController !== "undefined") {
        const controller       = new AbortController();
        config.signal          = controller.signal;  
        config.abortController = controller;
      }
      return attachAuthToken(config);
    },
    (error) => Promise.reject(error)
  );

  /* ---------- RESPONSE ---------- */
  axiosInstance.interceptors.response.use(
    (response) => response,
    (error)    => {
      if (error.code === "ERR_CANCELED" || axiosInstance.isCancel?.(error)) {
        console.warn("Axios isteği iptal edildi.");
        return Promise.reject(error);
      }
      handleErrors(error);                       
      return retryRequest(error, axiosInstance);
    }
  );
}
