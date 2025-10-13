import { ApiResponse } from "@/untils/dto/api-respone.dto";
import {
  ChangePassword,
  LoginRequest,
  LoginResponseData,
  RegiserRequest,
} from "@/untils/dto/auth.dto";
import axiosInstance from "../api/axios-instance.service";
import { memoryStorage } from "@/untils/storage";
import storage from "@/untils/storage";
import { UserRequest, UserResponse } from "@/untils/dto/users.dto";
import { profile } from "console";

export const userAuthService = {
  login: async (
    payload: LoginRequest
  ): Promise<ApiResponse<LoginResponseData>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<LoginResponseData>>(
        "/auth/login",
        payload
      );

      const data = response.data;

      // Lưu token vào RAM và localStorage
      memoryStorage.setAccessToken(data.data.accessToken);
      storage.setToken(data.data.accessToken);
      return data;
    } catch (error: any) {
      throw error.response?.data || { message: "Đăng nhập thất bại" };
    }
  },

  logout: () => {
    memoryStorage.setAccessToken(null);
    storage.clearToken();
  },

  getAccessToken: () => {
    return memoryStorage.getAccessToken() || storage.getToken() || null;
  },

  register: async (
    payload: RegiserRequest
  ): Promise<ApiResponse<UserResponse>> => {
    try {
      const response = await axiosInstance.post<ApiResponse<UserResponse>>(
        "users",
        payload
      );
      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Đăng nhập thất bại" };
    }
  },

  profile: async (): Promise<ApiResponse<UserResponse>> => {
    try {
      const token = memoryStorage.getAccessToken() || storage.getToken();
      if (!token) {
        throw new Error("Không tìm thấy token — vui lòng đăng nhập lại");
      }
      const response = await axiosInstance.get<ApiResponse<UserResponse>>(
        "/auth/profile",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Không thể tải thông tin người dùng",
        }
      );
    }
  },
  updateProfile: async (
    payload: UserRequest
  ): Promise<ApiResponse<UserResponse>> => {
    try {
      const token = memoryStorage.getAccessToken() || storage.getToken();
      if (!token) {
        throw new Error("Không tìm thấy token — vui lòng đăng nhập lại");
      }
      const response = await axiosInstance.patch<ApiResponse<UserResponse>>(
        "/auth/profile",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Không thể tải thông tin người dùng",
        }
      );
    }
  },

  changePassword: async (payload: ChangePassword): Promise<ApiResponse> => {
    try {
      const token = memoryStorage.getAccessToken() || storage.getToken();
      if (!token) {
        throw new Error("Không tìm thấy token — vui lòng đăng nhập lại");
      }

      const response = await axiosInstance.post<ApiResponse>(
        "/auth/change-password",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      // Xử lý lỗi rõ ràng hơn để UI hiển thị đúng thông báo
      if (error.response?.data) {
        return error.response.data as ApiResponse;
      }
    }
  },
};
