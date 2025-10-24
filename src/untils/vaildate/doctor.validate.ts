// doctor.validate.ts
import * as yup from "yup";

export const doctorSchema = yup.object({
  fullname: yup
    .string()
    .required("Vui lòng nhập họ tên bác sĩ")
    .max(255, "Họ tên không được vượt quá 255 ký tự"),

  gender: yup
    .string()
    .required("Vui lòng chọn giới tính")
    .oneOf(["male", "female"], "Giới tính không hợp lệ"),

  degree: yup
    .string()
    .required("Vui lòng nhập học vị (ví dụ: TS, ThS, BS, ...)")
    .max(20, "Học vị không được vượt quá 20 ký tự"),

  position: yup
    .string()
    .required("Vui lòng nhập chức vụ")
    .max(255, "Chức vụ không được vượt quá 255 ký tự"),

  description: yup
    .string()
    .nullable()
    .max(1000, "Mô tả không được vượt quá 1000 ký tự"),

  years_of_experience: yup
    .number()
    .typeError("Kinh nghiệm phải là số")
    .min(0, "Số năm kinh nghiệm không hợp lệ")
    .required("Vui lòng nhập số năm kinh nghiệm"),

  phone_number: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),

  email: yup
    .string()
    .required("Vui lòng nhập email bác sĩ")
    .email("Định dạng email không hợp lệ"),

  avatar_url: yup
    .string()
    .url("URL ảnh đại diện không hợp lệ")
    .required("Vui lòng chọn ảnh đại diện"),

  specialization_id: yup.number().required("Vui lòng chọn chuyên khoa"),
});
