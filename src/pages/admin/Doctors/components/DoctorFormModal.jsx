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
  const [avatarFile, setAvatarFile] = useState(null); // Store the actual file
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
  // UPLOAD ẢNH (lưu file object)
  // ===============================
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Store actual file
    setAvatarFile(file);

    // Clear old URL
    setFormData((prev) => ({
      ...prev,
      avatar_url: null,
    }));

    // Preview
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
  };


  // ===============================
  // SUBMIT FORM (TẠO / CẬP NHẬT)
  // ===============================
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      let finalPayload = { ...formData };

      // ⚠ Nếu có file mới, bỏ avatar_url (để không ghi đè file upload)
      if (avatarFile) {
        delete finalPayload.avatar_url;
      }

      let successMsg = null;
      console.log("finalPayload:", finalPayload);
      if (isEdit) {
        await DoctorService.update(doctor.doctor_id, finalPayload, avatarFile);
        successMsg = "Cập nhật thông tin bác sĩ thành công!";
      } else {
        await DoctorService.create(finalPayload, avatarFile);
        successMsg = "Thêm mới bác sĩ thành công!";
      }

      // Reload list
      const data = await DoctorService.getAll();
      onSave?.(data?.doctors || [], successMsg);

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
                        setAvatarFile(null);
                        setFormData((prev) => ({
                          ...prev,
                          avatar_url: null
                        }));

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
