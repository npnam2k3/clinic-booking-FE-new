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

  const [selectedDate, setSelectedDate] = useState(
    dayjs().format("YYYY-MM-DD")
  );

  const [selectedSlot, setSelectedSlot] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  // ===============================
  // FETCH API CHI TIẾT BÁC SĨ
  // ===============================
  useEffect(() => {
    const fetchDoctorDetail = async () => {
      try {
        setLoading(true);
        const res = await DoctorService.getById(id);
        // service trả về data trong res.data?.data => chính object doctor
        const data = res?.data?.data || res?.data || res;
        console.log("Doctor fetched:", data);
        if (!data) {
          messageApi.error("Không tìm thấy thông tin bác sĩ!");
          return;
        }
        setDoctor(data);
      } catch (err) {
        console.error("Lỗi khi tải chi tiết bác sĩ:", err);
        messageApi.error("Không thể tải thông tin chi tiết!");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctorDetail();
  }, [id]);

  // ===============================
  // LỌC SLOT THEO NGÀY ĐƯỢC CHỌN
  // ===============================
  const slots = useMemo(() => {
    if (!doctor?.work_schedules) return [];
    const weekday = dayjs(selectedDate).locale("en").format("dddd");
    console.log("weekday selected:", weekday);
    console.log(
      "work_schedules day_of_week:",
      doctor.work_schedules.map((s) => s.day_of_week)
    );

    const matchedSchedules = doctor.work_schedules.filter(
      (s) => s.day_of_week?.trim().toLowerCase() === weekday.toLowerCase()
    );

    // Lấy các slot có cùng slot_date (trùng ngày chọn) và còn "available"
    const allSlots = matchedSchedules.flatMap((s) => s.slots || []);
    const selectedDateStr = dayjs(selectedDate).format("YYYY-MM-DD");
    const availableSlots = allSlots.filter(
      (slot) =>
        dayjs(slot.slot_date).isSame(dayjs(selectedDate), "day") &&
        slot.status === "available"
    );

    console.log("selectedDateStr:", selectedDateStr);
    console.log("first slot_date:", allSlots[0]?.slot_date);
    console.log("Doctor schedules detail:", doctor.work_schedules);
    doctor.work_schedules.forEach((s) =>
      console.log("schedule_id:", s.schedule_id, "slots:", s.slots?.length)
    );

    // Nếu API chưa có slot, fallback tạo thủ công theo slot_duration
    if (availableSlots.length === 0 && matchedSchedules.length > 0) {
      const generatedSlots = [];
      matchedSchedules.forEach((schedule) => {
        const start = dayjs(schedule.start_time, "HH:mm:ss");
        const end = dayjs(schedule.end_time, "HH:mm:ss");
        const duration = schedule.slot_duration || 30;
        let current = start;
        while (current.isBefore(end)) {
          const next = current.add(duration, "minute");
          generatedSlots.push({
            schedule_id: schedule.schedule_id,
            start_at: current.format("HH:mm"),
            end_at: next.format("HH:mm"),
            slot_date: selectedDateStr,
            status: "available",
          });
          current = next;
        }
      });
      return generatedSlots;
    }

    return availableSlots.map((s) => ({
      schedule_id: s.source_id,
      slot_id: s.slot_id || s.id || s.source_id,
      start_at: s.start_at.slice(0, 5),
      end_at: s.end_at.slice(0, 5),
      slot_date: s.slot_date,
      status: s.status,
    }));
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {contextHolder}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Button
          variant="outline"
          className="bg-white text-gray-900 cursor-pointer hover:bg-gray-50 shadow-sm border-gray-300"
          onClick={handleClickComebackBtn}
        >
          <MoveLeft className="mr-2" />
          <span>Quay lại</span>
        </Button>

        <Spin spinning={loading}>
          {doctor ? (
            <div className="mt-8 flex flex-col lg:flex-row gap-8">
              {/* left */}
              <div className="flex-1 space-y-6">
                {/* info */}
                <div className="bg-white border border-gray-200 p-6 rounded-2xl flex flex-col md:flex-row gap-6 shadow-lg hover:shadow-xl transition-shadow">
                  <img
                    src={
                      doctor.avatar_url ||
                      "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                    }
                    alt={doctor.fullname}
                    className="w-40 h-40 object-cover rounded-xl shadow-md border-2 border-blue-100"
                  />
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold mb-2 text-gray-900">
                      {doctor.fullname}
                    </h1>
                    <p className="text-gray-600 mb-3 text-lg">
                      {doctor.degree} - {doctor.position}
                    </p>

                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-none mb-4 text-sm">
                      {doctor.specialty?.specialization_name ||
                        "Chưa có chuyên khoa"}
                    </Badge>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-gray-700">
                        <History size={18} className="text-blue-600" />
                        <span className="font-medium">
                          {doctor.years_of_experience} năm kinh nghiệm
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-700">
                        <span className="font-medium">Giới tính:</span>
                        <span>{doctor.gender === "male" ? "Nam" : "Nữ"}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* introduce */}
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <div className="w-1 h-6 bg-blue-500 rounded"></div>
                    Giới thiệu
                  </h2>
                  <p className="text-gray-700 leading-relaxed">
                    {doctor.description || "Chưa có thông tin giới thiệu."}
                  </p>
                </div>

                {/* work schedule summary */}
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <div className="bg-green-100 p-2 rounded-lg">
                      <Clock size={20} className="text-green-600" />
                    </div>
                    <span>Lịch làm việc hàng tuần</span>
                  </h2>

                  {doctor.work_schedules && doctor.work_schedules.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
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
                            className="border border-green-200 rounded-xl p-4 bg-gradient-to-br from-green-50 to-white hover:shadow-md transition-shadow"
                          >
                            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              {dayMap[day] || day}
                            </h4>
                            <ul className="text-sm text-gray-700 space-y-2">
                              {schedulesForDay.map((s) => (
                                <li
                                  key={s.schedule_id}
                                  className="flex items-center gap-2 pl-4"
                                >
                                  <Clock size={14} className="text-green-600" />
                                  <span className="font-medium">
                                    {s.start_time.slice(0, 5)} -{" "}
                                    {s.end_time.slice(0, 5)}
                                  </span>
                                  <span className="text-gray-500 text-xs">
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
                    <p className="text-gray-500 text-center py-4">
                      Chưa có lịch làm việc.
                    </p>
                  )}
                </div>

                {/* professional qualifications */}
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <h2 className="text-xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <GraduationCap size={20} className="text-purple-600" />
                    </div>
                    <span>Trình độ chuyên môn</span>
                  </h2>
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
              <div className="w-full lg:w-[480px] space-y-6">
                {/* select date booking */}
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <h3 className="flex items-center gap-2 font-bold text-lg mb-5 text-gray-800">
                    <div className="bg-blue-100 p-2 rounded-lg">
                      <Calendar size={20} className="text-blue-600" />
                    </div>
                    <span>Chọn ngày khám</span>
                  </h3>

                  <DateSelect
                    selectedDate={selectedDate}
                    setSelectedDate={setSelectedDate}
                  />
                </div>

                {/* available slots */}
                <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="mb-5">
                    <h3 className="font-bold text-lg mb-2 text-gray-800">
                      Ca khám còn trống
                    </h3>
                    {selectedDate && (
                      <p className="text-gray-600">
                        {`${capitalizeFirstLetter(
                          dayjs(selectedDate).format("dddd")
                        )}, ${dayjs(selectedDate).format("DD/MM/YYYY")}`}
                      </p>
                    )}
                    {!selectedSlot && (
                      <p className="mt-2 text-sm text-gray-500">
                        Chọn ca khám để đặt lịch
                      </p>
                    )}
                  </div>

                  {/* hiển thị danh sách slot có scroll */}
                  <div
                    className="flex flex-col gap-y-[12px] max-h-[300px] overflow-y-auto pr-2"
                    style={{
                      scrollbarWidth: "thin",
                      scrollbarColor: "#999 #f1f1f1",
                    }}
                  >
                    {slots.length > 0 ? (
                      slots
                        .slice(0, 50)
                        .map((slot) => (
                          <Slot
                            key={slot.start_at}
                            start={slot.start_at}
                            end={slot.end_at}
                            isSelected={
                              selectedSlot?.start_at === slot.start_at
                            }
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
                    <div className="mt-5 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 p-4 rounded-xl">
                      <p className="text-sm text-gray-600 mb-2">Đã chọn:</p>
                      <p className="font-bold text-gray-900">
                        {`${capitalizeFirstLetter(
                          dayjs(selectedDate).format("dddd")
                        )}, ${dayjs(selectedDate).format("DD/MM/YYYY")}`}
                      </p>
                      <p className="font-semibold text-blue-700 mt-1">
                        Ca khám: {selectedSlot.start_at} - {selectedSlot.end_at}
                      </p>
                    </div>
                  )}

                  <div className="mt-6">
                    <Button
                      className={`w-full h-12 text-base font-semibold rounded-xl shadow-md hover:shadow-lg transition-all ${
                        selectedSlot
                          ? "bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white cursor-pointer"
                          : "bg-gray-300 text-gray-500 cursor-not-allowed"
                      }`}
                      disabled={!selectedSlot}
                      onClick={() => {
                        if (selectedSlot) {
                          navigate(`${ROUTE.BOOKING}`, {
                            state: {
                              doctor,
                              selectedDate,
                              selectedSlot: {
                                slot_id: selectedSlot.slot_id, // 🔹 Đúng theo API backend
                                start_at: selectedSlot.start_at,
                                end_at: selectedSlot.end_at,
                                slot_date: selectedSlot.slot_date,
                              },
                            },
                          });
                        }
                      }}
                    >
                      <Calendar size={18} />
                      <span>Đặt lịch khám</span>
                    </Button>
                  </div>
                </div>

                {/* contact */}
                <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 p-6 rounded-2xl shadow-lg">
                  <h3 className="font-bold text-lg mb-4 text-gray-800 flex items-center gap-2">
                    <div className="bg-orange-100 p-2 rounded-lg">
                      <Phone size={18} className="text-orange-600" />
                    </div>
                    Thông tin liên hệ
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-gray-700">
                      <Phone size={18} className="text-orange-600" />
                      <span className="font-medium">
                        {doctor.phone_number || "1900 1234"}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-gray-700">
                      <Mail size={18} className="text-orange-600" />
                      <span className="font-medium">
                        {doctor.email || "info@medicare.vn"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            !loading && (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-md mt-8">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy thông tin bác sĩ.
                </p>
              </div>
            )
          )}
        </Spin>
      </div>
    </div>
  );
};
export default DoctorDetail;
