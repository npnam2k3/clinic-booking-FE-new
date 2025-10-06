import DateSelect, {
  capitalizeFirstLetter,
} from "@/components/custom/DateSelect";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  GraduationCap,
  History,
  Mail,
  MoveLeft,
  Phone,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import Slot from "@/pages/client/Doctors/components/Slot";
import { ROUTE } from "@/constants/route-constant";

const DoctorDetail = () => {
  const navigate = useNavigate();
  const handleClickComebackBtn = () => {
    navigate(-1);
  };
  // giá trị mặc định là hôm nay
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectSlot] = useState(null);
  const content = `<ol><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Bác sĩ nha khoa</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Bác sĩ phụ khoa</li><li data-list="bullet"><span class="ql-ui" contenteditable="false"></span>Bác sĩ chuyên môn</li></ol><p><br></p>`;
  // `<ul>
  //   <li>Bác sĩ Đa khoa - Đại học Y Hà Nội (2008)</li>
  //   <li>Bác sĩ Chuyên khoa cấp II, Học viện Quân y (2010 - 2011)</li>
  //   <li>Tiến sỹ Y khoa, Hệ chính qui, Học viện Quân y (1996 - 2000)</li>
  //   <li>Cao học Phẫu thuật thần kinh, Hệ chính qui, Học viện Quân y (1993 - 1995) </li>
  //   <li>Bác sĩ Đa khoa, Hệ chính qui, Học viện Quân y (1982 - 1988)</li>
  //   <li>Đào tạo về vi phẫu thần kinh tại Fujita Health University Hospital, Nhật Bản. Tham dự nhiều khóa tập huấn kỹ thuật và các hội nghị quốc tế chuyên ngành tại các nước Mỹ, Pháp, Đức, Áo, Hàn Quốc, Singapore, Thái Lan, Philipine,…</li>
  // </ul>`;
  const slots = [
    { id: 1, start: "08:00", end: "09:00" },
    { id: 2, start: "09:00", end: "10:00" },
    { id: 3, start: "10:00", end: "11:00" },
    { id: 4, start: "11:00", end: "12:00" },
    { id: 5, start: "13:00", end: "14:00" },
    { id: 6, start: "14:00", end: "15:00" },
    { id: 7, start: "15:00", end: "16:00" },
    { id: 8, start: "16:00", end: "17:00" },
  ];

  return (
    <div className="px-[30px] mb-[60px]">
      <Button
        variant="outline"
        className="bg-white text-gray-900 cursor-pointer mt-[32px]"
        onClick={handleClickComebackBtn}
      >
        <MoveLeft />
        <span>Quay lại</span>
      </Button>

      <div className="mt-[40px] flex gap-x-[40px]">
        {/* left */}
        <div>
          {/* info */}
          <div className="border border-gray-200 p-[20px] max-w-[800px] rounded-[16px] flex gap-x-[60px] shadow">
            <img
              src="https://v0-online-appointment-booking-three.vercel.app/female-doctor.jpg"
              alt=""
              className="w-[160px] h-auto object-cover rounded-[8px]"
            />
            <div>
              <h1 className="text-2xl font-bold mb-[8px]">
                BS.CKI Nguyễn Văn An
              </h1>
              <p className="text-gray-600 mb-[10px]">Bác sĩ Chuyên khoa I</p>
              <Badge className="bg-gray-200 text-gray-900 mb-[12px]">
                Tim Mạch
              </Badge>
              <div className="flex items-center gap-x-[4px]">
                <History size={18} />
                <span>15 năm</span>
              </div>
              <div className="mt-[18px]">
                <span>Giới tính: </span>
                <span>Nữ</span>
              </div>
            </div>
          </div>

          {/* introduce */}
          <div className="border border-gray-200 p-[20px] max-w-[800px] rounded-[16px] mt-[24px] shadow">
            <p className="text-xl font-semibold mb-[20px]">Giới thiệu</p>
            <p className="text-pretty text-gray-700">
              Bác sĩ Nguyễn Văn An có hơn 15 năm kinh nghiệm trong lĩnh vực tim
              mạch. Chuyên về chẩn đoán và điều trị các bệnh lý tim mạch phức
              tạp, đặc biệt là bệnh mạch vành và rối loạn nhịp tim. Bác sĩ
              Nguyễn Văn An có hơn 15 năm kinh nghiệm trong lĩnh vực tim mạch.
              Chuyên về chẩn đoán và điều trị các bệnh lý tim mạch phức tạp, đặc
              biệt là bệnh mạch vành và rối loạn nhịp tim.
            </p>
          </div>

          {/* professional qualifications */}
          <div className="border border-gray-200 p-[20px] max-w-[800px] rounded-[16px] mt-[24px] shadow">
            <div className="text-xl font-semibold flex gap-x-[12px] items-center mb-[24px]">
              <GraduationCap size={20} />
              <span>Trình độ chuyên môn</span>
            </div>
            <article
              className="prose prose-lg text-[16px]"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>

        {/* right */}
        <div className="w-[500px] max-w-[600px]">
          {/* select date booking */}
          <div className="border border-gray-200 p-[20px] rounded-[16px] shadow">
            <div className="flex items-center gap-x-[12px] font-semibold mb-[20px]">
              <Calendar />
              <span>Chọn ngày khám</span>
            </div>

            <div>
              <DateSelect
                selectedDate={selectedDate}
                setSelectedDate={setSelectedDate}
              />
            </div>
          </div>

          {/* select slot booking */}
          <div className="border border-gray-200 p-[20px] rounded-[16px] shadow mt-[24px]">
            <div className="font-semibold mb-[20px]">
              <span>Ca khám còn trống - </span>
              <span>
                {selectedDate &&
                  `${capitalizeFirstLetter(
                    dayjs(selectedDate).format("dddd")
                  )} - Ngày ${dayjs(selectedDate).format("DD/MM/YYYY")}`}
              </span>
              {!selectedSlot && (
                <p className="mt-2">Chọn ca khám để đặt lịch</p>
              )}
            </div>

            <div className="flex flex-col gap-y-[16px]">
              {slots.map((slot) => (
                <Slot
                  start={slot.start}
                  end={slot.end}
                  isSelected={selectedSlot?.start === slot.start}
                  onClick={() => setSelectSlot(slot)}
                />
              ))}
            </div>

            {selectedSlot && (
              <div className="mt-[20px] bg-gray-200 p-[20px] rounded-[12px] font-semibold">
                <p>Đã chọn:</p>
                <p>
                  {`${capitalizeFirstLetter(
                    dayjs(selectedDate).format("dddd")
                  )} - Ngày ${dayjs(selectedDate).format(
                    "DD/MM/YYYY"
                  )} - Ca khám: ${selectedSlot.start}-${selectedSlot.end}`}
                </p>
              </div>
            )}

            <div className="mt-[20px]">
              <button
                className={`w-full flex items-center justify-center gap-x-[12px] py-[12px] rounded-[12px] 
                ${
                  selectedSlot
                    ? "bg-gray-900 text-white cursor-pointer"
                    : "bg-gray-300 text-black cursor-not-allowed"
                }`}
                onClick={() => {
                  if (selectedSlot) {
                    navigate(`${ROUTE.BOOKING}/${selectedSlot.id}`);
                  }
                }}
              >
                <Calendar size={18} />
                <span>Đặt lịch khám</span>
              </button>
            </div>
          </div>

          {/* contact */}
          <div className="border border-gray-200 p-[20px] rounded-[16px] shadow mt-[24px]">
            <h1 className="font-semibold">Thông tin liên hệ của bác sĩ</h1>
            <div className="mt-[16px] text-gray-500">
              <div className="flex items-center gap-x-[8px] mb-[12px]">
                <Phone size={18} />
                <span>1900 1234</span>
              </div>
              <div className="flex items-center gap-x-[8px]">
                <Mail size={18} />
                <span>info@medicare.vn</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetail;
