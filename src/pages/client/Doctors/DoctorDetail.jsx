import { useEffect, useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
  Clock,
} from "lucide-react";
import dayjs from "dayjs";
import Slot from "@/pages/client/Doctors/components/Slot";
import { ROUTE } from "@/constants/route-constant";
import { DoctorService } from "@/service/doctor/useDoctor.service";
import { message, Spin } from "antd";

const DoctorDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [doctor, setDoctor] = useState(null);

  const [selectedDate, setSelectedDate] = useState(dayjs().toDate());
  const [selectedSlot, setSelectedSlot] = useState(null);

  // ===============================
  // FETCH API CHI TIẾT BÁC SĨ
  // ===============================
  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        setLoading(true);
        const res = await DoctorService.getById(id);
        const data = res?.data || res;
        if (!data) {
          message.error("Không tìm thấy thông tin bác sĩ!");
          return;
        }

        setDoctor(data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết bác sĩ:", err);
        message.error("Không thể tải thông tin chi tiết!");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctorDetail();
  }, [id]);

  // ===============================
  // XỬ LÝ SLOT THEO LỊCH LÀM VIỆC
  // ===============================
  const slots = useMemo(() => {
    if (!doctor?.work_schedules) return [];
    const weekday = dayjs(selectedDate).format("dddd"); // Monday, Tuesday,...
    const matched = doctor.work_schedules.filter(
      (s) => s.day_of_week.toLowerCase() === weekday.toLowerCase()
    );

    // Chuyển các lịch thành các khung giờ nhỏ (chia theo slot_duration)
    const generatedSlots = [];
    matched.forEach((schedule) => {
      const start = dayjs(schedule.start_time, "HH:mm:ss");
      const end = dayjs(schedule.end_time, "HH:mm:ss");
      const duration = schedule.slot_duration || 30;
      console.log("Generated slots for schedule:", schedule);
      let current = start;
      while (current.isBefore(end)) {
        const next = current.add(duration, "minute");
        generatedSlots.push({
          schedule_id: schedule.schedule_id,
          start: current.format("HH:mm"),
          end: next.format("HH:mm"),
        });
        current = next;
      }
    });
    return generatedSlots;
  }, [doctor, selectedDate]);

  // ===============================
  // NÚT QUAY LẠI
  // ===============================
  const handleClickComebackBtn = () => navigate(-1);

  //========================== Thời gian trong tuần ==========================
  const dayMap = {
    Monday: "Thứ Hai",
    Tuesday: "Thứ Ba",
    Wednesday: "Thứ Tư",
    Thursday: "Thứ Năm",
    Friday: "Thứ Sáu",
    Saturday: "Thứ Bảy",
    Sunday: "Chủ Nhật",
  };
  // ===============================
  // JSX CHÍNH
  // ===============================
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

      <Spin spinning={loading}>
        {doctor ? (
          <div className="mt-[40px] flex gap-x-[40px]">
            {/* left */}
            <div>
              {/* info */}
              <div className="border border-gray-200 p-[20px] max-w-[800px] rounded-[16px] flex gap-x-[60px] shadow">
                <img
                  src={
                    doctor.avatar_url ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt={doctor.fullname}
                  className="w-[160px] h-[160px] object-cover rounded-[8px]"
                />
                <div>
                  <h1 className="text-2xl font-bold mb-[8px]">
                    {doctor.fullname}
                  </h1>
                  <p className="text-gray-600 mb-[10px]">
                    {doctor.degree} - {doctor.position}
                  </p>

                  <Badge className="bg-gray-200 text-gray-900 mb-[12px]">
                    {doctor.specialty?.specialization_name ||
                      "Chưa có chuyên khoa"}
                  </Badge>

                  <div className="flex items-center gap-x-[6px] text-gray-700">
                    <History size={18} />
                    <span>{doctor.years_of_experience} năm kinh nghiệm</span>
                  </div>
                  <div className="mt-[8px] text-gray-700">
                    <span>Giới tính: </span>
                    <span>{doctor.gender === "male" ? "Nam" : "Nữ"}</span>
                  </div>
                </div>
              </div>

              {/* introduce */}
              <div className="border border-gray-200 p-[20px] max-w-[800px] rounded-[16px] mt-[24px] shadow">
                <p className="text-xl font-semibold mb-[20px]">Giới thiệu</p>
                <p className="text-pretty text-gray-700">
                  {doctor.description || "Chưa có thông tin giới thiệu."}
                </p>
              </div>

              {/* work schedule summary */}
              <div className="border border-gray-200 p-[20px] max-w-[800px] rounded-[16px] mt-[24px] shadow">
                <div className="text-xl font-semibold flex items-center gap-x-[10px] mb-[16px]">
                  <Clock size={20} />
                  <span>Lịch làm việc hàng tuần</span>
                </div>

                {doctor.work_schedules && doctor.work_schedules.length > 0 ? (
                  <div className="space-y-3">
                    {[
                      ...new Set(
                        doctor.work_schedules.map((s) => s.day_of_week)
                      ),
                    ].map((day) => {
                      const schedulesForDay = doctor.work_schedules.filter(
                        (s) => s.day_of_week === day
                      );
                      return (
                        <div
                          key={day}
                          className="border rounded-lg p-3 bg-gray-50"
                        >
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {dayMap[day] || day}
                          </h4>
                          <ul className="text-sm text-gray-600 list-disc ml-5 space-y-1">
                            {schedulesForDay.map((s) => (
                              <li key={s.schedule_id}>
                                {s.start_time.slice(0, 5)} -{" "}
                                {s.end_time.slice(0, 5)}{" "}
                                <span className="text-gray-500">
                                  ({s.note})
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-gray-500">Chưa có lịch làm việc.</p>
                )}
              </div>

              {/* professional qualifications */}
              <div className="border border-gray-200 p-[20px] max-w-[800px] rounded-[16px] mt-[24px] shadow">
                <div className="text-xl font-semibold flex gap-x-[12px] items-center mb-[24px]">
                  <GraduationCap size={20} />
                  <span>Trình độ chuyên môn</span>
                </div>
                <article
                  className="prose prose-lg text-[16px]"
                  dangerouslySetInnerHTML={{
                    __html:
                      doctor.specialty?.description ||
                      "<p>Chưa có mô tả chuyên môn.</p>",
                  }}
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

                <DateSelect
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </div>

              {/* available slots */}
              <div className="border border-gray-200 p-[20px] rounded-[16px] shadow mt-[24px]">
                <div className="font-semibold mb-[20px]">
                  <span>Ca khám còn trống - </span>
                  {selectedDate && (
                    <span>
                      {`${capitalizeFirstLetter(
                        dayjs(selectedDate).format("dddd")
                      )} - Ngày ${dayjs(selectedDate).format("DD/MM/YYYY")}`}
                    </span>
                  )}
                  {!selectedSlot && (
                    <p className="mt-2 text-gray-500">
                      Chọn ca khám để đặt lịch
                    </p>
                  )}
                </div>

                <div className="flex flex-col gap-y-[16px]">
                  {slots.length > 0 ? (
                    slots.map((slot) => (
                      <Slot
                        key={slot.start}
                        start={slot.start}
                        end={slot.end}
                        isSelected={selectedSlot?.start === slot.start}
                        onClick={() => setSelectedSlot(slot)}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500">
                      Không có ca khám trong ngày.
                    </p>
                  )}
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
                        navigate(
                          `${ROUTE.BOOKING}/${selectedSlot.schedule_id}`
                        );
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
                    <span>{doctor.phone_number || "1900 1234"}</span>
                  </div>
                  <div className="flex items-center gap-x-[8px]">
                    <Mail size={18} />
                    <span>{doctor.email || "info@medicare.vn"}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          !loading && (
            <p className="text-center text-gray-500 mt-10">
              Không tìm thấy thông tin bác sĩ.
            </p>
          )
        )}
      </Spin>
    </div>
  );
};

export default DoctorDetail;
