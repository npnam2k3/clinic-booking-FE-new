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
import Doctor from "@/pages/client/Doctors/components/Doctor";
import { FunnelPlus, MoveLeft, Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SpecialtyDetailPage = () => {
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const content = `
  <p>
    Chuyên khoa Tim Mạch tại MediCare cung cấp dịch vụ chẩn đoán, điều trị và phòng ngừa các bệnh lý về tim và mạch máu. Chuyên khoa Tim Mạch tại MediCare cung cấp dịch vụ chẩn đoán, điều trị và phòng ngừa các bệnh lý về tim và mạch máu.
    Đội ngũ bác sĩ giàu kinh nghiệm với trang thiết bị hiện đại nhất.
  </p>

  <h4>Dịch vụ chính</h4>
  <ul>
    <li>Siêu âm tim</li>
    <li>Điện tâm đồ</li>
    <li>Holter 24h</li>
    <li>Test gắng sức</li>
    <li>Thông tim chẩn đoán</li>
    <li>Can thiệp tim mạch</li>
  </ul>
`;
  const handleClickComebackBtn = () => {
    navigate(-1);
  };
  return (
    <div className="max-w-[1250px] mx-auto">
      {/* comeback button */}
      <Button
        variant="outline"
        className="bg-white text-gray-900 cursor-pointer mt-[32px]"
        onClick={handleClickComebackBtn}
      >
        <MoveLeft />
        <span>Quay lại</span>
      </Button>

      {/* description */}
      <div className="bg-gray-100 py-10 rounded-[8px] mt-[20px] flex justify-around">
        <div>
          <h1 className="text-3xl font-bold mb-[16px]">Chuyên khoa Tim Mạch</h1>
          <article
            className="prose prose-lg text-[16px]"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold">12</p>
          <p>Bác sĩ chuyên khoa</p>
        </div>
      </div>

      {/* search */}
      <div className="outline outline-gray-200 my-[40px] p-[20px] rounded-[8px] grid grid-cols-[4fr_2fr_1fr] gap-x-[16px]">
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
        <Button
          variant="outline"
          className="cursor-pointer hover:bg-gray-300 max-w-[100px]"
        >
          <FunnelPlus size={18} />
          <span>Lọc</span>
        </Button>
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
  );
};

export default SpecialtyDetailPage;
