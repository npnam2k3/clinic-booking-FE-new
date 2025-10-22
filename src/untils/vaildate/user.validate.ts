// src/utils/validate/user.validate.ts
import * as yup from "yup";

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
export const userSchema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Định dạng email không hợp lệ"),
  fullname: yup
    .string()
    .required("Vui lòng nhập họ tên")
    .max(255, "Tên không được vượt quá 255 ký tự"),
  phone_number: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
  address: yup
    .string()
    .required("Vui lòng nhập địa chỉ")
    .max(500, "Địa chỉ không được vượt quá 500 ký tự"),
  role_id: yup.number().required("Vui lòng chọn vai trò người dùng"),
});
