import { StaffDto, StaffResponseData } from "@/untils/dto/staff.dto";
import { authorizedRequest } from "../authorized-request";
import { ApiResponse } from "@/untils/dto/api-respone.dto";

const BASE_URL = "/users/staff";

export const StaffService = {
  // Lấy danh sách nhân viên
  async getAll(): Promise<StaffResponseData> {
    const res = await authorizedRequest("get", BASE_URL);
    return res.data.data;
  },

  // Lấy chi tiết nhân viên theo id
  async getById(userId: number): Promise<StaffDto> {
    const res = await authorizedRequest("get", `${BASE_URL}/${userId}`);
    return res.data.data;
  },

  // Tạo mới nhân viên
  async create(payload: {
    email: string;
    fullname: string;
    phone_number: string;
    address: string;
    is_block?: boolean;
  }): Promise<ApiResponse<StaffDto>> {
    const res = await authorizedRequest("post", BASE_URL, payload);
    return res.data;
  },

  // Cập nhật thông tin nhân viên
  async update(
    userId: number,
    payload: Partial<{
      email: string;
      fullname: string;
      phone_number: string;
      address: string;
      is_block: boolean;
    }>
  ): Promise<ApiResponse<StaffDto>> {
    const res = await authorizedRequest(
      "patch",
      `${BASE_URL}/${userId}`,
      payload
    );
    return res.data;
  },

  // Xóa nhân viên
  async delete(userId: number): Promise<ApiResponse> {
    const res = await authorizedRequest("delete", `${BASE_URL}/${userId}`);
    return res.data;
  },
};
