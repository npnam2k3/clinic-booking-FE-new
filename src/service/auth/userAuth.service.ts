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
  login: async (payload: LoginRequest): Promise<any> => {
    try {
      // 1️⃣ Gọi API login để lấy token
      const response = await axiosInstance.post<ApiResponse<LoginResponseData>>(
        "/auth/login",
        payload
      );

      const data = response.data;

      // 2️⃣ Lưu token vào RAM và localStorage
      const accessToken = data.data.accessToken;
      memoryStorage.setAccessToken(accessToken);
      storage.setToken(accessToken);

      // 3️⃣ Gọi thêm API profile để lấy thông tin user
      const profileResponse = await axiosInstance.get<
        ApiResponse<UserResponse>
      >("/auth/profile", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const userProfile = profileResponse.data.data;

      // 4️⃣ Lưu userInfo vào localStorage (nếu bạn muốn hiển thị lại sau này)
      storage.setTokenInfo(userProfile);
      // 5️⃣ Return kết quả gộp
      return {
        status: true,
        statusCode: 200,
        message: "Đăng nhập thành công",
        data: {
          ...data.data, // gồm accessToken
          ...userProfile, // gồm email, role, contact, ...
        },
      };
    } catch (error: any) {
      throw error.response?.data || { message: "Đăng nhập thất bại" };
    }
  },

  logout: () => {
    memoryStorage.setAccessToken(null);
    storage.clearToken();
    storage.clearTokenInfo();
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

  forgotPassword: async (email: string): Promise<ApiResponse> => {
    try {
      const response = await axiosInstance.post<ApiResponse>(
        "/auth/forgot-password",
        { email }
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Không thể gửi yêu cầu quên mật khẩu" };
    }
  },

  resetPassword: async (
    token: string,
    payload: { new_password: string; confirm_password: string }
  ): Promise<ApiResponse> => {
    try {
      const response = await axiosInstance.put<ApiResponse>(
        `/auth/reset-password/${token}`,
        payload
      );

      return response.data;
    } catch (error: any) {
      throw error.response?.data || { message: "Không thể đặt lại mật khẩu" };
    }
  },
};
