import { ApiResponse } from "@/untils/dto/api-respone.dto";
import { authorizedRequest } from "../authorized-request";

const BASE_URL = "/users";
/**
 * Dịch vụ khóa / mở khóa tài khoản người dùng
 * Sử dụng authorizedRequest để tự động gửi token và bắt lỗi
 */
export const UserLockService = {
  /**
   * Khóa tài khoản người dùng
   * @param userId ID người dùng cần khóa
   */
  lock: async (userId: number): Promise<any> => {
    try {
      const response = await authorizedRequest(
        "patch",
        `${BASE_URL}/lock-account/${userId}`,
        {}
      );
      return response;
    } catch (error: any) {
      console.error("Lỗi khi khóa tài khoản:", error);
      throw (
        error.response?.data || {
          message: "Không thể khóa tài khoản người dùng",
        }
      );
    }
  },

  /**
   * Mở khóa tài khoản người dùng
   * @param userId ID người dùng cần mở khóa
   */
  unlock: async (userId: number): Promise<any> => {
    try {
      const response = await authorizedRequest(
        "patch",
        `${BASE_URL}/unlock-account/${userId}`,
        {}
      );
      return response;
    } catch (error: any) {
      console.error("Lỗi khi mở khóa tài khoản:", error);
      throw (
        error.response?.data || {
          message: "Không thể mở khóa tài khoản người dùng",
        }
      );
    }
  },
};
