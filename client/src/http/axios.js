import axios from 'axios';

const $api = axios.create({
  withCredentials: true, //автоматич запись cookie к каждому запросу
  baseURL: process.env.REACT_APP_API_URL,
});

// автозапись access token в headers запроса
$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

// перезапись токен
$api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}api/user/refresh`,
          { withCredentials: true }
        );

        

        localStorage.setItem('token', response.data.accessToken);
        return $api.request(originalRequest);
      } catch (error) {
        console.error(error);
      }
    }
    throw error;
  }
);

export default $api;
