import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, AlertTriangle } from "lucide-react";
import { Modal, message, Input } from "antd";
import { AppointmentService } from "@/service/appointment/appointment.service";

const { TextArea } = Input;

const statusColor = {
  completed: "bg-green-200 text-green-800",
  pending: "bg-sky-200 text-sky-800",
  canceled: "bg-orange-200 text-orange-800",
};

const statusText = {
  completed: "Đã khám",
  pending: "Sắp tới",
  canceled: "Đã hủy",
};

const CardBooking = ({ data, onCancelSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelNote, setCancelNote] = useState("");

  const doctor = data?.doctor_slot?.doctor;
  const slot = data?.doctor_slot;

  // ✅ Xác nhận hủy lịch
  const handleConfirmCancel = async () => {
    try {
      setLoading(true);
      const payload = {
        cancellation_party: "patient",
        reason_code: "REQUESTED_BY_CUSTOMER",
        note: cancelNote || "",
      };
      console.log("🧾 Cancel payload:", payload);

      const res = await AppointmentService.cancel(data.appointment_id, payload);
      console.log("✅ Cancel response:", res);

      if (res?.status || res?.data) {
        message.success("Hủy lịch khám thành công!");
        setIsCancelModalOpen(false);
        if (onCancelSuccess) onCancelSuccess(); // ✅ gọi reload
      } else {
        const msg =
          res?.message ||
          res?.detail?.[0]?.message ||
          "Không thể hủy lịch khám.";
        message.error(msg);
      }
    } catch (err) {
      console.error("❌ Lỗi khi hủy lịch:", err);
      const backendMsg =
        err?.response?.data?.detail?.[0]?.message ||
        err?.response?.data?.message ||
        "Hủy lịch thất bại. Vui lòng thử lại!";
      message.error(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="border border-gray-300 px-[20px] py-[30px] rounded-[12px] shadow flex items-end justify-between">
        {/* LEFT */}
        <div className="flex gap-x-[16px] items-start">
          <img
            src={
              doctor?.avatar_url ||
              "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt={doctor?.fullname}
            className="w-[60px] h-[60px] object-cover rounded-[8px]"
          />
          <div>
            <h1 className="text-lg font-semibold mb-[4px]">
              {doctor?.fullname || "Bác sĩ chưa xác định"}
            </h1>
            <p className="text-gray-600 flex items-center gap-x-[8px]">
              <Calendar size={16} />
              <span>
                {slot
                  ? `${slot.slot_date} - ${slot.start_at.slice(0, 5)}`
                  : "Chưa rõ thời gian"}
              </span>
            </p>

            <div className="mt-[16px] flex gap-x-[8px] flex-wrap">
              <Badge className="bg-white text-gray-800 border border-gray-300">
                {doctor?.position || "Bác sĩ"}
              </Badge>
              <Badge className={statusColor[data.status] || "bg-gray-200"}>
                {statusText[data.status] || "Không xác định"}
              </Badge>
            </div>

            {/* note */}
            <div className="mt-[12px] text-gray-700 flex gap-x-[4px]">
              <span className="font-bold">Ghi chú:</span>
              <p>{data.note || "Không có ghi chú"}</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex gap-x-[8px]">
          {data.status === "pending" && (
            <button
              onClick={() => setIsCancelModalOpen(true)}
              className="flex items-center gap-x-[8px] border border-gray-300 px-[12px] py-[4px] rounded-[8px] cursor-pointer hover:bg-gray-200 transition duration-200"
            >
              <span className="text-red-600 font-semibold">Hủy lịch</span>
            </button>
          )}
        </div>
      </div>

      {/* ==================== MODAL XÁC NHẬN ==================== */}
      <Modal
        title={
          <div className="flex items-center gap-x-[8px]">
            <AlertTriangle className="text-orange-500" size={18} />
            <span>Xác nhận hủy lịch khám</span>
          </div>
        }
        open={isCancelModalOpen}
        onOk={handleConfirmCancel}
        okText="Xác nhận hủy"
        cancelText="Đóng"
        okButtonProps={{ danger: true, loading }}
        onCancel={() => setIsCancelModalOpen(false)}
      >
        <p>Bạn có chắc chắn muốn hủy lịch khám này không?</p>
        <p className="text-gray-500 mt-2">Vui lòng ghi lý do (nếu có):</p>
        <TextArea
          rows={3}
          placeholder="Nhập lý do hủy (không bắt buộc)"
          value={cancelNote}
          onChange={(e) => setCancelNote(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default CardBooking;
