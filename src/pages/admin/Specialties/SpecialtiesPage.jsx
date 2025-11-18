import { useEffect, useState, useCallback } from "react";
import { Plus, Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import SpecialtyFormModal from "@/pages/admin/Specialties/components/SpecialtyFormModal";
import SpecialtiesTable from "@/pages/admin/Specialties/components/SpecialtiesTable";
import { SpecialtyService } from "@/service/specialty/specialty.service";
import { message } from "antd";
import { useSearchParams } from "react-router-dom"; // ✅ để đọc/ghi query trên URL

const SpecialtiesPage = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSpecialty, setSelectedSpecialty] = useState(null);

  // ✅ hook cho query param
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy từ khóa từ URL (nếu có)
  const initialKeyword = searchParams.get("keyword") || "";

  const [searchInput, setSearchInput] = useState(initialKeyword);
  const [searchTerm, setSearchTerm] = useState(initialKeyword);
  const [messageApi, contextHolder] = message.useMessage();

  // 🟢 Hàm load danh sách
  const fetchSpecialties = useCallback(async () => {
    try {
      setLoading(true);
      const data = await SpecialtyService.getAll();

      const mapped = data.map((item) => ({
        id: item.specialization_id,
        name: item.specialization_name,
        description: item.description,
        createdAt: item.createdAt.split("T")[0],
      }));

      setSpecialties(mapped);
    } catch (err) {
      console.error("Lỗi khi tải danh sách chuyên khoa:", err);
      messageApi.error("Tải danh sách chuyên khoa thất bại!");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSpecialties();
  }, [fetchSpecialties]);

  // ✏️ Sửa
  const handleEdit = (specialty) => {
    setSelectedSpecialty(specialty);
    setIsEditModalOpen(true);
  };

  // ❌ Xóa
  const handleDelete = async (specialtyId) => {
    if (confirm("Bạn có chắc chắn muốn xóa chuyên khoa này?")) {
      try {
        await SpecialtyService.delete(specialtyId);
        messageApi.success("Xóa chuyên khoa thành công!");
        fetchSpecialties(); // reload danh sách
      } catch (err) {
        console.error("Lỗi khi xóa chuyên khoa:", err);
        messageApi.error("Xóa chuyên khoa thất bại. Vui lòng thử lại!");
      }
    }
  };

  // ✅ Sau khi thêm hoặc sửa
  const handleAfterSave = () => {
    fetchSpecialties();
  };

  // 🔍 Khi ấn nút tìm kiếm
  const handleSearch = () => {
    const keyword = searchInput.trim();
    setSearchTerm(keyword);
    if (keyword) {
      setSearchParams({ keyword }); // ✅ ghi vào URL
    } else {
      setSearchParams({}); // xoá param nếu rỗng
    }
  };

  // 🔄 Làm mới danh sách (xoá keyword và reload)
  const handleReset = () => {
    setSearchInput("");
    setSearchTerm("");
    setSearchParams({});
    fetchSpecialties();
  };

  // Lọc client-side
  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Nhập tên chuyên khoa..."
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

        {/* Table */}
        <SpecialtiesTable
          handleDelete={handleDelete}
          handleEdit={handleEdit}
          specialties={filteredSpecialties}
        />

        {/* Add Modal */}
        {isAddModalOpen && (
          <SpecialtyFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleAfterSave}
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
            onSave={handleAfterSave}
          />
        )}
      </div>
    </div>
  );
};
export default SpecialtiesPage;
