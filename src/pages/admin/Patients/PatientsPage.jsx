import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { mockPatients } from "@/data/mockData";

const PatientsPage = () => {
  const [patients, setPatients] = useState(mockPatients);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm)
  );

  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý bệnh nhân
            </h1>
            <p className="text-gray-600">
              Quản lý thông tin bệnh nhân và lịch sử khám
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            <Plus className="h-5 w-5" />
            Thêm bệnh nhân
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, mã bệnh nhân, số điện thoại..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Patients Table */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-4 font-medium">Mã BN</th>
                  <th className="p-4 font-medium">Họ tên</th>
                  <th className="p-4 font-medium">Giới tính</th>
                  <th className="p-4 font-medium">Ngày sinh</th>
                  <th className="p-4 font-medium">Số điện thoại</th>
                  <th className="p-4 font-medium">Địa chỉ</th>
                  <th className="p-4 font-medium">Ngày tạo</th>
                  <th className="p-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="border-b last:border-0">
                    <td className="p-4 text-sm">{patient.id}</td>
                    <td className="p-4 text-sm font-medium">{patient.name}</td>
                    <td className="p-4 text-sm">{patient.gender}</td>
                    <td className="p-4 text-sm">{patient.dob}</td>
                    <td className="p-4 text-sm">{patient.phone}</td>
                    <td className="p-4 text-sm">{patient.address}</td>
                    <td className="p-4 text-sm">{patient.createdAt}</td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          className="rounded p-1 hover:bg-gray-100"
                          title="Xem chi tiết"
                        >
                          <Eye className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleEdit(patient)}
                          className="rounded p-1 hover:bg-gray-100"
                          title="Chỉnh sửa"
                        >
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
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

        {/* Add Modal */}
        {isAddModalOpen && (
          <PatientFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={(newPatient) => {
              setPatients([
                ...patients,
                {
                  ...newPatient,
                  id: `BN${String(patients.length + 1).padStart(3, "0")}`,
                  createdAt: new Date().toISOString().split("T")[0],
                },
              ]);
              setIsAddModalOpen(false);
            }}
          />
        )}

        {/* Edit Modal */}
        {isEditModalOpen && selectedPatient && (
          <PatientFormModal
            patient={selectedPatient}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedPatient(null);
            }}
            onSave={(updated) => {
              setPatients(
                patients.map((p) => (p.id === updated.id ? updated : p))
              );
              setIsEditModalOpen(false);
              setSelectedPatient(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

const PatientFormModal = ({ patient, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    patient || {
      name: "",
      gender: "Nam",
      dob: "",
      phone: "",
      address: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  const isEdit = !!patient;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'color-mix(in oklab, var(--color-black) 50%, transparent)'
      }}
    >
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {isEdit ? "Chỉnh sửa bệnh nhân" : "Thêm bệnh nhân mới"}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          {isEdit ? "Cập nhật thông tin bệnh nhân" : "Nhập thông tin bệnh nhân mới"}
        </p>

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
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Giới tính <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              >
                <option>Nam</option>
                <option>Nữ</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dob}
                onChange={(e) =>
                  setFormData({ ...formData, dob: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
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
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Địa chỉ <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              rows={2}
              required
            />
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
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PatientsPage;

