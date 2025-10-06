import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { mockSpecialties } from "@/data/mockData";
import MDEditor from "@uiw/react-md-editor";
import ReactQuill from "react-quill-new";

const SpecialtiesPage = () => {
  const [specialties, setSpecialties] = useState(mockSpecialties);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleEdit = (specialty) => {
    setSelectedSpecialty(specialty);
    setIsEditModalOpen(true);
  };

  const handleDelete = (specialtyId) => {
    if (confirm("Bạn có chắc chắn muốn xóa chuyên khoa này?")) {
      setSpecialties(specialties.filter((s) => s.id !== specialtyId));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý chuyên khoa
            </h1>
            <p className="text-gray-600">
              Quản lý các chuyên khoa của bệnh viện
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            <Plus className="h-5 w-5" />
            Thêm chuyên khoa
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm chuyên khoa..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
            />
          </div>
        </div>

        {/* Specialties Table */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-4 font-medium">Mã chuyên khoa</th>
                  <th className="p-4 font-medium">Tên chuyên khoa</th>
                  <th className="p-4 font-medium">Mô tả</th>
                  <th className="p-4 font-medium">Ngày tạo</th>
                  <th className="p-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredSpecialties.map((specialty) => (
                  <tr key={specialty.id} className="border-b last:border-0">
                    <td className="p-4 text-sm">{specialty.code}</td>
                    <td className="p-4 text-sm font-medium">
                      {specialty.name}
                    </td>
                    <td className="p-4 text-sm text-gray-600">
                      {specialty.description}
                    </td>
                    <td className="p-4 text-sm">{specialty.createdAt}</td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleEdit(specialty)}
                          className="rounded p-1 hover:bg-gray-100"
                          title="Chỉnh sửa"
                        >
                          <Pencil className="h-4 w-4 text-gray-600" />
                        </button>
                        <button
                          onClick={() => handleDelete(specialty.id)}
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
          <SpecialtyFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={(newSpecialty) => {
              setSpecialties([
                ...specialties,
                {
                  ...newSpecialty,
                  id: `SPEC${String(specialties.length + 1).padStart(3, "0")}`,
                  code: `SPEC${String(specialties.length + 1).padStart(
                    3,
                    "0"
                  )}`,
                  createdAt: new Date().toISOString().split("T")[0],
                },
              ]);
              setIsAddModalOpen(false);
            }}
          />
        )}

        {/* Edit Modal */}
        {isEditModalOpen && selectedSpecialty && (
          <SpecialtyFormModal
            specialty={selectedSpecialty}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedSpecialty(null);
            }}
            onSave={(updatedSpecialty) => {
              setSpecialties(
                specialties.map((s) =>
                  s.id === updatedSpecialty.id ? updatedSpecialty : s
                )
              );
              setIsEditModalOpen(false);
              setSelectedSpecialty(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

// Specialty Form Modal Component
const SpecialtyFormModal = ({ specialty, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    specialty || {
      name: "",
      description: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
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
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {specialty ? "Chỉnh sửa chuyên khoa" : "Thêm chuyên khoa mới"}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Cập nhật thông tin chuyên khoa
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Tên chuyên khoa <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="Tim mạch"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Mô tả</label>
            <div className="rounded-lg">
              {/* <MDEditor
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value || "" })
                }
                data-color-mode="light"
                height={150}
                preview="edit"
                hideToolbar={false}
                visibleDragBar={false}
                textareaProps={{
                  placeholder: "Chuyên khoa điều trị các bệnh về tim mạch",
                }}
              /> */}
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

          <div className="flex justify-end gap-3 pt-4 mt-[40px]">
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

export default SpecialtiesPage;
