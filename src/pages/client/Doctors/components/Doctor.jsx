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
    <div
      className="bg-white border border-gray-200 rounded-2xl p-6 transition-all duration-300 ease-in-out hover:shadow-xl hover:-translate-y-2 cursor-pointer group h-full flex flex-col"
      onClick={handleClickDetail}
    >
      {/* Header: Ảnh + thông tin cơ bản */}
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <img
            src={
              doctor.avatar_url ||
              "https://v0-online-appointment-booking-three.vercel.app/female-doctor.jpg"
            }
            alt={doctor.fullname}
            className="w-20 h-20 object-cover rounded-xl shadow-md border-2 border-blue-100 group-hover:border-blue-300 transition-colors"
          />
          <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold mb-1 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
            {doctor.fullname}
          </h3>
          <p className="text-sm text-gray-600 mb-2">
            {doctor.degree || "Chưa cập nhật"}
          </p>
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none text-xs">
            {doctor.specialty?.specialization_name || "Không có chuyên khoa"}
          </Badge>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-4"></div>

      {/* Kinh nghiệm */}
      <div className="flex items-center gap-2 text-gray-700 mb-3">
        <div className="bg-orange-100 p-1.5 rounded-lg">
          <History size={16} className="text-orange-600" />
        </div>
        <span className="text-sm font-medium">
          {doctor.years_of_experience || 0} năm kinh nghiệm
        </span>
      </div>

      {/* Ngày làm việc (hiện tại nếu có trường schedule/slot) */}
      {doctor.available_days?.length > 0 && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-2 font-medium">
            Ngày làm việc:
          </p>
          <div className="flex flex-wrap gap-2">
            {doctor.available_days.map((day, index) => (
              <Badge
                key={index}
                className="bg-green-100 text-green-700 hover:bg-green-200 border-none text-xs"
              >
                {day}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Spacer to push button to bottom */}
      <div className="flex-1"></div>

      {/* Hành động */}
      <div className="mt-4 pt-4 border-t border-gray-100">
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white cursor-pointer shadow-md hover:shadow-lg transition-all"
          onClick={(e) => {
            e.stopPropagation();
            handleClickDetail();
          }}
        >
          <Calendar className="mr-2" size={16} />
          Xem chi tiết & Đặt lịch
        </Button>
      </div>
    </div>
  );
};

export default Doctor;
