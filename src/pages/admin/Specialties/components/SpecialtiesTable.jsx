import { Pencil, Trash2, Inbox } from "lucide-react";

const SpecialtiesTable = ({ specialties, handleEdit, handleDelete }) => {
  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              {/* <th className="p-4 font-medium">Mã chuyên khoa</th> */}
              <th className="p-4 font-medium">Tên chuyên khoa</th>
              <th className="p-4 font-medium">Mô tả</th>
              <th className="p-4 font-medium">Ngày tạo</th>
              <th className="p-4 font-medium">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {specialties.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="py-10 text-center bg-gray-50 text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Inbox className="w-10 h-10 mb-2 text-gray-400" />
                    <p className="text-sm italic">Chưa có chuyên khoa nào</p>
                  </div>
                </td>
              </tr>
            ) : (
              specialties.map((specialty) => (
                <tr key={specialty.id} className="border-b last:border-0">
                  {/* <td className="p-4 text-sm">{specialty.specialization_id}</td> */}
                  <td className="p-4 text-sm font-medium">{specialty.name}</td>
                  <td className="p-4 text-sm text-gray-600">
                    <span title={specialty.description}>
                      {specialty.description.length > 100
                        ? specialty.description.slice(0, 100) + "..."
                        : specialty.description}
                    </span>
                  </td>

                  <td className="p-4 text-sm">{specialty.createdAt}</td>
                  <td className="p-4 text-sm">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleEdit(specialty)}
                        className="rounded cursor-pointer p-1 hover:bg-gray-100"
                        title="Chỉnh sửa"
                      >
                        <Pencil className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(specialty.id)}
                        className="rounded cursor-pointer p-1 hover:bg-gray-100"
                        title="Xóa"
                      >
                        <Trash2 className="h-4 w-4 text-red-600" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SpecialtiesTable;
