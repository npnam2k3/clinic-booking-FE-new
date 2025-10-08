import { useState, useEffect } from "react";
import { mockDoctors } from "@/data/mockData";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Asterisk } from "lucide-react";

const SpecialScheduleFormModal = ({ schedule, open, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    doctorId: "",
    date: "",
    type: "work",
    status: "active",
    startTime: "",
    endTime: "",
    slotDuration: "30",
  });

  // ✅ Khi prop `schedule` thay đổi → cập nhật state và convert slotDuration thành string
  useEffect(() => {
    if (schedule) {
      setFormData({
        ...schedule,
        slotDuration: schedule.slotDuration?.toString() || "30",
      });
    }
  }, [schedule]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const doctor = mockDoctors.find((d) => d.id === formData.doctorId);
    onSave({ ...formData, doctorName: doctor?.name || formData.doctorName });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="max-w-2xl rounded-2xl p-8"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {schedule ? "Chỉnh sửa lịch đặc biệt" : "Thêm lịch đặc biệt mới"}
          </DialogTitle>
          <DialogDescription>
            Nhập thông tin chi tiết cho lịch làm việc đặc biệt của bác sĩ.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Bác sĩ */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Bác sĩ <Asterisk size={12} className="text-red-500" />
            </Label>
            <Select
              value={formData.doctorId}
              onValueChange={(value) =>
                setFormData({ ...formData, doctorId: value })
              }
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

          {/* Ngày */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Ngày <Asterisk size={12} className="text-red-500" />
            </Label>
            <Input
              type="date"
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
              required
            />
          </div>

          {/* Loại lịch */}
          <div className="space-y-2">
            <Label className="flex items-center gap-1">
              Trạng thái <Asterisk size={12} className="text-red-500" />
            </Label>
            <Select
              value={formData.type}
              onValueChange={(value) =>
                setFormData({ ...formData, type: value })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Chọn trạng thái" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="work">Làm việc</SelectItem>
                <SelectItem value="off">Nghỉ</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Nếu là làm việc */}
          {formData.type === "work" && (
            <>
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Giờ bắt đầu <Asterisk size={12} className="text-red-500" />
                  </Label>
                  <Input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) =>
                      setFormData({ ...formData, startTime: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-1">
                    Giờ kết thúc <Asterisk size={12} className="text-red-500" />
                  </Label>
                  <Input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) =>
                      setFormData({ ...formData, endTime: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-1">
                  Thời lượng mỗi slot (phút)
                  <Asterisk size={12} className="text-red-500" />
                </Label>
                <Select
                  value={formData.slotDuration}
                  onValueChange={(value) =>
                    setFormData({ ...formData, slotDuration: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn thời lượng" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 phút</SelectItem>
                    <SelectItem value="30">30 phút</SelectItem>
                    <SelectItem value="45">45 phút</SelectItem>
                    <SelectItem value="60">60 phút</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {/* Nút hành động */}
          <div className="flex justify-end gap-3 pt-6">
            <Button
              variant="outline"
              type="button"
              onClick={onClose}
              className="cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white cursor-pointer"
            >
              {schedule ? "Lưu thay đổi" : "Thêm mới"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default SpecialScheduleFormModal;
