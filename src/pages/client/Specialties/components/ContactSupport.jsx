import { Phone } from "lucide-react";

const ContactSupport = () => {
  return (
    <div className="mt-[80px] text-center">
      <h1 className="text-4xl font-bold mb-[24px]">
        Không tìm thấy chuyên khoa phù hợp?
      </h1>
      <p className="text-xl text-gray-600 mb-[20px]">
        Liên hệ với chúng tôi để được tư vấn và hỗ trợ tìm kiếm bác sĩ chuyên
        khoa phù hợp nhất
      </p>
      <div className="mb-[48px] px-[24px] py-[12px] bg-gray-800 text-white rounded-[12px] inline-flex items-center gap-x-[12px]">
        <Phone size={20} />
        <span>Gọi tư vấn: 1900 1234</span>
      </div>
    </div>
  );
};

export default ContactSupport;
