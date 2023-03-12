import axios from "axios";

const API = axios.create({
  baseURL: "/api",
  timeout: 2000,
});
// 拦截发送出去的让他携带上token
API.interceptors.request.use(
  (config: any) => {
    if (localStorage.getItem("token")) {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
export default API;
