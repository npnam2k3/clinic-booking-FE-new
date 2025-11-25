import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asterisk, Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userAuthService } from "@/service/auth/userAuth.service";
import { registerValidate } from "@/untils/vaildate/register.validate";
import { message } from "antd";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullname: "",
    phone_number: "",
    address: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate đầu vào
    const errorMsg = registerValidate(formData);
    if (errorMsg) {
      setError(errorMsg);
      return;
    }

    try {
      setError("");
      const response = await userAuthService.register(formData);
      messageApi.success("Đăng ký thành công! Hãy đăng nhập.");

      // Delay để message hiển thị trước khi chuyển trang
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (err) {
      console.error("Register error:", err);

      // Xử lý lỗi có detail array (validation errors)
      if (err?.detail && Array.isArray(err.detail) && err.detail.length > 0) {
        // Hiển thị tất cả các lỗi validation
        err.detail.forEach((error) => {
          messageApi.error(error.message || "Có lỗi xảy ra");
        });
      }
      // Xử lý lỗi có message đơn giản (conflict, not found, etc.)
      else if (err?.message) {
        messageApi.error(err.message);
      }
      // Fallback message
      else {
        messageApi.error("Đăng ký thất bại, vui lòng thử lại.");
      }
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen gap-x-[20px]">
      {contextHolder}
      <div className="w-[600px]">
        <img
          src="/images/login-banner.png"
          alt="Ảnh banner login"
          className="max-w-full h-auto block rounded-[8px]"
        />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 px-[40px] py-[20px] bg-white rounded-lg 
        border-t border-t-gray-200 shadow-xl w-full max-w-[450px]"
      >
        <h2 className="text-2xl font-semibold mt-[8px]">Đăng ký tài khoản</h2>

        {/* Email */}
        <div>
          <div className="mb-[8px] flex items-center gap-x-[4px]">
            <Label htmlFor="email">Email</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <Input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Nhập email"
          />
        </div>

        {/* Mật khẩu */}
        <div>
          <div className="mb-[8px] flex items-center gap-x-[4px]">
            <Label htmlFor="password">Mật khẩu</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu"
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800"
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {/* Họ tên */}
        <div>
          <div className="mb-[8px] flex items-center gap-x-[4px]">
            <Label htmlFor="fullname">Họ tên</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <Input
            id="fullname"
            value={formData.fullname}
            onChange={handleChange}
            placeholder="Nhập họ tên"
          />
        </div>

        {/* Số điện thoại */}
        <div>
          <div className="mb-[8px] flex items-center gap-x-[4px]">
            <Label htmlFor="phone_number">Số điện thoại</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <Input
            id="phone_number"
            value={formData.phone_number}
            onChange={handleChange}
            placeholder="Nhập số điện thoại"
          />
        </div>

        {/* Địa chỉ */}
        <div>
          <Label htmlFor="address">Địa chỉ</Label>
          <Input
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Nhập địa chỉ (tuỳ chọn)"
          />
        </div>

        {/* Hiển thị lỗi */}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <Button type="submit" className="cursor-pointer mt-2">
          Đăng ký
        </Button>

        <div className="flex gap-x-[4px] items-center justify-center mt-2">
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
