import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { message } from "antd";
import { AppointmentService } from "@/service/appointment/appointment.service";

const CancelAppointmentModal = ({ appointment, onClose, onConfirm }) => {
  const [cancelBy, setCancelBy] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [note, setNote] = useState("");
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Gọi API hủy trong modal để giữ message hiển thị tại modal
      const res = await AppointmentService.cancel(appointment.appointment_id, {
        cancellation_party: cancelBy,
        reason_code: cancelReason,
        note: note || "",
      });

      if (res?.status) {
        messageApi.success("Hủy lịch khám thành công!");
        // Lấy lại danh sách cuộc hẹn và trả về cho parent
        try {
          const data = await AppointmentService.getAll();
          onConfirm?.(data?.appointments || []);
        } catch (fetchErr) {
          console.error("Lỗi khi tải lại danh sách cuộc hẹn:", fetchErr);
          onConfirm?.();
        }
      } else {
        messageApi.error(res?.message || "Hủy lịch khám thất bại!");
      }
    } catch (err) {
      console.error("Lỗi khi hủy lịch:", err);
      messageApi.error("Hủy lịch khám thất bại. Vui lòng thử lại!");
      onConfirm?.();
    } finally {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">Hủy lịch khám</h2>
        <p className="mb-6 text-sm text-gray-600">
          Xác nhận hủy lịch khám cho bệnh nhân{" "}
          <span className="font-semibold">{appointment.patient?.fullname}</span>
        </p>

        {/* Thông tin lịch khám */}
        <div className="mb-4 rounded-lg bg-yellow-50 p-3">
          <p className="text-sm font-medium">
            Mã lịch: {appointment.appointment_id || "—"}
          </p>
          <p className="text-sm">
            Bệnh nhân: {appointment.patient?.fullname || "—"}
          </p>
          <p className="text-sm">
            Bác sĩ: {appointment.doctor_slot?.doctor?.fullname || "—"}
          </p>
          <p className="text-sm">
            Thời gian:{" "}
            {appointment.doctor_slot?.slot_date
              ? `${appointment.doctor_slot.slot_date} (${appointment.doctor_slot.start_at} - ${appointment.doctor_slot.end_at})`
              : "—"}
          </p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Người hủy */}
          <div className="space-y-1">
            <Label className="mb-[8px]">
              Người hủy <span className="text-red-500">*</span>
            </Label>
            <Select onValueChange={setCancelBy} value={cancelBy} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn người hủy" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Bệnh nhân</SelectItem>
                <SelectItem value="clinic">Bác sĩ</SelectItem>
                <SelectItem value="system">Quản trị viên</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Lý do hủy */}
          <div className="space-y-1">
            <Label className="mb-[8px]">
              Lý do hủy <span className="text-red-500">*</span>
            </Label>
            <Select
              onValueChange={setCancelReason}
              value={cancelReason}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn lý do" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="REQUESTED_BY_CUSTOMER">Bệnh nhân yêu cầu hủy</SelectItem>
                <SelectItem value="NO_SHOW">Không đến khám</SelectItem>
                <SelectItem value="DOCTOR_OFF">Bác sĩ nghỉ</SelectItem>
                <SelectItem value="CLINIC_RESCHEDULE">Phòng khám đổi lịch</SelectItem>
                <SelectItem value="AUTO_EXPIRED">Tự động hủy (hết hạn)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ghi chú */}
          <div className="space-y-1">
            <Label className="mb-[8px]">Ghi chú thêm</Label>
            <Textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              placeholder="Nhập ghi chú nếu cần..."
            />
          </div>

          {/* Nút hành động */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Đóng
            </Button>
            <Button
              type="submit"
              className="bg-red-600 hover:bg-red-700 text-white cursor-pointer"
            >
              Xác nhận hủy
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CancelAppointmentModal;
