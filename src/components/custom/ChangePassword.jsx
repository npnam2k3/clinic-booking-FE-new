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

const ChangePasswordDialog = () => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSave = () => {
    // if (newPassword !== confirmPassword) {
    //   setError("Mật khẩu xác nhận không khớp!");
    //   return;
    // }
    // if (newPassword.length < 6) {
    //   setError("Mật khẩu mới phải có ít nhất 6 ký tự!");
    //   return;
    // }

    // setError("");
    // // TODO: gọi API đổi mật khẩu ở đây
    // console.log("Mật khẩu hiện tại:", currentPassword);
    // console.log("Mật khẩu mới:", newPassword);
    // alert("Đổi mật khẩu thành công ✅");
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
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

          <div className="grid gap-2">
            <Label htmlFor="newPassword">Mật khẩu mới</Label>
            <Input
              id="newPassword"
              type="password"
              placeholder="Nhập mật khẩu mới"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
            <Input
              id="confirmPassword"
              type="password"
              placeholder="Nhập lại mật khẩu mới"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
        </div>

        <DialogFooter>
          <Button
            className="bg-gray-200 text-gray-800 cursor-pointer hover:bg-gray-400"
            onClick={handleCancel}
          >
            Hủy
          </Button>
          <Button onClick={handleSave} className=" cursor-pointer">
            Lưu
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordDialog;
