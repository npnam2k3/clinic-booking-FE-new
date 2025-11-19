import { useState } from "react";
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
import { PatientService } from "@/service/patient/patient.service";

const PatientFormModal = ({ patient, onClose, onSave, onError, onSuccess }) => {
  const [formData, setFormData] = useState(
    patient
      ? {
          fullname: patient.fullname || "",
          gender: patient.gender === "female" ? "Nữ" : "Nam",
          date_of_birth: patient.date_of_birth
            ? formatDateForInput(patient.date_of_birth)
            : "",
          phone_number: patient.contact?.phone_number || "",
          address: patient.address || "",
        }
      : {
          fullname: "",
          gender: "Nam",
          date_of_birth: "",
          phone_number: "",
          address: "",
        }
  );

  const [loading, setLoading] = useState(false);

  // Chuyển định dạng ngày từ dd/mm/yyyy -> yyyy-MM-dd cho input type="date"
  function formatDateForInput(dateStr) {
    if (!dateStr) return "";
    const parts = dateStr.split("/");
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}-${month}-${day}`;
    }
    return dateStr;
  }

  // Chuyển định dạng từ yyyy-MM-dd -> dd/mm/yyyy để gửi API
  function formatDateForApi(value) {
    if (!value) return "";
    const [year, month, day] = value.split("-");
    return `${day}/${month}/${year}`;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Validate đơn giản
      if (!formData.fullname.trim() || !formData.phone_number.trim()) {
        onError?.("Vui lòng nhập đầy đủ họ tên và số điện thoại");
        setLoading(false);
        return;
      }

      const payload = {
        fullname: formData.fullname.trim(),
        gender: formData.gender === "Nữ" ? "female" : "male",
        date_of_birth: formatDateForApi(formData.date_of_birth),
        address: formData.address.trim(),
        // contact_id tạm thời fix 3, có thể thay bằng dropdown người liên hệ sau này
        contact_id: 3,
      };

      if (patient) {
        // Cập nhật bệnh nhân
        await PatientService.update(patient.patient_code, payload);
      } else {
        // Thêm mới bệnh nhân
        await PatientService.create(payload);
      }

      // Lấy lại danh sách bệnh nhân và trả về cho parent để cập nhật state (Plan A)
      try {
        const data = await PatientService.getAll();
        onSave?.(
          data?.patients || [],
          patient
            ? "Cập nhật thông tin bệnh nhân thành công!"
            : "Thêm mới bệnh nhân thành công!"
        );
        onSuccess?.(
          patient
            ? "Cập nhật thông tin bệnh nhân thành công!"
            : "Thêm mới bệnh nhân thành công!"
        );
      } catch (errList) {
        console.error("Lỗi khi tải lại danh sách bệnh nhân:", errList);
        onSave?.();
      }

      onClose(); // đóng modal
    } catch (error) {
      console.error("Lỗi khi lưu bệnh nhân:", error);
      const backendMsg =
        error?.response?.data?.message ||
        (error?.message && String(error.message));
      onError?.(
        backendMsg || "Lưu thông tin bệnh nhân thất bại. Vui lòng thử lại!"
      );
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
      <div className="w-full max-w-2xl rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {patient ? "Chỉnh sửa bệnh nhân" : "Thêm bệnh nhân mới"}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          {patient
            ? "Cập nhật thông tin bệnh nhân"
            : "Nhập thông tin bệnh nhân mới"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="fullname">
                Họ tên <span className="text-red-500">*</span>
              </Label>
              <Input
                id="fullname"
                type="text"
                value={formData.fullname}
                onChange={(e) =>
                  setFormData({ ...formData, fullname: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-1">
              <Label>
                Giới tính <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.gender}
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nam">Nam</SelectItem>
                  <SelectItem value="Nữ">Nữ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="dob">
                Ngày sinh <span className="text-red-500">*</span>
              </Label>
              <Input
                id="dob"
                type="date"
                value={formData.date_of_birth}
                onChange={(e) =>
                  setFormData({ ...formData, date_of_birth: e.target.value })
                }
                required
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">
                Số điện thoại <span className="text-red-500">*</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone_number}
                onChange={(e) =>
                  setFormData({ ...formData, phone_number: e.target.value })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <Label htmlFor="address">
              Địa chỉ <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="address"
              rows={2}
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              required
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg cursor-pointer border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg cursor-pointer bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              {loading
                ? "Đang lưu..."
                : patient
                ? "Cập nhật"
                : "Thêm bệnh nhân"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default PatientFormModal;
