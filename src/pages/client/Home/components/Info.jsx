import { Calendar, Clock, Star, Users } from "lucide-react";

const Info = () => {
  return (
    <div className="py-[64px] flex items-center justify-around">
      <div className="flex flex-col items-center gap-y-[12px]">
        <div className="bg-[#e5e5e5] p-[12px] inline-flex justify-center items-center w-fit rounded-[8px]">
          <Users />
        </div>
        <span className="text-3xl font-bold text-foreground">100+</span>
        <span>Bác sĩ chuyên khoa</span>
      </div>
      <div className="flex flex-col items-center gap-y-[12px]">
        <div className="bg-[#e5e5e5] p-[12px] inline-flex justify-center items-center w-fit rounded-[8px]">
          <Calendar />
        </div>
        <span className="text-3xl font-bold text-foreground">100+</span>
        <span>Lịch khám mỗi ngày</span>
      </div>
      <div className="flex flex-col items-center gap-y-[12px]">
        <div className="bg-[#e5e5e5] p-[12px] inline-flex justify-center items-center w-fit rounded-[8px]">
          <Clock />
        </div>
        <span className="text-3xl font-bold text-foreground">10+</span>
        <span>Năm kinh nghiệm</span>
      </div>
      <div className="flex flex-col items-center gap-y-[12px]">
        <div className="bg-[#e5e5e5] p-[12px] inline-flex justify-center items-center w-fit rounded-[8px]">
          <Star />
        </div>
        <span className="text-3xl font-bold text-foreground">4.9</span>
        <span>Đánh giá trung bình</span>
      </div>
    </div>
  );
};

export default Info;
