import React, { useEffect, useState } from "react";
import { SpecialtyService } from "@/service/specialty/specialty.service";
import { Badge } from "@/components/ui/badge";
import { ROUTE } from "@/constants/route-constant";
import { MoveRight } from "lucide-react";
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
    <div className="max-w-[1200px] mx-auto mt-[60px]">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Các chuyên khoa nổi bật
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 place-items-center">
        {specialties.map((item) => (
          <div
            key={item.specialization_id}
            onClick={() =>
              navigate(
                `${ROUTE.DOCTOR}?page=1&sortBy=years_of_experience&orderBy=DESC&specialization_id=${item.specialization_id}`
              )
            }
            className="
              flex flex-col justify-between
              px-5 py-6 w-[280px] h-[200px]
              rounded-xl border border-gray-300 cursor-pointer 
              transition-all duration-300
              hover:shadow-lg hover:-translate-y-1 hover:border-gray-200
            "
          >
            {/* Badge */}
            <div>
              <Badge className="bg-gray-100 text-gray-800 px-2 py-1 text-sm font-medium">
                {item.doctors?.length || 0} Bác sĩ
              </Badge>

              {/* Title */}
              <h2 className="mt-3 text-lg font-semibold leading-snug line-clamp-2">
                {item.specialization_name}
              </h2>
            </div>

            {/* Footer */}
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 mt-4">
              <span>Xem danh sách bác sĩ</span>
              <MoveRight size={16} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpecialtyPreview;
