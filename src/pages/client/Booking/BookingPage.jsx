import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { SuccessDialog } from "@/components/custom/SuccessModal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Asterisk,
  Calendar,
  CircleAlert,
  Clock,
  MoveLeft,
  User,
} from "lucide-react";
import dayjs from "dayjs";
import clsx from "clsx";
import { message } from "antd";
import { AppointmentService } from "@/service/appointment/appointment.service";

const BookingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // form state
  const [form, setForm] = useState({
    full_name: "",
    date_of_birth: "",
    gender: "",
    email: "",
    address: "",
    note: "",
    contact_name: "",
    contact_phone: "",
  });

  const [errors, setErrors] = useState({});

  const { doctor, selectedDate, selectedSlot } = location.state || {};

  if (!doctor || !selectedSlot) {
    return (
      <div className="text-center mt-[80px] text-gray-500">
        Không tìm thấy thông tin lịch khám.
        <Button className="mt-4" variant="outline" onClick={() => navigate(-1)}>
          <MoveLeft size={16} className="mr-1" /> Quay lại
        </Button>
      </div>
    );
  }

  // cập nhật form
  const handleChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  // validate form
  const validateForm = () => {
    const newErrors = {};
    if (!form.full_name) newErrors.full_name = "Vui lòng nhập họ và tên";
    if (!form.date_of_birth)
      newErrors.date_of_birth = "Vui lòng chọn ngày sinh";
    if (!form.gender) newErrors.gender = "Vui lòng chọn giới tính";
    if (!form.email) newErrors.email = "Vui lòng nhập email";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Email không hợp lệ";
    if (!form.address) newErrors.address = "Vui lòng nhập địa chỉ";
    if (!form.contact_name)
      newErrors.contact_name = "Vui lòng nhập họ tên người liên hệ";
    if (!form.contact_phone)
      newErrors.contact_phone = "Vui lòng nhập số điện thoại";
    else if (!/^[0-9]{9,11}$/.test(form.contact_phone))
      newErrors.contact_phone = "Số điện thoại không hợp lệ (9–11 số)";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      const payload = {
        slot_id: Number(selectedSlot.slot_id),
        fullname_contact: form.contact_name,
        phone_number: form.contact_phone,
        fullname: form.full_name,
        date_of_birth: dayjs(form.date_of_birth).format("DD/MM/YYYY"),
        gender: form.gender,
        email: form.email,
        address: form.address,
        note: form.note || "",
      };

      console.log("📤 Sending appointment:", payload);

      const res = await AppointmentService.create(payload);
      console.log("✅ Appointment created:", res);

      // ✅ Kiểm tra phản hồi backend
      if (res?.status === true || res?.data) {
        messageApi.success("Đặt lịch thành công!");
        setIsOpenSuccessModal(true);
      } else {
        // lấy message cụ thể từ backend
        const backendMsg =
          res?.message ||
          res?.detail?.[0]?.message ||
          "Đặt lịch thất bại! Vui lòng thử lại.";
        messageApi.error(backendMsg);
      }
    } catch (err) {
      console.error("❌ Lỗi tạo appointment:", err);

      // ✅ Bắt lỗi từ backend trả về
      const backendMsg =
        err?.response?.data?.detail?.[0]?.message ||
        err?.response?.data?.message ||
        "Không thể tạo lịch khám. Vui lòng thử lại!";
      messageApi.error(backendMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {contextHolder}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <Button
          variant="outline"
          className="bg-white text-gray-900 cursor-pointer hover:bg-gray-50 shadow-sm"
          onClick={() => navigate(-1)}
        >
          <MoveLeft className="mr-2" />
          <span>Quay lại</span>
        </Button>

        <div className="flex gap-8 mt-6">
          {/* LEFT FORM */}
          <div className="flex-1 bg-white border border-gray-200 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
              <div className="bg-blue-100 p-2 rounded-lg">
                <User size={24} className="text-blue-600" />
              </div>
              <span className="text-xl font-bold text-gray-800">
                Thông tin bệnh nhân
              </span>
            </div>

            {/* FORM BODY */}
            <div>
              <h2 className="text-lg font-semibold mb-5 text-gray-700 flex items-center gap-2">
                <div className="w-1 h-5 bg-blue-500 rounded"></div>
                Thông tin cá nhân
              </h2>

              {/* Họ tên */}
              <div className="mb-5">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Họ và tên{" "}
                  <Asterisk size={10} className="inline text-red-600 ml-1" />
                </Label>
                <Input
                  value={form.full_name}
                  placeholder="VD: Nguyễn Văn A"
                  onChange={(e) => handleChange("full_name", e.target.value)}
                  className={clsx(
                    "h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
                    errors.full_name &&
                      "border-red-500 focus:border-red-500 focus:ring-red-200"
                  )}
                />
                {errors.full_name && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <CircleAlert size={12} /> {errors.full_name}
                  </p>
                )}
              </div>

              {/* Ngày sinh + giới tính */}
              <div className="grid grid-cols-2 gap-5 mb-5">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Ngày sinh{" "}
                    <Asterisk size={10} className="inline text-red-600 ml-1" />
                  </Label>
                  <Input
                    type="date"
                    value={form.date_of_birth}
                    onChange={(e) =>
                      handleChange("date_of_birth", e.target.value)
                    }
                    className={clsx(
                      "h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
                      errors.date_of_birth &&
                        "border-red-500 focus:border-red-500 focus:ring-red-200"
                    )}
                  />
                  {errors.date_of_birth && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <CircleAlert size={12} /> {errors.date_of_birth}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Giới tính{" "}
                    <Asterisk size={10} className="inline text-red-600 ml-1" />
                  </Label>
                  <Select
                    value={form.gender}
                    onValueChange={(val) => handleChange("gender", val)}
                  >
                    <SelectTrigger
                      className={clsx(
                        "h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
                        errors.gender &&
                          "border-red-500 focus:border-red-500 focus:ring-red-200"
                      )}
                    >
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="male">Nam</SelectItem>
                        <SelectItem value="female">Nữ</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {errors.gender && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <CircleAlert size={12} /> {errors.gender}
                    </p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Email{" "}
                  <Asterisk size={10} className="inline text-red-600 ml-1" />
                </Label>
                <Input
                  type="email"
                  value={form.email}
                  placeholder="VD: example@gmail.com"
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={clsx(
                    "h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
                    errors.email &&
                      "border-red-500 focus:border-red-500 focus:ring-red-200"
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <CircleAlert size={12} /> {errors.email}
                  </p>
                )}
              </div>

              {/* Địa chỉ */}
              <div className="mb-5">
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Địa chỉ{" "}
                  <Asterisk size={10} className="inline text-red-600 ml-1" />
                </Label>
                <Input
                  placeholder="VD: 123 Nguyễn Văn Cừ, Quận 5, TP.HCM"
                  value={form.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  className={clsx(
                    "h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
                    errors.address &&
                      "border-red-500 focus:border-red-500 focus:ring-red-200"
                  )}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                    <CircleAlert size={12} /> {errors.address}
                  </p>
                )}
              </div>

              {/* Ghi chú */}
              <div>
                <Label className="text-sm font-medium text-gray-700 mb-2 block">
                  Ghi chú thêm{" "}
                  <span className="text-gray-400 font-normal">
                    (không bắt buộc)
                  </span>
                </Label>
                <Textarea
                  rows={4}
                  placeholder="Nhập thông tin bổ sung, triệu chứng, lịch sử bệnh..."
                  value={form.note}
                  onChange={(e) => handleChange("note", e.target.value)}
                  className="border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all resize-none"
                />
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <h2 className="text-lg font-semibold mb-5 text-gray-700 flex items-center gap-2">
                <div className="w-1 h-5 bg-orange-500 rounded"></div>
                Liên hệ khẩn cấp
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Họ và tên người liên hệ{" "}
                    <Asterisk size={10} className="inline text-red-600 ml-1" />
                  </Label>
                  <Input
                    placeholder="VD: Nguyễn Thị B"
                    value={form.contact_name}
                    onChange={(e) =>
                      handleChange("contact_name", e.target.value)
                    }
                    className={clsx(
                      "h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
                      errors.contact_name &&
                        "border-red-500 focus:border-red-500 focus:ring-red-200"
                    )}
                  />
                  {errors.contact_name && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <CircleAlert size={12} /> {errors.contact_name}
                    </p>
                  )}
                </div>

                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Số điện thoại{" "}
                    <Asterisk size={10} className="inline text-red-600 ml-1" />
                  </Label>
                  <Input
                    placeholder="VD: 0901234567"
                    value={form.contact_phone}
                    maxLength={11}
                    onChange={(e) =>
                      handleChange("contact_phone", e.target.value)
                    }
                    className={clsx(
                      "h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all",
                      errors.contact_phone &&
                        "border-red-500 focus:border-red-500 focus:ring-red-200"
                    )}
                  />
                  {errors.contact_phone && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1">
                      <CircleAlert size={12} /> {errors.contact_phone}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="mt-8 pt-6 border-t border-gray-100">
              <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 mb-5">
                <p className="text-blue-800 text-sm flex items-start gap-2">
                  <CircleAlert size={16} className="mt-0.5 flex-shrink-0" />
                  <span>
                    Vui lòng kiểm tra kỹ thông tin trước khi xác nhận. Các
                    trường đánh dấu{" "}
                    <span className="text-red-600 font-semibold">(*)</span> là
                    bắt buộc.
                  </span>
                </p>
              </div>
              <Button
                onClick={handleSubmit}
                disabled={loading}
                className={`w-full h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                }`}
              >
                <Calendar size={20} className="mr-2" />
                <span>
                  {loading ? "Đang xử lý..." : "Xác nhận đặt lịch khám"}
                </span>
              </Button>
            </div>
          </div>

          {/* RIGHT INFO */}
          <div className="w-[420px] space-y-6">
            {/* Doctor Info */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-bold mb-5 text-gray-800 flex items-center gap-2">
                <User size={20} className="text-blue-600" />
                Thông tin bác sĩ
              </h3>
              <div className="flex gap-4">
                <img
                  src={
                    doctor.avatar_url ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={doctor.fullname}
                  className="w-20 h-20 object-cover rounded-xl shadow-md border-2 border-blue-100"
                />
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 text-base mb-1">
                    {doctor.fullname}
                  </h4>
                  <p className="text-gray-600 text-sm mb-2">
                    {doctor.position}
                  </p>
                  <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none">
                    {doctor.specialty?.specialization_name}
                  </Badge>
                </div>
              </div>
            </div>

            {/* Slot Info */}
            <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <h3 className="text-lg font-bold mb-5 text-gray-800 flex items-center gap-2">
                <Calendar size={20} className="text-green-600" />
                Chi tiết lịch khám
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-green-600" />
                    <span className="text-gray-600 text-sm font-medium">
                      Ngày khám
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {dayjs(selectedDate).format("DD/MM/YYYY")}
                  </span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-orange-600" />
                    <span className="text-gray-600 text-sm font-medium">
                      Giờ khám
                    </span>
                  </div>
                  <span className="font-bold text-gray-900">
                    {selectedSlot.start_at} - {selectedSlot.end_at}
                  </span>
                </div>
              </div>
            </div>

            {/* Important note */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 p-6 rounded-2xl shadow-lg">
              <div className="flex items-center gap-2 font-bold text-orange-700 mb-4">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <CircleAlert size={20} className="text-orange-600" />
                </div>
                <h3 className="text-base">Lưu ý quan trọng</h3>
              </div>
              <ul className="space-y-3 text-gray-700 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Vui lòng có mặt <strong>trước 15 phút</strong> so với giờ
                    hẹn
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Mang theo <strong>CMND/CCCD</strong> và giấy tờ y tế liên
                    quan
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 bg-orange-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>
                    Liên hệ hotline{" "}
                    <strong className="text-orange-700">1900 1234</strong> nếu
                    cần hỗ trợ
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <SuccessDialog
        open={isOpenSuccessModal}
        onOpenChange={setIsOpenSuccessModal}
      />
    </div>
  );
};

export default BookingPage;
