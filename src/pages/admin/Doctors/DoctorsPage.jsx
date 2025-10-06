import { useState } from "react";
import { Plus, Search, Clock, Pencil, Trash2, Upload } from "lucide-react";
import { mockDoctors, mockSpecialties, mockDoctorSlots } from "@/data/mockData";
import MDEditor from "@uiw/react-md-editor";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";

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
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
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
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo tên, email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="all">Tất cả chuyên khoa</option>
                {mockSpecialties.map((spec) => (
                  <option key={spec.id} value={spec.name}>
                    {spec.name}
                  </option>
                ))}
              </select>
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
                      <div className="flex items-center gap-2">
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
                          onClick={() => handleDelete(doctor.id)}
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

// Doctor Form Modal Component
const DoctorFormModal = ({ doctor, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    doctor || {
      name: "",
      degree: "",
      title: "",
      specialty: "",
      experience: "",
      phone: "",
      email: "",
      avatar: "",
      description: "",
      status: "active",
    }
  );
  const [avatarPreview, setAvatarPreview] = useState(doctor?.avatar || "");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setFormData({ ...formData, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {doctor ? "Chỉnh sửa bác sĩ" : "Thêm bác sĩ mới"}
        </h2>
        <p className="mb-6 text-sm text-gray-600">Nhập thông tin bác sĩ mới</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Họ tên <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Nhập họ tên"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Giới tính <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                required
              >
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Bằng cấp <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Ví dụ: Thạc sĩ, Tiến sĩ"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Chức danh <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Ví dụ: Bác sĩ, Phó giáo sư"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Chuyên khoa <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.specialty}
              onChange={(e) =>
                setFormData({ ...formData, specialty: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              required
            >
              <option value="">Chọn chuyên khoa</option>
              {mockSpecialties.map((spec) => (
                <option key={spec.id} value={spec.name}>
                  {spec.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Số điện thoại <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="0901234567"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="doctor@hospital.vn"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Số năm kinh nghiệm <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="10"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Mô tả chuyên môn
            </label>
            <div className="rounded-lg">
              <ReactQuill
                className="h-[200px]"
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                placeholder="Mô tả về chuyên môn, kinh nghiệm làm việc..."
              />
            </div>
          </div>

          <div className="mt-[60px]">
            <label className="mb-1 block text-sm font-medium">
              Ảnh đại diện
            </label>
            <div className="space-y-3">
              {avatarPreview && (
                <div className="flex items-center gap-4">
                  <img
                    src={avatarPreview}
                    alt="Preview"
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setAvatarPreview("");
                      setFormData({ ...formData, avatar: "" });
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Xóa ảnh
                  </button>
                </div>
              )}
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                <Upload className="h-5 w-5 text-gray-600" />
                <span className="text-sm text-gray-700">
                  {avatarPreview ? "Thay đổi ảnh" : "Tải ảnh lên"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              {doctor ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Doctor Slots Modal Component
const DoctorSlotsModal = ({ doctor, onClose }) => {
  const [selectedDate, setSelectedDate] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const slots = mockDoctorSlots[doctor.id] || [];

  const filteredSlots = slots.filter((slot) => {
    const matchesDate = selectedDate === "all" || slot.date === selectedDate;
    const matchesStatus =
      statusFilter === "all" || slot.status === statusFilter;
    return matchesDate && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const badges = {
      available: { bg: "bg-emerald-500", text: "Có sẵn" },
      booked: { bg: "bg-orange-500", text: "Đã đặt" },
      cancelled: { bg: "bg-red-500", text: "Đã hủy" },
    };
    return badges[status] || badges.available;
  };

  const getBookingStatusBadge = (status) => {
    const badges = {
      available: { bg: "bg-orange-100 text-orange-900", text: "Lịch làm việc" },
      booked: { bg: "bg-emerald-100 text-emerald-900", text: "Lịch làm việc" },
      cancelled: { bg: "bg-orange-100 text-orange-900", text: "Lịch đặc biệt" },
    };
    return badges[status] || badges.available;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-lg bg-white p-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold">Ca khám của {doctor.name}</h2>
          <div className="mt-4 rounded-lg bg-blue-50 p-4">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-blue-100 p-1">
                <svg
                  className="h-5 w-5 text-blue-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div>
                <p className="text-sm font-medium text-blue-900">Lưu ý:</p>
                <p className="text-sm text-blue-700">
                  Các slot khám được tạo tự động từ nut "Chia slot khám" trong
                  trang Lịch làm việc. Không có chức năng thêm/sửa/xóa thủ công.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-4 flex gap-4">
          <select
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2"
          >
            <option value="all">Tất cả</option>
            <option value="2025-01-10">2025-01-10</option>
            <option value="2025-01-11">2025-01-11</option>
          </select>
          <input
            type="date"
            className="rounded-lg border border-gray-300 px-3 py-2"
          />
        </div>

        {/* Slots Table */}
        <div className="rounded-lg border">
          <table className="w-full">
            <thead className="border-b bg-gray-50">
              <tr className="text-left text-sm text-gray-600">
                <th className="p-3 font-medium">Mã slot</th>
                <th className="p-3 font-medium">Ngày</th>
                <th className="p-3 font-medium">Giờ khám</th>
                <th className="p-3 font-medium">Trạng thái</th>
                <th className="p-3 font-medium">Nguồn</th>
              </tr>
            </thead>
            <tbody>
              {filteredSlots.map((slot) => {
                const statusBadge = getStatusBadge(slot.status);
                const bookingBadge = getBookingStatusBadge(slot.bookingStatus);
                return (
                  <tr key={slot.id} className="border-b last:border-0">
                    <td className="p-3 text-sm">{slot.id}</td>
                    <td className="p-3 text-sm">{slot.date}</td>
                    <td className="p-3 text-sm">{slot.time}</td>
                    <td className="p-3 text-sm">
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-medium text-white ${statusBadge.bg}`}
                      >
                        {statusBadge.text}
                      </span>
                    </td>
                    <td className="p-3 text-sm">
                      <span
                        className={`inline-block rounded px-2 py-1 text-xs font-medium ${bookingBadge.bg}`}
                      >
                        {bookingBadge.text}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
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

export default DoctorsPage;
