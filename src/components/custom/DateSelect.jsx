import { useEffect, useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/vi"; // để hiển thị tiếng Việt
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

dayjs.locale("vi");

export default function DateSelect({ selectedDate, setSelectedDate }) {
  // tạo mảng 7 ngày từ hôm nay
  const days = Array.from({ length: 7 }, (_, i) => dayjs().add(i, "day"));

  // giá trị mặc định là hôm nay
  // set mặc định là hôm nay khi mount
  useEffect(() => {
    if (!selectedDate) {
      setSelectedDate(days[0].format("YYYY-MM-DD"));
    }
  }, [selectedDate, setSelectedDate]);

  return (
    <Select
      value={selectedDate}
      onValueChange={(value) => setSelectedDate(value)}
    >
      <SelectTrigger className="w-[50%]">
        <SelectValue placeholder="Chọn ngày" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {days.map((date) => {
            const value = date.format("YYYY-MM-DD");
            const label = `${capitalizeFirstLetter(
              date.format("dddd") // lấy tên thứ trong tuần của 1 ngày cụ thể
            )} - Ngày ${date.format("DD/MM/YYYY")}`;

            return (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

// Hàm viết hoa chữ cái đầu của thứ
export function capitalizeFirstLetter(str) {
  return str?.charAt(0)?.toUpperCase() + str?.slice(1);
}
