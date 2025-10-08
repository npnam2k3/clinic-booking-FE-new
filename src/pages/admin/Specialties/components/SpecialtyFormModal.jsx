import { Input } from "@/components/ui/input";
import { useState } from "react";
import ReactQuill from "react-quill-new";

const SpecialtyFormModal = ({ specialty, onClose, onSave }) => {
  const [formData, setFormData] = useState(
    specialty || {
      name: "",
      description: "",
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">
          {specialty ? "Chỉnh sửa chuyên khoa" : "Thêm chuyên khoa mới"}
        </h2>
        {specialty && (
          <p className="mb-6 text-sm text-gray-600">
            Cập nhật thông tin chuyên khoa
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              Tên chuyên khoa <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ví dụ: Tim mạch"
              className=""
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">Mô tả</label>
            <div className="rounded-lg">
              <ReactQuill
                className="h-[200px]"
                value={formData.description}
                onChange={(value) =>
                  setFormData({ ...formData, description: value })
                }
                placeholder="Mô tả về chuyên môn, kinh nghiệm làm việc..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 mt-[40px]">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg cursor-pointer border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="rounded-lg cursor-pointer bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              Cập nhật
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default SpecialtyFormModal;
