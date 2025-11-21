import { Calendar, Clock, Star, Users } from "lucide-react";

const Info = () => {
  const stats = [
    {
      icon: Users,
      value: "100+",
      label: "Bác sĩ chuyên khoa",
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50"
    },
    {
      icon: Calendar,
      value: "1000+",
      label: "Lịch khám mỗi tháng",
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50"
    },
    {
      icon: Clock,
      value: "10+",
      label: "Năm kinh nghiệm",
      gradient: "from-orange-500 to-amber-500",
      bgGradient: "from-orange-50 to-amber-50"
    },
    {
      icon: Star,
      value: "4.9",
      label: "Đánh giá trung bình",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50"
    }
  ];

  return (
    <div className="py-16 px-6 bg-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-gradient-to-br hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-default"
              style={{
                backgroundImage: `linear-gradient(to bottom right, var(--tw-gradient-stops))`
              }}
            >
              <div className={`bg-gradient-to-br ${stat.gradient} p-4 rounded-xl shadow-md`}>
                <Icon className="text-white" size={32} />
              </div>
              <span className="text-4xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-gray-600 text-center font-medium">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Info;
