import { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import CustomPagination from "@/components/custom/Pagination";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Banner from "@/pages/client/Doctors/components/Banner";
import Doctor from "@/pages/client/Doctors/components/Doctor";
import { FunnelPlus, Search } from "lucide-react";
import { message, Spin } from "antd";
import { DoctorService } from "@/service/doctor/useDoctor.service";
import { SpecialtyService } from "@/service/specialty/specialty.service";

const DoctorPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Lấy dữ liệu ban đầu từ URL
  const initialKeyword = searchParams.get("keyword") || "";
  const initialSpecialty = searchParams.get("specialization_id") || "all";
  const initialSortBy = searchParams.get("sortBy") || "years_of_experience";
  const initialOrderBy = searchParams.get("orderBy") || "DESC";
  const initialPage = Number(searchParams.get("page")) || 1;

  // STATE chính
  const [page, setPage] = useState(initialPage);
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [searchTerm, setSearchTerm] = useState(initialKeyword);
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [orderBy, setOrderBy] = useState(initialOrderBy);
  const [selectedSpecialty, setSelectedSpecialty] = useState(initialSpecialty);

  // STATE tạm (người dùng thay đổi nhưng chưa bấm "Tìm")
  const [pendingSortBy, setPendingSortBy] = useState(sortBy);
  const [pendingOrderBy, setPendingOrderBy] = useState(orderBy);
  const [pendingSpecialty, setPendingSpecialty] = useState(selectedSpecialty);
  const [pendingKeyword, setPendingKeyword] = useState(searchTerm);
  const [messageApi, contextHolder] = message.useMessage();

  // ===============================
  // FETCH DANH SÁCH CHUYÊN KHOA
  // ===============================
  const fetchSpecialties = useCallback(async () => {
    try {
      const data = await SpecialtyService.getAll();
      setSpecialties(data);
    } catch (err) {
      console.error("Lỗi khi tải danh sách chuyên khoa:", err);
    }
  }, []);

  // ===============================
  // FETCH DANH SÁCH BÁC SĨ
  // ===============================
  const fetchDoctors = useCallback(async () => {
    try {
      setLoading(true);
      const params = {
        pageNum: page,
        limitNum: 8,
        sortBy,
        orderBy,
      };
      if (selectedSpecialty !== "all") params.specialtyId = selectedSpecialty;
      if (searchTerm) params.keyword = searchTerm;

      const res = await DoctorService.getAll(params);

      if (res?.doctors) {
        setDoctors(res.doctors);
        setTotalPages(res.totalPages || 1);
        setTotalRecords(res.totalRecords || res.doctors.length);
      } else {
        setDoctors([]);
        setTotalPages(1);
        setTotalRecords(0);
      }

      const query = {
        page: page.toString(),
        sortBy,
        orderBy,
      };
      if (searchTerm) query.keyword = searchTerm;
      if (selectedSpecialty !== "all")
        query.specialization_id = selectedSpecialty;
      setSearchParams(query);
    } catch (err) {
      console.error("Lỗi khi tải danh sách bác sĩ:", err);
      messageApi.error("Không thể tải danh sách bác sĩ!");
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, orderBy, selectedSpecialty, searchTerm, setSearchParams]);

  // ===============================
  // INIT DATA
  // ===============================
  useEffect(() => {
    fetchSpecialties();
  }, [fetchSpecialties]);

  useEffect(() => {
    fetchDoctors();
  }, [page]); // ✅ chỉ gọi khi chuyển trang

  // ===============================
  // XỬ LÝ KHI NHẤN NÚT "TÌM"
  // ===============================
  const handleSearch = () => {
    setPage(1);
    // Áp dụng giá trị đang chọn
    setSortBy(pendingSortBy);
    setOrderBy(pendingOrderBy);
    setSelectedSpecialty(pendingSpecialty);
    setSearchTerm(pendingKeyword);
    // fetch lại sau khi state cập nhật (delay nhẹ để đảm bảo setState xong)
    setTimeout(fetchDoctors, 0);
  };

  // ===============================
  // JSX
  // ===============================
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      {contextHolder}
      <Banner />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Bộ lọc & tìm kiếm */}
        <div className="bg-white border border-gray-200 shadow-lg rounded-2xl p-6 mb-8 hover:shadow-xl transition-shadow">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr_2fr] gap-4">
            {/* Ô tìm kiếm */}
            <div className="relative flex items-center">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <Input
                type="text"
                placeholder="Tìm kiếm bác sĩ theo tên..."
                className="pl-11 h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                value={pendingKeyword}
                onChange={(e) => setPendingKeyword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>

            {/* Lọc theo chuyên khoa */}
            <Select
              value={pendingSpecialty}
              onValueChange={(value) => setPendingSpecialty(value)}
            >
              <SelectTrigger className="w-full h-11 border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all">
                <SelectValue placeholder="Chuyên khoa" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Tất cả chuyên khoa</SelectItem>
                  {specialties.map((spec) => (
                    <SelectItem
                      key={spec.specialization_id}
                      value={String(spec.specialization_id)}
                    >
                      {spec.specialization_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            {/* Nút tìm */}
            <Button
              className="h-11 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white cursor-pointer shadow-md hover:shadow-lg transition-all"
              onClick={handleSearch}
            >
              <FunnelPlus size={18} className="mr-2" />
              <span>Tìm kiếm</span>
            </Button>

            {/* Tổng số bác sĩ */}
            <div className="flex items-center justify-center">
              <div className="bg-gradient-to-r from-blue-100 to-cyan-100 border border-blue-200 px-4 py-2 rounded-xl shadow-sm">
                <p className="font-semibold text-blue-800">
                  <span className="text-2xl">{totalRecords}</span>
                  <span className="text-sm ml-2">bác sĩ</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Danh sách bác sĩ */}
        <Spin spinning={loading}>
          <div className="mb-12">
            {doctors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {doctors.map((doctor) => (
                  <Doctor key={doctor.doctor_id} doctor={doctor} />
                ))}
              </div>
            ) : (
              <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center shadow-md">
                <p className="text-gray-500 text-lg">
                  Không tìm thấy bác sĩ nào phù hợp.
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Vui lòng thử lại với từ khóa khác.
                </p>
              </div>
            )}
          </div>
        </Spin>

        {/* Phân trang */}
        {totalPages > 1 && (
          <div className="mb-16 flex justify-center">
            <CustomPagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={(p) => setPage(p)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorPage;
