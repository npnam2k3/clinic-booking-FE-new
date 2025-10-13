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
