export interface AppointmentDoctor {
  doctor_id: number;
  fullname: string;
  gender: string;
  degree: string;
  position: string;
  phone_number: string;
  email: string;
  avatar_url: string;
  years_of_experience: number;
}

export interface AppointmentDoctorSlot {
  slot_id: number;
  slot_date: string; // ví dụ: 03/11/2025
  start_at: string; // ví dụ: 09:00:00
  end_at: string; // ví dụ: 09:30:00
  status: string; // available / unavailable
  doctor: AppointmentDoctor;
}

export interface AppointmentPatientContact {
  contact_id: number;
  fullname: string;
  phone_number: string;
  address: string;
}

export interface AppointmentPatient {
  patient_code: string;
  fullname: string;
  date_of_birth: string; // dạng dd/MM/yyyy
  gender: string;
  address: string;
  contact: AppointmentPatientContact;
}

export interface AppointmentCancellation {
  appointment_id: number;
  cancellation_party: string; // patient / doctor / staff
  reason_code: string;
  note: string;
  cancelled_at: string; // dạng dd/MM/yyyy HH:mm:ss
  user_account?: {
    email: string;
    fullname: string;
    phone_number: string;
  };
}

export interface AppointmentDto {
  appointment_id: number;
  status: "pending" | "confirmed" | "completed" | "canceled";
  note?: string;
  created_at: string;
  updated_at: string;
  deleted_at?: string | null;
  doctor_slot: AppointmentDoctorSlot;
  patient: AppointmentPatient;
  appointment_cancellation?: AppointmentCancellation | null;
}

export type AppointmentResponseData = AppointmentDto[];
