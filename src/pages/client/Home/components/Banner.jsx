import { CalendarCheck, MoveRight } from "lucide-react";

const Banner = () => {
  return (
    <div className="bg-[linear-gradient(135deg,#f0f9ff,#e0f2fe)] flex items-center flex-col py-[60px]">
      <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
        Đặt lịch khám bệnh trực tuyến
      </h1>
      <p className="text-[#737373] text-xl mb-8 text-pretty max-w-2xl mx-auto text-center">
        Hệ thống đặt lịch khám bệnh hiện đại, kết nối bạn với các bác sĩ chuyên
        khoa hàng đầu. Tiện lợi, nhanh chóng và an toàn.
      </p>
      <div className="flex items-center gap-x-[20px]">
        <div className="bg-gray-950 text-white rounded-[12px] flex items-center gap-x-[8px] px-[16px] py-[8px] cursor-pointer hover:bg-gray-700 transition-colors duration-300">
          <CalendarCheck size={20} />
          <span>Đặt lịch ngay</span>
        </div>
        <div className="flex items-center gap-x-[8px] outline outline-gray-400 px-[16px] py-[8px] cursor-pointer rounded-[12px] hover:bg-gray-100 transition-colors duration-300 shadow">
          <span>Tìm hiểu thêm</span>
          <MoveRight size={20} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
