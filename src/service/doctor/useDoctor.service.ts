// doctor.service.ts
import { authorizedRequest } from "../authorized-request";
import axiosInstance from "../api/axios-instance.service";
import { ApiResponse } from "@/untils/dto/api-respone.dto";
import { DoctorDto, DoctorListResponse } from "@/untils/dto/doctor.dto";

const BASE_URL = "/doctors";

export const DoctorService = {
  // ========================
  // LẤY DANH SÁCH BÁC SĨ
  // ========================
  async getAll(
    params?: Record<string, any>
  ): Promise<import("@/untils/dto/doctor.dto").DoctorListResponse> {
    const res = await axiosInstance.get(BASE_URL, { params });
    // API trả về { data: { doctors: [...], totalRecords, totalPages, conditions } }
    return res.data?.data;
  },

  // ========================
  // LẤY CHI TIẾT BÁC SĨ
  // ========================
  async getById(doctorId: number): Promise<any> {
    const res = await axiosInstance.get(`${BASE_URL}/${doctorId}`);
    console.log("DoctorService.getById response:", res);
    return res.data?.data;
  },

  // ========================
  // TẠO MỚI BÁC SĨ
  // ========================
  async create(payload: {
    fullname: string;
    gender: string;
    degree: string;
    position: string;
    description?: string;
    years_of_experience: number;
    phone_number: string;
    email: string;
    avatar_url: string;
    specialization_id: number;
  }): Promise<ApiResponse<DoctorDto>> {
    const res = await authorizedRequest("post", BASE_URL, payload);
    return res.data;
  },

  // ========================
  // CẬP NHẬT BÁC SĨ
  // ========================
  async update(
    doctorId: number,
    payload: Partial<{
      fullname: string;
      gender: string;
      degree: string;
      position: string;
      description?: string;
      years_of_experience: number;
      phone_number: string;
      email: string;
      avatar_url: string;
      specialization_id: number;
    }>
  ): Promise<ApiResponse<DoctorDto>> {
    const res = await authorizedRequest(
      "put",
      `${BASE_URL}/${doctorId}`,
      payload
    );
    return res.data;
  },

  // ========================
  // XÓA BÁC SĨ
  // ========================
  async delete(doctorId: number): Promise<ApiResponse> {
    const res = await authorizedRequest("delete", `${BASE_URL}/${doctorId}`);
    return res.data;
  },
};
