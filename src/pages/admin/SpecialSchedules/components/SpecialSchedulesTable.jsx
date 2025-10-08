import { Pencil, Trash2 } from "lucide-react";

const SpecialSchedulesTable = ({ specialSchedules, handleEdit }) => {
  const getStatusBadge = (status) => {
    return status === "active"
      ? { bg: "bg-emerald-100 text-emerald-900", text: "Làm việc" }
      : { bg: "bg-red-100 text-red-900", text: "Nghỉ" };
  };
  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4 font-medium">Mã lịch</th>
              <th className="p-4 font-medium">Bác sĩ</th>
              <th className="p-4 font-medium">Ngày</th>
              <th className="p-4 font-medium">Giờ làm việc</th>
              <th className="p-4 font-medium">Thời lượng slot</th>
              <th className="p-4 font-medium">Trạng thái</th>
              <th className="p-4 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {specialSchedules.map((schedule) => {
              const badge = getStatusBadge(schedule.status);
              return (
                <tr key={schedule.id} className="border-b last:border-0">
                  <td className="p-4 text-sm">{schedule.id}</td>
                  <td className="p-4 text-sm font-medium">
                    {schedule.doctorName}
                  </td>
                  <td className="p-4 text-sm">{schedule.date}</td>
                  <td className="p-4 text-sm">
                    {schedule.type === "work"
                      ? `${schedule.startTime} - ${schedule.endTime}`
                      : "Nghỉ cả ngày"}
                  </td>
                  <td className="p-4 text-sm">
                    {schedule.slotDuration
                      ? `${schedule.slotDuration} phút`
                      : "-"}
                  </td>
                  <td className="p-4 text-sm">
                    <span
                      className={`inline-block rounded px-2 py-1 text-xs font-medium ${badge.bg}`}
                    >
                      {badge.text}
                    </span>
                  </td>
                  <td className="p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(schedule)}
                        className="rounded cursor-pointer p-1 hover:bg-gray-100"
                        title="Chỉnh sửa"
                      >
                        <Pencil className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        className="rounded cursor-pointer p-1 hover:bg-gray-100"
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecialSchedulesTable;
