import { LoginRequest } from "../dto/auth.dto";

export const loginValidate = (values: LoginRequest) => {
  const errors: Partial<LoginRequest> = {};
  if (!values.email) {
    errors.email = "Email không được để trống";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Email không hợp lệ";
  }
  if (!values.password) {
    errors.password = "Mật khẩu không được để trống";
  } else if (values.password.length < 6) {
    errors.password = "Mật khẩu phải có ít nhất 6 ký tự";
  }

  return errors;
};
