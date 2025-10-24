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

  // STATE
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
      if (selectedSpecialty !== "all")
        params.specialization_id = selectedSpecialty;
      if (searchTerm) params.keyword = searchTerm;

      const res = await DoctorService.getAll(params);

      if (res?.doctors) {
        setDoctors(res.doctors);
        setTotalPages(res.totalPages || 1);
        setTotalRecords(res.totalRecords || res.doctors.length);
      } else if (Array.isArray(res)) {
        setDoctors(res);
        setTotalPages(1);
        setTotalRecords(res.length);
      } else {
        setDoctors([]);
        setTotalPages(1);
        setTotalRecords(0);
      }

      // ✅ Cập nhật URL khi người dùng tìm kiếm / thay đổi bộ lọc
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
      message.error("Không thể tải danh sách bác sĩ!");
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, orderBy, selectedSpecialty, setSearchParams, searchTerm]);

  // ===============================
  // INIT DATA
  // ===============================
  useEffect(() => {
    fetchSpecialties();
  }, [fetchSpecialties]);

  // ✅ Chỉ gọi khi thay đổi page, sort, hoặc chuyên khoa
  // ❌ Không phụ thuộc vào searchTerm để tránh spam
  useEffect(() => {
    fetchDoctors();
  }, [page, sortBy, orderBy, selectedSpecialty]);

  // ===============================
  // XỬ LÝ NÚT TÌM KIẾM
  // ===============================
  const handleSearch = () => {
    setPage(1);
    fetchDoctors();
  };

  // ===============================
  // JSX CHÍNH
  // ===============================
  return (
    <div>
      <Banner />

      <div className="max-w-[1250px] mx-auto">
        {/* Bộ lọc & tìm kiếm */}
        <div className="outline outline-gray-200 my-[40px] p-[20px] rounded-[8px] grid grid-cols-[3fr_2fr_2fr_1fr_2fr] gap-x-[16px]">
          {/* Ô tìm kiếm */}
          <div className="relative flex items-center">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <Input
              type="text"
              placeholder="Tìm kiếm bác sĩ theo tên..."
              className="px-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>

          {/* Sắp xếp */}
          <Select
            value={sortBy}
            onValueChange={(value) => {
              setSortBy(value);
              setOrderBy(value === "fullname" ? "ASC" : "DESC");
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="fullname">Theo tên (A-Z)</SelectItem>
                <SelectItem value="years_of_experience">
                  Theo kinh nghiệm
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          {/* Lọc theo chuyên khoa */}
          <Select
            value={selectedSpecialty}
            onValueChange={(value) => setSelectedSpecialty(value)}
          >
            <SelectTrigger className="w-full">
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
            variant="outline"
            className="cursor-pointer hover:bg-gray-300 max-w-[100px]"
            onClick={handleSearch}
          >
            <FunnelPlus size={18} />
            <span>Tìm</span>
          </Button>

          {/* Tổng số bác sĩ */}
          <div className="flex items-center justify-center">
            <p className="font-semibold bg-sky-200 px-3 py-1 rounded-md">
              Tìm thấy {totalRecords} bác sĩ
            </p>
          </div>
        </div>

        {/* Danh sách bác sĩ */}
        <Spin spinning={loading}>
          <div className="mb-[40px] flex flex-wrap items-center gap-[20px]">
            {doctors.length > 0 ? (
              doctors.map((doctor) => (
                <Doctor key={doctor.doctor_id} doctor={doctor} />
              ))
            ) : (
              <p className="text-gray-500 text-center w-full">
                Không tìm thấy bác sĩ nào.
              </p>
            )}
          </div>
        </Spin>

        {/* Phân trang */}
        <div className="mb-[60px]">
          <CustomPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
