import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asterisk, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const [isNull, setIsNull] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsNull(true);
  };
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
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-2xl font-semibold mt-[8px]">Đăng ký tài khoản</h2>

        {/* email */}
        <div className="mt-[2px]">
          <div className="mb-[12px] flex items-center gap-x-[2px]">
            <Label htmlFor="email">Email</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <Input type="email" id="email" className="mb-[4px]" />
          {isNull && <p>Email trống</p>}
        </div>

        {/* password */}
        <div className="mt-[2px]">
          <div className="mb-[12px] flex items-center gap-x-[2px]">
            <Label htmlFor="password">Mật khẩu</Label>
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
          {isNull && <p>Email trống</p>}
        </div>

        {/* fullname */}
        <div className="mt-[2px]">
          <div className="mb-[12px] flex items-center gap-x-[2px]">
            <Label htmlFor="fullname">Họ tên</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <Input type="fullname" id="fullname" className="mb-[4px]" />
          {isNull && <p>Email trống</p>}
        </div>

        {/* phone number */}
        <div className="mt-[2px]">
          <div className="mb-[12px] flex items-center gap-x-[2px]">
            <Label htmlFor="phone_number">Số điện thoại</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <Input type="phone_number" id="phone_number" className="mb-[4px]" />
          {isNull && <p>Email trống</p>}
        </div>

        {/* address */}
        <div className="mt-[2px]">
          <Label htmlFor="address" className="mb-[12px]">
            Địa chỉ
          </Label>
          <Input type="address" id="address" className="mb-[4px]" />
        </div>

        <Button className="cursor-pointer">Đăng ký</Button>
        <div className="flex gap-x-[4px] items-center justify-center">
          <p>Đã có tài khoản?</p>
          <Link to="/login" className="text-sky-600">
            Đăng nhập
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
