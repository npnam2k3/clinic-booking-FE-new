import { useEffect, useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import UserTable from "@/pages/admin/Users/components/UserTable";
import EditUserModal from "@/pages/admin/Users/components/EditUserModal";
import AddStaffModal from "@/pages/admin/Users/components/AddStaffModal";
import { message } from "antd";
import { useSearchParams } from "react-router-dom";
import { UserService } from "@/service/user/user.service";
import { StaffService } from "@/service/staff/staff.service";

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [staffList, setStaffList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";
  const [searchInput, setSearchInput] = useState(initialKeyword);
  const [searchTerm, setSearchTerm] = useState(initialKeyword);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  // ===============================
  // TẢI DANH SÁCH NHÂN VIÊN
  // ===============================
  const fetchStaff = useCallback(async () => {
    try {
      setLoading(true);
      const data = await StaffService.getAll();
      setStaffList(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách nhân viên:", err);
      message.error("Không thể tải danh sách nhân viên!");
    } finally {
      setLoading(false);
    }
  }, []);

  // ===============================
  // TẢI DANH SÁCH KHÁCH HÀNG
  // ===============================
  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      const data = await UserService.getAll();
      setUserList(data.users);
    } catch (err) {
      console.error("Lỗi khi tải danh sách khách hàng:", err);
      message.error("Không thể tải danh sách khách hàng!");
    } finally {
      setLoading(false);
    }
  }, []);

  // ===============================
  // LOAD DỮ LIỆU KHI CHUYỂN TAB
  // ===============================
  useEffect(() => {
    if (activeTab === "staff") {
      fetchStaff();
    } else {
      fetchUsers();
    }
  }, [activeTab, fetchStaff, fetchUsers]);

  // ===============================
  // TÌM KIẾM
  // ===============================
  const handleSearch = () => {
    const keyword = searchInput.trim();
    setSearchTerm(keyword);
    if (keyword) setSearchParams({ keyword });
    else setSearchParams({});
  };

  // ===============================
  // LÀM MỚI DANH SÁCH
  // ===============================
  const handleReset = () => {
    setSearchInput("");
    setSearchTerm("");
    setSearchParams({});
    if (activeTab === "staff") fetchStaff();
    else fetchUsers();
  };

  // ===============================
  // LỌC DỮ LIỆU CLIENT-SIDE
  // ===============================
  const filteredStaff = staffList.filter((s) => {
    const kw = searchTerm.toLowerCase();
    return (
      s.email.toLowerCase().includes(kw) ||
      s.contact.fullname.toLowerCase().includes(kw) ||
      s.contact.phone_number.includes(kw)
    );
  });

  const filteredUsers = userList.filter((u) => {
    const kw = searchTerm.toLowerCase();
    return (
      u.email.toLowerCase().includes(kw) ||
      u.contact.fullname.toLowerCase().includes(kw) ||
      u.contact.phone_number.includes(kw)
    );
  });

  // ===============================
  // LƯU / THÊM / XÓA
  // ===============================
  const handleSaveEdit = async () => {
    if (activeTab === "staff") fetchStaff();
    else fetchUsers();
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const handleAddStaff = async () => {
    fetchStaff();
    setIsAddStaffOpen(false);
  };

  const handleDeleteStaff = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa nhân viên này?")) {
      try {
        await StaffService.delete(id);
        message.success("Đã xóa nhân viên thành công!");
        fetchStaff();
      } catch (err) {
        console.error("Lỗi khi xóa nhân viên:", err);
        message.error("Không thể xóa nhân viên, vui lòng thử lại!");
      }
    }
  };

  const handleDeleteUser = async (id) => {
    if (confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
      try {
        await UserService.delete(id);
        message.success("Đã xóa khách hàng thành công!");
        fetchUsers();
      } catch (err) {
        console.error("Lỗi khi xóa khách hàng:", err);
        message.error("Không thể xóa khách hàng, vui lòng thử lại!");
      }
    }
  };

  // ===============================
  // LOADING STATE
  // ===============================
  if (loading) {
    return (
      <div className="p-6 text-center text-gray-600">
        Đang tải dữ liệu người dùng...
      </div>
    );
  }

  // ===============================
  // JSX CHÍNH
  // ===============================
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Quản lý người dùng
        </h1>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="staff">Nhân viên</TabsTrigger>
            <TabsTrigger value="customers">Khách hàng</TabsTrigger>
          </TabsList>

          {/* ======================= TAB NHÂN VIÊN ======================= */}
          <TabsContent value="staff">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 w-1/2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm nhân viên..."
                    className="pl-10"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch}>Tìm kiếm</Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleReset}
                >
                  <RefreshCcw className="h-4 w-4" /> Làm mới
                </Button>
              </div>

              <Button onClick={() => setIsAddStaffOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Thêm nhân viên
              </Button>
            </div>

            <UserTable
              data={filteredStaff}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsEditOpen(true);
              }}
              onDelete={(userId) => handleDeleteStaff(userId)}
              onReload={fetchStaff} // reload sau khi lock/unlock
              showLock={true} // chỉ nhân viên mới có khoá/mở khoá
            />
          </TabsContent>

          {/* ======================= TAB KHÁCH HÀNG ======================= */}
          <TabsContent value="customers">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3 w-1/2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                  <Input
                    placeholder="Tìm kiếm khách hàng..."
                    className="pl-10"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  />
                </div>
                <Button onClick={handleSearch}>Tìm kiếm</Button>
                <Button
                  variant="outline"
                  className="flex items-center gap-2"
                  onClick={handleReset}
                >
                  <RefreshCcw className="h-4 w-4" /> Làm mới
                </Button>
              </div>
            </div>

            <UserTable
              data={filteredUsers}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsEditOpen(true);
              }}
              onDelete={(userId) => handleDeleteUser(userId)}
              showLock={false} // khách hàng KHÔNG có chức năng khóa/mở khóa
            />
          </TabsContent>
        </Tabs>

        {/* ======================= MODAL CHỈNH SỬA ======================= */}
        {isEditOpen && selectedUser && (
          <EditUserModal
            user={selectedUser}
            onClose={() => {
              setIsEditOpen(false);
              setSelectedUser(null);
            }}
            onSave={handleSaveEdit}
          />
        )}

        {/* ======================= MODAL THÊM NHÂN VIÊN ======================= */}
        {isAddStaffOpen && (
          <AddStaffModal
            onClose={() => setIsAddStaffOpen(false)}
            onSave={handleAddStaff}
          />
        )}
      </div>
    </div>
  );
};

export default UsersPage;
