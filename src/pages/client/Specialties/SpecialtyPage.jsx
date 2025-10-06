import Banner from "@/pages/client/Specialties/components/Banner";
import ContactSupport from "@/pages/client/Specialties/components/ContactSupport";
import ListSpecialties from "@/pages/client/Specialties/components/ListSpecialties";

const SpecialtyPage = () => {
  return (
    <div>
      {/* banner */}
      <Banner />

      {/* list specialties */}
      <ListSpecialties />

      {/* contact - support */}
      <ContactSupport />
    </div>
  );
};

export default SpecialtyPage;
