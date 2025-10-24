// doctor.dto.ts

export interface DoctorSpecialty {
  specialization_id: number;
  specialization_name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface DoctorDto {
  doctor_id: number;
  fullname: string;
  gender: string; // male / female
  degree: string; // TS, ThS,...
  position: string;
  description: string;
  years_of_experience: number;
  phone_number: string;
  work_schedules?: DoctorWorkSchedule[];
  email: string;
  avatar_url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;

  specialty?: DoctorSpecialty | null;
  reviews?: DoctorReview[];
}

export interface DoctorPagination {
  totalRecords: number;
  totalPages: number;
  conditions: {
    pageNum: number;
    limitNum: number;
    sortBy: string;
    orderBy: string;
  };
}

export interface DoctorResponseData {
  doctors: DoctorDto[];
  totalRecords: number;
  totalPages: number;
  conditions: DoctorPagination["conditions"];
}
export interface DoctorWorkSchedule {
  schedule_id: number;
  day_of_week: string; // Monday, Tuesday,...
  start_time: string; // "08:00:00"
  end_time: string; // "12:00:00"
  slot_duration: number; // minutes
  note: string;
  createdAt: string;
}

export interface DoctorReview {
  review_id?: number;
  patient_name?: string;
  rating?: number; // 1–5
  comment?: string;
  createdAt?: string;
}
export type DoctorListResponse = DoctorResponseData;
