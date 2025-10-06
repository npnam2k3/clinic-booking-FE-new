import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function CustomPagination({
  totalPages = 5,
  currentPage = 1,
  onPageChange = () => {},
}) {
  // Hàm đổi trang có kiểm tra giới hạn
  const handleChangePage = (page) => {
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  return (
    <Pagination>
      <PaginationContent>
        {/* Nút Previous */}
        <PaginationItem>
          <button
            onClick={() => handleChangePage(currentPage - 1)}
            disabled={currentPage === 1}
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-100 mr-2
              ${
                currentPage === 1
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100 active:scale-95 cursor-pointer"
              }`}
          >
            <ChevronLeft size={18} />
          </button>
        </PaginationItem>

        {/* Danh sách số trang */}
        {Array.from({ length: totalPages }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              onClick={() => handleChangePage(i + 1)}
              isActive={currentPage === i + 1}
              className="cursor-pointer"
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Nút Next */}
        <PaginationItem>
          <button
            onClick={() => handleChangePage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className={`flex items-center justify-center w-9 h-9 rounded-full border transition-all duration-300 ml-2
              ${
                currentPage === totalPages
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:bg-gray-100 active:scale-95 cursor-pointer"
              }`}
          >
            <ChevronRight size={18} />
          </button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
