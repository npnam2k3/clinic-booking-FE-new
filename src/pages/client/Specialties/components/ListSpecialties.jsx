import Specialty from "@/pages/client/Specialties/components/Specialty";

const ListSpecialties = () => {
  return (
    <div className="grid grid-cols-4 gap-y-[40px] max-w-[1200px] mx-auto mt-[60px] place-items-center">
      <Specialty title="Tim mạch" numberDoctor="10" id={1} />
      <Specialty title="Tim mạch" numberDoctor="10" id={2} />
      <Specialty title="Tim mạch" numberDoctor="10" id={3} />
      <Specialty title="Tim mạch" numberDoctor="10" id={4} />
      <Specialty title="Tim mạch" numberDoctor="10" id={5} />
      <Specialty title="Tim mạch" numberDoctor="10" id={6} />
      <Specialty title="Tim mạch" numberDoctor="10" id={7} />
      <Specialty title="Tim mạch" numberDoctor="10" id={8} />
      <Specialty title="Tim mạch" numberDoctor="10" id={9} />
      <Specialty title="Tim mạch" numberDoctor="10" id={10} />
    </div>
  );
};

export default ListSpecialties;
