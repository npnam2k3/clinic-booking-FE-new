import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockSpecialties } from "@/data/mockData";
import { Asterisk, Upload } from "lucide-react";
import { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
const DoctorFormModal = ({ doctor, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    doctor || {
      name: "",
      degree: "",
      title: "",
      specialty: "",
      experience: "",
      phone: "",
      email: "",
      avatar: "",
      description: "",
      status: "active",
    }
  );
  const [avatarPreview, setAvatarPreview] = useState(doctor?.avatar || "");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarPreview(e.target.result);
        setFormData({ ...formData, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {doctor ? "Chỉnh sửa bác sĩ" : "Thêm bác sĩ mới"}
        </h2>
        <p className="mb-6 text-sm text-gray-600">Nhập thông tin bác sĩ mới</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Họ tên + Giới tính */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 flex items-center gap-1 text-sm font-medium">
                <Label htmlFor="name">Họ tên</Label>
                <Asterisk size={12} className="text-red-500" />
              </div>
              <Input
                id="name"
                placeholder="Nhập họ tên"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
              />
            </div>

            <div>
              <div className="mb-1 flex items-center gap-1 text-sm font-medium">
                <Label htmlFor="gender">Giới tính</Label>
                <Asterisk size={12} className="text-red-500" />
              </div>
              <Select
                onValueChange={(value) =>
                  setFormData({ ...formData, gender: value })
                }
                value={formData.gender}
              >
                <SelectTrigger id="gender" className={"w-full"}>
                  <SelectValue placeholder="Chọn giới tính" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nam">Nam</SelectItem>
                  <SelectItem value="Nữ">Nữ</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Bằng cấp + Chức danh */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 flex items-center gap-1 text-sm font-medium">
                <Label htmlFor="degree">Bằng cấp</Label>
                <Asterisk size={12} className="text-red-500" />
              </div>
              <Input
                id="degree"
                placeholder="Ví dụ: Thạc sĩ, Tiến sĩ"
                value={formData.degree}
                onChange={(e) =>
                  setFormData({ ...formData, degree: e.target.value })
                }
                required
              />
            </div>

            <div>
              <div className="mb-1 flex items-center gap-1 text-sm font-medium">
                <Label htmlFor="title">Chức danh</Label>
                <Asterisk size={12} className="text-red-500" />
              </div>
              <Input
                id="title"
                placeholder="Ví dụ: Bác sĩ, Phó giáo sư"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>
          </div>

          {/* Chuyên khoa */}
          <div>
            <div className="mb-1 flex items-center gap-1 text-sm font-medium">
              <Label htmlFor="specialty">Chuyên khoa</Label>
              <Asterisk size={12} className="text-red-500" />
            </div>
            <Select
              onValueChange={(value) =>
                setFormData({ ...formData, specialty: value })
              }
              value={formData.specialty}
            >
              <SelectTrigger id="specialty" className="w-full">
                <SelectValue placeholder="Chọn chuyên khoa" />
              </SelectTrigger>
              <SelectContent>
                {mockSpecialties.map((spec) => (
                  <SelectItem key={spec.id} value={spec.name}>
                    {spec.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* SĐT + Email */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <div className="mb-1 flex items-center gap-1 text-sm font-medium">
                <Label htmlFor="phone">Số điện thoại</Label>
                <Asterisk size={12} className="text-red-500" />
              </div>
              <Input
                id="phone"
                type="tel"
                placeholder="0901234567"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                required
              />
            </div>

            <div>
              <div className="mb-1 flex items-center gap-1 text-sm font-medium">
                <Label htmlFor="email">Email</Label>
                <Asterisk size={12} className="text-red-500" />
              </div>
              <Input
                id="email"
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

          {/* Số năm kinh nghiệm */}
          <div>
            <div className="mb-1 flex items-center gap-1 text-sm font-medium">
              <Label htmlFor="experience">Số năm kinh nghiệm</Label>
              <Asterisk size={12} className="text-red-500" />
            </div>
            <Input
              id="experience"
              type="number"
              placeholder="10"
              value={formData.experience}
              onChange={(e) =>
                setFormData({ ...formData, experience: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Mô tả chuyên môn
            </label>
            <div className="rounded-lg">
              <ReactQuill
                className="h-[200px]"
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                placeholder="Mô tả về chuyên môn, kinh nghiệm làm việc..."
              />
            </div>
          </div>

          <div className="mt-[60px]">
            <label className="mb-1 block text-sm font-medium">
              Ảnh đại diện
            </label>
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
                      setFormData({ ...formData, avatar: "" });
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

          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg cursor-pointer border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-lg cursor-pointer bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              {doctor ? "Cập nhật" : "Thêm mới"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DoctorFormModal;
