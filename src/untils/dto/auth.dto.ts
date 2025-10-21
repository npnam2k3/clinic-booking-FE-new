export interface LoginResponseData {
  accessToken: string;
  user_id: number;
}
export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegiserRequest {
  email: string;
  password: string;
  fullname: string;
  phone_number: string;
  address?: string;
}

export interface ChangePassword {
  current_password: string;
  new_password: string;
  confirm_password: string;
}
