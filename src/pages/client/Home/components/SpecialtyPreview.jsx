import React, { useEffect, useState } from "react";
import { SpecialtyService } from "@/service/specialty/specialty.service";
import { Badge } from "@/components/ui/badge";
import { ROUTE } from "@/constants/route-constant";
import { MoveRight, Stethoscope } from "lucide-react";
import { useNavigate } from "react-router-dom";

/**
 * Component hiển thị tối đa 6 chuyên khoa (preview)
 * Dùng cho trang chủ hoặc các khu vực giới thiệu nhanh
 */
const SpecialtyPreview = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await SpecialtyService.getAll();
        // Chỉ lấy 6 chuyên khoa đầu tiên
        const top6 = Array.isArray(data) ? data.slice(0, 6) : [];
        setSpecialties(top6);
      } catch (error) {
        console.error("Lỗi khi tải danh sách chuyên khoa:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialties();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-10 text-gray-500">Đang tải dữ liệu...</div>
    );
  }

  if (!specialties.length) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Không có chuyên khoa nào.
      </div>
    );
  }

  // ===============================
  // JSX CHÍNH
  // ===============================
  return (
    <div className="max-w-7xl mx-auto px-6 py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Các chuyên khoa nổi bật
        </h2>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Khám phá đội ngũ bác sĩ chuyên khoa hàng đầu với nhiều năm kinh nghiệm
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {specialties.map((item) => (
          <div
            key={item.specialization_id}
            onClick={() =>
              navigate(
                `${ROUTE.DOCTOR}?page=1&sortBy=years_of_experience&orderBy=DESC&specialization_id=${item.specialization_id}`
              )
            }
            className="group relative flex flex-col justify-between p-6 h-[220px] rounded-2xl border-2 border-gray-200 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:border-blue-400 bg-white overflow-hidden"
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-cyan-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>

            <div className="relative z-10">
              {/* Badge and Icon */}
              <div className="flex items-center justify-between mb-4">
                <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 text-sm font-semibold shadow-md">
                  {item.doctors?.length || 0} Bác sĩ
                </Badge>
                <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors duration-300">
                  <Stethoscope className="text-blue-600" size={20} />
                </div>
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold leading-snug line-clamp-2 text-gray-900 mb-2">
                {item.specialization_name}
              </h3>
            </div>

            {/* Footer */}
            <div className="relative z-10 flex items-center gap-2 text-sm font-semibold text-blue-600 group-hover:text-blue-700 transition-colors duration-300">
              <span>Xem danh sách bác sĩ</span>
              <MoveRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
            </div>
          </div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <button
          onClick={() => navigate(ROUTE.SPECIALTY)}
          className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
        >
          <span>Xem tất cả chuyên khoa</span>
          <MoveRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default SpecialtyPreview;
