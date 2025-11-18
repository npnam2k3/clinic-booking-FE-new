import { Lock, Pencil, Trash2, Unlock } from "lucide-react";
import { message } from "antd";
import { UserLockService } from "@/service/user/user-lock.service";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const statusMap = {
  active: { text: "Hoạt động", color: "bg-green-500" },
  inactive: { text: "Đã khóa", color: "bg-red-500" },
};

/**
 * Bảng hiển thị danh sách người dùng / nhân viên
 * @param {Array} data - Dữ liệu người dùng
 * @param {Function} onEdit - Hàm mở modal chỉnh sửa
 * @param {Function} onDelete - Hàm xóa người dùng
 * @param {Function} onReload - Hàm reload lại danh sách (sau khi khóa/mở khóa)
 */
const UserTable = ({ data, onEdit, onDelete, onReload, showLock = false }) => {
  const [showLockDialog, setShowLockDialog] = useState(false);
  const [lockAction, setLockAction] = useState(null); // { userId, action: 'lock' | 'unlock' }
  const [messageApi, contextHolder] = message.useMessage();

  // Mở dialog khóa
  const openLockDialog = (userId) => {
    setLockAction({ userId, action: "lock" });
    setShowLockDialog(true);
  };

  // Mở dialog mở khóa
  const openUnlockDialog = (userId) => {
    setLockAction({ userId, action: "unlock" });
    setShowLockDialog(true);
  };

  // Hủy thao tác
  const cancelLockAction = () => {
    setShowLockDialog(false);
    setLockAction(null);
  };

  // Xác nhận khóa/mở khóa
  const confirmLockAction = async () => {
    if (!lockAction) return;

    try {
      const res =
        lockAction.action === "lock"
          ? await UserLockService.lock(lockAction.userId)
          : await UserLockService.unlock(lockAction.userId);

      console.log(`${lockAction.action} response:`, res);

      // Kiểm tra nhiều trường hợp response thành công
      const isSuccess =
        res?.status === true ||
        res?.statusCode === 200 ||
        res?.statusCode === 201 ||
        (res && !res.error);

      if (isSuccess) {
        // Hiển thị message từ backend, nếu không có thì dùng message mặc định
        messageApi.success(
          res?.message ||
            (lockAction.action === "lock"
              ? "Khóa tài khoản thành công!"
              : "Mở khóa tài khoản thành công!")
        );
        setShowLockDialog(false);
        setLockAction(null);
        onReload?.();
      } else {
        messageApi.error(
          res?.message ||
            `${
              lockAction.action === "lock" ? "Khóa" : "Mở khóa"
            } tài khoản thất bại!`
        );
        setShowLockDialog(false);
        setLockAction(null);
      }
    } catch (err) {
      console.error(
        `Lỗi khi ${
          lockAction.action === "lock" ? "khóa" : "mở khóa"
        } tài khoản:`,
        err
      );
      messageApi.error(
        err?.message ||
          `${
            lockAction.action === "lock" ? "Khóa" : "Mở khóa"
          } tài khoản thất bại. Vui lòng thử lại!`
      );
      setShowLockDialog(false);
      setLockAction(null);
    }
  };

  return (
    <>
      <div className="rounded-lg bg-white shadow-sm overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead className="bg-gray-50 border-b text-sm text-gray-600">
            <tr>
              <th className="p-4 text-left">Họ tên</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Số điện thoại</th>
              <th className="p-4 text-left">Địa chỉ</th>
              <th className="p-4 text-left">Trạng thái</th>
              <th className="p-4 text-left">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {data.map((u) => (
              <tr key={u.user_id || u.id} className="border-b hover:bg-gray-50">
                <td className="p-4">{u.contact?.fullname}</td>
                <td className="p-4">{u.email}</td>
                <td className="p-4">{u.contact?.phone_number}</td>
                <td className="p-4">{u.contact?.address}</td>

                {/* Trạng thái tài khoản */}
                <td className="p-4">
                  <Badge
                    className={`text-white ${
                      u.is_block
                        ? statusMap.inactive.color
                        : statusMap.active.color
                    }`}
                  >
                    {u.is_block
                      ? statusMap.inactive.text
                      : statusMap.active.text}
                  </Badge>
                </td>

                {/* Hành động */}
                <td className="p-4 flex gap-2 items-center">
                  {showLock &&
                    (u.is_block ? (
                      // Nếu tài khoản đang bị khóa => hiển thị nút "Mở khóa"
                      <button
                        onClick={() => openUnlockDialog(u.user_id || u.id)}
                        className="p-2 cursor-pointer hover:bg-green-50 rounded flex items-center gap-1 text-green-600"
                        title="Mở khóa tài khoản"
                      >
                        <Unlock className="h-4 w-4" />
                      </button>
                    ) : (
                      // Nếu tài khoản đang hoạt động => hiển thị nút "Khóa"
                      <button
                        onClick={() => openLockDialog(u.user_id || u.id)}
                        className="p-2 cursor-pointer hover:bg-red-50 rounded flex items-center gap-1 text-red-600"
                        title="Khóa tài khoản"
                      >
                        <Lock className="h-4 w-4" />
                      </button>
                    ))}
                  <button
                    onClick={() => onEdit(u)}
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                    title="Chỉnh sửa"
                  >
                    <Pencil className="h-4 w-4 text-gray-600" />
                  </button>

                  <button
                    onClick={() => onDelete(u.user_id || u.id)}
                    className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                    title="Xóa"
                  >
                    <Trash2 className="h-4 w-4 text-red-600" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Dialog xác nhận khóa/mở khóa */}
      <Dialog open={showLockDialog} onOpenChange={setShowLockDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {lockAction?.action === "lock"
                ? "Xác nhận khóa tài khoản"
                : "Xác nhận mở khóa tài khoản"}
            </DialogTitle>
            <DialogDescription>
              {lockAction?.action === "lock"
                ? "Bạn có chắc chắn muốn khóa tài khoản này? Người dùng sẽ không thể đăng nhập sau khi bị khóa."
                : "Bạn có chắc chắn muốn mở khóa tài khoản này? Người dùng sẽ có thể đăng nhập trở lại."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelLockAction}>
              Hủy
            </Button>
            <Button
              variant={
                lockAction?.action === "lock" ? "destructive" : "default"
              }
              onClick={confirmLockAction}
            >
              {lockAction?.action === "lock" ? "Khóa" : "Mở khóa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserTable;
