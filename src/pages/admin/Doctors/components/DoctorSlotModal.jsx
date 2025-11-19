import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dayjs from "dayjs";
import { CalendarX } from "lucide-react";
import { useEffect, useState } from "react";
import { DoctorService } from "@/service/doctor/useDoctor.service";
import { message, Spin } from "antd";

const DoctorSlotsModal = ({ doctor, onClose }) => {
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState(null); // thêm để hiển thị hiệu lực lịch làm việc
  const [messageApi, contextHolder] = message.useMessage();

  // ===============================
  // FETCH CHI TIẾT BÁC SĨ (WORK_SCHEDULE + SLOT)
  // ===============================
  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        setLoading(true);
        const res = await DoctorService.getById(doctor.doctor_id);
        if (res?.work_schedules?.length > 0) {
          // Lấy tất cả slot từ các lịch làm việc
          const allSlots = res.work_schedules.flatMap((ws) => ws.slots || []);

          setSlots(allSlots);
          setScheduleInfo(res.work_schedules[0]); // chỉ hiển thị lịch làm việc đầu tiên
        } else {
          setSlots([]);
        }
      } catch (err) {
        messageApi.error("Không thể tải dữ liệu ca khám!");
      } finally {
        setLoading(false);
      }
    };

    if (doctor?.doctor_id) fetchDoctorDetail();
  }, [doctor]);

  // ===============================
  // LỌC SLOT THEO NGÀY
  // ===============================
  const filteredSlots = slots.filter((slot) => {
    if (!selectedDate) return true;
    return dayjs(slot.slot_date).isSame(dayjs(selectedDate), "day");
  });

  // ===============================
  // BADGE TRẠNG THÁI & NGUỒN
  // ===============================
  const getStatusBadge = (status) => {
    const badges = {
      available: { bg: "bg-emerald-500", text: "Có sẵn" },
      booked: { bg: "bg-orange-500", text: "Đã đặt" },
      canceled: { bg: "bg-red-500", text: "Đã hủy" },
    };
    return badges[status] || { bg: "bg-gray-400", text: status || "Không rõ" };
  };

  const getSourceBadge = (source) => {
    const badges = {
      work_schedule: { bg: "bg-blue-100 text-blue-900", text: "Lịch làm việc" },
      special_schedule: {
        bg: "bg-purple-100 text-purple-900",
        text: "Lịch đặc biệt",
      },
    };
    return (
      badges[source] || { bg: "bg-gray-100 text-gray-800", text: "Không rõ" }
    );
  };

  // ===============================
  // JSX CHÍNH
  // ===============================
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      {contextHolder}
      <div className="max-h-[100vh] w-full max-w-4xl rounded-lg bg-white p-6">
        <h2 className="text-xl font-bold mb-4">
          Ca khám của {doctor.fullname}
        </h2>

        {/* THÔNG TIN LỊCH LÀM VIỆC */}
        {scheduleInfo && (
          <div className="mb-5 rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm">
            <p>
              <span className="font-semibold">Ngày hiệu lực:</span>{" "}
              {scheduleInfo.effective_date} → {scheduleInfo.expire_date}
            </p>
            <p>
              <span className="font-semibold">Thời gian làm việc:</span>{" "}
              {scheduleInfo.start_time} - {scheduleInfo.end_time}
            </p>
            <p>
              <span className="font-semibold">Khoảng thời gian mỗi ca:</span>{" "}
              {scheduleInfo.slot_duration} phút
            </p>
            {scheduleInfo.note && (
              <p>
                <span className="font-semibold">Ghi chú:</span>{" "}
                {scheduleInfo.note}
              </p>
            )}
          </div>
        )}

        {/* BỘ LỌC */}
        <div className="mb-4 flex items-center gap-3">
          <Label
            htmlFor="filter-date"
            className="text-sm font-medium whitespace-nowrap"
          >
            Lọc theo ngày:
          </Label>
          <Input
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            id="filter-date"
            type="date"
            className="w-[220px]"
          />
        </div>

        {/* DANH SÁCH SLOT */}
        <Spin spinning={loading}>
          <div className="rounded-lg border overflow-hidden">
            <div className="max-h-[400px] overflow-y-auto">
              <table className="w-full border-collapse">
                <thead className="bg-gray-50 sticky top-0 z-10">
                  <tr className="text-left text-sm text-gray-600 border-b">
                    <th className="p-3 font-semibold border-r">Mã Slot</th>
                    <th className="p-3 font-semibold border-r">Ngày</th>
                    <th className="p-3 font-semibold border-r">Giờ khám</th>
                    <th className="p-3 font-semibold border-r">Trạng thái</th>
                    <th className="p-3 font-semibold">Nguồn</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSlots.length === 0 ? (
                    <tr>
                      <td
                        colSpan={5}
                        className="text-center py-8 text-gray-500 text-sm italic bg-gray-50"
                      >
                        <div className="flex flex-col items-center justify-center text-gray-500">
                          <CalendarX className="w-10 h-10 mb-2 text-gray-400" />
                          <p className="text-sm italic">
                            Không có dữ liệu lịch khám
                          </p>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredSlots.map((slot) => {
                      const statusBadge = getStatusBadge(slot.status);
                      const sourceBadge = getSourceBadge(slot.source_type);

                      return (
                        <tr
                          key={slot.slot_id}
                          className="border-b last:border-0 hover:bg-gray-50 transition"
                        >
                          <td className="p-3 text-sm border-r">
                            {slot.slot_id}
                          </td>
                          <td className="p-3 text-sm border-r">
                            {slot.slot_date}
                          </td>
                          <td className="p-3 text-sm border-r">
                            {slot.start_at} - {slot.end_at}
                          </td>
                          <td className="p-3 text-sm border-r">
                            <span
                              className={`inline-block rounded px-2 py-1 text-xs font-medium text-white ${statusBadge.bg}`}
                            >
                              {statusBadge.text}
                            </span>
                          </td>
                          <td className="p-3 text-sm">
                            <span
                              className={`inline-block rounded px-2 py-1 text-xs font-medium ${sourceBadge.bg}`}
                            >
                              {sourceBadge.text}
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </Spin>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 cursor-pointer"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
export default DoctorSlotsModal;
