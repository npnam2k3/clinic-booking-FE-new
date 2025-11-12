// src/utils/validate/doctor-slots.validate.ts

import dayjs from "dayjs";
import { DoctorSlotsRequestDto } from "../dto/doctor-slots.dto";

export function validateDoctorSlotsRequest(
  payload: DoctorSlotsRequestDto
): string | null {
  if (!payload.doctor_id) {
    return "Vui lòng chọn bác sĩ!";
  }

  if (!payload.from_date || !payload.to_date) {
    return "Vui lòng chọn đầy đủ ngày bắt đầu và ngày kết thúc!";
  }

  const from = dayjs(payload.from_date, "DD/MM/YYYY");
  const to = dayjs(payload.to_date, "DD/MM/YYYY");

  if (!from.isValid() || !to.isValid()) {
    return "Định dạng ngày không hợp lệ! (dd/MM/yyyy)";
  }

  if (to.isBefore(from)) {
    return "Ngày kết thúc không được nhỏ hơn ngày bắt đầu!";
  }

  const diff = to.diff(from, "day");
  if (diff > 30) {
    return "Khoảng thời gian không được vượt quá 30 ngày!";
  }

  return null; // ✅ Hợp lệ
}
