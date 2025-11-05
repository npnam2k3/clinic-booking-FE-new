import { Badge } from "@/components/ui/badge";
import { ROUTE } from "@/constants/route-constant";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Specialty = ({ title, numberDoctor, id }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(
      `${ROUTE.DOCTOR}?page=1&sortBy=years_of_experience&orderBy=DESC&specialization_id=${id}`
    );
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex flex-col justify-between
        px-5 py-6 w-[260px] h-[200px]
        rounded-xl border border-gray-300 cursor-pointer 
        transition-all duration-300
        hover:shadow-lg hover:-translate-y-1 hover:border-gray-200
      "
    >
      {/* Badge */}
      <div>
        <Badge className="bg-gray-100 text-gray-800 px-2 py-1 text-sm font-medium">
          {numberDoctor} Bác sĩ
        </Badge>

        {/* Title */}
        <h2 className="mt-3 text-lg font-semibold leading-snug line-clamp-2">
          {title}
        </h2>
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mt-4">
        <span>Xem danh sách bác sĩ</span>
        <MoveRight size={16} />
      </div>
    </div>
  );
};

export default Specialty;
