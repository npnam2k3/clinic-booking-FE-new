import { Navigate } from "react-router-dom";
import storage from "@/untils/storage";
import { ROUTE } from "@/constants/route-constant";

const AdminProtectedRoute = ({ children }) => {
  const token = storage.getToken();
  const tokenInfo = storage.getTokenInfo();

  // Kiểm tra đăng nhập
  if (!token) {
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  // Kiểm tra quyền admin/staff
  try {
    const userInfo =
      typeof tokenInfo === "string" ? JSON.parse(tokenInfo) : tokenInfo;
    const role = userInfo?.role?.role_name || null;

    // Chỉ cho phép ADMIN và STAFF truy cập
    if (role !== "ADMIN" && role !== "STAFF") {
      return <Navigate to={ROUTE.HOME} replace />;
    }
  } catch (e) {
    console.error("Không thể đọc role từ token info:", e);
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return children;
};

export default AdminProtectedRoute;
