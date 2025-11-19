import { Eye } from "lucide-react";
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
        <div className="p-8 text-center text-gray-500">
          {activeTab === "new"
            ? "Chưa có lịch làm việc mới"
            : "Chưa có lịch làm việc hiện tại"}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead className="border-b bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="p-4 font-medium">Mã lịch</th>
                <th className="p-4 font-medium">Bác sĩ</th>
                <th className="p-4 font-medium">Thời lượng slot</th>
                <th className="p-4 font-medium">Hiệu lực</th>
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
                    BS. {schedule.doctorName}
                  </td>
                  <td className="p-4 text-sm text-center">
                    {schedule.slotDuration && schedule.slotDuration !== "-"
                      ? `${schedule.slotDuration} phút`
                      : "Chưa thiết lập"}
                  </td>
                  <td className="p-4 text-sm">
                    {schedule.effectiveDate &&
                    schedule.expireDate &&
                    schedule.effectiveDate !== "-" &&
                    schedule.expireDate !== "-" &&
                    schedule.effectiveDate !== null &&
                    schedule.expireDate !== null &&
                    schedule.effectiveDate !== "" &&
                    schedule.expireDate !== "" ? (
                      <>
                        {formatDate(schedule.effectiveDate)} →{" "}
                        {formatDate(schedule.expireDate)}
                      </>
                    ) : (
                      <span className="italic text-gray-400">
                        Chưa thiết lập hiệu lực
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-sm">
                    <span className="inline-block rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-900">
                      {schedule.status}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <button
                      onClick={() => openDetail(schedule)}
                      className="rounded p-2 hover:bg-gray-100 cursor-pointer"
                      title="Xem chi tiết"
                    >
                      <Eye className="h-5 w-5 text-gray-600" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal xem chi tiết */}
      {detailOpen && selectedSchedule && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6">
            <h2 className="text-xl font-semibold mb-2">
              Chi tiết lịch — {selectedSchedule.id}
            </h2>
            <p className="text-gray-700 mb-1">
              <strong>Bác sĩ:</strong> BS. {selectedSchedule.doctorName}
            </p>
            <p className="text-gray-700 mb-1">
              <strong>Thời lượng slot:</strong> {selectedSchedule.slotDuration}{" "}
              phút
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Hiệu lực:</strong>{" "}
              {formatDate(selectedSchedule.effectiveDate)} →{" "}
              {formatDate(selectedSchedule.expireDate)}
            </p>

            <table className="w-full border text-sm mb-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="border p-2">Thứ</th>
                  <th className="border p-2">Giờ làm</th>
                  <th className="border p-2">Ghi chú</th>
                </tr>
              </thead>
              <tbody>
                {selectedSchedule.workDays.map((d, idx) => (
                  <tr key={idx}>
                    <td className="border p-2">{d.dayOfWeek}</td>
                    <td className="border p-2">
                      {d.startTime} - {d.endTime}
                    </td>
                    <td className="border p-2">{d.note || "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="text-right">
              <button
                onClick={closeDetail}
                className="rounded bg-gray-200 px-4 py-2 hover:bg-gray-300"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
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
