import axios from "axios";
import { message } from "antd";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3005/",
  timeout: 3000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_Token");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    let { data, config } = error.response;
    if (data.code === 401 && !config.url.includes("/user/admin/refresh")) {
      const res = await refreshToken();
      if (res.status === 200 || res.status === 201) {
        return axiosInstance(config);
      } else {
        message.error(res.data);

        setTimeout(() => {
          window.location.href = "/login";
        }, 1500);
      }
    } else {
      return error.response;
    }
  }
);
async function refreshToken() {
  const res = await axiosInstance.post("/user/admin/refresh", {
    params: {
      refresh_token: localStorage.getItem("refresh_Token"),
    },
  });
  localStorage.setItem("access_token", res.data.access_token);
  localStorage.setItem("refresh_token", res.data.refresh_token);
  return res;
}

export async function login(username: string, password: string) {
  return await axiosInstance.post("/user/admin/login", {
    username,
    password,
  });
}
