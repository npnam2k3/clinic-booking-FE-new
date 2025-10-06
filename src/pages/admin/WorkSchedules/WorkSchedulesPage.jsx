import { useState } from "react";
import { Plus, Search, Zap, Pencil, Trash2 } from "lucide-react";
import { mockWorkSchedules, mockDoctors } from "@/data/mockData";

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
    const matchesTab = activeTab === "new" ? schedule.type === "new" : schedule.type === "old";
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
              className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              <Zap className="h-5 w-5" />
              Chia slot khám (Lịch mới)
            </button>
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
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
                <input
                  type="text"
                  placeholder="Tìm kiếm theo bác sĩ..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <select
                value={doctorFilter}
                onChange={(e) => setDoctorFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="all">Tất cả bác sĩ</option>
                {mockDoctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </option>
                ))}
              </select>
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
        <div className="rounded-lg bg-white shadow-sm">
          {filteredSchedules.length === 0 ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                <svg className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {activeTab === "new" ? "Chưa có lịch làm việc mới" : "Chưa có lịch làm việc cũ"}
              </h3>
              <p className="text-gray-500 mb-4">
                {activeTab === "new" 
                  ? "Hãy thêm lịch làm việc mới để bắt đầu quản lý" 
                  : "Không có dữ liệu lịch làm việc cũ trong hệ thống"
                }
              </p>
              {activeTab === "new" && (
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
                >
                  <Plus className="h-4 w-4" />
                  Thêm lịch làm việc
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-4 font-medium">Mã lịch</th>
                  <th className="p-4 font-medium">Bác sĩ</th>
                  <th className="p-4 font-medium">Thứ</th>
                  <th className="p-4 font-medium">Giờ làm việc</th>
                  <th className="p-4 font-medium">Thời lượng slot</th>
                  <th className="p-4 font-medium">Hiệu lực từ</th>
                  <th className="p-4 font-medium">Hết hạn</th>
                  <th className="p-4 font-medium">Trạng thái</th>
                  <th className="p-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredSchedules.map((schedule) => (
                  <tr key={schedule.id} className="border-b last:border-0">
                    <td className="p-4 text-sm">{schedule.id}</td>
                    <td className="p-4 text-sm font-medium">
                      {schedule.doctorName}
                    </td>
                    <td className="p-4 text-sm">{schedule.dayOfWeek}</td>
                    <td className="p-4 text-sm">
                      {schedule.startTime} - {schedule.endTime}
                    </td>
                    <td className="p-4 text-sm">{schedule.slotDuration} phút</td>
                    <td className="p-4 text-sm">{schedule.effectiveFrom}</td>
                    <td className="p-4 text-sm">{schedule.effectiveTo}</td>
                    <td className="p-4 text-sm">
                      <span className={`inline-block rounded px-2 py-1 text-xs font-medium ${
                        schedule.status === "active" 
                          ? "bg-emerald-100 text-emerald-900" 
                          : "bg-gray-100 text-gray-900"
                      }`}>
                        {schedule.status === "active" ? "Hiệu lực" : "Hết hạn"}
                      </span>
                    </td>
                    <td className="p-4 text-sm">
                      <div className="flex items-center gap-2">
                        {schedule.status === "active" && (
                          <button
                            onClick={() => handleEdit(schedule)}
                            className="rounded p-1 hover:bg-gray-100"
                            title="Chỉnh sửa"
                          >
                            <Pencil className="h-4 w-4 text-gray-600" />
                          </button>
                        )}
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
          )}
        </div>

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

        {/* Edit Modal */}
        {isEditModalOpen && selectedSchedule && (
          <WorkScheduleFormModal
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

const WorkScheduleFormModal = ({ schedule, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    schedule || {
      doctorId: "",
      doctorName: "",
      dayOfWeek: "",
      startTime: "",
      endTime: "",
      slotDuration: 30,
      effectiveFrom: "",
      effectiveTo: "",
      status: "active",
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
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {schedule ? "Chỉnh sửa lịch làm việc" : "Thêm lịch làm việc mới"}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Nhập thông tin lịch làm việc mới
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
              Thứ trong tuần <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.dayOfWeek}
              onChange={(e) =>
                setFormData({ ...formData, dayOfWeek: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2"
              required
            >
              <option value="">Chọn thứ</option>
              <option value="Thứ 2">Thứ 2</option>
              <option value="Thứ 3">Thứ 3</option>
              <option value="Thứ 4">Thứ 4</option>
              <option value="Thứ 5">Thứ 5</option>
              <option value="Thứ 6">Thứ 6</option>
              <option value="Thứ 7">Thứ 7</option>
              <option value="Chủ nhật">Chủ nhật</option>
            </select>
          </div>

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
                required
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
                required
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
              required
            >
              <option value="15">15 phút</option>
              <option value="30">30 phút</option>
              <option value="45">45 phút</option>
              <option value="60">60 phút</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Hiệu lực từ <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.effectiveFrom}
                onChange={(e) =>
                  setFormData({ ...formData, effectiveFrom: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Hết hạn <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.effectiveTo}
                onChange={(e) =>
                  setFormData({ ...formData, effectiveTo: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
                required
              />
            </div>
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Loại lịch <span className="text-red-500">*</span>
            </label>
            <select className="w-full rounded-lg border border-gray-300 px-3 py-2">
              <option>Lịch cũ</option>
              <option>Lịch mới</option>
            </select>
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
              Thêm mới
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const GenerateSlotsModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    doctorId: "",
    dateFrom: "",
    dateTo: "",
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'color-mix(in oklab, var(--color-black) 50%, transparent)'
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">Chia slot khám từ lịch làm việc</h2>
        <p className="mb-4 text-sm text-gray-600">
          Tạo các ca khám từ lịch làm việc mới
        </p>

        <div className="mb-4 rounded-lg bg-yellow-50 p-4">
          <div className="flex items-start gap-2">
            <div className="rounded-full bg-yellow-100 p-1">
              <svg
                className="h-5 w-5 text-yellow-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-yellow-900">Lưu ý:</p>
              <p className="text-sm text-yellow-700">
                Đang sử dụng lịch làm việc mới (Hiệu lực từ 2025-01-01 đến
                2025-12-31)
              </p>
              <ul className="mt-2 list-inside list-disc text-sm text-yellow-700">
                <li>Hệ thống sẽ tạo slot dựa trên lịch đã cấu hình</li>
                <li>Các slot trùng lặp sẽ không được tạo</li>
                <li>Slot sẽ được tạo theo thời lượng đã cấu hình</li>
              </ul>
            </div>
          </div>
        </div>

        <form className="space-y-4">
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
            >
              <option value="">Chọn bác sĩ</option>
              {mockDoctors.map((doctor) => (
                <option key={doctor.id} value={doctor.id}>
                  {doctor.name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="mb-1 block text-sm font-medium">
                Từ ngày <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dateFrom}
                onChange={(e) =>
                  setFormData({ ...formData, dateFrom: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium">
                Đến ngày <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                value={formData.dateTo}
                onChange={(e) =>
                  setFormData({ ...formData, dateTo: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2"
              />
            </div>
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
              type="button"
              onClick={() => {
                alert("Đã tạo slots thành công!");
                onClose();
              }}
              className="rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              Tạo slot khám
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkSchedulesPage;

