import { useEffect, useState } from "react";
import { Calendar, XCircle, Users, UserRound } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { message } from "antd";
import { DashboardService } from "@/service/dashboard/dashboard.service";
import {
  validateBasicStatisticResponse,
  validateWeeklyAppointmentResponse,
  validateUpcomingAppointmentsResponse,
} from "@/untils/vaildate/dashboard.validate";

const DashboardPage = () => {
  const [basicStats, setBasicStats] = useState(null);
  const [weeklyStats, setWeeklyStats] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();

  // 🧭 Gọi API khi load trang
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        // 1️⃣ Basic Statistic
        const basicRes = await DashboardService.getBasicStatistic();
        const basicErr = validateBasicStatisticResponse(basicRes);
        if (basicErr) return messageApi.error(basicErr);
        setBasicStats(basicRes.data);

        // 2️⃣ Weekly Appointment Statistic
        const weeklyRes =
          await DashboardService.getWeeklyAppointmentStatistic();
        const weeklyErr = validateWeeklyAppointmentResponse(weeklyRes);
        if (weeklyErr) return messageApi.error(weeklyErr);
        setWeeklyStats(weeklyRes.data.weeklyAppointments);

        // 3️⃣ Upcoming Appointments
        const upcomingRes = await DashboardService.getUpcomingAppointments();
        const upcomingErr = validateUpcomingAppointmentsResponse(upcomingRes);
        if (upcomingErr) return messageApi.error(upcomingErr);
        setUpcomingAppointments(upcomingRes.data);
      } catch (err) {
        console.error("❌ Lỗi khi tải dashboard:", err);
        messageApi.error("Không thể tải dữ liệu Dashboard!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🟢 Màu trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500";
      case "pending":
        return "bg-orange-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-gray-700";
      default:
        return "bg-gray-400";
    }
  };

  // 🟢 Text trạng thái
  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Đã xác nhận";
      case "pending":
        return "Chờ xác nhận";
      case "completed":
        return "Hoàn thành";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        {contextHolder}
        Đang tải dữ liệu Dashboard...
      </div>
    );
  }

  if (!basicStats) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500">
        {contextHolder}
        Không thể tải dữ liệu Dashboard!
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {contextHolder}
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hoạt động hệ thống</p>
        </div>

        {/* 📊 Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">
                Lịch khám hôm nay
              </h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {basicStats.appointments_today}
            </div>
            <p className="mt-1 text-xs text-gray-500">Pending & Confirmed</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">Lịch bị hủy</h3>
              <XCircle className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {basicStats.appointments_cancelled}
            </div>
            <p className="mt-1 text-xs text-gray-500">Tháng này</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">
                Bác sĩ hoạt động
              </h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {basicStats.total_doctors}
            </div>
            <p className="mt-1 text-xs text-gray-500">Đang làm việc</p>
          </div>

          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">Bệnh nhân</h3>
              <UserRound className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {basicStats.total_patients}
            </div>
            <p className="mt-1 text-xs text-gray-500">Tổng số</p>
          </div>
        </div>

        {/* 📈 Weekly Appointments Chart */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold">
              Lịch khám 7 ngày gần nhất
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={weeklyStats}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="day"
                  stroke="#666"
                  style={{ fontSize: "12px" }}
                />
                <YAxis stroke="#666" style={{ fontSize: "12px" }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "8px 12px",
                  }}
                  labelStyle={{ color: "#374151", fontWeight: 600 }}
                  itemStyle={{ color: "#000" }}
                  cursor={false}
                />
                <Bar
                  dataKey="count"
                  fill="#73C8D2"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1000}
                  animationBegin={0}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* 👉 Bạn có thể thêm biểu đồ khác ở đây */}
        </div>

        {/* 📅 Upcoming Appointments Table */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Lịch khám sắp tới</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="pb-3 font-medium">#</th>
                  <th className="pb-3 font-medium">Bệnh nhân</th>
                  <th className="pb-3 font-medium">Bác sĩ</th>
                  <th className="pb-3 font-medium">Ngày</th>
                  <th className="pb-3 font-medium">Giờ</th>
                  <th className="pb-3 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {upcomingAppointments.length > 0 ? (
                  upcomingAppointments.map((apt) => (
                    <tr key={apt.index} className="border-b last:border-0">
                      <td className="py-3 text-sm">{apt.index}</td>
                      <td className="py-3 text-sm">{apt.patient_name}</td>
                      <td className="py-3 text-sm">{apt.doctor_name}</td>
                      <td className="py-3 text-sm">{apt.slot_date}</td>
                      <td className="py-3 text-sm">{apt.start_at}</td>
                      <td className="py-3 text-sm">
                        <span
                          className={`inline-block rounded px-2 py-1 text-xs font-medium text-white ${getStatusColor(
                            apt.status
                          )}`}
                        >
                          {getStatusText(apt.status)}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-4 text-center text-gray-500 text-sm"
                    >
                      Không có lịch hẹn sắp tới.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
