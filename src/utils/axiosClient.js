import axios from "axios";
import { useAuthStore } from "./authStore";
import { useMemberInfo } from "./memberInfo";

const httpService = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

const logoutUser = () => {
  useAuthStore.getState.clearAccessToken();
  useMemberInfo.getState.clearMemberInfo();
  window.location.href = "/login";
};

httpService.interceptors.request.use(
  async (config) => {
    if (config.skipAuth) return config;
    let token = useAuthStore.getState().accessToken;

    if (!token) {
      try {
        const response = await axios.post(
          "http://localhost:8080/member/refresh",
          {},
          { withCredentials: true }
        );
        token = response.data.accessToken;
        useAuthStore.getState().setAccessToken(token);
      } catch (error) {
        logoutUser();
        return Promise.reject(error);
      }
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;
let failedQueue = [];

const processWaitRequest = (error, token = null) => {
  failedQueue.forEach((promise) => {
    if (error) {
      promise.reject(error);
    } else {
      promise.resolve(token);
    }
  });
  failedQueue = [];
};

httpService.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === "Expired Token" &&
      !originalRequest._retry
    ) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return httpService(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }
      originalRequest._retry = true;
      isRefreshing = true;

      return new Promise((resolve, reject) => {
        axios
          .post(
            "http://localhost:8080/member/refresh",
            {},
            { withCredentials: true }
          )
          .then(({ data }) => {
            const newAccessToken = data.accessToken;
            useAuthStore.getState().setAccessToken(newAccessToken);
            httpService.defaults.headers.common[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
            resolve(httpService(originalRequest));
            processWaitRequest(null, newAccessToken);
          })
          .catch((err) => {
            processWaitRequest(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }
    return Promise.reject(error);
  }
);

export default httpService;
