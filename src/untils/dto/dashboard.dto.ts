// src/untils/dto/dashboard.dto.ts

/**
 * 🔹 Thống kê cơ bản của hệ thống (dashboard/basic-statistic)
 */
export interface BasicStatisticDto {
  appointments_today: number;
  appointments_cancelled: number;
  total_doctors: number;
  total_patients: number;
}

/**
 * 🔹 Dữ liệu trả về của API /dashboard/basic-statistic
 */
export interface BasicStatisticResponseDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: BasicStatisticDto;
  timestamp: string;
}

/**
 * 🔹 Số lượng lịch hẹn từng ngày trong tuần (dashboard/weekly-appointment-statistic)
 */
export interface WeeklyAppointmentItemDto {
  day: string; // "T2" - "CN"
  count: number; // Số lịch hẹn trong ngày
}

/**
 * 🔹 Dữ liệu trả về của API /dashboard/weekly-appointment-statistic
 */
export interface WeeklyAppointmentStatisticResponseDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: {
    weeklyAppointments: WeeklyAppointmentItemDto[];
  };
  timestamp: string;
}

/**
 * 🔹 Một lịch hẹn sắp tới
 */
export interface UpcomingAppointmentItemDto {
  index: number;
  patient_name: string;
  doctor_name: string;
  slot_date: string; // "12/11/2025"
  start_at: string; // "08:20:00"
  status: string; // "pending", "confirmed", ...
}

/**
 * 🔹 Dữ liệu trả về của API /dashboard/upcoming-appointments
 */
export interface UpcomingAppointmentsResponseDto {
  status: boolean;
  statusCode: number;
  message: string;
  data: UpcomingAppointmentItemDto[];
  timestamp: string;
}
