import { useEffect, useState, useCallback } from "react";
import { message, Spin } from "antd";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Asterisk, Upload } from "lucide-react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { DoctorService } from "@/service/doctor/useDoctor.service";
import { SpecialtyService } from "@/service/specialty/specialty.service";

const DoctorFormModal = ({ doctor, onClose, onSave }) => {
  const isEdit = !!doctor;

  const [formData, setFormData] = useState({
    fullname: doctor?.fullname || "",
    gender: doctor?.gender || "",
    degree: doctor?.degree || "",
    position: doctor?.position || "",
    specialization_id: doctor?.specialty?.specialization_id || "",
    years_of_experience: doctor?.years_of_experience || "",
    phone_number: doctor?.phone_number || "",
    email: doctor?.email || "",
    avatar_url: doctor?.avatar_url || "",
    description: doctor?.description || "",
  });

  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState(formData.avatar_url);
  const [messageApi, contextHolder] = message.useMessage();

  // ===============================
  // FETCH CHUYÊN KHOA
  // ===============================
  const fetchSpecialties = useCallback(async () => {
    try {
      setLoading(true);
      const data = await SpecialtyService.getAll();
      setSpecialties(data);
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

  // ===============================
  // UPLOAD ẢNH (tạm thời lưu base64)
  // ===============================
  // Compress image client-side to avoid sending huge base64 payloads
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const toDataURL = (img, mime = "image/jpeg", quality = 0.8) => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      let { width, height } = img;

      const maxDim = 800; // max width or height
      if (width > maxDim || height > maxDim) {
        const scale = Math.min(maxDim / width, maxDim / height);
        width = Math.round(width * scale);
        height = Math.round(height * scale);
      }

      canvas.width = width;
      canvas.height = height;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      return canvas.toDataURL(mime, quality);
    };

    const readFile = (file) =>
      new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });

    try {
      const dataUrl = await readFile(file);

      // Create image element to get natural size
      const img = await new Promise((resolve, reject) => {
        const image = new Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.src = dataUrl;
      });

      // Try compressing to jpeg first
      let compressed = toDataURL(img, "image/jpeg", 0.8);

      // If still large, progressively reduce quality
      const maxSizeBytes = 100 * 1024; // target ~100KB
      const approxSize = (str) => Math.ceil((str.length - (str.indexOf(',') + 1)) * 3 / 4);

      let size = approxSize(compressed);
      let quality = 0.8;
      while (size > maxSizeBytes && quality > 0.2) {
        quality -= 0.15;
        compressed = toDataURL(img, "image/jpeg", quality);
        size = approxSize(compressed);
      }

      // If still too large and original was PNG, try png but resized (less likely smaller)
      if (size > maxSizeBytes && file.type === "image/png") {
        compressed = toDataURL(img, "image/png", 1);
        size = approxSize(compressed);
      }

      // Fallback to original dataUrl if compression failed
      const finalDataUrl = size <= (10 * 1024 * 1024) ? compressed : dataUrl;

      setAvatarPreview(finalDataUrl);
      setFormData({ ...formData, avatar_url: finalDataUrl });
    } catch (err) {
      console.error("Lỗi khi xử lý ảnh:", err);
      // fallback: read and set original
      const reader = new FileReader();
      reader.onload = (event) => {
        setAvatarPreview(event.target.result);
        setFormData({ ...formData, avatar_url: event.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // ===============================
  // SUBMIT FORM (TẠO / CẬP NHẬT)
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let successMsg = null;
      if (isEdit) {
        await DoctorService.update(doctor.doctor_id, formData);
        successMsg = "Cập nhật thông tin bác sĩ thành công!";
      } else {
        await DoctorService.create(formData);
        console.log("Form Data Submitted:", formData);
        successMsg = "Thêm mới bác sĩ thành công!";
      }

      // Lấy lại danh sách bác sĩ và trả về cho parent (Plan A).
      // Trả kèm `successMsg` để parent hiển thị message (parent có contextHolder và sẽ không bị unmount ngay).
      try {
        const data = await DoctorService.getAll();
        onSave?.(data?.doctors || [], successMsg);
      } catch (errList) {
        console.error("Lỗi khi tải lại danh sách bác sĩ:", errList);
        onSave?.([], successMsg);
      }
    } catch (err) {
      console.error("Lỗi khi lưu thông tin bác sĩ:", err);
      messageApi.error("Lưu thông tin bác sĩ thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // JSX FORM
  // ===============================
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      {contextHolder}
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {isEdit ? "Chỉnh sửa bác sĩ" : "Thêm bác sĩ mới"}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          Nhập thông tin chi tiết của bác sĩ
        </p>

        <Spin spinning={loading}>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Họ tên + Giới tính */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-1 text-sm font-medium">
                  Họ tên <Asterisk size={12} className="text-red-500" />
                </Label>
                <Input
                  placeholder="Nhập họ tên"
                  value={formData.fullname}
                  onChange={(e) =>
                    setFormData({ ...formData, fullname: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label className="flex items-center gap-1 text-sm font-medium">
                  Giới tính <Asterisk size={12} className="text-red-500" />
                </Label>
                <Select
                  value={formData.gender}
                  onValueChange={(v) => setFormData({ ...formData, gender: v })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Nam</SelectItem>
                    <SelectItem value="female">Nữ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Bằng cấp + Chức danh */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-1 text-sm font-medium">
                  Học vị <Asterisk size={12} className="text-red-500" />
                </Label>
                <Input
                  placeholder="VD: ThS, TS"
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label className="flex items-center gap-1 text-sm font-medium">
                  Chức danh <Asterisk size={12} className="text-red-500" />
                </Label>
                <Input
                  placeholder="VD: Bác sĩ điều trị, Trưởng khoa"
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({ ...formData, position: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Chuyên khoa */}
            <div>
              <Label className="flex items-center gap-1 text-sm font-medium">
                Chuyên khoa <Asterisk size={12} className="text-red-500" />
              </Label>
              <Select
                value={
                  formData.specialization_id
                    ? String(formData.specialization_id)
                    : ""
                }
                onValueChange={(v) =>
                  setFormData({ ...formData, specialization_id: Number(v) })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Chọn chuyên khoa" />
                </SelectTrigger>
                <SelectContent>
                  {specialties.map((spec) => (
                    <SelectItem
                      key={spec.specialization_id}
                      value={String(spec.specialization_id)}
                    >
                      {spec.specialization_name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Kinh nghiệm */}
            <div>
              <Label className="flex items-center gap-1 text-sm font-medium">
                Số năm kinh nghiệm{" "}
                <Asterisk size={12} className="text-red-500" />
              </Label>
              <Input
                type="number"
                placeholder="VD: 5"
                value={formData.years_of_experience}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    years_of_experience: e.target.value,
                  })
                }
                required
              />
            </div>

            {/* SĐT + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label className="flex items-center gap-1 text-sm font-medium">
                  Số điện thoại <Asterisk size={12} className="text-red-500" />
                </Label>
                <Input
                  type="tel"
                  placeholder="0901234567"
                  value={formData.phone_number}
                  onChange={(e) =>
                    setFormData({ ...formData, phone_number: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-1 text-sm font-medium">
                  Email <Asterisk size={12} className="text-red-500" />
                </Label>
                <Input
                  type="email"
                  placeholder="doctor@hospital.vn"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            {/* Mô tả chuyên môn */}
            <div>
              <Label className="text-sm font-medium">Mô tả chuyên môn</Label>
              <ReactQuill
                className="h-[200px]"
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                placeholder="Nhập mô tả về chuyên môn, kinh nghiệm..."
              />
            </div>

            {/* Ảnh đại diện */}
            <div className="mt-[40px]">
              <Label className="text-sm font-medium">Ảnh đại diện</Label>
              <div className="space-y-3">
                {avatarPreview && (
                  <div className="flex items-center gap-4">
                    <img
                      src={avatarPreview}
                      alt="Preview"
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        setAvatarPreview("");
                        setFormData({ ...formData, avatar_url: "" });
                      }}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Xóa ảnh
                    </button>
                  </div>
                )}
                <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50">
                  <Upload className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-700">
                    {avatarPreview ? "Thay đổi ảnh" : "Tải ảnh lên"}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Nút hành động */}
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
                {isEdit ? "Cập nhật" : "Thêm mới"}
              </button>
            </div>
          </form>
        </Spin>
      </div>
    </div>
  );
};
export default DoctorFormModal;
