import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { mockSpecialSchedules, mockDoctors } from "@/data/mockData";

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

  const getStatusBadge = (status) => {
    return status === "active"
      ? { bg: "bg-emerald-100 text-emerald-900", text: "Làm việc" }
      : { bg: "bg-red-100 text-red-900", text: "Nghỉ" };
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
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
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
                <input
                  type="text"
                  placeholder="Tìm kiếm theo bác sĩ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2"
              >
                <option value="all">Tất cả bác sĩ</option>
                {mockDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
              <input
                type="date"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2"
              />
            </div>
          </div>
        </div>

        {/* Special Schedules Table */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-4 font-medium">Mã lịch</th>
                  <th className="p-4 font-medium">Bác sĩ</th>
                  <th className="p-4 font-medium">Ngày</th>
                  <th className="p-4 font-medium">Giờ làm việc</th>
                  <th className="p-4 font-medium">Thời lượng slot</th>
                  <th className="p-4 font-medium">Trạng thái</th>
                  <th className="p-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.map((schedule) => {
                  const badge = getStatusBadge(schedule.status);
                  return (
                    <tr key={schedule.id} className="border-b last:border-0">
                      <td className="p-4 text-sm">{schedule.id}</td>
                      <td className="p-4 text-sm font-medium">
                        {schedule.doctorName}
                      </td>
                      <td className="p-4 text-sm">{schedule.date}</td>
                      <td className="p-4 text-sm">
                        {schedule.type === "work"
                          ? `${schedule.startTime} - ${schedule.endTime}`
                          : "Nghỉ cả ngày"}
                      </td>
                      <td className="p-4 text-sm">
                        {schedule.slotDuration ? `${schedule.slotDuration} phút` : "-"}
                      </td>
                      <td className="p-4 text-sm">
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-medium ${badge.bg}`}
                        >
                          {badge.text}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(schedule)}
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

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
          />
        )}
      </div>
    </div>
  );
};

const SpecialScheduleFormModal = ({ schedule, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    schedule || {
      doctorId: "",
      date: "",
      type: "work",
      status: "active",
      startTime: "",
      endTime: "",
      slotDuration: 30,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctor = mockDoctors.find((d) => d.id === formData.doctorId);
    onSave({ ...formData, doctorName: doctor?.name || formData.doctorName });
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'color-mix(in oklab, var(--color-black) 50%, transparent)'
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {schedule ? "Chỉnh sửa lịch đặc biệt" : "Thêm lịch đặc biệt mới"}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Nhập thông tin lịch đặc biệt mới
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Bác sĩ <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.doctorId}
              onChange={(e) =>
                setFormData({ ...formData, doctorId: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Chọn bác sĩ</option>
              {mockDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Ngày <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Trạng thái <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="work">Làm việc</option>
              <option value="off">Nghỉ</option>
            </select>
          </div>

          {formData.type === "work" && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Giờ bắt đầu <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">
                    Giờ kết thúc <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium">
                  Thời lượng mỗi slot (phút) <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.slotDuration}
                  onChange={(e) =>
                    setFormData({ ...formData, slotDuration: e.target.value })
                  }
                  className="w-full rounded-lg border border-gray-300 px-3 py-2"
                >
                  <option value="15">15 phút</option>
                  <option value="30">30 phút</option>
                  <option value="45">45 phút</option>
                  <option value="60">60 phút</option>
                </select>
              </div>
            </>
          )}

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
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialSchedulesPage;

