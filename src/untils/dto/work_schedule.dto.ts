// Đối tượng ca làm việc của bác sĩ
export interface WorkScheduleDto {
  schedule_id: number;
  day_of_week: string; // "Monday", "Tuesday", ...
  start_time: string; // "08:00:00"
  end_time: string; // "12:00:00"
  slot_duration: number; // phút cho mỗi slot (ví dụ 20)
  note: string | null;
  effective_date: string; // Ngày bắt đầu hiệu lực (yyyy-MM-dd)
  expire_date: string; // Ngày hết hiệu lực (yyyy-MM-dd)
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  status: string; // ví dụ: "Đang hoạt động"
}

// Đối tượng bác sĩ có kèm danh sách lịch làm việc
export interface DoctorWorkScheduleDto {
  doctor_id: number;
  fullname: string;
  gender: "male" | "female" | string;
  degree: string; // ví dụ: "ThS", "TS"
  position: string;
  description: string | null;
  years_of_experience: number;
  phone_number: string;
  email: string;
  avatar_url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  work_schedules: WorkScheduleDto[]; // danh sách lịch làm việc
}

// DTO tổng thể phản hồi API
export interface GetDoctorWorkSchedulesResponse {
  status: boolean;
  statusCode: number;
  message: string;
  data: DoctorWorkScheduleDto[];
  timestamp: string;
}
// Một phần tử ca làm việc trong mảng "schedules"
export interface WorkScheduleCreateItemDto {
  day_of_week: string; // "Monday", "Saturday", ...
  start_time: string; // "08:00"
  end_time: string; // "17:00"
  note?: string; // "Cả ngày" (tùy chọn)
}

// DTO tổng gửi khi tạo lịch mới
export interface CreateWorkScheduleDto {
  schedules: WorkScheduleCreateItemDto[]; // Danh sách ca làm việc
  slot_duration: number; // Thời lượng mỗi slot (phút)
  doctor_id: number; // ID bác sĩ
  effective_date: string; // Ngày hiệu lực (VD: "06/11/2025")
  expire_date: string; // Ngày hết hạn (VD: "15/11/2025")
}
