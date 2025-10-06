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
import { useState } from "react";

const DoctorPage = () => {
  const [page, setPage] = useState(1);
  const n = 8;
  return (
    <div>
      {/* banner */}
      <Banner />

      <div className="max-w-[1250px] mx-auto">
        {/* search + sort */}
        <div className="outline outline-gray-200 my-[40px] p-[20px] rounded-[8px] grid grid-cols-[3fr_2fr_2fr_1fr_2fr] gap-x-[16px]">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <Input
              type="text"
              placeholder="Tìm kiếm bác sĩ theo tên..."
              className="px-10"
            />
          </div>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Sắp xếp" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="fullname">Sắp xếp theo tên</SelectItem>
                <SelectItem value="work-experience">
                  Sắp xếp theo kinh nghiệm
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Chuyên khoa" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">Tất cả chuyên khoa</SelectItem>
                <SelectItem value="1">Tim mạch</SelectItem>
                <SelectItem value="2">Xương khớp</SelectItem>
                <SelectItem value="3">Thần kinh</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            className="cursor-pointer hover:bg-gray-300 max-w-[100px]"
          >
            <FunnelPlus size={18} />
            <span>Lọc</span>
          </Button>

          <div className="flex items-center justify-center">
            <p className="font-semibold bg-sky-200 px-3 py-1 rounded-md">
              Tìm thấy {n} bác sĩ
            </p>
          </div>
        </div>

        {/* list doctor */}
        <div className="mb-[40px] flex flex-wrap items-center gap-[20px]">
          <Doctor id={1} />
          <Doctor id={2} />
          <Doctor id={3} />
          <Doctor id={4} />
          <Doctor id={5} />
          <Doctor id={6} />
          <Doctor id={7} />
        </div>

        {/* pagination */}
        <div className="mb-[60px]">
          <CustomPagination
            currentPage={page}
            totalPages={5}
            onPageChange={(p) => setPage(p)}
          />
        </div>
      </div>
    </div>
  );
};

export default DoctorPage;
