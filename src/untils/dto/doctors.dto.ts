export interface SpecialtyDto {
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
  gender: string;
  degree: string;
  position: string;
  description: string;
  years_of_experience: number;
  phone_number: string;
  email: string;
  avatar_url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
  specialty: SpecialtyDto;
}
