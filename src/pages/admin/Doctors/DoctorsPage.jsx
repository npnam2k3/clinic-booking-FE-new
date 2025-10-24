import { useState, useEffect, useCallback, useMemo } from "react";
import { Plus, Search, Clock, Pencil, Trash2, RefreshCcw } from "lucide-react";
import { message, Spin } from "antd";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DoctorFormModal from "@/pages/admin/Doctors/components/DoctorFormModal";
import DoctorSlotsModal from "@/pages/admin/Doctors/components/DoctorSlotModal";

import { DoctorService } from "@/service/doctor/useDoctor.service";
import { SpecialtyService } from "@/service/specialty/specialty.service";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSlotsModalOpen, setIsSlotsModalOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  // ===============================
  // FETCH DANH SÁCH BÁC SĨ & CHUYÊN KHOA
  // ===============================
  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const data = await DoctorService.getAll();
      setDoctors(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách bác sĩ:", err);
      message.error("Không thể tải danh sách bác sĩ!");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchSpecialties = useCallback(async () => {
    try {
      const res = await SpecialtyService.getAll();
      setSpecialties(res);
    } catch (err) {
      console.error("Lỗi khi tải chuyên khoa:", err);
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
    fetchSpecialties();
  }, [fetchDoctors, fetchSpecialties]);

  // ===============================
  // TÌM KIẾM & LỌC
  // ===============================
  const handleSearch = () => {
    setSearchTerm(searchInput.trim());
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchTerm("");
    setSelectedSpecialty("all");
    fetchDoctors();
  };

  const filteredDoctors = useMemo(() => {
    if (!Array.isArray(doctors)) return [];

    const kw = searchTerm.toLowerCase();

    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.fullname.toLowerCase().includes(kw) ||
        doctor.email.toLowerCase().includes(kw);
      const matchesSpecialty =
        selectedSpecialty === "all" ||
        doctor.specialty?.specialization_name === selectedSpecialty;

      return matchesSearch && matchesSpecialty;
    });
  }, [doctors, searchTerm, selectedSpecialty]);

  // ===============================
  // HÀNH ĐỘNG
  // ===============================
  const handleViewSlots = (doctor) => {
    setSelectedDoctor(doctor);
    setIsSlotsModalOpen(true);
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (doctorId) => {
    if (confirm("Bạn có chắc chắn muốn xóa bác sĩ này?")) {
      try {
        await DoctorService.delete(doctorId);
        message.success("Đã xóa bác sĩ thành công!");
        fetchDoctors();
      } catch (err) {
        console.error("Lỗi khi xóa bác sĩ:", err);
        message.error("Không thể xóa bác sĩ!");
      }
    }
  };

  const handleSave = async () => {
    fetchDoctors();
    setIsAddModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedDoctor(null);
  };

  // ===============================
  // JSX CHÍNH
  // ===============================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý bác sĩ</h1>
            <p className="text-gray-600">
              Quản lý danh sách bác sĩ và chuyên khoa
            </p>
          </div>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 bg-orange-600 hover:bg-orange-700 text-white"
          >
            <Plus className="h-5 w-5" />
            Thêm bác sĩ
          </Button>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Tìm kiếm */}
            <div className="flex-1 flex items-center gap-3">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Tìm kiếm bác sĩ theo tên hoặc email..."
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

            {/* Chuyên khoa */}
            <div className="w-full md:w-64">
              <Select
                value={selectedSpecialty}
                onValueChange={(value) => setSelectedSpecialty(value)}
              >
                <SelectTrigger className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#33A1E0] focus:ring-1 focus:ring-[#33A1E0]">
                  <SelectValue placeholder="Chọn chuyên khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả chuyên khoa</SelectItem>
                  {specialties.map((spec) => (
                    <SelectItem
                      key={spec.specialization_id}
                      value={spec.specialization_name}
                    >
                      {spec.specialization_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Doctors Table */}
        <Spin spinning={loading}>
          <div className="rounded-lg bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="p-4 font-medium">Mã BS</th>
                    <th className="p-4 font-medium">Họ tên</th>
                    <th className="p-4 font-medium">Học vị</th>
                    <th className="p-4 font-medium">Chức danh</th>
                    <th className="p-4 font-medium">Chuyên khoa</th>
                    <th className="p-4 font-medium">Kinh nghiệm</th>
                    <th className="p-4 font-medium">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((doctor) => (
                    <tr
                      key={doctor.doctor_id}
                      className="border-b last:border-0"
                    >
                      <td className="p-4 text-sm">{doctor.doctor_id}</td>
                      <td className="p-4 text-sm font-medium">
                        {doctor.fullname}
                      </td>
                      <td className="p-4 text-sm">{doctor.degree}</td>
                      <td className="p-4 text-sm">{doctor.position}</td>
                      <td className="p-4 text-sm">
                        {doctor.specialty?.specialization_name || "—"}
                      </td>
                      <td className="p-4 text-sm">
                        {doctor.years_of_experience} năm
                      </td>
                      <td className="p-4 text-sm">
                        <div className="flex items-center gap-3">
                          <button
                            onClick={() => handleViewSlots(doctor)}
                            className="rounded p-1 hover:bg-gray-100"
                            title="Xem ca khám"
                          >
                            <Clock className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleEdit(doctor)}
                            className="rounded p-1 hover:bg-gray-100"
                            title="Chỉnh sửa"
                          >
                            <Pencil className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            onClick={() => handleDelete(doctor.doctor_id)}
                            className="rounded p-1 hover:bg-gray-100"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Spin>

        {/* Add Doctor Modal */}
        {isAddModalOpen && (
          <DoctorFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSave}
          />
        )}

        {/* Edit Doctor Modal */}
        {isEditModalOpen && selectedDoctor && (
          <DoctorFormModal
            doctor={selectedDoctor}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedDoctor(null);
            }}
            onSave={handleSave}
          />
        )}

        {/* Doctor Slots Modal */}
        {isSlotsModalOpen && selectedDoctor && (
          <DoctorSlotsModal
            doctor={selectedDoctor}
            onClose={() => {
              setIsSlotsModalOpen(false);
              setSelectedDoctor(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default DoctorsPage;
