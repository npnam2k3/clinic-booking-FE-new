import Banner from "@/pages/client/Home/components/Banner";
import GuideBooking from "@/pages/client/Home/components/GuideBooking";
import Info from "@/pages/client/Home/components/Info";
import SpecialtyPreview from "@/pages/client/Home/components/SpecialtyPreview";

const HomePage = () => {
  return (
    <div className="">
      {/* banner */}
      <Banner />

      {/* info */}
      <Info />

      {/* specialties */}
      <SpecialtyPreview />

      {/* guide booking */}
      <GuideBooking />
    </div>
  );
};

export default HomePage;
