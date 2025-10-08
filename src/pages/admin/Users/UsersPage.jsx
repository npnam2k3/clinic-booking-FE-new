import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import { mockUsers } from "@/data/mockData";
import UserTable from "@/pages/admin/Users/components/UserTable";
import EditUserModal from "@/pages/admin/Users/components/EditUserModal";
import AddStaffModal from "@/pages/admin/Users/components/AddStaffModal";

const UsersPage = () => {
  const [activeTab, setActiveTab] = useState("staff");
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);

  const filteredUsers = users.filter((u) =>
    activeTab === "customers"
      ? u.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        u.email?.toLowerCase().includes(searchTerm.toLowerCase())
      : u.role === "staff" || u.role === "admin"
  );

  const handleSaveEdit = (updatedUser) => {
    setUsers(users.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
    setIsEditOpen(false);
    setSelectedUser(null);
  };

  const handleAddStaff = (newStaff) => {
    setUsers([
      ...users,
      {
        ...newStaff,
        id: `USER${String(users.length + 1).padStart(3, "0")}`,
        role: "staff",
        status: "active",
        createdAt: new Date().toISOString().split("T")[0],
      },
    ]);
    setIsAddStaffOpen(false);
  };

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

          {/* TAB NHÂN VIÊN */}
          <TabsContent value="staff">
            <div className="flex justify-start mb-4">
              <Button
                onClick={() => setIsAddStaffOpen(true)}
                className={"cursor-pointer"}
              >
                <Plus className="mr-2 h-4 w-4" /> Thêm nhân viên
              </Button>
            </div>

            <UserTable
              data={filteredUsers.filter(
                (u) => u.role === "staff" || u.role === "admin"
              )}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsEditOpen(true);
              }}
              onDelete={(id) => setUsers(users.filter((u) => u.id !== id))}
            />
          </TabsContent>

          {/* TAB KHÁCH HÀNG */}
          <TabsContent value="customers">
            <div className="flex items-center justify-between mb-4">
              <div className="relative w-1/3">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm khách hàng..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <UserTable
              data={filteredUsers.filter((u) => u.role === "user")}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsEditOpen(true);
              }}
              onDelete={(id) => setUsers(users.filter((u) => u.id !== id))}
            />
          </TabsContent>
        </Tabs>

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
