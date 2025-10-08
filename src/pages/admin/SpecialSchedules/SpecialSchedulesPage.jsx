import { useState } from "react";
import { Plus, Search } from "lucide-react";
import { mockSpecialSchedules } from "@/data/mockData";
import { Input } from "@/components/ui/input";
import SpecialSchedulesTable from "@/pages/admin/SpecialSchedules/components/SpecialSchedulesTable";
import SpecialScheduleFormModal from "@/pages/admin/SpecialSchedules/components/SpecialScheduleFormModal";

const SpecialSchedulesPage = () => {
  const [schedules, setSchedules] = useState(mockSpecialSchedules);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorFilter, setDoctorFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const filteredSchedules = schedules.filter((schedule) => {
    const matchesSearch = schedule.doctorName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDoctor =
      doctorFilter === "all" || schedule.doctorId === doctorFilter;
    const matchesDate = !dateFilter || schedule.date === dateFilter;
    return matchesSearch && matchesDoctor && matchesDate;
  });

  const handleEdit = (schedule) => {
    setSelectedSchedule(schedule);
    setIsEditModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý lịch đặc biệt
            </h1>
            <p className="text-gray-600">
              Quản lý các thay đổi tạm thời trong lịch làm việc
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700 cursor-pointer"
          >
            <Plus className="h-5 w-5" />
            Thêm lịch đặc biệt
          </button>
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
            <div className="flex gap-4">
              <Input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Special Schedules Table */}
        <SpecialSchedulesTable
          specialSchedules={filteredSchedules}
          handleEdit={handleEdit}
        />

        {/* Add Modal */}
        {isAddModalOpen && (
          <SpecialScheduleFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={(newSchedule) => {
              setSchedules([
                ...schedules,
                { ...newSchedule, id: `SPEC${schedules.length + 1}` },
              ]);
              setIsAddModalOpen(false);
            }}
            open={isAddModalOpen}
          />
        )}

        {/* Edit Modal */}
        {isEditModalOpen && selectedSchedule && (
          <SpecialScheduleFormModal
            schedule={selectedSchedule}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedSchedule(null);
            }}
            onSave={(updated) => {
              setSchedules(
                schedules.map((s) => (s.id === updated.id ? updated : s))
              );
              setIsEditModalOpen(false);
              setSelectedSchedule(null);
            }}
            open={isEditModalOpen}
          />
        )}
      </div>
    </div>
  );
};

export default SpecialSchedulesPage;
