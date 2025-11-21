import { CalendarCheck, MoveRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ROUTE } from "@/constants/route-constant";

const Banner = () => {
  const navigate = useNavigate();

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      {/* Top Section - Text Content */}
      <div className="relative min-h-[500px] flex items-center justify-center">
        {/* Decorative background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-400/20 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
            ✨ Hệ thống đặt lịch khám bệnh hiện đại
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
            Đặt lịch khám bệnh
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              trực tuyến dễ dàng
            </span>
          </h1>

          <p className="text-gray-600 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Kết nối bạn với các bác sĩ chuyên khoa hàng đầu.
            Tiện lợi, nhanh chóng và an toàn cho sức khỏe của bạn.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => navigate(ROUTE.BOOKING)}
              className="group bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl flex items-center gap-3 px-8 py-4 cursor-pointer hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 font-semibold text-lg w-full sm:w-auto justify-center"
            >
              <CalendarCheck size={24} className="group-hover:rotate-12 transition-transform duration-300" />
              <span>Đặt lịch ngay</span>
            </button>

            <button
              onClick={() => navigate(ROUTE.SPECIALTY)}
              className="group bg-white text-gray-900 rounded-xl flex items-center gap-3 px-8 py-4 cursor-pointer hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 font-semibold text-lg border-2 border-gray-200 w-full sm:w-auto justify-center"
            >
              <span>Xem chuyên khoa</span>
              <MoveRight size={24} className="group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Section - Clinic Image */}
      <div className="relative max-w-7xl mx-auto px-6 pb-12">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          {/* Image with gradient overlay */}
          <div className="relative h-[400px] md:h-[500px]">
            <img
              src="images/banner.png"
              alt="Modern clinic interior"
              className="w-full h-full object-cover"
            />
            {/* Gradient overlay for better text visibility if needed */}
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 via-transparent to-transparent"></div>
          </div>

          {/* Floating stats cards */}
          <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">100+</div>
              <div className="text-sm text-gray-600">Bác sĩ</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-cyan-600">24/7</div>
              <div className="text-sm text-gray-600">Hỗ trợ</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-teal-600">10+</div>
              <div className="text-sm text-gray-600">Năm KN</div>
            </div>
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <div className="text-2xl font-bold text-blue-600">4.9⭐</div>
              <div className="text-sm text-gray-600">Đánh giá</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
