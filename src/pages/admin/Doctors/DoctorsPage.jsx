import { useState } from "react";
import { Plus, Search, Clock, Pencil, Trash2, Upload } from "lucide-react";
import { mockDoctors, mockSpecialties, mockDoctorSlots } from "@/data/mockData";
import MDEditor from "@uiw/react-md-editor";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import DoctorFormModal from "@/pages/admin/Doctors/components/DoctorFormModal";
import DoctorSlotsModal from "@/pages/admin/Doctors/components/DoctorSlotModal";

const DoctorsPage = () => {
  const [doctors, setDoctors] = useState(mockDoctors);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSlotsModalOpen, setIsSlotsModalOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("all");

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty =
      selectedSpecialty === "all" || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

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
      setDoctors(doctors.filter((d) => d.id !== doctorId));
    }
  };

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
            <div className="flex-1">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                  size={18}
                />
                <Input
                  type="text"
                  placeholder="Tìm kiếm bác sĩ theo tên..."
                  className="px-10"
                />
              </div>
            </div>
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
                  {mockSpecialties.map((spec) => (
                    <SelectItem key={spec.id} value={spec.name}>
                      {spec.name}
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
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-4 font-medium">Mã BS</th>
                  <th className="p-4 font-medium">Họ tên</th>
                  <th className="p-4 font-medium">Bằng cấp</th>
                  <th className="p-4 font-medium">Chức danh</th>
                  <th className="p-4 font-medium">Chuyên khoa</th>
                  <th className="p-4 font-medium">Kinh nghiệm</th>
                  <th className="p-4 font-medium">Trạng thái</th>
                  <th className="p-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredDoctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b last:border-0">
                    <td className="p-4 text-sm">{doctor.id}</td>
                    <td className="p-4 text-sm font-medium">{doctor.name}</td>
                    <td className="p-4 text-sm">{doctor.degree}</td>
                    <td className="p-4 text-sm">{doctor.title}</td>
                    <td className="p-4 text-sm">{doctor.specialty}</td>
                    <td className="p-4 text-sm">{doctor.experience} năm</td>
                    <td className="p-4 text-sm">
                      <span className="inline-block rounded bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-900">
                        Hoạt động
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleViewSlots(doctor)}
                          className="rounded p-1 cursor-pointer hover:bg-gray-100"
                          title="Xem ca khám"
                        >
                          <Clock className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleEdit(doctor)}
                          className="rounded p-1 cursor-pointer hover:bg-gray-100"
                          title="Chỉnh sửa"
                        >
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(doctor.id)}
                          className="rounded p-1 cursor-pointer hover:bg-gray-100"
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
