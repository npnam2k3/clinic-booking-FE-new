import { Calendar, XCircle, Users, UserRound } from "lucide-react";
import { mockDashboardStats } from "@/data/mockData";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const DashboardPage = () => {
  const stats = mockDashboardStats;

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-500";
      case "pending":
        return "bg-orange-500";
      case "completed":
        return "bg-blue-500";
      case "cancelled":
        return "bg-gray-800";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "confirmed":
        return "Confirmed";
      case "pending":
        return "Pending";
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Tổng quan hoạt động hệ thống</p>
        </div>

        {/* Stats Cards */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Today Appointments */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">
                Lịch khám hôm nay
              </h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.todayAppointments}
            </div>
            <p className="mt-1 text-xs text-gray-500">Pending & Confirmed</p>
          </div>

          {/* Cancelled Today */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">Lịch bị hủy</h3>
              <XCircle className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.cancelledToday}
            </div>
            <p className="mt-1 text-xs text-gray-500">Tháng này</p>
          </div>

          {/* Active Doctors */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">
                Bác sĩ hoạt động
              </h3>
              <Users className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.activeDoctors}
            </div>
            <p className="mt-1 text-xs text-gray-500">Đang làm việc</p>
          </div>

          {/* Total Patients */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-sm font-medium text-gray-600">Bệnh nhân</h3>
              <UserRound className="h-5 w-5 text-gray-400" />
            </div>
            <div className="text-3xl font-bold text-gray-900">
              {stats.totalPatients}
            </div>
            <p className="mt-1 text-xs text-gray-500">Tổng số</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Weekly Appointments Chart */}
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold">
              Lịch khám 7 ngày gần nhất
            </h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={stats.weeklyAppointments}>
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

          {/* Appointments by Status */}
          {/* <div className="rounded-lg bg-white p-6 shadow-sm">
            <h3 className="mb-6 text-lg font-semibold">Trạng thái lịch khám</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={[
                    {
                      name: "Cancelled",
                      value: stats.appointmentsByStatus.cancelled,
                      color: "#374151",
                    },
                    {
                      name: "Completed",
                      value: stats.appointmentsByStatus.completed,
                      color: "#3b82f6",
                    },
                    {
                      name: "Confirmed",
                      value: stats.appointmentsByStatus.confirmed,
                      color: "#111827",
                    },
                    {
                      name: "Pending",
                      value: stats.appointmentsByStatus.pending,
                      color: "#f97316",
                    },
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                  animationDuration={1000}
                  animationBegin={0}
                >
                  {[
                    {
                      name: "Cancelled",
                      value: stats.appointmentsByStatus.cancelled,
                      color: "#374151",
                    },
                    {
                      name: "Completed",
                      value: stats.appointmentsByStatus.completed,
                      color: "#3b82f6",
                    },
                    {
                      name: "Confirmed",
                      value: stats.appointmentsByStatus.confirmed,
                      color: "#111827",
                    },
                    {
                      name: "Pending",
                      value: stats.appointmentsByStatus.pending,
                      color: "#f97316",
                    },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    padding: "8px 12px",
                  }}
                />
                <Legend
                  verticalAlign="bottom"
                  height={36}
                  iconType="circle"
                  formatter={(value, entry) => (
                    <span style={{ color: "#374151", fontSize: "14px" }}>
                      {value}
                    </span>
                  )}
                />
              </PieChart>
            </ResponsiveContainer>
          </div> */}
        </div>

        {/* Recent Appointments Table */}
        <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold">Lịch khám sắp tới</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b text-left text-sm text-gray-600">
                  <th className="pb-3 font-medium">Mã lịch</th>
                  <th className="pb-3 font-medium">Bệnh nhân</th>
                  <th className="pb-3 font-medium">Bác sĩ</th>
                  <th className="pb-3 font-medium">Ngày</th>
                  <th className="pb-3 font-medium">Giờ</th>
                  <th className="pb-3 font-medium">Trạng thái</th>
                </tr>
              </thead>
              <tbody>
                {stats.recentAppointments.map((apt) => (
                  <tr key={apt.id} className="border-b last:border-0">
                    <td className="py-3 text-sm">{apt.id}</td>
                    <td className="py-3 text-sm">{apt.patientName}</td>
                    <td className="py-3 text-sm">{apt.doctorName}</td>
                    <td className="py-3 text-sm">{apt.date}</td>
                    <td className="py-3 text-sm">{apt.time}</td>
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
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
