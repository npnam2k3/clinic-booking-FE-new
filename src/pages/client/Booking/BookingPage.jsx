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
    if (!form.date_of_birth) newErrors.date_of_birth = "Vui lòng chọn ngày sinh";
    if (!form.gender) newErrors.gender = "Vui lòng chọn giới tính";
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
    <div className="px-[30px] mb-[60px]">
    {contextHolder}
      <Button
        variant="outline"
        className="bg-white text-gray-900 cursor-pointer mt-[32px]"
        onClick={() => navigate(-1)}
      >
        <MoveLeft />
        <span>Quay lại</span>
      </Button>

      <div className="flex gap-x-[40px]">
        {/* LEFT FORM */}
        <div className="border border-gray-200 p-[20px] rounded-[12px] mt-[20px] shadow w-[960px]">
          <div className="font-semibold flex items-center gap-x-[12px]">
            <User size={20} />
            <span>Thông tin bệnh nhân</span>
          </div>

          {/* FORM BODY */}
          <div className="mt-[20px]">
            <h1 className="text-xl font-semibold mb-[20px]">Thông tin cá nhân</h1>

            {/* Họ tên */}
            <div className="mb-[16px]">
              <Label>
                Họ và tên <Asterisk size={10} className="inline text-red-600" />
              </Label>
              <Input
                value={form.full_name}
                placeholder="Nhập họ và tên"
                onChange={(e) => handleChange("full_name", e.target.value)}
                className={clsx(errors.full_name && "border-red-500")}
              />
              {errors.full_name && (
                <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
              )}
            </div>

            {/* Ngày sinh + giới tính */}
            <div className="flex gap-x-[20px]">
              <div className="w-[50%]">
                <Label>
                  Ngày sinh <Asterisk size={10} className="inline text-red-600" />
                </Label>
                <Input
                  type="date"
                  value={form.date_of_birth}
                  onChange={(e) => handleChange("date_of_birth", e.target.value)}
                  className={clsx(errors.date_of_birth && "border-red-500")}
                />
                {errors.date_of_birth && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.date_of_birth}
                  </p>
                )}
              </div>

              <div className="w-[50%]">
                <Label>
                  Giới tính <Asterisk size={10} className="inline text-red-600" />
                </Label>
                <Select
                  value={form.gender}
                  onValueChange={(val) => handleChange("gender", val)}
                >
                  <SelectTrigger
                    className={clsx(errors.gender && "border-red-500")}
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
                  <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                )}
              </div>
            </div>

            {/* Địa chỉ */}
            <div className="mt-[20px]">
              <Label>
                Địa chỉ <Asterisk size={10} className="inline text-red-600" />
              </Label>
              <Input
                placeholder="Nhập địa chỉ"
                value={form.address}
                onChange={(e) => handleChange("address", e.target.value)}
                className={clsx(errors.address && "border-red-500")}
              />
              {errors.address && (
                <p className="text-red-500 text-sm mt-1">{errors.address}</p>
              )}
            </div>

            {/* Ghi chú */}
            <div className="mt-[20px]">
              <Label>Ghi chú thêm</Label>
              <Textarea
                rows={4}
                placeholder="Ghi chú"
                value={form.note}
                onChange={(e) => handleChange("note", e.target.value)}
              />
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="mt-[20px]">
            <h1 className="text-xl font-semibold mb-[20px]">Liên hệ khẩn cấp</h1>
            <div className="flex gap-x-[16px]">
              <div className="w-[50%]">
                <Label>
                  Họ và tên người liên hệ{" "}
                  <Asterisk size={10} className="inline text-red-600" />
                </Label>
                <Input
                  placeholder="Nhập họ và tên"
                  value={form.contact_name}
                  onChange={(e) => handleChange("contact_name", e.target.value)}
                  className={clsx(errors.contact_name && "border-red-500")}
                />
                {errors.contact_name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact_name}
                  </p>
                )}
              </div>

              <div className="w-[50%]">
                <Label>
                  Số điện thoại{" "}
                  <Asterisk size={10} className="inline text-red-600" />
                </Label>
                <Input
                  placeholder="Nhập số điện thoại"
                  value={form.contact_phone}
                  maxLength={11}
                  onChange={(e) => handleChange("contact_phone", e.target.value)}
                  className={clsx(errors.contact_phone && "border-red-500")}
                />
                {errors.contact_phone && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.contact_phone}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit */}
          <div className="mt-[30px]">
            <p className="mb-[16px] text-red-600 text-sm">
              Điền đầy đủ các ô có dấu (*) trước khi xác nhận
            </p>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full flex items-center justify-center gap-x-[12px] py-[12px] rounded-[12px] 
                ${
                  loading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gray-800 hover:bg-gray-600 text-white"
                }`}
            >
              <Calendar size={18} />
              <span>{loading ? "Đang xử lý..." : "Xác nhận đặt lịch"}</span>
            </button>
          </div>
        </div>

        {/* RIGHT INFO */}
        <div className="mt-[20px] w-[480px]">
          {/* Doctor Info */}
          <div className="border border-gray-200 p-[20px] rounded-[12px] shadow">
            <h1 className="text-xl font-semibold mb-[20px]">Thông tin bác sĩ</h1>
            <div className="flex gap-x-[24px]">
              <img
                src={
                  doctor.avatar_url ||
                  "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                }
                alt=""
                className="w-[80px] h-[80px] object-cover rounded-[8px]"
              />
              <div>
                <h2 className="font-semibold">{doctor.fullname}</h2>
                <p className="text-gray-500 mb-[4px]">{doctor.position}</p>
                <Badge className="bg-gray-200 text-gray-800">
                  {doctor.specialty?.specialization_name}
                </Badge>
              </div>
            </div>
          </div>

          {/* Slot Info */}
          <div className="border border-gray-200 p-[20px] rounded-[12px] shadow mt-[24px]">
            <h1 className="text-xl font-semibold mb-[20px]">Chi tiết lịch khám</h1>
            <div className="flex justify-between">
              <p className="text-gray-600">Ngày khám</p>
              <p className="font-semibold">
                {dayjs(selectedDate).format("DD/MM/YYYY")}
              </p>
            </div>
            <div className="flex justify-between mt-[20px]">
              <p className="text-gray-600">Giờ khám</p>
              <p className="font-semibold">
                {selectedSlot.start_at} - {selectedSlot.end_at}
              </p>
            </div>
          </div>

          {/* Important note */}
          <div className="border border-gray-200 p-[20px] rounded-[12px] shadow mt-[24px]">
            <div className="flex items-center gap-x-[8px] font-semibold text-orange-600 mb-[20px]">
              <CircleAlert size={18} />
              <h2>Lưu ý quan trọng</h2>
            </div>
            <ul className="list-disc ml-[20px] text-gray-600 space-y-1">
              <li>Vui lòng có mặt trước 15 phút so với giờ hẹn.</li>
              <li>Mang theo CMND/CCCD và giấy tờ y tế liên quan.</li>
              <li>Liên hệ hotline 1900 1234 nếu cần hỗ trợ.</li>
            </ul>
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
