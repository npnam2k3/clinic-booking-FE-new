import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 gap-x-[20px]">
      <div className="w-[600px]">
        <img
          src="/images/login-banner.png"
          alt="Ảnh banner login"
          className="max-w-full h-auto block rounded-[8px]"
        />
      </div>
      <form
        className="flex flex-col gap-4 px-[40px] py-[20px] bg-white rounded-lg shadow-md w-full max-w-[450px] max-h-[450px] h-[450px]"
        onSubmit={(e) => handleSubmit(e)}
      >
        <h2 className="text-2xl font-semibold mt-[12px]">Đăng nhập</h2>
        <div className="mt-[8px]">
          <Label htmlFor="email" className="mb-[12px]">
            Email
          </Label>
          <Input type="email" id="email" className="mb-[4px]" />
        </div>
        <div className="mt-[8px]">
          <Label htmlFor="password" className="mb-[12px]">
            Mật khẩu
          </Label>
          <Input type="password" id="password" className="mb-[4px]" />
        </div>
        <div>
          <Link to="/forgot-password" className="text-sky-600 mb-[8px]">
            Quên mật khẩu?
          </Link>
        </div>
        <Button className="cursor-pointer">Đăng nhập</Button>
        <div className="flex gap-x-[4px] items-center justify-center">
          <p>Chưa có tài khoản?</p>
          <Link to="/register" className="text-sky-600">
            Tạo tài khoản mới
          </Link>
        </div>
        <Link to="/" className="text-sky-600 text-center">
          Trang chủ
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
