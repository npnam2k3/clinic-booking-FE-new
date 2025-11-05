import React, { useEffect, useState } from "react";
import Specialty from "@/pages/client/Specialties/components/Specialty";
import { SpecialtyService } from "@/service/specialty/specialty.service";

const ListSpecialties = () => {
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await SpecialtyService.getAll();
        setSpecialties(data);
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

  return (
    <div className="grid grid-cols-4 gap-y-[40px] max-w-[1200px] mx-auto mt-[60px] place-items-center">
      {specialties.map((item) => (
        <Specialty
          key={item.specialization_id}
          id={item.specialization_id}
          title={item.specialization_name}
          numberDoctor={item.doctors?.length || 0}
        />
      ))}
    </div>
  );
};

export default ListSpecialties;
