import { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Asterisk, Info } from "lucide-react";
import { DoctorService } from "@/service/doctor/useDoctor.service";
import { DoctorSlotsService } from "@/service/doctor_slot/useDoctorSlot.service";
import { WorkScheduleService } from "@/service/work_shedule/work_shedule.service";
import { validateDoctorSlotsRequest } from "@/untils/vaildate/doctor-slots.validate";

const GenerateSlotsModal = ({ onClose, activeTab, onSuccess, onError }) => {
  const [formData, setFormData] = useState({
    doctorId: "",
    dateFrom: "",
    dateTo: "",
  });
  const [loading, setLoading] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [scheduleInfo, setScheduleInfo] = useState(null); // ✅ lưu thông tin lịch làm việc
  // parent will display messages via onSuccess/onError

  // 🩺 Lấy danh sách bác sĩ
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const res = await DoctorService.getAll();
        setDoctors(res?.doctors || res || []);
      } catch (err) {
        console.error("Lỗi khi tải danh sách bác sĩ:", err);
        onError?.("Tải danh sách bác sĩ thất bại!");
      }
    };
    fetchDoctors();
  }, []);

  // 🔹 Format ngày sang dd/MM/yyyy (gửi lên backend)
  const formatDate = (val) => {
    if (!val) return "";
    const d = new Date(val);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // ✅ Khi chọn bác sĩ → tự lấy ngày hiệu lực
  const handleSelectDoctor = async (doctorId) => {
    setFormData({ ...formData, doctorId, dateFrom: "", dateTo: "" });
    setScheduleInfo(null);

    if (!doctorId) return;

    try {
      setLoading(true);
      const res =
        activeTab === "new"
          ? await WorkScheduleService.getNewWorkSchedules()
          : await WorkScheduleService.getOldWorkSchedules();

      const doctorSchedule = res.data.find(
        (d) => String(d.doctor_id) === String(doctorId)
      );

      if (doctorSchedule && doctorSchedule.work_schedules?.length > 0) {
        const firstSchedule = doctorSchedule.work_schedules[0];
        const effectiveDate = firstSchedule.effective_date;
        const expireDate = firstSchedule.expire_date;

        setFormData({
          doctorId,
          dateFrom: convertToInputDate(effectiveDate),
          dateTo: convertToInputDate(expireDate),
        });

        setScheduleInfo({
          effectiveDate,
          expireDate,
        });
      } else {
        // ⚠️ Không có lịch
        const msg =
          activeTab === "new"
            ? "Bác sĩ này chưa có lịch mới!"
            : "Bác sĩ này chưa có lịch hiện tại!";
        messageApi.warning(msg);
      }
    } catch (err) {
      console.error("Lỗi khi tải lịch bác sĩ:", err);
      messageApi.error("Tải lịch làm việc của bác sĩ thất bại!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Chuyển ngày sang định dạng yyyy-MM-dd để hiển thị trong input
  const convertToInputDate = (val) => {
    if (!val) return "";
    if (val.includes("/")) {
      const [day, month, year] = val.split("/");
      return `${year}-${month}-${day}`;
    }
    // Dạng yyyy-MM-dd thì giữ nguyên
    return val;
  };

  // ✅ Chuyển ngày yyyy-MM-dd sang dd/MM/yyyy để hiển thị người đọc
  const convertDisplayDate = (val) => {
    if (!val) return "-";
    if (val.includes("/")) return val;
    const [year, month, day] = val.split("-");
    return `${day}/${month}/${year}`;
  };

  // ✅ Gửi request tạo slots
  const handleGenerateSlots = async () => {
    const payload = {
      doctor_id: Number(formData.doctorId),
      from_date: formatDate(formData.dateFrom),
      to_date: formatDate(formData.dateTo),
    };

    const error = validateDoctorSlotsRequest(payload);
    if (error) {
      onError?.(error);
      return;
    }

    try {
      setLoading(true);
      const res = await DoctorSlotsService.getDoctorSlots(payload);

      if (res.status === false || res.statusCode >= 400) {
        onError?.(res.message || "Tạo slots thất bại!");
        return;
      }

      onSuccess?.(res.message || "Tạo slot khám thành công!");
      console.log("Kết quả tạo slots:", res.data);
      onClose();
    } catch (err) {
      console.error("Lỗi khi tạo slots:", err);
      const backendMsg = err?.response?.data?.message;
      onError?.(backendMsg || "Tạo slot khám thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      {/* parent renders message contextHolder */}
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <h2 className="mb-4 text-2xl font-bold">
          Chia slot khám từ lịch làm việc
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Tạo các ca khám từ lịch làm việc đã cấu hình sẵn.
        </p>

        {/* ⚠️ Thông tin lịch làm việc */}
        {scheduleInfo ? (
          <div className="mb-6 rounded-lg bg-yellow-50 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-yellow-100 p-2">
                <Info className="h-5 w-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-yellow-900">Lưu ý:</p>
                <p className="text-sm text-yellow-700">
                  Đang sử dụng{" "}
                  {activeTab === "new" ? "lịch mới" : "lịch hiện tại"} ( Hiệu
                  lực từ {convertDisplayDate(scheduleInfo.effectiveDate)} đến{" "}
                  {convertDisplayDate(scheduleInfo.expireDate)})
                </p>
                <ul className="mt-2 list-inside list-disc text-sm text-yellow-700">
                  <li>Hệ thống sẽ tạo slot dựa trên lịch đã cấu hình.</li>
                  <li>Các slot trùng lặp sẽ không được tạo lại.</li>
                  <li>Slot sẽ được tạo theo thời lượng đã cấu hình.</li>
                </ul>
              </div>
            </div>
          </div>
        ) : (
          <div className="mb-6 rounded-lg bg-red-50 border border-red-200 p-4 text-red-700 text-sm">
            ⚠️ Chưa chọn bác sĩ hoặc bác sĩ này chưa có lịch{" "}
            {activeTab === "new" ? "mới" : "hiện tại"}.
          </div>
        )}

        {/* Form */}
        <form className="space-y-5">
          {/* Bác sĩ */}
          <div>
            <div className="flex items-center mb-2">
              <Label className="text-sm font-medium">Bác sĩ</Label>
              <Asterisk className="ml-1 h-3 w-3 text-red-600" />
            </div>
            <Select
              value={formData.doctorId}
              onValueChange={(val) => handleSelectDoctor(val)}
            >
              <SelectTrigger className="w-full h-[42px]">
                <SelectValue placeholder="Chọn bác sĩ" />
              </SelectTrigger>
              <SelectContent>
                {doctors.length > 0 ? (
                  doctors.map((doctor) => (
                    <SelectItem
                      key={doctor.doctor_id}
                      value={String(doctor.doctor_id)}
                    >
                      {doctor.fullname}
                    </SelectItem>
                  ))
                ) : (
                  <div className="px-3 py-2 text-gray-500 text-sm">
                    (Đang tải danh sách bác sĩ...)
                  </div>
                )}
              </SelectContent>
            </Select>
          </div>

          {/* Ngày */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="flex items-center mb-2">
                <Label className="text-sm font-medium">Từ ngày</Label>
                <Asterisk className="ml-1 h-3 w-3 text-red-600" />
              </div>
              <Input
                type="date"
                value={formData.dateFrom}
                onChange={(e) =>
                  setFormData({ ...formData, dateFrom: e.target.value })
                }
                className="h-[42px]"
              />
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Label className="text-sm font-medium">Đến ngày</Label>
                <Asterisk className="ml-1 h-3 w-3 text-red-600" />
              </div>
              <Input
                type="date"
                value={formData.dateTo}
                onChange={(e) =>
                  setFormData({ ...formData, dateTo: e.target.value })
                }
                className="h-[42px]"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-3 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="px-5 py-2 cursor-pointer"
            >
              Hủy
            </Button>
            <Button
              type="button"
              disabled={loading}
              onClick={handleGenerateSlots}
              className="bg-orange-600 hover:bg-orange-700 px-5 py-2 text-white cursor-pointer"
            >
              {loading ? "Đang tạo..." : "Tạo slot khám"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default GenerateSlotsModal;
