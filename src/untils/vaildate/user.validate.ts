// src/utils/validate/user.validate.ts

export interface UserProfileValidateResult {
  isValid: boolean;
  errors: {
    fullname?: string;
    phone_number?: string;
    address?: string;
  };
}

/**
 * Validate dữ liệu hồ sơ người dùng (khi cập nhật)
 * @param profile { fullname, phone_number, address }
 */
export const userProfileValidate = (profile: {
  fullname: string;
  phone_number: string;
  address: string;
}): UserProfileValidateResult => {
  const errors: UserProfileValidateResult["errors"] = {};

  // 🔹 Validate fullname
  if (!profile.fullname?.trim()) {
    errors.fullname = "Họ và tên không được để trống";
  } else if (profile.fullname.trim().length < 2) {
    errors.fullname = "Họ và tên phải có ít nhất 2 ký tự";
  }

  // 🔹 Validate phone_number
  if (!profile.phone_number?.trim()) {
    errors.phone_number = "Số điện thoại không được để trống";
  } else if (!/^(0|\+84)\d{9}$/.test(profile.phone_number.trim())) {
    errors.phone_number = "Số điện thoại không hợp lệ (VD: 0912345678)";
  }

  // 🔹 Validate address (tùy chọn)
  if (profile.address && profile.address.trim().length < 5) {
    errors.address = "Địa chỉ phải có ít nhất 5 ký tự";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
