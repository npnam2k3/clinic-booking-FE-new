import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asterisk } from "lucide-react";
import { Link } from "react-router-dom";

const ForgotPasswordPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen gap-x-[20px]">
      <div className="w-[600px]">
        <img
          src="/images/login-banner.png"
          alt="Ảnh banner login"
          className="max-w-full h-auto block rounded-[8px]"
        />
      </div>
      <form
        className="flex flex-col gap-4 px-[40px] py-[20px] bg-white rounded-lg 
        border-t border-t-gray-200
        shadow-xl w-full max-w-[450px]"
      >
        <h2 className="text-2xl font-semibold mt-[8px]">
          Nhập email để lấy lại mật khẩu
        </h2>

        {/* email */}
        <div className="mt-[2px]">
          <div className="mb-[12px] flex items-center gap-x-[2px]">
            <Label htmlFor="email">Email</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <Input type="email" id="email" className="mb-[4px]" />
        </div>

        <Button className="cursor-pointer">Gửi</Button>
        <div className="flex gap-x-[4px] items-center justify-center">
          <p>Quay lại trang</p>
          <Link to="/login" className="text-sky-600">
            đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default ForgotPasswordPage;
