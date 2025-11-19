// src/utils/dto/doctor-slots.dto.ts

/**
 * 🔹 Dữ liệu request gửi lên API /doctor-slots
 */
export interface DoctorSlotsRequestDto {
  doctor_id: number;         // ID bác sĩ
  from_date: string;         // Ngày bắt đầu (định dạng dd/MM/yyyy)
  to_date: string;           // Ngày kết thúc (định dạng dd/MM/yyyy)
}

/**
 * 🔹 Cấu trúc dữ liệu 1 slot trả về từ API
 */
export interface DoctorSlotDto {
  slot_id: number;
  doctor_id: number;
  start_time: string;        // "2025-11-05T08:00:00Z"
  end_time: string;          // "2025-11-05T08:20:00Z"
  date: string;              // "2025-11-05"
  is_booked: boolean;
  patient_name?: string;
}

/**
 * 🔹 Dữ liệu response từ API /doctor-slots
 */
export interface DoctorSlotsResponseDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: DoctorSlotDto[];
  timestamp: string;
}
