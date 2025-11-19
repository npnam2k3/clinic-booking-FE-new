import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Asterisk } from "lucide-react";
import { useState } from "react";
import { message } from "antd";
import { StaffService } from "@/service/staff/staff.service";

export default function AddStaffModal({ onClose, onSave }) {
  // Trạng thái hiển thị mật khẩu
  const [showPassword, setShowPassword] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();

  // Dữ liệu form
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    phone_number: "",
    address: "",
  });

  // Trạng thái loading khi submit
  const [loading, setLoading] = useState(false);

  // Hàm cập nhật giá trị form
  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  // Hàm submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      // Gọi API tạo nhân viên mới
      const res = await StaffService.create({
        email: formData.email,
        password: formData.password,
        fullname: formData.fullname,
        phone_number: formData.phone_number,
        address: formData.address,
        is_block: false,
      });

      if (res.status) {
        messageApi.success("Thêm mới nhân viên thành công!");
        // Lấy lại danh sách nhân viên và trả về cho parent
        try {
          const list = await StaffService.getAll();
          onSave(list || []);
        } catch (errList) {
          console.error("Lỗi khi tải lại danh sách nhân viên:", errList);
          onSave();
        }
        onClose(); // Đóng modal
      } else {
        messageApi.error(res.message || "Thêm nhân viên thất bại!");
      }
    } catch (err) {
      console.error("Lỗi khi tạo nhân viên:", err);
      messageApi.error(err.message || "Thêm nhân viên thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open onOpenChange={onClose}>
      {contextHolder}
      <DialogContent className="max-w-[500px] max-h-[90vh] overflow-y-auto p-6">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">
            Thêm nhân viên mới
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5 mt-4">
          {/* Email */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Label htmlFor="email">Email</Label>
              <Asterisk size={12} className="text-red-500" />
            </div>
            <Input
              id="email"
              type="email"
              placeholder="vd: staff@hospital.vn"
              value={formData.email}
              onChange={(e) => handleChange("email", e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Label htmlFor="password">Mật khẩu</Label>
              <Asterisk size={12} className="text-red-500" />
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu"
                value={formData.password}
                onChange={(e) => handleChange("password", e.target.value)}
                required
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Họ và tên */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Label htmlFor="fullname">Họ và tên</Label>
              <Asterisk size={12} className="text-red-500" />
            </div>
            <Input
              id="fullname"
              placeholder="vd: Nguyễn Văn A"
              value={formData.fullname}
              onChange={(e) => handleChange("fullname", e.target.value)}
              required
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <div className="flex items-center gap-1 mb-2">
              <Label htmlFor="phone_number">Số điện thoại</Label>
              <Asterisk size={12} className="text-red-500" />
            </div>
            <Input
              id="phone_number"
              placeholder="vd: 0987654321"
              value={formData.phone_number}
              onChange={(e) => handleChange("phone_number", e.target.value)}
              required
            />
          </div>

          {/* Địa chỉ */}
          <div>
            <Label htmlFor="address" className="mb-2 block">
              Địa chỉ
            </Label>
            <Input
              id="address"
              placeholder="vd: 123 Nguyễn Huệ, Q.1, TP.HCM"
              value={formData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
          </div>

          <DialogFooter className="mt-6">
            <div className="flex justify-between w-full gap-x-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 cursor-pointer"
              >
                {loading ? "Đang tạo..." : "Tạo tài khoản"}
              </Button>
              <Button
                type="button"
                onClick={onClose}
                className="flex-1 cursor-pointer bg-gray-400 hover:bg-gray-500"
              >
                Hủy
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
