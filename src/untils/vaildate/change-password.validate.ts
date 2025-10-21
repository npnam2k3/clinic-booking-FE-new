export interface ChangePasswordForm {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export const validateChangePassword = (
  data: ChangePasswordForm
): string | null => {
  const { currentPassword, newPassword, confirmPassword } = data;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return "Vui lòng nhập đầy đủ tất cả các trường.";
  }

  if (newPassword.length < 6) {
    return "Mật khẩu mới phải có ít nhất 6 ký tự.";
  }

  if (newPassword === currentPassword) {
    return "Mật khẩu mới không được trùng với mật khẩu hiện tại.";
  }

  if (newPassword !== confirmPassword) {
    return "Mật khẩu xác nhận không khớp.";
  }

  // Khuyến khích mạnh hơn — có thể tùy chỉnh nếu cần
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/;
  if (!strongPasswordRegex.test(newPassword)) {
    return "Mật khẩu mới phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt.";
  }

  return null; // hợp lệ
};
