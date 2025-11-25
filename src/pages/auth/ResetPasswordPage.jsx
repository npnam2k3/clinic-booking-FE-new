import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Asterisk, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userAuthService } from "@/service/auth/userAuth.service";
import { message } from "antd";

const ResetPasswordPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { token } = useParams(); // Lấy token từ URL
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    new_password: "",
    confirm_password: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate
    if (!formData.new_password) {
      messageApi.error("Vui lòng nhập mật khẩu mới");
      return;
    }

    if (!formData.confirm_password) {
      messageApi.error("Vui lòng nhập lại mật khẩu mới");
      return;
    }

    if (formData.new_password !== formData.confirm_password) {
      messageApi.error("Mật khẩu xác nhận không khớp");
      return;
    }

    if (!token) {
      messageApi.error("Token không hợp lệ");
      return;
    }

    setLoading(true);

    try {
      const response = await userAuthService.resetPassword(token, formData);

      if (response.status || response.statusCode === 200) {
        messageApi.success(response.message || "Đặt lại mật khẩu thành công!");

        // Delay để message hiển thị trước khi chuyển trang
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        messageApi.error(response.message || "Có lỗi xảy ra. Vui lòng thử lại!");
      }
    } catch (error) {
      console.error("Reset password error:", error);

      // Xử lý lỗi có detail array (validation errors)
      if (error?.detail && Array.isArray(error.detail) && error.detail.length > 0) {
        error.detail.forEach((err) => {
          messageApi.error(err.message || "Có lỗi xảy ra");
        });
      }
      // Xử lý lỗi có message đơn giản
      else if (error?.message) {
        messageApi.error(error.message);
      }
      // Fallback message
      else {
        messageApi.error("Không thể đặt lại mật khẩu. Vui lòng thử lại!");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 gap-x-[20px]">
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
        className="flex flex-col gap-4 px-[40px] py-[20px] bg-white rounded-lg shadow-md w-full max-w-[450px] max-h-[450px] h-[450px]"
      >
        <h2 className="text-2xl font-semibold mt-[12px]">
          Thiết lập mật khẩu mới
        </h2>

        {/* mật khẩu mới */}
        <div className="mt-[8px]">
          <div className="mb-[12px] flex items-center gap-x-[2px]">
            <Label htmlFor="new_password">Mật khẩu mới</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <div className="relative">
            <Input
              type={showPassword ? "text" : "password"}
              id="new_password"
              className="mb-[4px] pr-10"
              value={formData.new_password}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới"
              disabled={loading}
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
            <Label htmlFor="confirm_password">Nhập lại mật khẩu mới</Label>
            <Asterisk size={12} className="text-red-600" />
          </div>
          <div className="relative">
            <Input
              type={showConfirmPassword ? "text" : "password"}
              id="confirm_password"
              className="mb-[4px] pr-10"
              value={formData.confirm_password}
              onChange={handleChange}
              placeholder="Nhập lại mật khẩu mới"
              disabled={loading}
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

        <Button
          type="submit"
          className="cursor-pointer mt-[20px]"
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Xác nhận"}
        </Button>
      </form>
    </div>
  );
};

export default ResetPasswordPage;
