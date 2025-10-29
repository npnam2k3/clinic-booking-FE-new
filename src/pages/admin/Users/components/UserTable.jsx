import { Lock, Pencil, Trash2, Unlock } from "lucide-react";
import { message } from "antd";
import { UserLockService } from "@/service/user/user-lock.service";
import { Badge } from "@/components/ui/badge";

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
  // Hàm khóa tài khoản
  const handleLockUser = async (userId) => {
    try {
      if (!confirm("Bạn có chắc chắn muốn khóa tài khoản này?")) return;

      const res = await UserLockService.lock(userId);
      if (res?.status) {
        message.success("Tài khoản đã bị khóa!");
        onReload?.(); // Reload lại danh sách sau khi khóa
      } else {
        message.error(res?.message || "Không thể khóa tài khoản!");
      }
    } catch (err) {
      console.error("Lỗi khi khóa tài khoản:", err);
      message.error("Không thể khóa tài khoản, vui lòng thử lại!");
    }
  };

  // Hàm mở khóa tài khoản
  const handleUnlockUser = async (userId) => {
    try {
      if (!confirm("Bạn có chắc chắn muốn mở khóa tài khoản này?")) return;

      const res = await UserLockService.unlock(userId);
      if (res?.status) {
        message.success("Tài khoản đã được mở khóa!");
        onReload?.(); // Reload lại danh sách sau khi mở khóa
      } else {
        message.error(res?.message || "Không thể mở khóa tài khoản!");
      }
    } catch (err) {
      console.error("Lỗi khi mở khóa tài khoản:", err);
      message.error("Không thể mở khóa tài khoản, vui lòng thử lại!");
    }
  };

  return (
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
                  {u.is_block ? statusMap.inactive.text : statusMap.active.text}
                </Badge>
              </td>

              {/* Hành động */}
              <td className="p-4 flex gap-2 items-center">
                {showLock &&
                  (u.is_block ? (
                    // Nếu tài khoản đang bị khóa => hiển thị nút "Mở khóa"
                    <button
                      onClick={() => handleUnlockUser(u.user_id || u.id)}
                      className="p-2 cursor-pointer hover:bg-green-50 rounded flex items-center gap-1 text-green-600"
                      title="Mở khóa tài khoản"
                    >
                      <Unlock className="h-4 w-4" />
                    </button>
                  ) : (
                    // Nếu tài khoản đang hoạt động => hiển thị nút "Khóa"
                    <button
                      onClick={() => handleLockUser(u.user_id || u.id)}
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
  );
};

export default UserTable;
