const Slot = ({ start, end, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`border p-[12px] rounded-[12px] cursor-pointer transition-colors duration-200 ${
        isSelected
          ? "bg-gray-800 text-white border-black"
          : "bg-white text-black border-gray-300 hover:bg-gray-100"
      }`}
    >
      <p>
        {start} - {end}
      </p>
    </div>
  );
};

export default Slot;
