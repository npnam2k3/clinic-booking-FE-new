import Footer from "@/components/common/Footer";
import Header from "@/components/common/Header";
import ScrollToTop from "@/components/custom/ScrollToTop";
import { Outlet } from "react-router-dom";

const ClientLayout = () => {
  return (
    <>
      <ScrollToTop />
      <Header />
      <Outlet />
      {/* <div className="max-w-7xl m-auto"></div> */}
      <Footer />
    </>
  );
};

export default ClientLayout;
