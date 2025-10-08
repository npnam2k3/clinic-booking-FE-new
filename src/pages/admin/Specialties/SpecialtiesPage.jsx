import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { mockSpecialties } from "@/data/mockData";

import { Input } from "@/components/ui/input";
import SpecialtyFormModal from "@/pages/admin/Specialties/components/SpecialtyFormModal";
import SpecialtiesTable from "@/pages/admin/Specialties/components/SpecialtiesTable";

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
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            Thêm chuyên khoa
          </button>
        </div>

        {/* Search */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên chuyên khoa..."
              className="px-10"
            />
          </div>
        </div>

        {/* Specialties Table */}
        <SpecialtiesTable
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          specialties={filteredSpecialties}
        />

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

export default SpecialtiesPage;
