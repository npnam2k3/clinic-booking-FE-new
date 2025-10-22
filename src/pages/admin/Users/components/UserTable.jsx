import { Lock, Pencil, Trash2, Unlock } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const statusMap = {
  active: { text: "Hoạt động", color: "bg-green-500" },
  inactive: { text: "Đã khóa", color: "bg-red-500" },
};

const UserTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="rounded-lg bg-white shadow-sm overflow-x-auto">
      <table className="w-full min-w-[800px]">
        <thead className="bg-gray-50 border-b text-sm text-gray-600">
          <tr>
            <th className="p-4 text-left">Họ tên</th>
            <th className="p-4 text-left">Email</th>
            {/* <th className="p-4 text-left">Vai trò</th> */}
            <th className="p-4 text-left">Số điện thoại</th>
            <th className="p-4 text-left">Địa chỉ</th>
            {/* <th className="p-4 text-left">Trạng thái</th> */}
            <th className="p-4 text-left">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {data.map((u) => (
            <tr key={u.id} className="border-b hover:bg-gray-50">
              <td className="p-4">{u.contact.fullname}</td>
              <td className="p-4">{u.email}</td>
              {/* <td className="p-4">
                {user.role?.role_name || "Không xác định"}
              </td> */}
              <td className="p-4">{u.contact.phone_number}</td>
              <td className="p-4">{u.contact.address}</td>
              {/* <td className="p-4">
                <Badge className={`${statusMap[u.status]?.color || ""}`}>
                  {statusMap[u.status]?.text}
                </Badge>
              </td> */}
              <td className="p-4 flex gap-2">
                {u.status === "active" ? (
                  <button
                    className="p-2 cursor-pointer hover:bg-red-50 rounded flex items-center gap-1 text-red-600"
                    title="Khóa tài khoản"
                    // onClick={() => handleLockUser(user.id)}
                  >
                    <Lock className="h-4 w-4" />
                  </button>
                ) : (
                  <button
                    className="p-2 cursor-pointer hover:bg-green-50 rounded flex items-center gap-1 text-green-600"
                    title="Mở khóa tài khoản"
                    // onClick={() => handleUnlockUser(user.id)}
                  >
                    <Unlock className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => onEdit(u)}
                  className="p-2 cursor-pointer hover:bg-gray-100 rounded"
                  title="Chỉnh sửa"
                >
                  <Pencil className="h-4 w-4 text-gray-600" />
                </button>
                <button
                  onClick={() => onDelete(u.id)}
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
