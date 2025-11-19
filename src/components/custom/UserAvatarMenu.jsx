import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ROUTE } from "@/constants/route-constant";
import { History, LogOut, UserRound } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { userAuthService } from "@/service/auth/userAuth.service";
import storage from "@/untils/storage";
import { useState, useEffect } from "react";

export function UserAvatarMenu() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isAdminOrStaff, setIsAdminOrStaff] = useState(false);

  useEffect(() => {
    const tokenInfo = storage.getTokenInfo();
    try {
      const infoRaw =
        typeof tokenInfo === "string" ? JSON.parse(tokenInfo) : tokenInfo;
      // support either shape: { data: { ...profile } } or direct profile object
      const profile = infoRaw?.data ?? infoRaw ?? null;
      setUserInfo(profile);
      const role = profile?.role?.role_name || null;
      setIsAdminOrStaff(role === "ADMIN" || role === "STAFF");
    } catch (e) {
      console.error("Không thể đọc token info:", e);
    }
  }, []);

  const handleLogout = () => {
    // Gọi service logout để xóa token và userId
    userAuthService.logout();

    // Chuyển về trang đăng nhập
    navigate(ROUTE.LOGIN);

    // Reload trang để cập nhật lại header
    window.location.reload();
  };

  const handleLogoutClick = () => {
    setShowLogoutDialog(true);
  };

  const confirmLogout = () => {
    setShowLogoutDialog(false);
    handleLogout();
  };
  console.log("123412312132123123312123123132123", userInfo);
  const cancelLogout = () => {
    setShowLogoutDialog(false);
  };
  return (
    <>
      <DropdownMenu>
        {/* click vào để mở menu */}
        <DropdownMenuTrigger asChild>
          <button className="rounded-full focus:outline-none">
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src="/avatar.jpg" alt="@username" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
          </button>
        </DropdownMenuTrigger>

        {/* Nội dung menu xổ ra */}
        <DropdownMenuContent
          className="w-48 bg-popover text-popover-foreground border border-border/50 rounded-md shadow-lg"
          align="end"
        >
          <DropdownMenuLabel>
            <span className="text-[20px]">Tài khoản</span>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />

          {/* Nếu là Admin/Staff - chỉ hiện thông tin và đăng xuất */}
          {isAdminOrStaff ? (
            <>
              <div className="px-2 py-2">
                <p className="text-sm font-medium">
                  {userInfo?.contact?.fullname || userInfo?.fullname || "Admin"}
                </p>
                <p className="text-xs text-gray-500">
                  {userInfo?.role?.role_name || "ADMIN"}
                </p>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogoutClick}
                className="text-red-500 focus:text-red-500"
              >
                <div className="flex gap-x-[8px] items-center cursor-pointer">
                  <LogOut />
                  <span>Đăng xuất</span>
                </div>
              </DropdownMenuItem>
            </>
          ) : (
            /* Nếu là User thường - hiện đầy đủ menu */
            <>
              <DropdownMenuItem onClick={() => navigate(ROUTE.PROFILE)}>
                <div className="flex gap-x-[8px] items-center cursor-pointer">
                  <UserRound />
                  <span>Xem hồ sơ</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate(ROUTE.HISTORY_BOOKING)}>
                <div className="flex gap-x-[8px] items-center cursor-pointer">
                  <History />
                  <span>Lịch sử đặt lịch</span>
                </div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogoutClick}
                className="text-red-500 focus:text-red-500"
              >
                <div className="flex gap-x-[8px] items-center cursor-pointer">
                  <LogOut />
                  <span>Đăng xuất</span>
                </div>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Dialog xác nhận đăng xuất */}
      <Dialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận đăng xuất</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn đăng xuất khỏi hệ thống?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={cancelLogout}>
              Hủy
            </Button>
            <Button variant="destructive" onClick={confirmLogout}>
              Đăng xuất
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
