import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asterisk } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { userAuthService } from "@/service/auth/userAuth.service";
import { message } from "antd";

const ForgotPasswordPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email
    if (!email) {
      messageApi.error("Vui lòng nhập email");
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      messageApi.error("Email không hợp lệ");
      return;
    }

    setLoading(true);

    try {
      const response = await userAuthService.forgotPassword(email);

      if (response.status || response.statusCode === 200) {
        messageApi.success(response.message || "Đã gửi email khôi phục mật khẩu. Vui lòng kiểm tra hộp thư của bạn!");
        setEmail(""); // Clear the input
      } else {
        messageApi.error(response.message || "Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Forgot password error:", error);
      messageApi.error(error.message || "Không thể gửi yêu cầu. Vui lòng thử lại!");
    } finally {
      setLoading(false);
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
          <Input
            type="email"
            id="email"
            className="mb-[4px]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="abc@gmail.com"
            disabled={loading}
          />
        </div>

        <Button
          type="submit"
          className="cursor-pointer"
          disabled={loading}
        >
          {loading ? "Đang gửi..." : "Gửi"}
        </Button>
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
