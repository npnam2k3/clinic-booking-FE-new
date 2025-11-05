export interface ContactDto {
  contact_id: number;
  phone_number: string;
  address: string;
  fullname: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
}

export interface PatientDto {
  patient_code: string;
  fullname: string;
  date_of_birth: string;
  gender: "male" | "female" | "other";
  address: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  contact: ContactDto;
}

export interface PatientsResponseData {
  patients: PatientDto[];
  totalRecords: number;
  totalPages: number;
  conditions: {
    pageNum: number;
    limitNum: number;
    orderBy: string;
  };
}
