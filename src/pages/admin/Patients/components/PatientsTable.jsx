import { Eye, Pencil, Trash2, Inbox } from "lucide-react";

const PatientsTable = ({ patients, handleEdit, handleDelete, handleView }) => {
  return (
    <div className="rounded-lg bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="border-b bg-gray-50">
            <tr className="text-left text-sm text-gray-600">
              <th className="p-4 font-medium">Mã BN</th>
              <th className="p-4 font-medium">Họ tên</th>
              <th className="p-4 font-medium">Giới tính</th>
              <th className="p-4 font-medium">Ngày sinh</th>
              <th className="p-4 font-medium">Số điện thoại</th>
              <th className="p-4 font-medium">Địa chỉ</th>
              <th className="p-4 font-medium">Ngày tạo</th>
              <th className="p-4 font-medium">Thao tác</th>
            </tr>
          </thead>

          <tbody>
            {patients.length === 0 ? (
              <tr>
                <td
                  colSpan={8}
                  className="py-10 text-center bg-gray-50 text-gray-500"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Inbox className="w-10 h-10 mb-2 text-gray-400" />
                    <p className="text-sm italic">Chưa có bệnh nhân nào</p>
                  </div>
                </td>
              </tr>
            ) : (
              patients.map((patient) => (
                <tr key={patient.id} className="border-b last:border-0">
                  <td className="p-4 text-sm">{patient.id}</td>
                  <td className="p-4 text-sm font-medium">{patient.name}</td>
                  <td className="p-4 text-sm">{patient.gender}</td>
                  <td className="p-4 text-sm">{patient.dob}</td>
                  <td className="p-4 text-sm">{patient.phone}</td>
                  <td className="p-4 text-sm">{patient.address}</td>
                  <td className="p-4 text-sm">{patient.createdAt}</td>
                  <td className="p-4 text-sm">
                    <div className="flex items-center gap-3">
                      <button
                        className="rounded cursor-pointer p-1 hover:bg-gray-100"
                        title="Xem chi tiết"
                        onClick={() => handleView(patient)}
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleEdit(patient)}
                        className="rounded cursor-pointer p-1 hover:bg-gray-100"
                        title="Chỉnh sửa"
                      >
                        <Pencil className="h-4 w-4 text-gray-600" />
                      </button>
                      <button
                        onClick={() => handleDelete(patient)}
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

export default PatientsTable;
