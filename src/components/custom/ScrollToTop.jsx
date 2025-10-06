import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  // lắng nghe sự kiện thay đổi URL
  const { pathname } = useLocation();

  useEffect(() => {
    // đưa về đầu trang
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
