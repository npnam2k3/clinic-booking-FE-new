// src/service/dashboard/dashboard.service.ts

import {
  BasicStatisticResponseDto,
  UpcomingAppointmentsResponseDto,
  WeeklyAppointmentStatisticResponseDto,
} from "@/untils/dto/dashboard.dto";
import { authorizedRequest } from "../authorized-request";

export const DashboardService = {
  /**
   * 🔹 Lấy số liệu thống kê cơ bản
   * Endpoint: GET /dashboard/basic-statistic
   */
  async getBasicStatistic(): Promise<BasicStatisticResponseDto> {
    const res = await authorizedRequest("get", "/dashboard/basic-statistic");
    return res.data as BasicStatisticResponseDto;
  },

  /**
   * 🔹 Lấy thống kê lịch hẹn theo tuần
   * Endpoint: GET /dashboard/weekly-appointment-statistic
   */
  async getWeeklyAppointmentStatistic(): Promise<WeeklyAppointmentStatisticResponseDto> {
    const res = await authorizedRequest(
      "get",
      "/dashboard/weekly-appointment-statistic"
    );
    return res.data as WeeklyAppointmentStatisticResponseDto;
  },

  /**
   * 🔹 Lấy danh sách lịch hẹn sắp tới
   * Endpoint: GET /dashboard/upcoming-appointments
   */
  async getUpcomingAppointments(): Promise<UpcomingAppointmentsResponseDto> {
    const res = await authorizedRequest(
      "get",
      "/dashboard/upcoming-appointments"
    );
    return res.data as UpcomingAppointmentsResponseDto;
  },
};
