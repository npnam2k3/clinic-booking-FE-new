import { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, RefreshCcw } from "lucide-react";
import { message, Spin } from "antd";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import AppointmentsTables from "@/pages/admin/Appointments/components/AppointmentsTables";
import AppointmentDetailModal from "@/pages/admin/Appointments/components/AppointmentDetailModal";
import CancelAppointmentModal from "@/pages/admin/Appointments/components/CancelAppointmentModal";

import { AppointmentService } from "@/service/appointment/appointment.service";

const AppointmentsPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

  // ===============================
  // ĐỒNG BỘ TỪ KHÓA TÌM KIẾM VỚI URL
  // ===============================
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";
  const [searchInput, setSearchInput] = useState(initialKeyword);
  const [searchTerm, setSearchTerm] = useState(initialKeyword);
  const [messageApi, contextHolder] = message.useMessage();

  // ===============================
  // FETCH DANH SÁCH CUỘC HẸN
  // ===============================
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await AppointmentService.getAll();
      console.log("Fetched appointments:", data);
      setAppointments(data.appointments || []);
    } catch (err) {
      console.error("Lỗi khi tải danh sách cuộc hẹn:", err);
      messageApi.error("Tải danh sách cuộc hẹn thất bại!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // ===============================
  // TÌM KIẾM & LÀM MỚI
  // ===============================
  const handleSearch = () => {
    const keyword = searchInput.trim();
    setSearchTerm(keyword);
    if (keyword) setSearchParams({ keyword });
    else setSearchParams({});
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchTerm("");
    setSearchParams({});
    setStatusFilter("all");
    setDateFilter("");
    fetchAppointments();
  };

  // ===============================
  // LỌC CLIENT-SIDE
  // ===============================
  const filteredAppointments = useMemo(() => {
    if (!Array.isArray(appointments)) return [];

    const kw = searchTerm.toLowerCase();

    return appointments.filter((apt) => {
      const patientName = apt.patient?.fullname?.toLowerCase() || "";
      const doctorName = apt.doctor_slot?.doctor?.fullname?.toLowerCase() || "";
      const matchesSearch =
        !kw ||
        patientName.includes(kw) ||
        doctorName.includes(kw) ||
        String(apt.appointment_id).includes(kw);

      const matchesStatus =
        statusFilter === "all" || apt.status === statusFilter;

      const matchesDate =
        !dateFilter || apt.doctor_slot?.slot_date === dateFilter;

      return matchesSearch && matchesStatus && matchesDate;
    });
  }, [appointments, searchTerm, statusFilter, dateFilter]);

  // ===============================
  // XEM CHI TIẾT
  // ===============================
  const handleViewDetails = async (apt) => {
    try {
      setLoading(true);
      const data = await AppointmentService.getById(apt.appointment_id);
      if (data) {
        setSelectedAppointment(data);
        setIsDetailModalOpen(true);
      } else {
        messageApi.error("Không thể xem chi tiết cuộc hẹn!");
      }
    } catch (err) {
      console.error("Lỗi khi lấy chi tiết:", err);
      messageApi.error("Lấy chi tiết cuộc hẹn thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // HỦY CUỘC HẸN
  // ===============================
  // ===============================
  // HỦY CUỘC HẸN
  // ===============================
  const handleCancel = (apt) => {
    setSelectedAppointment(apt);
    setIsCancelModalOpen(true);
  };

  // Khi modal trả về danh sách cập nhật, cập nhật state ở trang này
  const handleConfirmCancel = (updatedAppointments, successMessage) => {
    if (successMessage) messageApi.success(successMessage);
    if (updatedAppointments) setAppointments(updatedAppointments);
    else fetchAppointments();
    setIsCancelModalOpen(false);
    setSelectedAppointment(null);
  };

  // ===============================
  // JSX CHÍNH
  // ===============================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {contextHolder}
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Quản lý lịch khám
        </h1>

        {/* Bộ lọc */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Ô tìm kiếm */}
            <div className="flex items-center gap-3 w-full md:w-3/4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm theo bệnh nhân hoặc bác sĩ..."
                  className="pl-10"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <Button onClick={handleSearch}>Tìm kiếm</Button>
              <Button
                variant="outline"
                className="flex items-center gap-2"
                onClick={handleReset}
              >
                <RefreshCcw className="h-4 w-4" /> Làm mới
              </Button>
            </div>

            {/* Bộ lọc trạng thái và ngày */}
            <div className="flex gap-3 w-full md:w-1/4">
              <Select
                value={statusFilter}
                onValueChange={(v) => setStatusFilter(v)}
              >
                <SelectTrigger className="w-full focus:border-[#33A1E0] focus:ring-1 focus:ring-[#33A1E0]">
                  <SelectValue placeholder="Lọc theo trạng thái" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">Tất cả</SelectItem>
                    <SelectItem value="pending">Đang xử lý</SelectItem>
                    <SelectItem value="confirmed">Đã xác nhận</SelectItem>
                    <SelectItem value="completed">Đã hoàn thành</SelectItem>
                    <SelectItem value="canceled">Đã hủy</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Bảng danh sách */}
        <Spin spinning={loading}>
          <AppointmentsTables
            appointments={filteredAppointments}
            handleViewDetails={handleViewDetails}
            handleCancel={handleCancel}
          />
        </Spin>

        {/* Modal xem chi tiết */}
        {isDetailModalOpen && selectedAppointment && (
          <AppointmentDetailModal
            appointment={selectedAppointment}
            onClose={() => {
              setIsDetailModalOpen(false);
              setSelectedAppointment(null);
            }}
          />
        )}

        {/* Modal hủy lịch */}
        {isCancelModalOpen && selectedAppointment && (
          <CancelAppointmentModal
            appointment={selectedAppointment}
            onClose={() => {
              setIsCancelModalOpen(false);
              setSelectedAppointment(null);
            }}
            onConfirm={handleConfirmCancel}
            onError={(msg) => messageApi.error(msg)}
          />
        )}
      </div>
    </div>
  );
};
export default AppointmentsPage;
