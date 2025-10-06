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
  Dot,
  MoveLeft,
  User,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const BookingPage = () => {
  const navigate = useNavigate();
  const handleClickComebackBtn = () => {
    navigate(-1);
  };
  const [isOpenSuccessModal, setIsOpenSuccessModal] = useState(false);
  // call api slot by id
  return (
    <div className="px-[30px] mb-[60px]">
      <Button
        variant="outline"
        className="bg-white text-gray-900 cursor-pointer mt-[32px]"
        onClick={handleClickComebackBtn}
      >
        <MoveLeft />
        <span>Quay lại</span>
      </Button>

      <div className="flex gap-x-[40px]">
        {/* left */}
        <div className="border border-gray-200 p-[20px] rounded-[12px] mt-[20px] shadow w-[960px] max-w-[960px]">
          <div className="font-semibold flex items-center gap-x-[12px]">
            <User size={20} />
            <span>Thông tin bệnh nhân</span>
          </div>

          <div className="mt-[20px]">
            <h1 className="text-xl font-semibold mb-[20px]">
              Thông tin cá nhân
            </h1>
            <div>
              <div className="flex items-center gap-x-[2px] mb-[8px]">
                <Label htmlFor="fullname">Họ và tên</Label>
                <Asterisk size={12} className="text-red-600" />
              </div>
              <Input
                type="text"
                id="fullname"
                className="mb-[4px]"
                placeholder="Nhập họ và tên"
              />
            </div>

            <div className="flex items-center gap-x-[20px] mt-[20px]">
              <div className="w-[50%]">
                <div className="flex items-center gap-x-[2px] mb-[8px]">
                  <Label>Ngày sinh</Label>
                  <Asterisk size={12} className="text-red-600" />
                </div>
                <Input type="date" className="mb-[4px]" />
              </div>

              <div className="w-[50%]">
                <div className="flex items-center gap-x-[2px] mb-[8px]">
                  <Label>Giới tính</Label>
                  <Asterisk size={12} className="text-red-600" />
                </div>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Chọn giới tính" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="male">Nam</SelectItem>
                      <SelectItem value="female">Nữ</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="mt-[20px]">
              <div className="flex items-center gap-x-[2px] mb-[8px]">
                <Label>Địa chỉ</Label>
                <Asterisk size={12} className="text-red-600" />
              </div>
              <Input
                type="text"
                className="mb-[4px]"
                placeholder="Nhập địa chỉ"
              />
            </div>

            <div className="mt-[20px]">
              <div className="flex items-center gap-x-[2px] mb-[8px]">
                <Label>Ghi chú thêm</Label>
              </div>
              <Textarea rows={4} className="mb-[4px]" placeholder="Ghi chú" />
            </div>
          </div>

          <div className="mt-[20px]">
            <h1 className="text-xl font-semibold mb-[20px]">
              Liên hệ khẩn cấp
            </h1>

            <div className="flex items-center gap-x-[16px]">
              <div className="w-[50%]">
                <div className="flex items-center gap-x-[2px] mb-[8px]">
                  <Label htmlFor="contact-name">Họ và tên người liên hệ</Label>
                  <Asterisk size={12} className="text-red-600" />
                </div>
                <Input
                  type="text"
                  id="contact-name"
                  className="mb-[4px]"
                  placeholder="Nhập họ và tên người liên hệ"
                />
              </div>

              <div className="w-[50%]">
                <div className="flex items-center gap-x-[2px] mb-[8px]">
                  <Label htmlFor="contact-phone">
                    Số điện thoại người liên hệ
                  </Label>
                  <Asterisk size={12} className="text-red-600" />
                </div>
                <Input
                  type="text"
                  id="contact-phone"
                  className="mb-[4px]"
                  placeholder="Nhập số điện thoại người liên hệ"
                />
              </div>
            </div>
          </div>

          <div className="mt-[30px]">
            <p className="mb-[16px] text-red-600">
              Điền đúng và đầy đủ thông tin ở các ô có (*) trước khi nhấn nút
              xác nhận
            </p>
            <button
              className="bg-gray-800 text-white cursor-pointer w-full flex items-center justify-center gap-x-[12px] py-[12px] rounded-[12px] hover:bg-gray-600 transition duration-200"
              onClick={() => setIsOpenSuccessModal(true)}
            >
              <Calendar size={18} />
              <span>Xác nhận đặt lịch</span>
            </button>
          </div>
        </div>

        {/* right */}
        <div className="mt-[20px] w-[480px] max-w-[480px]">
          {/* info doctor */}
          <div className="border border-gray-200 p-[20px] rounded-[12px] shadow">
            <h1 className="text-xl font-semibold mb-[28px]">
              Thông tin bác sĩ
            </h1>
            <div className="flex gap-x-[24px]">
              <img
                src="https://v0-online-appointment-booking-three.vercel.app/female-doctor.jpg"
                alt=""
                className="w-[80px] h-auto object-cover rounded-[8px]"
              />
              <div>
                <h2 className="font-semibold">BS.CKI Nguyễn Văn An</h2>
                <p className="text-gray-500 mb-[4px]">Bác sĩ Chuyên khoa I</p>
                <Badge className="bg-gray-200 text-gray-800">Tim Mạch</Badge>
              </div>
            </div>
          </div>

          {/* slot detail */}
          <div className="border border-gray-200 p-[20px] rounded-[12px] shadow mt-[24px]">
            <h1 className="text-xl font-semibold mb-[28px]">
              Chi tiết lịch khám
            </h1>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-[8px] text-gray-500">
                <Calendar size={18} />
                <p>Ngày khám</p>
              </div>
              <p className="font-semibold">Thứ 2 ngày 23/09/2024</p>
            </div>

            <div className="flex justify-between mt-[20px]">
              <div className="flex items-center gap-x-[8px] text-gray-500">
                <Clock size={18} />
                <p>Giờ khám</p>
              </div>
              <p className="font-semibold">08:00-09:00</p>
            </div>

            <div className="flex justify-between mt-[20px]">
              <p className="text-gray-500">Thời gian</p>
              <p className="font-semibold">60 phút</p>
            </div>
          </div>

          {/* Important note */}
          <div className="border border-gray-200 p-[20px] rounded-[12px] shadow mt-[24px]">
            <div className="flex items-center gap-x-[8px] font-semibold text-orange-600 mb-[20px]">
              <CircleAlert size={18} />
              <h2>Lưu ý quan trọng</h2>
            </div>
            <div>
              <p className="flex items-center">
                <Dot />
                <span>Vui lòng có mặt trước 15 phút so với giờ hẹn</span>
              </p>
              <p className="flex items-center">
                <Dot />
                <span>Mang theo CMND/CCCD và các giấy tờ y tế liên quan</span>
              </p>
              <p className="flex items-center">
                <Dot />
                <span>Liên hệ hotline 1900 1234 nếu cần hỗ trợ</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* success modal */}
      <SuccessDialog
        open={isOpenSuccessModal}
        onOpenChange={setIsOpenSuccessModal}
      />
    </div>
  );
};

export default BookingPage;
