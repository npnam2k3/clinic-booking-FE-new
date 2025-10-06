import { Mail, MapPin, Phone } from "lucide-react";

const Footer = () => {
  return (
    <div className="bg-gray-900 text-white px-[40px] py-[40px]">
      {/* footer top */}
      <div className="flex justify-between items-center">
        {/* column 1 */}
        <div className="w-xs">
          <div className="flex gap-x-2">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center text-white">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-hospital-icon lucide-hospital"
              >
                <path d="M12 7v4" />
                <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
                <path d="M14 9h-4" />
                <path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
                <path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" />
              </svg>
            </div>
            <div className="text-xl text-white pt-1 font-bold">
              Booking care
            </div>
          </div>

          <p className="text-gray-400 mt-[20px]">
            Hệ thống đặt lịch khám bệnh trực tuyến hàng đầu Việt Nam
          </p>

          {/* action */}
          <div className="mt-[30px] flex gap-x-6 items-center">
            <div className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-950 cursor-pointer">
              <Phone size={22} />
            </div>

            <div className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-950 cursor-pointer">
              <Mail width={20} />
            </div>
            <div className="bg-gray-800 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-gray-950 cursor-pointer">
              <MapPin width={20} />
            </div>
          </div>
        </div>

        {/* column 2 */}
        <div>
          <p className="text-xl font-semibold">Dịch vụ</p>
          <ul className="text-gray-400 mt-[20px] flex flex-col gap-y-[6px]">
            <li>Chuyên khoa</li>
            <li>Bác sĩ</li>
            <li>Đặt lịch</li>
            <li>Cấp cứu</li>
          </ul>
        </div>

        {/* column 3 */}
        <div>
          <p className="text-xl font-semibold">Hỗ trợ</p>
          <ul className="text-gray-400 mt-[20px] flex flex-col gap-y-[6px]">
            <li>Trung tâm trợ giúp</li>
            <li>Liên hệ</li>
            <li>Câu hỏi thường gặp</li>
            <li>Chính sách bảo mật</li>
          </ul>
        </div>

        {/* column 4 */}
        <div>
          <p className="text-xl font-semibold">Liên hệ</p>
          <div className="text-gray-400 mt-[24px] flex flex-col gap-y-[16px]">
            <div className="flex items-center gap-x-[10px] ">
              <Phone size={20} />
              <span>1900 1234</span>
            </div>
            <div className="flex items-center gap-x-[10px] ">
              <Mail size={20} />
              <span>info@booking-care.vn</span>
            </div>
            <div className="flex items-center gap-x-[10px] ">
              <MapPin size={20} />
              <span>123 Đường ABC, Quận Hoàn Kiếm, TP.HN</span>
            </div>
          </div>
        </div>
      </div>

      {/* line break */}
      <div className="h-[1px] bg-gray-700 my-[40px]"></div>
      {/* footer bottom */}
      <div className="flex justify-center">
        <p className="text-gray-400">
          © 2025 BookingCare. Tất cả quyền được bảo lưu.
        </p>
      </div>
    </div>
  );
};

export default Footer;
