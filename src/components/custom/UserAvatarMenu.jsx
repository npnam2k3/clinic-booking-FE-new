import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ROUTE } from "@/constants/route-constant";
import { History, LogOut, UserRound } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function UserAvatarMenu() {
  const navigate = useNavigate();
  return (
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
          onClick={() => console.log("Đăng xuất")}
          className="text-red-500 focus:text-red-500"
        >
          <div className="flex gap-x-[8px] items-center cursor-pointer">
            <LogOut />
            <span>Đăng xuất</span>
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
