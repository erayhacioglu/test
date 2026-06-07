const MAX_RETRIES = 2;
const NO_RETRY_STATUSES = [401, 403, 404];

export default async function retryRequest(error, axiosInstance) {
  const { config } = error;
  const status = error?.response?.status;

  if (!config || config.__isRetryRequest) {
    return Promise.reject(error);
  }

  if (NO_RETRY_STATUSES.includes(status)) {
    return Promise.reject(error);
  }

  config.__retryCount = config.__retryCount || 0;

  if (config.__retryCount >= MAX_RETRIES) {
    return Promise.reject(error);
  }

  config.__retryCount += 1;
  config.__isRetryRequest = true;

  return new Promise((resolve) => setTimeout(resolve, 2500)).then(() =>
    axiosInstance(config)
  );
}
