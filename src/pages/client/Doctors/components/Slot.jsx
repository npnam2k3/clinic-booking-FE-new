import { Clock } from "lucide-react";

const Slot = ({ start, end, isSelected, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`border p-4 rounded-xl cursor-pointer transition-all duration-200 flex items-center gap-3 ${
        isSelected
          ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-700 shadow-lg scale-105"
          : "bg-white text-gray-800 border-gray-300 hover:bg-blue-50 hover:border-blue-300 hover:shadow-md"
      }`}
    >
      <div
        className={`p-2 rounded-lg ${
          isSelected ? "bg-white/20" : "bg-blue-100"
        }`}
      >
        <Clock
          size={18}
          className={isSelected ? "text-white" : "text-blue-600"}
        />
      </div>
      <p className="font-semibold">
        {start} - {end}
      </p>
    </div>
  );
};

export default Slot;
