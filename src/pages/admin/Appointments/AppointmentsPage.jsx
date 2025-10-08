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
import { Input } from "@/components/ui/input";
import AppointmentsTables from "@/pages/admin/Appointments/components/AppointmentsTables";
import AppointmentDetailModal from "@/pages/admin/Appointments/components/AppointmentDetailModal";
import CancelAppointmentModal from "@/pages/admin/Appointments/components/CancelAppointmentModal";

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
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo bệnh nhân"
                  className="px-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <div className="flex gap-4">
              <Select>
                <SelectTrigger className="w-full focus:border-[#33A1E0] focus:ring-1 focus:ring-[#33A1E0]">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="pending">Đang xử lý</SelectItem>
                    <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                    <SelectItem value="completed">Đã hoàn thành</SelectItem>
                    <SelectItem value="cancelled">Đã hủy</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                type="date"
                className="px-4"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Appointments Table */}
        <AppointmentsTables
          appointments={filteredAppointments}
          handleCancel={handleCancel}
          handleViewDetails={handleViewDetails}
        />

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

export default AppointmentsPage;
