import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { SlashIcon } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

const nameMap = {
  "chuyen-khoa": "Chuyên khoa",
  "detail-specialty": "Chi tiết chuyên khoa",
  "bac-si": "Bác sĩ",
};

export default function BreadcrumbNav() {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Trang chủ</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {segments.map((segment, index) => {
          const path = "/" + segments.slice(0, index + 1).join("/");
          const isLast = index === segments.length - 1;
          const label = nameMap[segment] || segment;

          return (
            <div key={path} className="flex items-center">
              <BreadcrumbSeparator>{"/ "}</BreadcrumbSeparator>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={path}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </div>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
