import { useState } from "react";
import { Plus, Search, Eye, Pencil, Trash2 } from "lucide-react";
import { mockPatients } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import PatientsTable from "@/pages/admin/Patients/components/PatientsTable";
import PatientFormModal from "@/pages/admin/Patients/components/PatientFormModal";

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

  const handleDelete = (patient) => {};
  const handleViewDetail = (patient) => {};

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
        </div>

        {/* Search */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input
              type="text"
              placeholder="Tìm kiếm theo tên"
              className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Patients Table */}
        <PatientsTable
          handleView={handleViewDetail}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          patients={filteredPatients}
        />

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

export default PatientsPage;
