import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asterisk, Eye, EyeOff } from "lucide-react";
import { useState } from "react";

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 gap-x-[20px]">
      <div className="w-[600px]">
        <img
          src="/images/login-banner.png"
          alt="Ảnh banner login"
          className="max-w-full h-auto block rounded-[8px]"
        />
      </div>
      <form className="flex flex-col gap-4 px-[40px] py-[20px] bg-white rounded-lg shadow-md w-full max-w-[450px] max-h-[450px] h-[450px]">
        <h2 className="text-2xl font-semibold mt-[12px]">
          Thiết lập mật khẩu mới
        </h2>
        {/* mật khẩu mới */}
        <div className="mt-[8px]">
          <div className="mb-[12px] flex items-center gap-x-[2px]">
            <Label htmlFor="password">Mật khẩu mới</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              className="mb-[4px] pr-10"
            />

            {/* Nút icon ẩn/hiện */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* xác nhận mật khẩu mới */}
        <div className="mt-[8px]">
          <div className="mb-[12px] flex items-center gap-x-[2px]">
            <Label htmlFor="confirm-password">Nhập lại mật khẩu mới</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="password"
              className="mb-[4px] pr-10"
            />

            {/* Nút icon ẩn/hiện */}
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>
        <Button className="cursor-pointer mt-[20px]">Xác nhận</Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
