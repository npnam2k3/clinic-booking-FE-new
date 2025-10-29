import { PatientDto, PatientsResponseData } from "@/untils/dto/patient.dto";
import { authorizedRequest } from "../authorized-request";

const BASE_URL = "/patients";

export const PatientService = {
  // Lấy danh sách bệnh nhân (có thể thêm query pageNum, limitNum nếu backend hỗ trợ)
  async getAll(params?: Record<string, any>): Promise<PatientsResponseData> {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    const res = await authorizedRequest("get", `${BASE_URL}${query}`);
    return res.data.data;
  },

  // Lấy thông tin chi tiết bệnh nhân theo mã
  async getByCode(patientCode: string): Promise<PatientDto> {
    const res = await authorizedRequest("get", `${BASE_URL}/${patientCode}`);
    return res.data.data;
  },

  // Thêm bệnh nhân mới
  async create(
    payload: Omit<
      PatientDto,
      "patient_code" | "createdAt" | "updatedAt" | "deletedAt"
    >
  ) {
    const res = await authorizedRequest("post", BASE_URL, payload);
    return res.data;
  },

  // Cập nhật bệnh nhân
  async update(patientCode: string, payload: Partial<PatientDto>) {
    const res = await authorizedRequest(
      "patch",
      `${BASE_URL}/${patientCode}`,
      payload
    );
    return res.data;
  },

  // Xóa bệnh nhân
  async delete(patientCode: string) {
    const res = await authorizedRequest("delete", `${BASE_URL}/${patientCode}`);
    return res.data;
  },
};
