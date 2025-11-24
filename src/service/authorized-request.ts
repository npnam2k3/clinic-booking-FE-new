import { memoryStorage } from "@/untils/storage";
import storage from "@/untils/storage";
import axiosInstance from "./api/axios-instance.service";
import { AxiosRequestConfig } from "axios";

export const authorizedRequest = async (
  method: string,
  url: string,
  data: any = null,
  config: AxiosRequestConfig = {}
) => {
  const token = memoryStorage.getAccessToken() || storage.getToken();
  if (!token) throw new Error("Không tìm thấy token — vui lòng đăng nhập lại");

  const isFormData = data instanceof FormData;
  const headers = {
    Authorization: `Bearer ${token}`,
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(config.headers || {}),
  };

  const options: AxiosRequestConfig = { ...config, headers };

  switch (method.toLowerCase()) {
    case "get":
      return axiosInstance.get(url, options);
    case "post":
      return axiosInstance.post(url, data, options);
    case "put":
      return axiosInstance.put(url, data, options);
    case "patch":
      return axiosInstance.patch(url, data, options);
    case "delete":
      return axiosInstance.delete(url, options);
    default:
      throw new Error(`Phương thức không hợp lệ: ${method}`);
  }
};
