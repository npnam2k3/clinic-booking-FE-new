import { Input } from "@/components/ui/input";
import { useState } from "react";
import ReactQuill from "react-quill-new";
import { SpecialtyService } from "@/service/specialty/specialty.service";
import { message } from "antd";

const SpecialtyFormModal = ({ specialty, onClose, onSave }) => {
  // use global message so parent can render success messages reliably
  const [formData, setFormData] = useState(
    specialty || {
      name: "",
      description: "",
    }
  );
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (!formData.name.trim()) {
        message.warning("Vui lòng nhập tên chuyên khoa!");
        setLoading(false);
        return;
      }

      if (specialty) {
        // Cập nhật chuyên khoa
        await SpecialtyService.update(specialty.id, {
          specialization_name: formData.name,
          description: formData.description,
        });
      } else {
        // Thêm mới chuyên khoa
        await SpecialtyService.create({
          specialization_name: formData.name,
          description: formData.description,
        });
      }

      // Lấy lại danh sách chuyên khoa và trả về cho parent (Plan A)
      try {
        const data = await SpecialtyService.getAll();
        const mapped = data.map((item) => ({
          id: item.specialization_id,
          name: item.specialization_name,
          description: item.description,
          createdAt: item.createdAt.split("T")[0],
        }));
        // notify parent and provide success message
        onSave?.(
          mapped,
          specialty
            ? "Cập nhật chuyên khoa thành công!"
            : "Thêm mới chuyên khoa thành công!"
        );
      } catch (errList) {
        console.error("Lỗi khi tải lại chuyên khoa:", errList);
        onSave?.();
      }

      onClose();
    } catch (error) {
      message.error("Lưu chuyên khoa thất bại. Vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--color-black) 50%, transparent)",
      }}
    >
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold">
          {specialty ? "Chỉnh sửa chuyên khoa" : "Thêm chuyên khoa mới"}
        </h2>
        {specialty && (
          <p className="mb-6 text-sm text-gray-600">
            Cập nhật thông tin chuyên khoa
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 🔹 Tên chuyên khoa */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Tên chuyên khoa <span className="text-red-500">*</span>
            </label>
            <Input
              type="text"
              placeholder="Ví dụ: Tim mạch"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
            />
          </div>

          {/* 🔹 Mô tả */}
          <div>
            <label className="mb-1 block text-sm font-medium">
              Mô tả (tối đa 500 ký tự)
            </label>
            <div className="rounded-lg">
              <ReactQuill
                className="h-[200px]"
                value={formData.description}
                onChange={(value) => {
                  const plainText = value.replace(/<[^>]+>/g, "");
                  if (plainText.length <= 500) {
                    setFormData({ ...formData, description: value });
                  } else {
                    message.warning("Mô tả không được vượt quá 500 ký tự!");
                  }
                }}
                placeholder="Mô tả về chuyên môn, kinh nghiệm làm việc..."
              />
            </div>
            <p className="text-sm text-gray-500 text-right mt-1">
              {formData.description.replace(/<[^>]+>/g, "").length || 0}/500
            </p>
          </div>

          {/* 🔹 Nút hành động */}
          <div className="flex justify-end gap-3 pt-4 mt-[40px]">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="rounded-lg cursor-pointer border border-gray-300 px-4 py-2 hover:bg-gray-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg cursor-pointer bg-orange-600 px-4 py-2 text-white hover:bg-orange-700"
            >
              {loading
                ? "Đang lưu..."
                : specialty
                ? "Cập nhật"
                : "Thêm chuyên khoa"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SpecialtyFormModal;
