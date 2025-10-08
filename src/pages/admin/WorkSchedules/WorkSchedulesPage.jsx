import { useState } from "react";
import { Plus, Search, Zap, Pencil, Trash2 } from "lucide-react";
import { mockWorkSchedules, mockDoctors } from "@/data/mockData";
import SchedulesTable from "@/pages/admin/WorkSchedules/components/SchedulesTable";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import WorkScheduleFormModal from "@/pages/admin/WorkSchedules/components/WorkScheduleFormModal";
import GenerateSlotsModal from "@/pages/admin/WorkSchedules/components/GenerateSlotsModal";

const WorkSchedulesPage = () => {
  const [schedules, setSchedules] = useState(mockWorkSchedules);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isSlotGenerateModalOpen, setIsSlotGenerateModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("new");

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch = schedule.doctorName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDoctor =
      doctorFilter === "all" || schedule.doctorId === doctorFilter;
    const matchesTab =
      activeTab === "new" ? schedule.type === "new" : schedule.type === "old";
    return matchesSearch && matchesDoctor && matchesTab;
  });

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setIsEditModalOpen(true);
  };

  const handleGenerateSlots = (schedule) => {
    setSelectedSchedule(schedule);
    setIsSlotGenerateModalOpen(true);
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
              Chia slot khám {activeTab === "new" ? `(lịch mới)` : `(lịch cũ)`}
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
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Tìm kiếm theo bác sĩ..."
                  className="px-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
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
            Lịch làm việc cũ
          </button>
        </div>

        {/* Work Schedules Table */}
        <SchedulesTable
          filteredSchedules={filteredSchedules}
          activeTab={activeTab}
        />

        {/* Add Modal */}
        {isAddModalOpen && (
          <WorkScheduleFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={(newSchedule) => {
              setSchedules([
                ...schedules,
                { ...newSchedule, id: `SCH${schedules.length + 1}` },
              ]);
              setIsAddModalOpen(false);
            }}
          />
        )}

        {/* Generate Slots Modal */}
        {isSlotGenerateModalOpen && (
          <GenerateSlotsModal
            onClose={() => setIsSlotGenerateModalOpen(false)}
          />
        )}
      </div>
    </div>
  );
};

export default WorkSchedulesPage;
