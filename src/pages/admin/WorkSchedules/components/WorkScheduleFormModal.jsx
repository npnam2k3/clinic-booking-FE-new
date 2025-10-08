import { useState } from "react";
import { Asterisk, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { mockDoctors } from "@/data/mockData";

const WorkScheduleFormModal = ({ schedule, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    schedule || {
      doctorId: "",
      doctorName: "",
      slotDuration: 30,
      effectiveFrom: "",
      effectiveTo: "",
      status: "active",
      workDays: [],
    }
  );

  const [dayEntry, setDayEntry] = useState({
    dayOfWeek: "",
    startTime: "",
    endTime: "",
    note: "",
  });

  const handleAddDay = () => {
    if (!dayEntry.dayOfWeek || !dayEntry.startTime || !dayEntry.endTime) return;
    setFormData({
      ...formData,
      workDays: [...formData.workDays, dayEntry],
    });
    setDayEntry({ dayOfWeek: "", startTime: "", endTime: "", note: "" });
  };

  const handleDeleteDay = (index) => {
    setFormData({
      ...formData,
      workDays: formData.workDays.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctor = mockDoctors.find((d) => d.id === formData.doctorId);
    onSave({ ...formData, doctorName: doctor?.name || "" });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="w-full max-w-3xl rounded-lg bg-white p-6 max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {schedule ? "Chỉnh sửa lịch làm việc" : "Thêm lịch làm việc mới"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Bác sĩ */}
          <div className="space-y-1">
            <Label className="flex items-center gap-1 mb-[8px]">
              Bác sĩ <Asterisk size={12} className="text-red-500" />
            </Label>
            <Select
              onValueChange={(val) =>
                setFormData({ ...formData, doctorId: val })
              }
              value={formData.doctorId}
              required
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn bác sĩ" />
              </SelectTrigger>
              <SelectContent>
                {mockDoctors.map((doctor) => (
                  <SelectItem key={doctor.id} value={doctor.id}>
                    {doctor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Thêm ngày làm việc */}
          <div className="rounded-lg border p-4 space-y-4">
            <h3 className="font-semibold text-lg">Thêm ngày làm việc</h3>
            <div className="grid grid-cols-4 gap-4">
              <div>
                <Label className="flex items-center gap-1 mb-[4px]">
                  Thứ <Asterisk size={12} className="text-red-500" />
                </Label>
                <Select
                  value={dayEntry.dayOfWeek}
                  onValueChange={(val) =>
                    setDayEntry({ ...dayEntry, dayOfWeek: val })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn thứ" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Thứ 2">Thứ 2</SelectItem>
                    <SelectItem value="Thứ 3">Thứ 3</SelectItem>
                    <SelectItem value="Thứ 4">Thứ 4</SelectItem>
                    <SelectItem value="Thứ 5">Thứ 5</SelectItem>
                    <SelectItem value="Thứ 6">Thứ 6</SelectItem>
                    <SelectItem value="Thứ 7">Thứ 7</SelectItem>
                    <SelectItem value="Chủ nhật">Chủ nhật</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="flex items-center gap-1 mb-[4px]">
                  Giờ bắt đầu <Asterisk size={12} className="text-red-500" />
                </Label>
                <Input
                  type="time"
                  value={dayEntry.startTime}
                  onChange={(e) =>
                    setDayEntry({ ...dayEntry, startTime: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="flex items-center gap-1 mb-[4px]">
                  Giờ kết thúc <Asterisk size={12} className="text-red-500" />
                </Label>
                <Input
                  type="time"
                  value={dayEntry.endTime}
                  onChange={(e) =>
                    setDayEntry({ ...dayEntry, endTime: e.target.value })
                  }
                />
              </div>

              <div>
                <Label className="mb-[4px]">Ghi chú</Label>
                <Input
                  type="text"
                  placeholder="Tùy chọn"
                  value={dayEntry.note}
                  onChange={(e) =>
                    setDayEntry({ ...dayEntry, note: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="button"
                onClick={handleAddDay}
                className="bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              >
                Thêm ngày
              </Button>
            </div>
          </div>

          {/* Danh sách ngày làm việc */}
          {formData.workDays.length > 0 && (
            <div>
              <h4 className="mb-2 font-semibold">Danh sách ngày làm việc:</h4>
              <table className="w-full border text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="border px-2 py-1">Thứ</th>
                    <th className="border px-2 py-1">Bắt đầu</th>
                    <th className="border px-2 py-1">Kết thúc</th>
                    <th className="border px-2 py-1">Ghi chú</th>
                    <th className="border px-2 py-1">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {formData.workDays.map((day, idx) => (
                    <tr key={idx} className="text-center">
                      <td className="border px-2 py-1">{day.dayOfWeek}</td>
                      <td className="border px-2 py-1">{day.startTime}</td>
                      <td className="border px-2 py-1">{day.endTime}</td>
                      <td className="border px-2 py-1">{day.note}</td>
                      <td className="border px-2 py-1 text-center">
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteDay(idx)}
                          className="text-red-600 hover:text-red-700 cursor-pointer"
                        >
                          <Trash2 size={16} />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Slot duration */}
          <div>
            <Label className="mb-[8px]">Thời lượng mỗi slot (phút)</Label>
            <Select
              value={String(formData.slotDuration)}
              onValueChange={(val) =>
                setFormData({ ...formData, slotDuration: Number(val) })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 phút</SelectItem>
                <SelectItem value="30">30 phút</SelectItem>
                <SelectItem value="45">45 phút</SelectItem>
                <SelectItem value="60">60 phút</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Ngày hiệu lực */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="mb-[8px]">Hiệu lực từ</Label>
              <Input
                type="date"
                value={formData.effectiveFrom}
                onChange={(e) =>
                  setFormData({ ...formData, effectiveFrom: e.target.value })
                }
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
            >
              Lưu lịch làm việc
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WorkScheduleFormModal;
