import * as yup from "yup";

export const patientSchema = yup.object({
  fullname: yup
    .string()
    .required("Vui lòng nhập họ và tên bệnh nhân")
    .max(255, "Tên không được vượt quá 255 ký tự"),
  date_of_birth: yup
    .string()
    .required("Vui lòng nhập ngày sinh")
    .matches(/^\d{2}\/\d{2}\/\d{4}$/, "Ngày sinh phải có định dạng dd/mm/yyyy"),
  gender: yup
    .string()
    .oneOf(["male", "female", "other"], "Giới tính không hợp lệ")
    .required("Vui lòng chọn giới tính"),
  address: yup
    .string()
    .required("Vui lòng nhập địa chỉ")
    .max(500, "Địa chỉ không được vượt quá 500 ký tự"),
  contact_id: yup.number().required("Thiếu thông tin người liên hệ"),
});
