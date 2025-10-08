import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { mockDoctorSlots } from "@/data/mockData";
import dayjs from "dayjs";
import { CalendarX } from "lucide-react";
import { useState } from "react";

const DoctorSlotsModal = ({ doctor, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("");
  const slots = mockDoctorSlots[doctor.id] || [];
  const filteredSlots = slots.filter((slot) => {
    if (!selectedDate) return true;
    return dayjs(slot.date).isSame(dayjs(selectedDate), "day");
  });

  const getStatusBadge = (status) => {
    const badges = {
      available: { bg: "bg-emerald-500", text: "Có sẵn" },
      booked: { bg: "bg-orange-500", text: "Đã đặt" },
      cancelled: { bg: "bg-red-500", text: "Đã hủy" },
    };
    return badges[status] || badges.available;
  };

  const getSourceSchedule = (source) => {
    const badges = {
      work_schedule: {
        bg: "bg-blue-100 text-blue-900",
        text: "Lịch làm việc",
      },
      special_schedule: {
        bg: "bg-purple-100 text-purple-900",
        text: "Lịch đặc biệt",
      },
    };
    return badges[source];
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="max-h-[100vh] w-full max-w-4xl rounded-lg bg-white p-6">
        <div className="mb-4">
          <h2 className="text-xl font-bold">Ca khám của {doctor.name}</h2>
          <div className="mt-4 rounded-lg bg-blue-50 p-4">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-blue-100 p-1">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Lưu ý:</p>
                <p className="text-sm text-blue-700">
                  Các slot khám được tạo tự động từ nut "Chia slot khám" trong
                  trang Lịch làm việc. Không có chức năng thêm/sửa/xóa thủ công.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
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

        {/* Slots Table */}
        <div className="rounded-lg border overflow-hidden">
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full border-collapse">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr className="text-left text-sm text-gray-600 border-b">
                  <th className="p-3 font-semibold border-r">Mã slot</th>
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
                    const bookingBadge = getSourceSchedule(slot.source);
                    console.log(bookingBadge);
                    return (
                      <tr
                        key={slot.id}
                        className="border-b last:border-0 hover:bg-gray-50 transition"
                      >
                        <td className="p-3 text-sm border-r">{slot.id}</td>
                        <td className="p-3 text-sm border-r">{slot.date}</td>
                        <td className="p-3 text-sm border-r">{slot.time}</td>
                        <td className="p-3 text-sm border-r">
                          <span
                            className={`inline-block rounded px-2 py-1 text-xs font-medium text-white ${statusBadge.bg}`}
                          >
                            {statusBadge.text}
                          </span>
                        </td>
                        <td className="p-3 text-sm">
                          <span
                            className={`inline-block rounded px-2 py-1 text-xs font-medium ${bookingBadge.bg}`}
                          >
                            {bookingBadge.text}
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
