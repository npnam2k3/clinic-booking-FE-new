import { Badge } from "@/components/ui/badge";
import { Eye, X } from "lucide-react";

const AppointmentsTables = ({
  appointments,
  handleViewDetails,
  handleCancel,
}) => {
  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: "bg-orange-500", text: "Pending" },
      confirmed: { bg: "bg-emerald-500", text: "Confirmed" },
      completed: { bg: "bg-blue-500", text: "Completed" },
      cancelled: { bg: "bg-red-500", text: "Cancelled" },
    };
    return badges[status] || badges.pending;
  };
  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4 font-medium">Mã lịch</th>
              <th className="p-4 font-medium">Bệnh nhân</th>
              <th className="p-4 font-medium">Bác sĩ</th>
              <th className="p-4 font-medium">Ngày khám</th>
              <th className="p-4 font-medium">Giờ khám</th>
              <th className="p-4 font-medium">Trạng thái</th>
              <th className="p-4 font-medium">Ghi chú</th>
              <th className="p-4 font-medium">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((apt) => {
              const badge = getStatusBadge(apt.status);
              return (
                <tr key={apt.id} className="border-b last:border-0">
                  <td className="p-4 text-sm">{apt.id}</td>
                  <td className="p-4 text-sm">{apt.patientName}</td>
                  <td className="p-4 text-sm">{apt.doctorName}</td>
                  <td className="p-4 text-sm">{apt.date}</td>
                  <td className="p-4 text-sm">{apt.time}</td>
                  <td className="p-4 text-sm">
                    <div className="relative">
                      <Badge
                        className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-white ${badge.bg}`}
                      >
                        {badge.text}
                      </Badge>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-gray-600">
                    {apt.note || "-"}
                  </td>
                  <td className="p-4 text-sm">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(apt)}
                        className="rounded cursor-pointer p-1 hover:bg-gray-100"
                        title="Xem chi tiết"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      {apt.status !== "cancelled" && (
                        <button
                          onClick={() => handleCancel(apt)}
                          className="rounded cursor-pointer p-1 hover:bg-gray-100"
                          title="Hủy lịch"
                        >
                          <X className="h-4 w-4 text-red-600" />
                        </button>
                      )}
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

export default AppointmentsTables;
