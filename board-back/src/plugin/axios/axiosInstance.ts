import axios from "axios";
import router from "@/router";
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

API.interceptors.response.use(
  (response: any) => {
    return response;
  },
  (err: any) => {
    switch (err.response.status) {
      case 401:
        router.push("/login");
    }
    return Promise.reject(err);
  }
);
export default API;
