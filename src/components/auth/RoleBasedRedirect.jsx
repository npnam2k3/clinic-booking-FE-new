import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import storage from "@/untils/storage";

const RoleBasedRedirect = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = storage.getToken();
    const tokenInfo = storage.getTokenInfo();

    // Chỉ kiểm tra khi đang ở trang root "/"
    if (token && tokenInfo && location.pathname === "/") {
      try {
        const userInfo =
          typeof tokenInfo === "string" ? JSON.parse(tokenInfo) : tokenInfo;
        const role = userInfo?.role?.role_name || null;

        // Nếu là ADMIN hoặc STAFF, redirect về /admin
        if (role === "ADMIN" || role === "STAFF") {
          navigate("/admin", { replace: true });
        }
      } catch (e) {
        console.error("Không thể đọc role từ token info:", e);
      }
    }
  }, [navigate, location.pathname]);

  return children;
};

export default RoleBasedRedirect;
