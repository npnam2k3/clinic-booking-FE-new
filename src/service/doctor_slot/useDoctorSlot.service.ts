// src/service/doctor-slot/doctor-slot.service.ts

import { authorizedRequest } from "@/service/authorized-request";
import {
  DoctorSlotsRequestDto,
  DoctorSlotsResponseDto,
} from "@/untils/dto/doctor-slots.dto";

export const DoctorSlotsService = {
  /**
   * 🔹 Lấy danh sách slot khám của bác sĩ trong khoảng thời gian
   * @param payload { doctor_id, from_date, to_date }
   */
  async getDoctorSlots(
    payload: DoctorSlotsRequestDto
  ): Promise<DoctorSlotsResponseDto> {
    const res = await authorizedRequest("post", "/doctor-slots", payload);
    return res.data as DoctorSlotsResponseDto;
  },
};
