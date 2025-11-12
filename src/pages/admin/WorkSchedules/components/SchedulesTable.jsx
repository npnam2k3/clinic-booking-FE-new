import { Eye } from "lucide-react";
import { ScheduleDetailsModal } from "@/pages/admin/WorkSchedules/components/ScheduleDetailModal";
import { useState } from "react";

const SchedulesTable = ({ filteredSchedules = [], activeTab = "new" }) => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);

  const openDetail = (schedule) => {
    setSelectedSchedule(schedule);
    setDetailOpen(true);
  };

  const closeDetail = () => {
    setSelectedSchedule(null);
    setDetailOpen(false);
  };

  return (
    <div className="rounded-lg bg-white shadow-sm">
      {filteredSchedules.length === 0 ? (
        <div className="p-8 text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
            <svg
              className="h-6 w-6 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {activeTab === "new"
              ? "Chưa có lịch làm việc mới"
              : "Chưa có lịch làm việc cũ"}
          </h3>
          <p className="text-gray-500 mb-4">
            {activeTab === "new"
              ? "Hãy thêm lịch làm việc mới để bắt đầu quản lý"
              : "Không có dữ liệu lịch làm việc cũ trong hệ thống"}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="p-4 font-medium">Mã lịch</th>
                <th className="p-4 font-medium">Bác sĩ</th>
                <th className="p-4 font-medium">Ngày làm việc</th>
                <th className="p-4 font-medium">Khung giờ</th>
                <th className="p-4 font-medium">Hiệu lực</th>
                <th className="p-4 font-medium">Slot (phút)</th>
                <th className="p-4 font-medium">Trạng thái</th>
                <th className="p-4 font-medium">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredSchedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="border-b last:border-0 hover:bg-gray-50"
                >
                  <td className="p-4 text-sm">{schedule.id}</td>

                  <td className="p-4 text-sm font-medium whitespace-pre-wrap">
                    {schedule.doctorName}
                  </td>

                  <td className="p-4 text-sm">{schedule.dayOfWeek}</td>

                  <td className="p-4 text-sm">
                    {schedule.startTime} - {schedule.endTime}
                  </td>

                  <td className="p-4 text-sm">
                    {formatDate(schedule.effectiveDate)} →{" "}
                    {formatDate(schedule.expireDate)}
                  </td>

                  <td className="p-4 text-sm text-center">
                    {schedule.slotDuration ?? "-"}
                  </td>

                  <td className="p-4 text-sm">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                        schedule.status === "Đang hoạt động"
                          ? "bg-emerald-100 text-emerald-900"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {schedule.status}
                    </span>
                  </td>

                  <td className="p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => openDetail(schedule)}
                        className="rounded p-2 hover:bg-gray-100 cursor-pointer"
                        title="Xem chi tiết"
                        aria-label={`Xem chi tiết lịch ${schedule.id}`}
                      >
                        <Eye className="h-5 w-5 text-gray-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {detailOpen && selectedSchedule && (
        <ScheduleDetailsModal
          schedule={selectedSchedule}
          onClose={closeDetail}
        />
      )}
    </div>
  );
};

export default SchedulesTable;

export function formatDate(value) {
  if (!value) return "-";
  const d = new Date(value);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString("vi-VN");
  }
  return value;
}
