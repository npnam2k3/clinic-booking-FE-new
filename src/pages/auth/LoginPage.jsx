import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userAuthService } from "@/service/auth/userAuth.service";
import { loginValidate } from "@/untils/vaildate/login.validate";
import { message } from "antd";
import storage from "@/untils/storage";

const LoginPage = () => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Xử lý khi người dùng nhập
  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  // Xử lý khi submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate trước khi gọi API
    const validationErrors = loginValidate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) return;

    try {
      setLoading(true);
      const res = await userAuthService.login(values);
      if (res.status) {
        if(res.data.role.role_name === "ADMIN" || res.data.role.role_name === "STAFF"){
            messageApi.success(res.message || "Đăng nhập thành công!");
            navigate("/admin");
        }else{      
          messageApi.success(res.message || "Đăng nhập thành công!");
          navigate("/");
        }
      } else {
        messageApi.error(res.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Login error:", error);
      messageApi.error(error.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 gap-x-[20px]">
      {contextHolder}
      {/* Banner bên trái */}
      <div className="w-[600px] hidden md:block">
        <img
          src="/images/login-banner.png"
          alt="Ảnh banner login"
          className="max-w-full h-auto block rounded-[8px]"
        />
      </div>

      {/* Form login */}
      <form
        className="flex flex-col gap-4 px-[40px] py-[20px] bg-white rounded-lg shadow-md w-full max-w-[450px]"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-semibold mt-[12px] text-center">
          Đăng nhập
        </h2>

        {/* Email */}
        <div>
          <Label htmlFor="email" className="mb-[12px]">
            Email
          </Label>
          <Input
            type="email"
            id="email"
            placeholder="Nhập email..."
            value={values.email}
            onChange={handleChange}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <Label htmlFor="password" className="mb-[12px]">
            Mật khẩu
          </Label>
          <Input
            type="password"
            id="password"
            placeholder="Nhập mật khẩu..."
            value={values.password}
            onChange={handleChange}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Quên mật khẩu */}
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sky-600 text-sm">
            Quên mật khẩu?
          </Link>
        </div>

        {/* Nút đăng nhập */}
        <Button
          type="submit"
          className="cursor-pointer mt-2"
          disabled={loading}
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </Button>

        {/* Liên kết đăng ký */}
        <div className="flex gap-x-[4px] items-center justify-center mt-2">
          <p>Chưa có tài khoản?</p>
          <Link to="/register" className="text-sky-600">
            Tạo tài khoản mới
          </Link>
        </div>

        <Link to="/" className="text-sky-600 text-center mt-2">
          Trang chủ
        </Link>
      </form>
    </div>
  );
};

export default LoginPage;
