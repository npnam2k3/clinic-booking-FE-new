import { useState } from "react";
import { Search, Eye, X, ChevronDown } from "lucide-react";
import { mockAppointments } from "@/data/mockData";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState(mockAppointments);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredAppointments = appointments.filter((apt) => {
    const matchesSearch =
      apt.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.doctorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      apt.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || apt.status === statusFilter;
    const matchesDate = !dateFilter || apt.date === dateFilter;
    return matchesSearch && matchesStatus && matchesDate;
  });

  const getStatusBadge = (status) => {
    const badges = {
      pending: { bg: "bg-orange-500", text: "Pending" },
      confirmed: { bg: "bg-emerald-500", text: "Confirmed" },
      completed: { bg: "bg-blue-500", text: "Completed" },
      cancelled: { bg: "bg-red-500", text: "Cancelled" },
    };
    return badges[status] || badges.pending;
  };

  const handleViewDetails = (apt) => {
    setSelectedAppointment(apt);
    setIsDetailModalOpen(true);
  };

  const handleCancel = (apt) => {
    setSelectedAppointment(apt);
    setIsCancelModalOpen(true);
  };

  const handleUpdateStatus = (id, newStatus) => {
    setAppointments(
      appointments.map((apt) =>
        apt.id === id ? { ...apt, status: newStatus } : apt
      )
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">
            Quản lý lịch khám
          </h1>
          <p className="text-gray-600">
            Quản lý toàn bộ lịch khám, trạng thái và hủy lịch
          </p>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo bệnh nhân, bác sĩ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              {/* <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="all">Tất cả</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select> */}
              <Select>
                <SelectTrigger className="w-full !h-[40px]">
                  <SelectValue placeholder="Chuyên khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tất cả chuyên khoa</SelectItem>
                    <SelectItem value="1">Tim mạch</SelectItem>
                    <SelectItem value="2">Xương khớp</SelectItem>
                    <SelectItem value="3">Thần kinh</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        {/* Appointments Table */}
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
                {filteredAppointments.map((apt) => {
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
                          <button
                            className={`flex items-center gap-1 rounded px-2 py-1 text-xs font-medium text-white ${badge.bg}`}
                          >
                            {badge.text}
                            {apt.status === "pending" && (
                              <ChevronDown className="h-3 w-3" />
                            )}
                          </button>
                          {apt.status === "pending" && (
                            <div className="absolute left-0 top-8 z-10 hidden rounded-lg border bg-white shadow-lg group-hover:block">
                              <button
                                onClick={() =>
                                  handleUpdateStatus(apt.id, "pending")
                                }
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                              >
                                Pending
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(apt.id, "confirmed")
                                }
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                              >
                                Confirmed
                              </button>
                              <button
                                onClick={() =>
                                  handleUpdateStatus(apt.id, "completed")
                                }
                                className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-50"
                              >
                                Completed
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-sm text-gray-600">
                        {apt.note || "-"}
                      </td>
                      <td className="p-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewDetails(apt)}
                            className="rounded p-1 hover:bg-gray-100"
                            title="Xem chi tiết"
                          >
                            <Eye className="h-4 w-4 text-gray-600" />
                          </button>
                          {apt.status !== "cancelled" && (
                            <button
                              onClick={() => handleCancel(apt)}
                              className="rounded p-1 hover:bg-gray-100"
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

        {/* Detail Modal */}
        {isDetailModalOpen && selectedAppointment && (
          <AppointmentDetailModal
            appointment={selectedAppointment}
            onClose={() => {
              setIsDetailModalOpen(false);
              setSelectedAppointment(null);
            }}
          />
        )}

        {/* Cancel Modal */}
        {isCancelModalOpen && selectedAppointment && (
          <CancelAppointmentModal
            appointment={selectedAppointment}
            onClose={() => {
              setIsCancelModalOpen(false);
              setSelectedAppointment(null);
            }}
            onConfirm={(cancelReason) => {
              handleUpdateStatus(selectedAppointment.id, "cancelled");
              setIsCancelModalOpen(false);
              setSelectedAppointment(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

const AppointmentDetailModal = ({ appointment, onClose }) => {
  const badge = {
    pending: { bg: "bg-orange-500", text: "Pending" },
    confirmed: { bg: "bg-emerald-500", text: "Confirmed" },
    completed: { bg: "bg-blue-500", text: "Completed" },
    cancelled: { bg: "bg-red-500", text: "Cancelled" },
  }[appointment.status];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Chi tiết lịch khám</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <p className="text-sm text-gray-600">Mã lịch khám</p>
            <p className="text-lg font-bold">{appointment.id}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Thông tin bệnh nhân</p>
              <p className="font-medium">{appointment.patientName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Bác sĩ khám</p>
              <p className="font-medium">{appointment.doctorName}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Ngày khám</p>
              <p className="font-medium">{appointment.date}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Giờ khám</p>
              <p className="font-medium">{appointment.time}</p>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-600">Trạng thái</p>
            <span
              className={`mt-1 inline-block rounded px-2 py-1 text-xs font-medium text-white ${badge.bg}`}
            >
              {badge.text}
            </span>
          </div>

          <div>
            <p className="text-sm text-gray-600">Ghi chú</p>
            <p className="font-medium">
              {appointment.note || "Không có ghi chú"}
            </p>
          </div>

          {appointment.status === "cancelled" && (
            <div className="rounded-lg bg-red-50 p-4">
              <p className="text-sm font-medium text-red-900">Lịch sử hủy</p>
              <p className="text-sm text-red-700">
                Người hủy: {appointment.cancellationReason || "Bệnh nhân"}
              </p>
              <p className="text-sm text-red-700">
                Lý do: {appointment.cancellationReason || "Bận việc đột xuất"}
              </p>
              <p className="text-sm text-red-700">
                Thời gian hủy: {appointment.cancelledAt || "N/A"}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

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
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Hủy lịch khám</h2>
        <p className="mb-6 text-sm text-gray-600">
          Xác nhận hủy lịch khám cho bệnh nhân {appointment.patientName}
        </p>

        <div className="mb-4 rounded-lg bg-yellow-50 p-3">
          <p className="text-sm font-medium">Mã lịch: {appointment.id}</p>
          <p className="text-sm">Bác sĩ: {appointment.doctorName}</p>
          <p className="text-sm">
            Thời gian: {appointment.date} lúc {appointment.time}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Người hủy <span className="text-red-500">*</span>
            </label>
            <select
              value={cancelBy}
              onChange={(e) => setCancelBy(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Chọn người hủy</option>
              <option value="patient">Bệnh nhân</option>
              <option value="doctor">Bác sĩ</option>
              <option value="admin">Quản trị viên</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Lý do hủy <span className="text-red-500">*</span>
            </label>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Chọn lý do</option>
              <option value="busy">Bận việc đột xuất</option>
              <option value="sick">Không thể đến khám</option>
              <option value="reschedule">Cần đổi lịch khác</option>
              <option value="other">Lý do khác</option>
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Ghi chú thêm
            </label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              rows={3}
              placeholder="Nhập ghi chú nếu cần..."
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Đóng
            </button>
            <button
              type="submit"
              className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700"
            >
              Xác nhận hủy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentsPage;
