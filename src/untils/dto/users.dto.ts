// Thông tin liên hệ (contact)
export interface ContactResponse {
  contact_id: number;
  phone_number: string;
  fullname: string;
  address: string;
  created_at: string; // ISO string
}

// Thông tin vai trò (role)
export interface RoleResponse {
  role_id: number;
  role_name: string;
}

// Thông tin user trả về từ API
export interface UserResponse {
  user_id: number;
  email: string;
  fullname: string;
  phone_number: string;
  address: string;
  role: string;
}

export interface UserRequest {
  fullname: string;
  phone_number: string;
  address: string;
}

export interface ContactInfo {
  phone_number: string;
  address: string;
  fullname: string;
}

export interface RoleInfo {
  role_id: number;
  role_name: string;
}

export interface UserDto {
  user_id: number;
  email: string;
  createdAt: string;
  contact: ContactInfo;
  role: RoleInfo;
}

export interface UsersResponseData {
  users: UserDto[];
  totalRecords: number;
  totalPages: number;
  conditions: {
    pageNum: number;
    limitNum: number;
  };
}
