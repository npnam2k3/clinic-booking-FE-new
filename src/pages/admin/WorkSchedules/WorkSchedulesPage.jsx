import { useState, useEffect } from "react";
import { Plus, Search, Zap } from "lucide-react";
import SchedulesTable from "@/pages/admin/WorkSchedules/components/SchedulesTable";
import { Input } from "@/components/ui/input";
import WorkScheduleFormModal from "@/pages/admin/WorkSchedules/components/WorkScheduleFormModal";
import GenerateSlotsModal from "@/pages/admin/WorkSchedules/components/GenerateSlotsModal";
import { WorkScheduleService } from "@/service/work_shedule/work_shedule.service";
import { useNavigate, useLocation } from "react-router-dom";

const WorkSchedulesPage = () => {
  const [schedules, setSchedules] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSlotGenerateModalOpen, setIsSlotGenerateModalOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(""); // giá trị người dùng nhập
  const [searchTerm, setSearchTerm] = useState(""); // giá trị dùng để fetch
  const [activeTab, setActiveTab] = useState("new");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();

  // 🧭 Đọc search param từ URL khi load trang
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const search = params.get("search") || "";
    setSearchInput(search);
    setSearchTerm(search);
  }, [location.search]);

  // ✅ Đưa hàm fetchSchedules ra ngoài useEffect để tái sử dụng
  const fetchSchedules = async () => {
    setLoading(true);
    setError("");
    try {
      let res;
      if (activeTab === "new") {
        res = await WorkScheduleService.getNewWorkSchedules();
      } else {
        res = await WorkScheduleService.getOldWorkSchedules();
      }

      let formatted = res.data.map((doctor, index) => ({
        id: `SCH${String(index + 1).padStart(3, "0")}`,
        doctorId: doctor.doctor_id,
        doctorName: doctor.fullname,
        slotDuration: doctor.work_schedules[0]?.slot_duration ?? "-",
        effectiveDate: doctor.work_schedules[0]?.effective_date ?? "-",
        expireDate: doctor.work_schedules[0]?.expire_date ?? "-",
        status: "Hiệu lực",
        workDays: doctor.work_schedules.map((ws) => ({
          dayOfWeek: ws.day_of_week,
          startTime: ws.start_time,
          endTime: ws.end_time,
          note: ws.note,
        })),
      }));

      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        formatted = formatted.filter((s) =>
          s.doctorName.toLowerCase().includes(term)
        );
      }

      setSchedules(formatted);
    } catch (err) {
      console.error("Lỗi khi tải lịch làm việc:", err);
      setError("Không thể tải dữ liệu. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };

  // 🧭 Gọi API mỗi khi đổi tab hoặc bấm tìm kiếm
  useEffect(() => {
    fetchSchedules();
  }, [activeTab, searchTerm]);

  // ✅ Xử lý bấm nút tìm kiếm
  const handleSearch = () => {
    const params = new URLSearchParams();
    if (searchInput) params.set("search", searchInput);
    navigate({ search: params.toString() }); // cập nhật URL
    setSearchTerm(searchInput); // trigger gọi API
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý lịch làm việc
            </h1>
            <p className="text-gray-600">
              Cấu hình lịch làm việc cố định của bác sĩ
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsSlotGenerateModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              <Zap className="h-5 w-5" />
              Chia slot khám{" "}
              {activeTab === "new" ? `(lịch mới)` : `(lịch hiện tại)`}
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex cursor-pointer items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              <Plus className="h-5 w-5" />
              Thêm lịch làm việc
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row items-center">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Nhập tên bác sĩ..."
                className="px-10"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <button
              onClick={handleSearch}
              className="mt-2 md:mt-0 rounded-lg bg-emerald-600 px-6 py-2 text-white hover:bg-emerald-700"
            >
              Tìm kiếm
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-4 border-b">
          <button
            onClick={() => setActiveTab("new")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "new"
                ? "border-b-2 border-emerald-500 text-emerald-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Lịch làm việc mới
          </button>
          <button
            onClick={() => setActiveTab("old")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "old"
                ? "border-b-2 border-emerald-500 text-emerald-900"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Lịch làm việc hiện tại
          </button>
        </div>

        {/* Loading / Error / Table */}
        {loading ? (
          <p className="text-center text-gray-500 mt-10">Đang tải dữ liệu...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">{error}</p>
        ) : (
          <SchedulesTable filteredSchedules={schedules} activeTab={activeTab} />
        )}

        {/* Add Modal */}
        {isAddModalOpen && (
          <WorkScheduleFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={() => {
              setIsAddModalOpen(false);
              // 🔄 Gọi lại danh sách sau khi thêm mới
              fetchSchedules();
            }}
          />
        )}

        {/* Generate Slots Modal */}
        {isSlotGenerateModalOpen && (
          <GenerateSlotsModal
            onClose={() => setIsSlotGenerateModalOpen(false)}
            activeTab={activeTab}
          />
        )}
      </div>
    </div>
  );
};

export default WorkSchedulesPage;
