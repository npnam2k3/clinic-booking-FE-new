import { Link, Outlet, useLocation } from "react-router-dom";
import { ROUTE } from "@/constants/route-constant";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  UserRound,
  Calendar,
  CalendarDays,
  CalendarClock,
  Shield,
} from "lucide-react";

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    {
      label: "Dashboard",
      href: ROUTE.ADMIN_DASHBOARD,
      icon: LayoutDashboard,
    },
    {
      label: "Bác sĩ",
      href: ROUTE.ADMIN_DOCTORS,
      icon: Users,
    },
    {
      label: "Chuyên khoa",
      href: ROUTE.ADMIN_SPECIALTIES,
      icon: Stethoscope,
    },
    {
      label: "Bệnh nhân",
      href: ROUTE.ADMIN_PATIENTS,
      icon: UserRound,
    },
    {
      label: "Lịch khám",
      href: ROUTE.ADMIN_APPOINTMENTS,
      icon: Calendar,
    },
    {
      label: "Lịch làm việc",
      href: ROUTE.ADMIN_WORK_SCHEDULES,
      icon: CalendarDays,
    },
    // {
    //   label: "Lịch đặc biệt",
    //   href: ROUTE.ADMIN_SPECIAL_SCHEDULES,
    //   icon: CalendarClock,
    // },
    {
      label: "Người dùng",
      href: ROUTE.ADMIN_USERS,
      icon: Shield,
    },
  ];

  const isActive = (href) => location.pathname === href;

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-64 flex-col border-r bg-white md:flex">
        {/* Sidebar Header */}
        <div className="flex flex-col gap-2 border-b p-4">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-600 text-white">
              <Stethoscope className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Bệnh viện</h2>
              <p className="text-xs text-gray-600">Quản trị hệ thống</p>
            </div>
          </div>
        </div>

        {/* Sidebar Content */}
        <div className="flex flex-1 flex-col gap-2 overflow-auto p-2">
          <div className="relative flex w-full flex-col">
            <div className="mb-2 px-2 text-xs font-medium text-gray-600">
              Quản lý
            </div>
            <nav className="flex w-full flex-col gap-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-2 rounded-md px-2 py-2 text-sm transition-colors ${
                      active
                        ? "bg-emerald-100 font-medium text-emerald-900"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col md:pl-64">
        <main className="flex-1 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
