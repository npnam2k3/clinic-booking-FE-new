import { UserDto, UsersResponseData } from "@/untils/dto/users.dto";
import { authorizedRequest } from "../authorized-request";
import { ApiResponse } from "@/untils/dto/api-respone.dto";

const BASE_URL = "/users";

export const UserService = {
  // Lấy danh sách người dùng (hỗ trợ query như page, limit, keyword)
  async getAll(params?: Record<string, any>): Promise<UsersResponseData> {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const res = await authorizedRequest("get", `${BASE_URL}${query}`);
    return res.data.data;
  },

  // Lấy thông tin chi tiết người dùng theo id
  async getById(userId: number): Promise<UserDto> {
    const res = await authorizedRequest("get", `${BASE_URL}/${userId}`);
    return res.data.data;
  },

  // Tạo người dùng mới
  async create(payload: {
    email: string;
    fullname: string;
    phone_number: string;
    address: string;
    role_id: number;
  }): Promise<ApiResponse<UserDto>> {
    const res = await authorizedRequest("post", BASE_URL, payload);
    return res.data;
  },

  // Cập nhật thông tin người dùng
  async update(
    userId: number,
    payload: Partial<{
      email: string;
      fullname: string;
      phone_number: string;
      address: string;
      role_id: number;
    }>
  ): Promise<ApiResponse<UserDto>> {
    const res = await authorizedRequest(
      "patch",
      `${BASE_URL}/${userId}`,
      payload
    );
    return res.data;
  },

  // Xóa người dùng
  async delete(userId: number): Promise<ApiResponse> {
    const res = await authorizedRequest("delete", `${BASE_URL}/${userId}`);
    return res.data;
  },
};
