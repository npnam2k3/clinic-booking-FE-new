import { formatDate } from "@/pages/admin/WorkSchedules/components/SchedulesTable";

export const ScheduleDetailsModal = ({ schedule, onClose }) => {
  const workDays =
    Array.isArray(schedule.workDays) && schedule.workDays.length > 0
      ? schedule.workDays
      : schedule.dayOfWeek
      ? [
          {
            dayOfWeek: schedule.dayOfWeek,
            startTime: schedule.startTime,
            endTime: schedule.endTime,
            note: schedule.note || "",
          },
        ]
      : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/45"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 w-full max-w-3xl rounded-lg bg-white p-6 max-h-[90vh] overflow-y-auto shadow-lg">
        <div className="">
          <h3 className="text-lg font-semibold">
            Chi tiết lịch — {schedule.id}
          </h3>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="text-xs text-gray-500">Bác sĩ</div>
            <div className="font-medium">{schedule.doctorName || "-"}</div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Thời lượng slot</div>
            <div className="font-medium">
              {schedule.slotDuration ?? "-"} phút
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Hiệu lực</div>
            <div className="font-medium">
              {formatDate(schedule.effectiveFrom)}
              {schedule.effectiveTo
                ? ` → ${formatDate(schedule.effectiveTo)}`
                : ""}
            </div>
          </div>

          <div>
            <div className="text-xs text-gray-500">Trạng thái</div>
            <div className="mt-1">
              <span
                className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                  schedule.status === "active"
                    ? "bg-emerald-100 text-emerald-900"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                {schedule.status === "active" ? "Hiệu lực" : "Hết hạn"}
              </span>
            </div>
          </div>
        </div>

        {/* work days table */}
        <div className="mt-6">
          <h4 className="text-sm font-semibold mb-3">Các ngày làm việc</h4>

          <div className="rounded-lg border overflow-hidden shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-gray-600">
                  <th className="px-4 py-3 font-medium">Thứ</th>
                  <th className="px-4 py-3 font-medium">Giờ làm</th>
                  <th className="px-4 py-3 font-medium">Ghi chú</th>
                </tr>
              </thead>

              <tbody>
                {workDays.length === 0 ? (
                  <tr>
                    <td
                      colSpan={3}
                      className="px-4 py-6 text-center text-gray-500"
                    >
                      Chưa có ngày làm việc.
                    </td>
                  </tr>
                ) : (
                  workDays.map((d, i) => (
                    <tr key={i} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-3 align-top font-medium">
                        {d.dayOfWeek || "-"}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {d.startTime
                          ? `${d.startTime} - ${d.endTime ?? "-"}`
                          : "-"}
                      </td>
                      <td className="px-4 py-3 align-top">{d.note || "-"}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
          >
            Đóng
          </button>
        </div>
      </div>
    </div>
  );
};
