import { useState } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { mockUsers } from "@/data/mockData";

const UsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.email
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleEdit = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  const handleToggleStatus = (userId) => {
    setUsers(
      users.map((u) =>
        u.id === userId
          ? { ...u, status: u.status === "active" ? "inactive" : "active" }
          : u
      )
    );
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: { bg: "bg-red-600", text: "Quản trị viên" },
      staff: { bg: "bg-orange-600", text: "Nhân viên" },
      user: { bg: "bg-gray-600", text: "Người dùng" },
    };
    return badges[role] || badges.user;
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Quản lý người dùng
            </h1>
            <p className="text-gray-600">
              Quản trị tài khoản đăng nhập hệ thống
            </p>
          </div>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 rounded-lg bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
          >
            <Plus className="h-5 w-5" />
            Thêm người dùng
          </button>
        </div>

        {/* Filters */}
        <div className="mb-6 rounded-lg bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 md:flex-row">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Tìm kiếm theo email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 py-2 pl-10 pr-4 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>
            <div className="w-full md:w-64">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="admin">Quản trị viên</option>
                <option value="staff">Nhân viên</option>
                <option value="user">Người dùng</option>
              </select>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b bg-gray-50">
                <tr className="text-left text-sm text-gray-600">
                  <th className="p-4 font-medium">Mã người dùng</th>
                  <th className="p-4 font-medium">Email</th>
                  <th className="p-4 font-medium">Vai trò</th>
                  <th className="p-4 font-medium">Trạng thái</th>
                  <th className="p-4 font-medium">Ngày tạo</th>
                  <th className="p-4 font-medium">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => {
                  const badge = getRoleBadge(user.role);
                  return (
                    <tr key={user.id} className="border-b last:border-0">
                      <td className="p-4 text-sm">{user.id}</td>
                      <td className="p-4 text-sm font-medium">{user.email}</td>
                      <td className="p-4 text-sm">
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-medium text-white ${badge.bg}`}
                        >
                          {badge.text}
                        </span>
                      </td>
                      <td className="p-4 text-sm">
                        <label className="relative inline-flex cursor-pointer items-center">
                          <input
                            type="checkbox"
                            checked={user.status === "active"}
                            onChange={() => handleToggleStatus(user.id)}
                            className="peer sr-only"
                          />
                          <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-orange-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-orange-300"></div>
                          <span className="ml-3 text-sm font-medium text-gray-900">
                            {user.status === "active" ? "Hoạt động" : "Đã khóa"}
                          </span>
                        </label>
                      </td>
                      <td className="p-4 text-sm">{user.createdAt}</td>
                      <td className="p-4 text-sm">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleEdit(user)}
                            className="rounded p-1 hover:bg-gray-100"
                            title="Chỉnh sửa"
                          >
                            <Pencil className="h-4 w-4 text-gray-600" />
                          </button>
                          <button
                            className="rounded p-1 hover:bg-gray-100"
                            title="Xóa"
                          >
                            <Trash2 className="h-4 w-4 text-red-600" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Add Modal */}
        {isAddModalOpen && (
          <UserFormModal
            onClose={() => setIsAddModalOpen(false)}
            onSave={(newUser) => {
              setUsers([
                ...users,
                {
                  ...newUser,
                  id: `USER${String(users.length + 1).padStart(3, "0")}`,
                  createdAt: new Date().toISOString().split("T")[0],
                },
              ]);
              setIsAddModalOpen(false);
            }}
          />
        )}

        {/* Edit Modal */}
        {isEditModalOpen && selectedUser && (
          <UserFormModal
            user={selectedUser}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            onSave={(updated) => {
              setUsers(users.map((u) => (u.id === updated.id ? updated : u)));
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
          />
        )}
      </div>
    </div>
  );
};

const UserFormModal = ({ user, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    user || {
      email: "",
      password: "",
      role: "user",
      status: "active",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data:", formData); // Debug log
    onSave(formData);
  };

  const isEdit = !!user;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: 'color-mix(in oklab, var(--color-black) 50%, transparent)'
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {isEdit ? "Chỉnh sửa người dùng" : "Thêm người dùng mới"}
        </h2>
        <p className="mb-6 text-sm text-gray-600">
          {isEdit
            ? "Cập nhật thông tin người dùng"
            : "Nhập thông tin người dùng mới"}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              placeholder="user@hospital.vn"
              required
              disabled={isEdit}
            />
            {isEdit && (
              <p className="mt-1 text-xs text-gray-500">
                Email không thể thay đổi sau khi tạo
              </p>
            )}
          </div>

          {!isEdit && (
            <div>
              <label className="mb-1 block text-sm font-medium">
                Mật khẩu <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                placeholder="Nhập mật khẩu"
                required
              />
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium">
              Vai trò <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
              required
            >
              <option value="user">Người dùng</option>
              <option value="staff">Nhân viên</option>
              <option value="admin">Quản trị viên</option>
            </select>
            <p className="mt-1 text-xs text-gray-500">
              Chọn vai trò phù hợp với quyền hạn của người dùng
            </p>
          </div>

          {isEdit && (
            <div className="rounded-lg bg-yellow-50 p-4">
              <p className="text-sm font-medium text-yellow-900">
                Đặt lại mật khẩu
              </p>
              <p className="text-sm text-yellow-700">
                Để đặt lại mật khẩu, vui lòng sử dụng chức năng "Reset mật
                khẩu" hoặc gửi email đặt lại mật khẩu cho người dùng.
              </p>
            </div>
          )}

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
      </div>
    </div>
  );
};

export default UsersPage;

