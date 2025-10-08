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

const CancelAppointmentModal = ({ appointment, onClose, onConfirm }) => {
  const [cancelBy, setCancelBy] = useState("");
  const [cancelReason, setCancelReason] = useState("");
  const [note, setNote] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm({ cancelBy, cancelReason, note });
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
          <span className="font-semibold">{appointment.patientName}</span>
        </p>

        {/* Thông tin lịch khám */}
        <div className="mb-4 rounded-lg bg-yellow-50 p-3">
          <p className="text-sm font-medium">Mã lịch: {appointment.id}</p>
          <p className="text-sm">Bác sĩ: {appointment.doctorName}</p>
          <p className="text-sm">
            Thời gian: {appointment.date} lúc {appointment.time}
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
                <SelectItem value="doctor">Bác sĩ</SelectItem>
                <SelectItem value="admin">Quản trị viên</SelectItem>
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
                <SelectItem value="busy">Bận việc đột xuất</SelectItem>
                <SelectItem value="sick">Không thể đến khám</SelectItem>
                <SelectItem value="reschedule">Cần đổi lịch khác</SelectItem>
                <SelectItem value="other">Lý do khác</SelectItem>
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
