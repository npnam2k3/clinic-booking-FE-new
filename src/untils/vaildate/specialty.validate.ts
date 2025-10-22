import * as yup from "yup";

export const specialtySchema = yup.object().shape({
  specialization_name: yup
    .string()
    .required("Vui lòng nhập tên chuyên khoa")
    .max(255, "Tên chuyên khoa không được vượt quá 255 ký tự"),
  description: yup
    .string()
    .required("Vui lòng nhập mô tả chuyên khoa")
    .max(2000, "Mô tả không được vượt quá 2000 ký tự"),
});
