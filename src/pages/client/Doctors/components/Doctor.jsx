import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ROUTE } from "@/constants/route-constant";
import { Calendar, History } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Doctor = ({ id }) => {
  const navigate = useNavigate();
  const handleClickDetail = () => {
    navigate(`${ROUTE.DOCTOR_DETAIL}/${id}`);
  };
  return (
    <div className="border border-gray-200 max-w-[400px] p-[24px] rounded-[10px] transition-all duration-300 ease-in-out hover:shadow-lg hover:-translate-y-1">
      <div className="flex items-center gap-x-[20px]">
        <img
          src="https://v0-online-appointment-booking-three.vercel.app/female-doctor.jpg"
          alt=""
          className="w-[60px] h-auto object-cover rounded-[8px]"
        />
        <div>
          <h3 className="text-xl font-semibold mb-[4px]">
            BS.CKI Nguyễn Văn An
          </h3>
          <p className="text-gray-500 mb-[4px]">Bác sĩ Chuyên khoa I</p>
          <Badge className="bg-gray-200 text-gray-950">Tim Mạch</Badge>
        </div>
      </div>

      <div className="flex items-center gap-x-[4px] text-gray-500 mt-[20px]">
        <History size={18} />
        <span>18 năm</span>
      </div>

      <div className="mb-[20px]">
        <p className="text-gray-500">Ngày làm việc:</p>
        <div className="flex flex-wrap gap-[10px] mt-[12px]">
          <Badge className="bg-gray-200 text-gray-950 basis-[calc(25%-10px)]">
            Thứ 2
          </Badge>
          <Badge className="bg-gray-200 text-gray-950 basis-[calc(25%-10px)]">
            Thứ 3
          </Badge>
          <Badge className="bg-gray-200 text-gray-950 basis-[calc(25%-10px)]">
            Thứ 4
          </Badge>
          <Badge className="bg-gray-200 text-gray-950 basis-[calc(25%-10px)]">
            Thứ 2
          </Badge>
          <Badge className="bg-gray-200 text-gray-950 basis-[calc(25%-10px)]">
            Thứ 3
          </Badge>
          <Badge className="bg-gray-200 text-gray-950 basis-[calc(25%-10px)]">
            Thứ 4
          </Badge>
          <Badge className="bg-gray-200 text-gray-950 basis-[calc(25%-10px)]">
            Chủ nhật
          </Badge>
        </div>
      </div>

      <div className="flex gap-x-[20px]">
        <Button
          className="bg-white text-gray-800 border border-gray-300 hover:bg-gray-300 cursor-pointer"
          onClick={handleClickDetail}
        >
          Xem chi tiết
        </Button>
        {/* <Button className="bg-gray-900 text-white hover:bg-gray-500 cursor-pointer">
          <Calendar />
          <span>Đặt lịch</span>
        </Button> */}
      </div>
    </div>
  );
};

export default Doctor;
