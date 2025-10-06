import { Badge } from "@/components/ui/badge";
import { Calendar, Eye } from "lucide-react";

const CardBooking = () => {
  return (
    <div className="border border-gray-300 px-[20px] py-[30px] rounded-[12px] shadow flex items-end justify-between">
      {/* left */}

      <div className="flex gap-x-[16px] items-start">
        <img
          src="https://v0-online-appointment-booking-three.vercel.app/female-doctor.jpg"
          alt=""
          className="w-[60px] h-auto object-cover rounded-[8px]"
        />
        <div>
          <h1 className="text-lg font-semibold mb-[4px]">BS. Nguyễn Thị Lan</h1>
          <p className="text-gray-600 flex items-center gap-x-[8px]">
            <Calendar size={16} />
            <span>15/12/2024 - 09:00</span>
          </p>
          <div className="mt-[16px] flex gap-x-[8px]">
            <Badge className="bg-white text-gray-800 border border-gray-300">
              Tim Mạch
            </Badge>
            <Badge className="bg-green-200 text-green-800">Đã khám</Badge>
          </div>
          {/* note */}
          <div className="mt-[12px] text-gray-700 flex gap-x-[4px]">
            <span className="font-bold">Ghi chú: </span>
            <p>Khám sức khỏe tổng quát</p>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="flex gap-x-[8px]">
        {/* <button className="flex items-center gap-x-[8px] border border-gray-300 px-[12px] py-[4px] rounded-[8px] cursor-pointer hover:bg-gray-200 transition duration-200">
          <Eye size={16} />
          <span className="font-semibold">Chi tiết</span>
        </button> */}
        <button className="flex items-center gap-x-[8px] border border-gray-300 px-[12px] py-[4px] rounded-[8px] cursor-pointer hover:bg-gray-200 transition duration-200">
          <span className="text-red-600 font-semibold">Hủy lịch</span>
        </button>
      </div>
    </div>
  );
};

export default CardBooking;
