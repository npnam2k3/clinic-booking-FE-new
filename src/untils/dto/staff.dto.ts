export interface StaffContact {
  contact_id: number;
  phone_number: string;
  address: string;
  fullname: string;
  created_at: string;
}

export interface StaffRole {
  role_name: string;
}

export interface StaffDto {
  user_id: number;
  email: string;
  is_block: boolean;
  role: StaffRole;
  contact: StaffContact;
}

export type StaffResponseData = StaffDto[];
