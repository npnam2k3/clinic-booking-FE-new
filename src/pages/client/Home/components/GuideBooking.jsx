import { Search, Calendar, CheckCircle } from "lucide-react";

const GuideBooking = () => {
  const steps = [
    {
      number: 1,
      title: "Chọn chuyên khoa",
      description: "Lựa chọn chuyên khoa phù hợp với tình trạng sức khỏe của bạn",
      icon: Search,
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      number: 2,
      title: "Chọn bác sĩ & thời gian",
      description: "Xem thông tin bác sĩ và chọn thời gian khám phù hợp",
      icon: Calendar,
      gradient: "from-green-500 to-emerald-500"
    },
    {
      number: 3,
      title: "Xác nhận đặt lịch",
      description: "Điền thông tin cá nhân và xác nhận lịch khám của bạn",
      icon: CheckCircle,
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="py-20 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Quy trình đặt lịch
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Chỉ với 3 bước đơn giản, bạn đã có thể đặt lịch khám với bác sĩ chuyên khoa
          </p>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:flex justify-between items-start relative">
          {/* Connecting Line */}
          <div className="absolute top-[30px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-blue-200 via-green-200 to-purple-200 z-0"></div>

          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="relative flex flex-col items-center max-w-[280px] text-center z-10"
              >
                {/* Step Circle */}
                <div className={`bg-gradient-to-br ${step.gradient} rounded-full w-[60px] h-[60px] flex justify-center items-center shadow-lg mb-6 transform hover:scale-110 transition-transform duration-300`}>
                  <Icon className="text-white" size={28} />
                </div>

                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md border-2 border-gray-200">
                  <span className="text-sm font-bold text-gray-700">{step.number}</span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="flex gap-6 items-start"
              >
                {/* Step Circle */}
                <div className="flex-shrink-0">
                  <div className={`bg-gradient-to-br ${step.gradient} rounded-full w-[60px] h-[60px] flex justify-center items-center shadow-lg relative`}>
                    <Icon className="text-white" size={28} />
                    <div className="absolute -bottom-2 -right-2 bg-white rounded-full w-8 h-8 flex items-center justify-center shadow-md border-2 border-gray-200">
                      <span className="text-sm font-bold text-gray-700">{step.number}</span>
                    </div>
                  </div>
                  {/* Connecting Line for Mobile */}
                  {index < steps.length - 1 && (
                    <div className="w-1 h-16 bg-gradient-to-b from-gray-300 to-gray-200 mx-auto mt-4"></div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pt-2">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default GuideBooking;
