// src/untils/validate/dashboard.validate.ts

import {
  BasicStatisticResponseDto,
  WeeklyAppointmentStatisticResponseDto,
  UpcomingAppointmentsResponseDto,
} from "../dto/dashboard.dto";

/**
 * 🔸 Kiểm tra phản hồi từ API /dashboard/basic-statistic
 */
export function validateBasicStatisticResponse(
  res: BasicStatisticResponseDto
): string | null {
  if (!res) return "Không có phản hồi từ server!";
  if (!res.status) return res.message || "Lấy dữ liệu thống kê thất bại!";
  if (!res.data) return "Dữ liệu thống kê trống!";
  return null; // ✅ Hợp lệ
}

/**
 * 🔸 Kiểm tra phản hồi từ API /dashboard/weekly-appointment-statistic
 */
export function validateWeeklyAppointmentResponse(
  res: WeeklyAppointmentStatisticResponseDto
): string | null {
  if (!res) return "Không có phản hồi từ server!";
  if (!res.status) return res.message || "Lấy dữ liệu lịch hẹn thất bại!";
  if (!res.data || !Array.isArray(res.data.weeklyAppointments)) {
    return "Dữ liệu lịch hẹn theo tuần không hợp lệ!";
  }
  return null; // ✅ Hợp lệ
}

/**
 * 🔸 Kiểm tra phản hồi từ API /dashboard/upcoming-appointments
 */
export function validateUpcomingAppointmentsResponse(
  res: UpcomingAppointmentsResponseDto
): string | null {
  if (!res) return "Không có phản hồi từ server!";
  if (!res.status)
    return res.message || "Lấy dữ liệu lịch hẹn sắp tới thất bại!";
  if (!Array.isArray(res.data)) return "Dữ liệu lịch hẹn sắp tới không hợp lệ!";
  return null; // ✅ Hợp lệ
}
