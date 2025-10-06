import { UserAvatarMenu } from "@/components/custom/UserAvatarMenu";
import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";

const Header = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div
      className="sticky top-0 z-50 flex justify-between items-center px-[40px] py-[20px]
       bg-white/90 backdrop-blur-sm
        transition-all duration-100"
    >
      {/* logo */}
      <div className="flex gap-x-2">
        <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white bg-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-hospital-icon lucide-hospital"
          >
            <path d="M12 7v4" />
            <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
            <path d="M14 9h-4" />
            <path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
            <path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" />
          </svg>
        </div>
        <div className="text-xl font-semibold">Booking care</div>
      </div>

      {/* menu */}
      <nav>
        <ul className="flex gap-x-5">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `px-[10px] cursor-pointer ${
                  isActive
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500 hover:text-gray-900"
                }`
              }
            >
              Trang chủ
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/chuyen-khoa"
              className={({ isActive }) =>
                `px-[10px] cursor-pointer ${
                  isActive
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500 hover:text-gray-900"
                }`
              }
            >
              Chuyên khoa
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/bac-si"
              className={({ isActive }) =>
                `px-[10px] cursor-pointer ${
                  isActive
                    ? "text-gray-900 font-semibold"
                    : "text-gray-500 hover:text-gray-900"
                }`
              }
            >
              Bác sĩ
            </NavLink>
          </li>
        </ul>
      </nav>

      {/* action */}
      {!isLogin && (
        <div className="flex gap-x-3">
          <Link
            to="/login"
            className="bg-white outline outline-gray-400 text-black px-[16px] py-[4px] rounded-lg cursor-pointer hover:bg-gray-950 hover:text-white transition duration-300 ease-in-out shadow-md"
          >
            Đăng nhập
          </Link>
          <Link
            to="/register"
            className="bg-white outline outline-gray-400 text-black px-[16px] py-[4px] rounded-lg cursor-pointer hover:bg-gray-950 hover:text-white transition duration-300 ease-in-out shadow-md"
          >
            Tạo tài khoản
          </Link>
        </div>
      )}

      {/* avatar after login */}
      {isLogin && <UserAvatarMenu />}
    </div>
  );
};

export default Header;
