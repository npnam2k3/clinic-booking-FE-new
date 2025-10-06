import { Badge } from "@/components/ui/badge";
import { ROUTE } from "@/constants/route-constant";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Specialty = ({ title, numberDoctor, id }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`${ROUTE.SPECIALTY_DETAIL}/${id}`);
  };
  return (
    <div
      className="px-[20px] py-[20px] max-w-[240px] rounded-[12px] border border-[#ccc] cursor-pointer  transition-all duration-300 
    hover:shadow-xl/20 hover:-translate-y-1 hover:border-[#ebe7e7]"
      onClick={handleClick}
    >
      <Badge className="bg-gray-200 text-gray-800">
        <span>{numberDoctor}</span>
        <span>Bác sĩ</span>
      </Badge>
      <h2 className="mt-[12px] text-2xl font-semibold">{title}</h2>
      <div className="flex items-center gap-x-[12px] mt-[12px] font-semibold">
        <span>Xem danh sách bác sĩ</span>
        <MoveRight size={18} />
      </div>
    </div>
  );
};

export default Specialty;
