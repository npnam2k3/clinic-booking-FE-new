const GuideBooking = () => {
  return (
    <div className="py-[40px] px-[30px] mb-[20px]">
      <div className="text-center">
        <h1 className="text-4xl font-bold">Quy trình đặt lịch</h1>
        <p className="mt-[18px] text-gray-600 text-xl">
          Chỉ với 3 bước đơn giản, bạn đã có thể đặt lịch khám với bác sĩ chuyên
          khoa
        </p>
      </div>
      <div className="flex justify-between mt-[60px]">
        {/* item 1 */}
        <div className="flex flex-col gap-y-[20px] items-center max-w-[400px] text-pretty text-center">
          <div className="bg-black text-white rounded-full w-[60px] h-[60px] flex justify-center items-center">
            <span className="text-xl font-semibold">1</span>
          </div>
          <span className="text-xl font-semibold">Chọn chuyên khoa</span>
          <p className="text-gray-700">
            Lựa chọn chuyên khoa phù hợp với tình trạng sức khỏe con của bạn
          </p>
        </div>
        {/* item 2 */}
        <div className="flex flex-col gap-y-[20px] items-center">
          <div className="bg-black text-white rounded-full w-[60px] h-[60px] flex justify-center items-center">
            <span className="text-xl font-semibold">2</span>
          </div>
          <span className="text-xl font-semibold">Chọn bác sĩ & thời gian</span>
          <p className="text-gray-700">
            Xem thông tin bác sĩ và chọn thời gian khám phù hợp
          </p>
        </div>
        {/* item 3 */}
        <div className="flex flex-col gap-y-[20px] items-center">
          <div className="bg-black text-white rounded-full w-[60px] h-[60px] flex justify-center items-center">
            <span className="text-xl font-semibold">3</span>
          </div>
          <span className="text-xl font-semibold">Xác nhận đặt lịch</span>
          <p className="text-gray-700">
            Điền thông tin cá nhân và xác nhận lịch khám của bạn
          </p>
        </div>
      </div>
    </div>
  );
};

export default GuideBooking;
