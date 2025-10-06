import Banner from "@/pages/client/Home/components/Banner";
import GuideBooking from "@/pages/client/Home/components/GuideBooking";
import Info from "@/pages/client/Home/components/Info";
import Specialty from "@/pages/client/Home/components/Specialty";

const HomePage = () => {
  return (
    <div className="">
      {/* banner */}
      <Banner />

      {/* info */}
      <Info />

      {/* specialties */}
      <Specialty />

      {/* guide booking */}
      <GuideBooking />
    </div>
  );
};

export default HomePage;
