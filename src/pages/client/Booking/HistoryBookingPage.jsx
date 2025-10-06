import CardBooking from "@/pages/client/Booking/components/CardBooking";
import { BookCheck, Calendar, CircleX } from "lucide-react";

const HistoryBookingPage = () => {
  return (
    <div className="w-[1150px] max-w-[1150px] mx-auto mt-[40px]">
      {/* title */}
      <div className="mb-[40px]">
        <h1 className="text-3xl font-bold mb-[12px]">Lịch sử đặt lịch</h1>
        <p className="text-gray-600">Xem lại tất cả các lịch khám của bạn</p>
      </div>

      {/* statistic */}
      <div className="flex gap-x-[16px] mb-[40px]">
        <div className="flex items-center justify-between border border-gray-300 p-[30px] rounded-[20px] w-[280px] shadow">
          <div className="text-lg">
            <p>Tổng lượt đặt lịch</p>
            <span className="font-bold">120</span>
          </div>
          <Calendar size={36} className="text-sky-600" />
        </div>

        <div className="flex items-center justify-between border border-gray-300 p-[30px] rounded-[20px] w-[280px] shadow">
          <div className="text-lg">
            <p>Đã hoàn thành</p>
            <span className="font-bold text-green-600">100</span>
          </div>
          <BookCheck size={36} className="text-green-500" />
        </div>

        <div className="flex items-center justify-between border border-gray-300 p-[30px] rounded-[20px] w-[280px] shadow">
          <div className="text-lg">
            <p>Sắp tới</p>
            <span className="font-bold text-sky-600">10</span>
          </div>
          <Calendar size={36} className="text-sky-600" />
        </div>

        <div className="flex items-center justify-between border border-gray-300 p-[30px] rounded-[20px] w-[280px] shadow">
          <div className="text-lg">
            <p>Đã hủy</p>
            <span className="font-bold text-orange-600">10</span>
          </div>
          <CircleX size={36} className="text-orange-600" />
        </div>
      </div>

      {/* list history booking */}
      <div className="mb-[60px] flex flex-col gap-y-[16px]">
        <CardBooking />
        <CardBooking />
        <CardBooking />
        <CardBooking />
      </div>
    </div>
  );
};

export default HistoryBookingPage;
