import * as yup from "yup";

export const staffSchema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email nhân viên")
    .email("Định dạng email không hợp lệ"),
  fullname: yup
    .string()
    .required("Vui lòng nhập họ tên nhân viên")
    .max(255, "Họ tên không được vượt quá 255 ký tự"),
  phone_number: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(/^[0-9]{9,11}$/, "Số điện thoại không hợp lệ"),
  address: yup
    .string()
    .required("Vui lòng nhập địa chỉ")
    .max(500, "Địa chỉ không được vượt quá 500 ký tự"),
  is_block: yup.boolean().required(),
});
