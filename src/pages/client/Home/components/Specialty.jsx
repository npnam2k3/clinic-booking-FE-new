import { ROUTE } from "@/constants/route-constant";
import CardSpecialty from "@/pages/client/Home/components/CardSpecialty";
import { MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const data = [
  {
    id: 1,
    title: "Tim mạch",
    desc: "Chuyên khoa điều trị các bệnh về tim và mạch máu",
    numberDoctor: 10,
  },
  {
    id: 2,
    title: "Thần Kinh",
    desc: "Chẩn đoán và điều trị các bệnh về hệ thần kinh",
    numberDoctor: 10,
  },
  {
    id: 3,
    title: "Mắt",
    desc: "Khám và điều trị các bệnh về mắt và thị lực",
    numberDoctor: 10,
  },
  {
    id: 4,
    title: "Xương Khớp",
    desc: "Điều trị các bệnh về xương, khớp và cơ",
    numberDoctor: 10,
  },
  {
    id: 5,
    title: "Ngoại Tổng Quát",
    desc: "Khám và điều trị các bệnh ngoại khoa",
    numberDoctor: 10,
  },
  {
    id: 6,
    title: "Nội Tổng Quát",
    desc: "Khám và điều trị các bệnh nội khoa",
    numberDoctor: 10,
  },
];

const Specialty = () => {
  const navigate = useNavigate();
  const handleClickAllSpecialties = () => {
    navigate(ROUTE.SPECIALTY);
  };

  const handleClickDetailSpecialty = (id) => {
    navigate(`${ROUTE.SPECIALTY_DETAIL}/${id}`);
  };
  return (
    <div className="px-[20px] py-[80px]">
      {/* title */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold mb-4">Chuyên khoa nổi bật</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Đội ngũ bác sĩ chuyên khoa giàu kinh nghiệm, trang thiết bị hiện đại
        </p>
      </div>

      {/* list specialties */}
      <div className="grid grid-cols-3 gap-6">
        {data.map((item) => (
          <CardSpecialty
            id={item.id}
            numberDoctor={item.numberDoctor}
            title={item.title}
            desc={item.desc}
            handleClickDetailSpecialty={handleClickDetailSpecialty}
          />
        ))}
      </div>

      {/* view all */}
      <div
        className="mt-[48px] flex justify-center"
        onClick={handleClickAllSpecialties}
      >
        <div className="flex gap-x-[12px] items-center outline outline-gray-300 px-[16px] py-[8px] rounded-[12px] cursor-pointer hover:bg-gray-200 transition-all duration-300">
          <span>Xem tất cả chuyên khoa</span>
          <MoveRight size={18} />
        </div>
      </div>
    </div>
  );
};

export default Specialty;
