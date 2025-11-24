import { useEffect, useState, useCallback } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
  const [messageApi, contextHolder] = message.useMessage();
  const [searchParams, setSearchParams] = useSearchParams();
  const initialKeyword = searchParams.get("keyword") || "";
  const [searchInput, setSearchInput] = useState(initialKeyword);
  const [searchTerm, setSearchTerm] = useState(initialKeyword);

  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  // Dialog xác nhận xóa
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);

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
      messageApi.error("Tải danh sách nhân viên thất bại!");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  // ===============================
  // TẢI DANH SÁCH KHÁCH HÀNG
  // ===============================
  const fetchUsers = useCallback(async (searchParams = {}) => {
    try {
      setLoading(true);
      const data = await UserService.getAll(searchParams);
      setUserList(data.users);
    } catch (err) {
      console.error("Lỗi khi tải danh sách khách hàng:", err);
      messageApi.error("Tải danh sách khách hàng thất bại!");
    } finally {
      setLoading(false);
    }
  }, [messageApi]);

  // ===============================
  // LOAD DỮ LIỆU KHI CHUYỂN TAB
  // ===============================
  useEffect(() => {
    if (activeTab === "staff") {
      fetchStaff();
    } else {
      fetchUsers({ keyword: searchTerm });
    }
  }, [activeTab, searchTerm, fetchStaff, fetchUsers]);

  // ===============================
  // SEARCH HANDLERS
  // ===============================
  const handleSearch = () => {
    setSearchTerm(searchInput);
    setSearchParams(searchInput ? { keyword: searchInput } : {});
  };

  const handleReset = () => {
    setSearchInput("");
    setSearchTerm("");
    setSearchParams({});
  };

  // ===============================
  // EVENT HANDLERS
  // ===============================
  const handleSaveEdit = async (updatedData) => {
    // If modal provided updated data, use it to update state (avoid re-fetch that may clear messages)
    const { data: list, message: successMessage } =
      updatedData &&
        typeof updatedData === "object" &&
        !(updatedData instanceof Array)
        ? {
          data: updatedData.data || updatedData,
          message: updatedData.message,
        }
        : { data: updatedData, message: undefined };

    if (list) {
      if (activeTab === "staff") setStaffList(list);
      else setUserList(list);
    } else {
      if (activeTab === "staff") fetchStaff();
      else fetchUsers();
    }

    if (successMessage) messageApi.success(successMessage);

    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const handleAddStaff = async (updatedData) => {
    const { data: list, message: successMessage } =
      updatedData &&
        typeof updatedData === "object" &&
        !(updatedData instanceof Array)
        ? {
          data: updatedData.data || updatedData,
          message: updatedData.message,
        }
        : { data: updatedData, message: undefined };

    if (list) setStaffList(list);
    else await fetchStaff();

    if (successMessage) messageApi.success(successMessage);

    setIsAddStaffOpen(false);
  };

  const handleDeleteStaff = async (id) => {
    setDeleteTarget({ id, type: "staff" });
    setShowDeleteDialog(true);
  };

  const handleDeleteUser = async (id) => {
    setDeleteTarget({ id, type: "user" });
    setShowDeleteDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteTarget) return;

    try {
      if (deleteTarget.type === "staff") {
        await StaffService.delete(deleteTarget.id);
        messageApi.success("Xóa nhân viên thành công!");
        fetchStaff();
      } else {
        await UserService.delete(deleteTarget.id);
        messageApi.success("Xóa khách hàng thành công!");
        fetchUsers();
      }
    } catch (err) {
      console.error("Lỗi khi xóa:", err);
      messageApi.error(
        `Xóa ${deleteTarget.type === "staff" ? "nhân viên" : "khách hàng"
        } thất bại. Vui lòng thử lại!`
      );
    } finally {
      setShowDeleteDialog(false);
      setDeleteTarget(null);
    }
  };

  const cancelDelete = () => {
    setShowDeleteDialog(false);
    setDeleteTarget(null);
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
      {contextHolder}
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
            <div className="flex items-center justify-end mb-4">
              <Button onClick={() => setIsAddStaffOpen(true)}>
                <Plus className="mr-2 h-4 w-4" /> Thêm nhân viên
              </Button>
            </div>

            <UserTable
              data={staffList}
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
              data={userList}
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

        {/* ======================= DIALOG XÁC NHẬN XÓA ======================= */}
        <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Xác nhận xóa</DialogTitle>
              <DialogDescription>
                Bạn có chắc chắn muốn xóa{" "}
                {deleteTarget?.type === "staff" ? "nhân viên" : "khách hàng"}{" "}
                này không? Hành động này không thể hoàn tác.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button variant="outline" onClick={cancelDelete}>
                Hủy
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Xóa
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default UsersPage;
