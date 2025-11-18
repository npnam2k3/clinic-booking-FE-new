import { Navigate } from "react-router-dom";
import storage from "@/untils/storage";
import { ROUTE } from "@/constants/route-constant";

const ProtectedRoute = ({ children }) => {
  const token = storage.getToken();

  if (!token) {
    // Chưa đăng nhập -> chuyển về trang login
    return <Navigate to={ROUTE.LOGIN} replace />;
  }

  return children;
};

export default ProtectedRoute;
