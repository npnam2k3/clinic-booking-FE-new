import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTE } from "@/constants/route-constant";
import { Calendar, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Doctor = ({ doctor }) => {
  const navigate = useNavigate();

  const handleClickDetail = () => {
    navigate(`${ROUTE.DOCTOR_DETAIL}/${doctor.doctor_id}`);
  };

  return (
    <div className="border border-gray-200 max-w-[400px] p-[24px] rounded-[10px] transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      {/* Header: Ảnh + thông tin cơ bản */}
      <div className="flex items-center gap-x-[20px]">
        <img
          src={
            doctor.avatar_url ||
            "https://v0-online-appointment-booking-three.vercel.app/female-doctor.jpg"
          }
          alt={doctor.fullname}
          className="w-[60px] h-[60px] object-cover rounded-[8px]"
        />
        <div>
          <h3 className="text-xl font-semibold mb-[4px]">{doctor.fullname}</h3>
          <p className="text-gray-500 mb-[4px]">
            {doctor.degree || "Chưa cập nhật"}
          </p>
          <Badge className="bg-gray-200 text-gray-950">
            {doctor.specialty?.specialization_name || "Không có chuyên khoa"}
          </Badge>
        </div>
      </div>

      {/* Kinh nghiệm */}
      <div className="flex items-center gap-x-[4px] text-gray-500 mt-[20px]">
        <History size={18} />
        <span>{doctor.years_of_experience || 0} năm kinh nghiệm</span>
      </div>

      {/* Ngày làm việc (hiện tại nếu có trường schedule/slot) */}
      {doctor.available_days?.length > 0 && (
        <div className="mb-[20px]">
          <p className="text-gray-500 mt-[12px]">Ngày làm việc:</p>
          <div className="flex flex-wrap gap-[10px] mt-[12px]">
            {doctor.available_days.map((day, index) => (
              <Badge
                key={index}
                className="bg-gray-200 text-gray-950 basis-[calc(25%-10px)]"
              >
                {day}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Hành động */}
      <div className="flex gap-x-[20px] mt-[20px]">
        <Button
          className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-300 cursor-pointer"
          onClick={handleClickDetail}
        >
          Xem chi tiết
        </Button>

        {/* Nếu muốn bật nút đặt lịch */}
        {/* <Button className="bg-gray-900 text-white hover:bg-gray-500 cursor-pointer">
          <Calendar className="mr-1" size={16} />
          <span>Đặt lịch</span>
        </Button> */}
      </div>
    </div>
  );
};

export default Doctor;
