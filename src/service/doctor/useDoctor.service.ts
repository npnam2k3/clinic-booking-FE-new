import { ApiResponse } from "@/untils/dto/api-respone.dto";
import axiosInstance from "../api/axios-instance.service";
import { DoctorDto } from "@/untils/dto/doctors.dto";

const apiUrl = "/doctors";
export const useDoctorService = {
  getAllDoctors: async (
    limit?: number,
    page?: number,
    keyword?: string
  ): Promise<any> => {
    const params = {
      limit: limit ?? "",
      page: page ?? "",
      keyword: keyword ?? "",
    };
    try {
      const response = await axiosInstance.get<ApiResponse<DoctorDto>>(
        `${apiUrl}`,
        { params }
      );
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Không thể tải danh sách bác sĩ",
        }
      );
    }
  },
  getDoctorById: async (doctorId: string): Promise<any> => {
    try {
      const response = await axiosInstance.get<ApiResponse<DoctorDto>>(
        `${apiUrl}/${doctorId}`
      );
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Không thể tải thông tin bác sĩ",
        }
      );
    }
  },
  createDoctor: async (doctorData: DoctorDto): Promise<any> => {
    try {
      const response = await axiosInstance.post<ApiResponse<DoctorDto>>(
        `${apiUrl}`,
        doctorData
      );
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Không thể tạo bác sĩ",
        }
      );
    }
  },
  updateDoctor: async (
    doctorId: string,
    doctorData: DoctorDto
  ): Promise<any> => {
    try {
      const response = await axiosInstance.put<ApiResponse<DoctorDto>>(
        `${apiUrl}/${doctorId}`,
        doctorData
      );
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Không thể cập nhật bác sĩ",
        }
      );
    }
  },
  deleteDoctor: async (doctorId: string): Promise<any> => {
    try {
      const response = await axiosInstance.delete<ApiResponse<DoctorDto>>(
        `${apiUrl}/${doctorId}`
      );
      return response.data;
    } catch (error: any) {
      throw (
        error.response?.data || {
          message: "Không thể xóa bác sĩ",
        }
      );
    }
  },
};
