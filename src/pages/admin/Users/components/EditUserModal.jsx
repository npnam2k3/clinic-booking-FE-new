import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { StaffService } from "@/service/staff/staff.service";
import { UserService } from "@/service/user/user.service";

const EditUserModal = ({ user, onClose, onSave, onError }) => {
  const [formData, setFormData] = useState({
    fullname: user?.contact?.fullname || "",
    phone_number: user?.contact?.phone_number || "",
    address: user?.contact?.address || "",
    email: user?.email || "",
    user_id: user?.user_id,
    role: user?.role?.role_name || "USER_CLIENT",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Kiểm tra loại người dùng để chọn API phù hợp
      const isStaff = formData.role?.toUpperCase().includes("STAFF");
      const payload = {
        fullname: formData.fullname,
        phone_number: formData.phone_number,
        address: formData.address,
      };

      const res = isStaff
        ? await StaffService.update(formData.user_id, payload)
        : await UserService.update(formData.user_id, payload);

      if (res?.status) {
        // Sau khi cập nhật thành công, gọi lại API list tương ứng và trả về dữ liệu mới cho parent
        try {
          if (isStaff) {
            const list = await StaffService.getAll();
            onSave({
              data: list || [],
              message: "Cập nhật thông tin người dùng thành công!",
            });
          } else {
            const data = await UserService.getAll();
            onSave({
              data: data?.users || [],
              message: "Cập nhật thông tin người dùng thành công!",
            });
          }
        } catch (errList) {
          console.error("Lỗi khi tải lại danh sách sau cập nhật:", errList);
          // fallback: vẫn gọi onSave undefined để parent tự xử lý
          onSave();
        }
        onClose();
      } else {
        if (typeof onError === "function")
          onError(res?.message || "Cập nhật người dùng thất bại!");
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật người dùng:", err);
      if (typeof onError === "function")
        onError(err?.message || "Cập nhật thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-900">
          Chỉnh sửa thông tin người dùng
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Họ tên */}
          <div>
            <Label htmlFor="fullname" className="mb-1 block">
              Họ và tên
            </Label>
            <Input
              id="fullname"
              value={formData.fullname}
              onChange={(e) =>
                setFormData({ ...formData, fullname: e.target.value })
              }
              placeholder="Nhập họ và tên"
              required
            />
          </div>

          {/* Số điện thoại */}
          <div>
            <Label htmlFor="phone_number" className="mb-1 block">
              Số điện thoại
            </Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) =>
                setFormData({ ...formData, phone_number: e.target.value })
              }
              placeholder="Nhập số điện thoại"
              required
            />
          </div>

          {/* Địa chỉ */}
          <div>
            <Label htmlFor="address" className="mb-1 block">
              Địa chỉ
            </Label>
            <Input
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({ ...formData, address: e.target.value })
              }
              placeholder="Nhập địa chỉ"
              required
            />
          </div>

          {/* Email (không cho sửa) */}
          <div>
            <Label htmlFor="email" className="mb-1 block">
              Email
            </Label>
            <Input id="email" value={formData.email} disabled />
          </div>

          {/* Vai trò (chỉ hiển thị, không cho sửa) */}
          <div>
            <Label htmlFor="role" className="mb-1 block">
              Vai trò
            </Label>
            <Input id="role" value={formData.role} disabled />
          </div>

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
              disabled={loading}
              className="cursor-pointer bg-orange-600 hover:bg-orange-700 text-white"
            >
              {loading ? "Đang lưu..." : "Lưu thay đổi"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditUserModal;
