import { useEffect, useState } from "react";
import CardBooking from "@/pages/client/Booking/components/CardBooking";
import { BookCheck, Calendar, CircleX } from "lucide-react";
import { AppointmentService } from "@/service/appointment/appointment.service";
import { message, Spin } from "antd";

const HistoryBookingPage = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Gọi API lấy danh sách lịch sử
  const fetchHistory = async () => {
    try {
      setLoading(true);
      const res = await AppointmentService.getAllHistory();
      setBookings(res || []);
    } catch (err) {
      console.error("❌ Lỗi khi tải lịch sử:", err);
      message.error("Không thể tải danh sách lịch khám.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Gọi khi vào trang
  useEffect(() => {
    fetchHistory();
  }, []);

  // ✅ Callback reload khi hủy thành công
  const handleCancelSuccess = () => {
    message.info("Đang tải lại danh sách...");
    fetchHistory();
  };

  // ✅ Thống kê số lượng
  const total = bookings.length;
  const completed = bookings.filter((b) => b.status === "completed").length;
  const pending = bookings.filter((b) => b.status === "pending").length;
  const cancelled = bookings.filter((b) => b.status === "canceled").length;

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
            <span className="font-bold">{total}</span>
          </div>
          <Calendar size={36} className="text-sky-600" />
        </div>

        <div className="flex items-center justify-between border border-gray-300 p-[30px] rounded-[20px] w-[280px] shadow">
          <div className="text-lg">
            <p>Đã hoàn thành</p>
            <span className="font-bold text-green-600">{completed}</span>
          </div>
          <BookCheck size={36} className="text-green-500" />
        </div>

        <div className="flex items-center justify-between border border-gray-300 p-[30px] rounded-[20px] w-[280px] shadow">
          <div className="text-lg">
            <p>Sắp tới</p>
            <span className="font-bold text-sky-600">{pending}</span>
          </div>
          <Calendar size={36} className="text-sky-600" />
        </div>

        <div className="flex items-center justify-between border border-gray-300 p-[30px] rounded-[20px] w-[280px] shadow">
          <div className="text-lg">
            <p>Đã hủy</p>
            <span className="font-bold text-orange-600">{cancelled}</span>
          </div>
          <CircleX size={36} className="text-orange-600" />
        </div>
      </div>

      {/* list history booking */}
      <div className="mb-[60px] flex flex-col gap-y-[16px]">
        {loading ? (
          <div className="flex justify-center py-[40px]">
            <Spin size="large" />
          </div>
        ) : bookings.length === 0 ? (
          <p className="text-gray-600 text-center">
            Bạn chưa có lịch khám nào.
          </p>
        ) : (
          bookings.map((item) => (
            <CardBooking
              key={item.appointment_id}
              data={item}
              onCancelSuccess={handleCancelSuccess}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryBookingPage;
