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
  async create(
    payload: {
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
    },
    file?: File | null
  ): Promise<ApiResponse<DoctorDto>> {
    const formData = new FormData();
    
    // Append all form fields
    formData.append("fullname", payload.fullname);
    formData.append("gender", payload.gender);
    formData.append("degree", payload.degree);
    formData.append("position", payload.position);
    formData.append("years_of_experience", String(payload.years_of_experience));
    formData.append("phone_number", payload.phone_number);
    formData.append("email", payload.email);
    formData.append("specialization_id", String(payload.specialization_id));
    
    if (payload.description) {
      formData.append("description", payload.description);
    }
    
    // Append file if provided
    if (file) {
      console.log("📤 [CREATE] Uploading file:", file.name, `(${file.size} bytes, ${file.type})`);
      formData.append("avatar", file);
      console.log("===== DEBUG FORM DATA =====");
      for (const [key, value] of (formData as any).entries()) {
        console.log("KEY:", key, "VALUE:", value);
      }
    } else {
      console.log("⚠️ [CREATE] No file to upload");
    }
    
    // Get token
    const { memoryStorage } = await import("@/untils/storage");
    const storage = (await import("@/untils/storage")).default;
    const token = memoryStorage.getAccessToken() || storage.getToken();
    
    if (!token) {
      throw new Error("Không tìm thấy token — vui lòng đăng nhập lại");
    }
    
    console.log("🚀 [CREATE] Sending request with token...");
    
    // Use axiosInstance directly with token
    const res = await axiosInstance.post(BASE_URL, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Don't set Content-Type, let axios handle it for FormData
      },
    });
    
    console.log("✅ [CREATE] Response:", res.data);
    
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
    }>,
    file?: File | null
  ): Promise<ApiResponse<DoctorDto>> {
    const formData = new FormData();
    
    // Append all form fields that are provided
    if (payload.fullname) formData.append("fullname", payload.fullname);
    if (payload.gender) formData.append("gender", payload.gender);
    if (payload.degree) formData.append("degree", payload.degree);
    if (payload.position) formData.append("position", payload.position);
    if (payload.years_of_experience) formData.append("years_of_experience", String(payload.years_of_experience));
    if (payload.phone_number) formData.append("phone_number", payload.phone_number);
    if (payload.email) formData.append("email", payload.email);
    if (payload.specialization_id) formData.append("specialization_id", String(payload.specialization_id));
    if (payload.description) formData.append("description", payload.description);
    
    // Append file if provided
    if (file) {
      console.log("📤 [UPDATE] Uploading file:", file.name, `(${file.size} bytes, ${file.type})`);
      formData.append("avatar", file);
    } else {
      console.log("⚠️ [UPDATE] No file to upload");
    }

    const res = await authorizedRequest(
      "put",
      `${BASE_URL}/${doctorId}`,
      formData
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
