const Banner = () => {
  return (
    <div className="bg-[linear-gradient(135deg,#f0f9ff,#e0f2fe)] flex items-center flex-col py-[40px]">
      <h1 className="text-5xl font-bold text-foreground mb-6 text-balance">
        Tất cả chuyên khoa
      </h1>
      <p className="text-[#737373] text-xl mb-8 text-pretty max-w-2xl mx-auto text-center">
        Khám phá đầy đủ các chuyên khoa y tế với đội ngũ bác sĩ giàu kinh nghiệm
        và trang thiết bị hiện đại
      </p>
    </div>
  );
};

export default Banner;
