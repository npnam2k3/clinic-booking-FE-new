import * as yup from "yup";

export const appointmentSchema = yup.object({
  doctor_slot_id: yup.number().required("Vui lòng chọn khung giờ khám bác sĩ"),

  patient_code: yup.string().required("Vui lòng nhập mã bệnh nhân"),

  note: yup
    .string()
    .max(500, "Ghi chú không được vượt quá 500 ký tự")
    .nullable(),
});

export const appointmentCancelSchema = yup.object({
  reason_code: yup.string().required("Vui lòng chọn lý do hủy lịch khám"),
  note: yup
    .string()
    .max(500, "Ghi chú không được vượt quá 500 ký tự")
    .nullable(),
});
