import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Plus, Search, Clock, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DoctorFormModal from "@/pages/admin/Doctors/components/DoctorFormModal";
import DoctorSlotsModal from "@/pages/admin/Doctors/components/DoctorSlotModal";
import { message, Spin } from "antd";
import { useDoctorService } from "@/service/doctor/useDoctor.service";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSlotsModalOpen, setIsSlotsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");
  const [messageApi, contextHolder] = message.useMessage();

  // 🧭 Dùng search params để lưu keyword trên URL
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get("keyword") || "";
  const [searchInput, setSearchInput] = useState(keyword);

  // 🧠 Gọi API lấy danh sách bác sĩ
  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const response = await useDoctorService.getAllDoctors(20, 1, keyword);
      if (response.status) {
        const doctorList = response.data?.doctors || response.data || [];
        setDoctors(doctorList);
      } else {
        messageApi.error(response.message || "Không thể tải danh sách bác sĩ");
      }
    } catch (error) {
      messageApi.error(error.message || "Lỗi khi tải danh sách bác sĩ");
    } finally {
      setLoading(false);
    }
  };

  // 🧩 Gọi API khi query param "keyword" thay đổi
  useEffect(() => {
    fetchDoctors();
  }, [keyword]);

  const handleSearch = () => {
    // Khi bấm nút → cập nhật URL → trigger useEffect
    const params = {};
    if (searchInput.trim()) params.keyword = searchInput.trim();
    setSearchParams(params);
  };

  const handleViewSlots = (doctor) => {
    setSelectedDoctor(doctor);
    setIsSlotsModalOpen(true);
  };

  const handleEdit = (doctor) => {
    setSelectedDoctor(doctor);
    setIsEditModalOpen(true);
  };

  const handleDelete = (doctorId) => {
    if (confirm("Bạn có chắc chắn muốn xóa bác sĩ này?")) {
      setDoctors(doctors.filter((d) => d.doctor_id !== doctorId));
    }
  };

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSpecialty =
      selectedSpecialty === "all" ||
      doctor.specialty?.specialization_name === selectedSpecialty;
    return matchesSpecialty;
  });

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {contextHolder}
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Quản lý bác sĩ</h1>
            <p className="text-gray-600">Quản lý danh sách bác sĩ và chuyên khoa</p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="cursor-pointer flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            <Plus className="h-5 w-5" />
            Thêm bác sĩ
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            {/* Ô tìm kiếm */}
            <div className="flex flex-1 items-center gap-2">
              <div className="relative flex-1">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Tìm kiếm bác sĩ theo tên..."
                  className="px-10"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
              </div>
              <button
                onClick={handleSearch}
                className="rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Tìm kiếm
              </button>
            </div>

            {/* Bộ lọc chuyên khoa */}
            <div className="w-full md:w-64">
              <Select
                value={selectedSpecialty}
                onValueChange={(value) => setSelectedSpecialty(value)}
              >
                <SelectTrigger className="w-full rounded-lg border border-gray-300 px-4 py-2">
                  <SelectValue placeholder="Chọn chuyên khoa" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tất cả chuyên khoa</SelectItem>
                  {[...new Set(
                    doctors.map((d) => d.specialty?.specialization_name)
                  )]
                    .filter(Boolean)
                    .map((spec) => (
                      <SelectItem key={spec} value={spec}>
                        {spec}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Doctors Table */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-8">
                <Spin size="large" />
              </div>
            ) : (
              <table className="w-full">
                <thead className="border-b bg-gray-50">
                  <tr className="text-left text-sm text-gray-600">
                    <th className="p-4 font-medium">Mã BS</th>
                    <th className="p-4 font-medium">Họ tên</th>
                    <th className="p-4 font-medium">Bằng cấp</th>
                    <th className="p-4 font-medium">Chức danh</th>
                    <th className="p-4 font-medium">Chuyên khoa</th>
                    <th className="p-4 font-medium">Kinh nghiệm</th>
                    <th className="p-4 font-medium">Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDoctors.map((doctor) => (
                    <tr key={doctor.doctor_id} className="border-b last:border-0">
                      <td className="p-4 text-sm">{doctor.doctor_id}</td>
                      <td className="p-4 text-sm font-medium">{doctor.fullname}</td>
                      <td className="p-4 text-sm">{doctor.degree}</td>
                      <td className="p-4 text-sm">{doctor.position}</td>
                      <td className="p-4 text-sm">
                        {doctor.specialty?.specialization_name || "-"}
                      </td>
                      <td className="p-4 text-sm">{doctor.years_of_experience} năm</td>
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
            )}
          </div>
        </div>
                {/* Add Doctor Modal */}
        {isAddModalOpen && (
          <DoctorFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={(newDoctor) => {
              setDoctors([
                ...doctors,
                { ...newDoctor, id: `DOC${doctors.length + 1}` },
              ]);
              setIsAddModalOpen(false);
            }}
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
            onSave={(updatedDoctor) => {
              setDoctors(
                doctors.map((d) =>
                  d.id === updatedDoctor.id ? updatedDoctor : d
                )
              );
              setIsEditModalOpen(false);
              setSelectedDoctor(null);
            }}
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
