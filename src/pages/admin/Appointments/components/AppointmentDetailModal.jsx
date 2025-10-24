import { X } from "lucide-react";

const AppointmentDetailModal = ({ appointment, onClose }) => {
  const badge = {
    pending: { bg: "bg-orange-500", text: "Pending" },
    confirmed: { bg: "bg-emerald-500", text: "Confirmed" },
    completed: { bg: "bg-blue-500", text: "Completed" },
    cancelled: { bg: "bg-red-500", text: "Cancelled" },
  }[appointment.status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Chi tiết lịch khám</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Mã lịch khám</p>
            <p className="text-lg font-bold">
              {appointment.doctor_slot.slot_id}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Tên bệnh nhân</p>
              <p className="font-medium">{appointment.patient.fullname}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bác sĩ khám</p>
              <p className="font-medium">
                {appointment.doctor_slot.doctor.fullname}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Ngày khám</p>
              <p className="font-medium">{appointment.doctor_slot.slot_date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Giờ khám</p>
              <p className="font-medium">
                {" "}
                {appointment.doctor_slot.start_at} -{" "}
                {appointment.doctor_slot.end_at}
              </p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Trạng thái</p>
            <span
              className={`mt-1 inline-block rounded px-2 py-1 text-xs font-medium text-white ${badge.bg}`}
            >
              {badge.text}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-600">Ghi chú</p>
            <p className="font-medium">
              {appointment.note || "Không có ghi chú"}
            </p>
          </div>

          {appointment.status === "cancelled" && (
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm font-medium text-red-900">Lịch sử hủy</p>
              <p className="text-sm text-red-700">
                Người hủy: {appointment.cancellationReason || "Bệnh nhân"}
              </p>
              <p className="text-sm text-red-700">
                Lý do: {appointment.cancellationReason || "Bận việc đột xuất"}
              </p>
              <p className="text-sm text-red-700">
                Thời gian hủy: {appointment.cancelledAt || "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default AppointmentDetailModal;
