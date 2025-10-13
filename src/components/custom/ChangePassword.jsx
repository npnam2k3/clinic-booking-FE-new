import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import { validateChangePassword } from "@/untils/vaildate/change-password.validate";
import { userAuthService } from "@/service/auth/userAuth.service";
import storage from "@/untils/storage";
import { memoryStorage } from "@/untils/storage";

const ChangePasswordDialog = () => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // 👁️ toggle visibility states
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSave = async () => {
    setError("");

    const errorMsg = validateChangePassword({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        current_password: currentPassword,
        new_password: newPassword,
        confirm_password: confirmPassword
      };
      const res = await userAuthService.changePassword(payload);
      if (res?.status) {
        alert(res.message || "Đổi mật khẩu thành công, vui lòng đăng nhập lại!");
        memoryStorage.setAccessToken(null);
        storage.clearToken();
        window.location.href = "/login";
      } else {
        setError(res?.message || "Đổi mật khẩu thất bại, vui lòng thử lại!");
      }
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Đổi mật khẩu thất bại. Vui lòng thử lại!"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setOpen(false);
    setError("");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mt-[40px] cursor-pointer">
          Đổi mật khẩu
        </Button>
      </DialogTrigger>

      <DialogContent
        className="sm:max-w-[400px]"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Đổi mật khẩu</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Mật khẩu hiện tại */}
          <div className="grid gap-2">
            <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
            <Input
              id="currentPassword"
              type="password"
              placeholder="Nhập mật khẩu hiện tại"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
          </div>

          {/* Mật khẩu mới */}
          <div className="grid gap-2 relative">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="newPassword"
                type={showNewPassword ? "text" : "password"}
                placeholder="Nhập mật khẩu mới"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Xác nhận mật khẩu mới */}
          <div className="grid gap-2 relative">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Nhập lại mật khẩu mới"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            className="bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-400"
            onClick={handleCancel}
            disabled={loading}
          >
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            disabled={loading}
            className="cursor-pointer"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
