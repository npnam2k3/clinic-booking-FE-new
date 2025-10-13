import { RegiserRequest } from "../dto/auth.dto";

/**
 * Validate form đăng ký.
 * @returns { message: string } nếu lỗi, hoặc null nếu hợp lệ.
 */
export const registerValidate = (data: RegiserRequest): string | null => {
  // Kiểm tra bắt buộc
  if (!data.email?.trim()) return "Email không được để trống.";
  if (!data.password?.trim()) return "Mật khẩu không được để trống.";
  if (!data.fullname?.trim()) return "Họ tên không được để trống.";
  if (!data.phone_number?.trim()) return "Số điện thoại không được để trống.";

  // Kiểm tra định dạng email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) return "Email không hợp lệ.";

  // Kiểm tra độ dài mật khẩu
  if (data.password.length < 6) return "Mật khẩu phải có ít nhất 6 ký tự.";

  // Kiểm tra định dạng số điện thoại (10-11 số)
  const phoneRegex = /^(0|\+84)\d{9,10}$/;
  if (!phoneRegex.test(data.phone_number)) return "Số điện thoại không hợp lệ.";

  // Kiểm tra độ dài tên
  if (data.fullname.length < 2) return "Họ tên phải có ít nhất 2 ký tự.";

  return null; // ✅ Không có lỗi
};
