import { Badge } from "@/components/ui/badge";
import { MoveRight } from "lucide-react";

const CardSpecialty = ({
  title,
  desc,
  numberDoctor,
  id,
  handleClickDetailSpecialty,
}) => {
  return (
    <div
      className="px-[20px] py-[28px] max-w-[480px] rounded-[12px] border border-[#ccc] cursor-pointer  transition-all duration-300 
    hover:shadow-xl/20 hover:-translate-y-1 hover:border-[#ebe7e7]"
      onClick={() => handleClickDetailSpecialty(id)}
    >
      <Badge className="bg-gray-200 text-gray-800">
        <span>{numberDoctor}</span>
        <span>Bác sĩ</span>
      </Badge>
      <h2 className="mt-[12px] text-2xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-[8px]">{desc}</p>
      <div className="flex items-center gap-x-[12px] mt-[12px] font-semibold">
        <span>Xem chi tiết</span>
        <MoveRight size={18} />
      </div>
    </div>
  );
};

export default CardSpecialty;
