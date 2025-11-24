import { useState, useEffect, useCallback } from "react";
import { Plus, Search, Eye, Pencil, Trash2, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import PatientsTable from "@/pages/admin/Patients/components/PatientsTable";
import PatientFormModal from "@/pages/admin/Patients/components/PatientFormModal";
import { PatientService } from "@/service/patient/patient.service";
import { message } from "antd";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useSearchParams } from "react-router-dom";

const PatientsPage = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);

  // Lấy keyword từ URL
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";

  // State tạm cho ô nhập và từ khóa thực dùng để lọc
  const [searchInput, setSearchInput] = useState(initialKeyword);
  const [searchTerm, setSearchTerm] = useState(initialKeyword);
  const [messageApi, contextHolder] = message.useMessage();

  // Hàm tải danh sách bệnh nhân
  const fetchPatients = useCallback(async (searchParams = {}) => {
    try {
      setLoading(true);
      const data = await PatientService.getAll(searchParams);
      setPatients(data.patients);
    } catch (error) {
      console.error("Lỗi khi tải danh sách bệnh nhân:", error);
      messageApi.error("Tải danh sách bệnh nhân thất bại!");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  useEffect(() => {
    fetchPatients();
  }, [fetchPatients]);

  // Khi bấm nút tìm kiếm
  const handleSearch = () => {
    const keyword = searchInput.trim();
    setSearchTerm(keyword);

    // Build search params
    const params = {};
    if (keyword) {
      params.keyword = keyword;
      setSearchParams({ keyword });
    } else {
      setSearchParams({});
    }

    // Call API with params
    fetchPatients(params);
  };

  // Làm mới danh sách và xóa keyword
  const handleReset = () => {
    setSearchInput("");
    setSearchTerm("");
    setSearchParams({});
    fetchPatients();
  };

  // Xử lý mở form sửa
  const handleEdit = (patient) => {
    setSelectedPatient(patient);
    setIsEditModalOpen(true);
  };

  // Xử lý xóa bệnh nhân (mở dialog trước)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const handleDelete = (patient) => {
    setDeleteTarget(patient);
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;
    try {
      await PatientService.delete(deleteTarget.patient_code);
      messageApi.success("Xóa bệnh nhân thành công!");
      fetchPatients();
    } catch (error) {
      console.error("Lỗi khi xóa bệnh nhân:", error);
      messageApi.error("Xóa bệnh nhân thất bại. Vui lòng thử lại!");
    } finally {
      setShowDeleteDialog(false);
      setDeleteTarget(null);
    }
  };

  // Cập nhật danh sách sau khi thêm/sửa (nhận dữ liệu cập nhật từ modal nếu có)
  const handleAfterSave = (updatedData, successMessage) => {
    if (successMessage) messageApi.success(successMessage);
    if (updatedData) setPatients(updatedData);
    else fetchPatients();
  };

  // Xem chi tiết bệnh nhân (có thể mở modal hoặc trang chi tiết sau này)
  const handleViewDetail = (patient) => {
    messageApi.info(`Xem chi tiết: ${patient.fullname}`);
  };

  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        {contextHolder}
        Đang tải dữ liệu...
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {contextHolder}
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
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Tìm kiếm theo tên, mã bệnh nhân hoặc số điện thoại..."
                className="px-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleSearch();
                }}
              />
            </div>
            <button
              onClick={handleSearch}
              className="rounded-md bg-orange-600 text-white px-4 py-2 hover:bg-orange-700 cursor-pointer"
            >
              Tìm kiếm
            </button>
            <button
              onClick={handleReset}
              className="rounded-md border border-gray-300 text-gray-700 px-3 py-2 hover:bg-gray-50 cursor-pointer flex items-center gap-2"
            >
              <RefreshCcw className="h-4 w-4" />
              Làm mới
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <PatientsTable
          handleView={handleViewDetail}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          patients={patients}
        />

        {/* Add Modal */}
        {isAddModalOpen && (
          <PatientFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={(updatedData, successMessage) => {
              handleAfterSave(updatedData, successMessage);
            }}
            onError={(msg) => messageApi.error(msg)}
            onSuccess={(msg) => messageApi.success(msg)}
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
            onSave={(updatedData, successMessage) => {
              handleAfterSave(updatedData, successMessage);
            }}
            onError={(msg) => messageApi.error(msg)}
            onSuccess={(msg) => messageApi.success(msg)}
          />
        )}
        {/* Delete confirmation dialog */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận xóa bệnh nhân</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn xóa bệnh nhân "{deleteTarget?.fullname}"
                không?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <button
                className="rounded-lg cursor-pointer border border-gray-300 px-4 py-2 hover:bg-gray-50"
                onClick={() => setShowDeleteDialog(false)}
              >
                Hủy
              </button>
              <button
                className="rounded-lg cursor-pointer bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={confirmDelete}
              >
                Xóa
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
export default PatientsPage;
