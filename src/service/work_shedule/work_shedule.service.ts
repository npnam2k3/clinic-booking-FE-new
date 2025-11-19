import {
  CreateWorkScheduleDto,
  GetDoctorWorkSchedulesResponse,
} from "@/untils/dto/work_schedule.dto";
import { authorizedRequest } from "../authorized-request";

export const WorkScheduleService = {
  /**
   * 🔹 Lấy danh sách lịch làm việc cũ (old-work-schedule)
   * @returns Promise<GetDoctorWorkSchedulesResponse>
   */
  async getOldWorkSchedules(): Promise<GetDoctorWorkSchedulesResponse> {
    const res = await authorizedRequest(
      "get",
      "/work-schedules/old-work-schedule"
    );
    return res.data as GetDoctorWorkSchedulesResponse;
  },

  /**
   * 🔹 Lấy danh sách lịch làm việc mới (new-work-schedule)
   * @returns Promise<GetDoctorWorkSchedulesResponse>
   */
  async getNewWorkSchedules(): Promise<GetDoctorWorkSchedulesResponse> {
    const res = await authorizedRequest(
      "get",
      "/work-schedules/new-work-schedule"
    );
    return res.data as GetDoctorWorkSchedulesResponse;
  },

  async create(payload: CreateWorkScheduleDto) {
    const res = await authorizedRequest("post", "/work-schedules", payload);
    return res.data;
  },
};
