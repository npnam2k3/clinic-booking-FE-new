import { authorizedRequest } from "../authorized-request";
import { ApiResponse } from "@/untils/dto/api-respone.dto";
import {
  AppointmentDto,
  AppointmentResponseData,
} from "@/untils/dto/appointment.dto";
import axiosInstance from "../api/axios-instance.service";

const BASE_URL = "/appointments";

export const AppointmentService = {
  // Lấy danh sách lịch khám
  async getAll(): Promise<AppointmentResponseData> {
    const res = await authorizedRequest("get", BASE_URL);
    // Một số backend trả về { status, data: [...] }
    return res.data?.data || res.data || [];
  },
  async getAllHistory(): Promise<AppointmentResponseData> {
    const res = await authorizedRequest("get", `${BASE_URL}/history`);
    // Một số backend trả về { status, data: [...] }
    return res.data?.data || res.data || [];
  },

  // Lấy chi tiết lịch khám theo id
  async getById(appointmentId: number): Promise<AppointmentDto> {
    const res = await authorizedRequest("get", `${BASE_URL}/${appointmentId}`);
    return res.data?.data;
  },

  // Tạo mới lịch khám
  async create(payload: {
    doctor_slot_id: number;
    patient_code: string;
    note?: string;
  }): Promise<ApiResponse<AppointmentDto>> {
    const res = await axiosInstance.post(BASE_URL, payload);
    return res.data;
  },

  // Cập nhật thông tin lịch khám
  async update(
    appointmentId: number,
    payload: Partial<{
      doctor_slot_id: number;
      patient_code: string;
      note: string;
      status: string;
    }>
  ): Promise<ApiResponse<AppointmentDto>> {
    const res = await authorizedRequest(
      "patch",
      `${BASE_URL}/${appointmentId}`,
      payload
    );
    return res.data;
  },

  // Hủy lịch khám bởi bệnh nhân
  async cancel(
    appointmentId: number,
    payload: {
      reason_code: string;
      note?: string;
    }
  ): Promise<ApiResponse<AppointmentDto>> {
    const res = await authorizedRequest(
      "patch",
      `${BASE_URL}/client/cancel/${appointmentId}`,
      payload
    );
    return res.data;
  },

  // Xóa lịch khám
  async delete(appointmentId: number): Promise<ApiResponse> {
    const res = await authorizedRequest(
      "delete",
      `${BASE_URL}/${appointmentId}`
    );
    return res.data;
  },
};
