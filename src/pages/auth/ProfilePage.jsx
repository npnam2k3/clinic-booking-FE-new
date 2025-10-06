import ChangePasswordDialog from "@/components/custom/ChangePassword";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, PencilLine, Phone, Save, X } from "lucide-react";
import { useState } from "react";

const ProfilePage = () => {
  const profileObj = {
    fullname: "Nguyễn Văn A",
    phone_number: "0123456789",
    address: "123 Đường ABC, Quận 1, TP.HCM",
  };
  const [profile, setProfile] = useState(profileObj);
  const [isUpdate, setIsUpdate] = useState(false);
  const [originalValue, setOriginalValue] = useState({});

  const handleClickUpdate = () => {
    setOriginalValue(profile);
    setIsUpdate(true);
  };

  const handleClickSave = () => {
    setIsUpdate(false);
  };

  const handleClickCancel = () => {
    setProfile(originalValue);
    setIsUpdate(false);
  };

  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-3xl font-bold mb-[12px]">Hồ sơ cá nhân</h1>
      <p className="text-gray-500">
        Quản lý thông tin cá nhân và cài đặt tài khoản
      </p>

      <div className="my-[50px] flex gap-x-[40px]">
        {/* show profile */}
        <div className="border border-gray-300 p-[20px] max-w-[400px] shadow rounded-[16px]">
          <h2 className="text-xl font-semibold mb-[8px]">Nguyễn Văn A</h2>
          <p className="text-gray-500 mb-[20px]">nguyenvana@email.com</p>
          <Badge className="bg-gray-200 text-gray-800">
            Tài khoản người dùng
          </Badge>
          <div className="flex items-center gap-x-[12px] mt-[24px]">
            <Phone size={16} />
            <span>0123456789</span>
          </div>
          <div className="flex items-center gap-x-[12px] mt-[12px]">
            <MapPin size={16} />
            <span>123 Đường ABC, Quận 1, TP.HCM</span>
          </div>
        </div>

        {/* edit profile */}
        <div className="border border-gray-300 p-[20px] w-[600px] max-w-[600px] shadow rounded-[16px]">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold">Thông tin cá nhân</h3>
              <p className="text-gray-500">
                Cập nhật thông tin cá nhân của bạn
              </p>
            </div>
            {!isUpdate ? (
              <button
                className="flex items-center gap-x-[8px] border border-gray-300 px-[20px] py-[6px] rounded-[12px] cursor-pointer hover:bg-gray-200 transition duration-200"
                onClick={handleClickUpdate}
              >
                <PencilLine size={16} />
                <span>Chỉnh sửa</span>
              </button>
            ) : (
              <div className="flex items-center gap-x-[12px]">
                <button
                  className="flex items-center gap-x-[8px] bg-gray-800 text-white px-[12px] py-[6px] rounded-[12px] cursor-pointer hover:bg-gray-600 transition duration-200"
                  onClick={handleClickSave}
                >
                  <Save size={16} />
                  <span>Lưu</span>
                </button>
                <button
                  className="flex items-center gap-x-[8px] border border-gray-300 px-[12px] py-[6px] rounded-[12px] cursor-pointer hover:bg-gray-200 transition duration-200"
                  onClick={handleClickCancel}
                >
                  <X size={16} />
                  <span>Hủy</span>
                </button>
              </div>
            )}
          </div>

          <div className="mt-[40px] flex items-center gap-x-[28px]">
            <div className="w-[50%]">
              <Label className="mb-[12px]">Họ và tên</Label>
              {isUpdate ? (
                <Input
                  type={"text"}
                  value={profile.fullname}
                  onChange={(e) =>
                    setProfile({ ...profile, fullname: e.target.value })
                  }
                />
              ) : (
                <div className="w-full px-3 py-[2px] border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-default flex items-center min-h-[36px]">
                  {profile.fullname || (
                    <span className="text-gray-400">Chưa có dữ liệu</span>
                  )}
                </div>
              )}
            </div>
            <div className="w-[50%]">
              <Label className="mb-[12px]">Số điện thoại</Label>
              {isUpdate ? (
                <Input
                  type={"text"}
                  value={profile.phone_number}
                  onChange={(e) =>
                    setProfile({ ...profile, phone_number: e.target.value })
                  }
                />
              ) : (
                <div className="w-full px-3 py-[2px] border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-default flex items-center min-h-[36px]">
                  {profile.phone_number || (
                    <span className="text-gray-400">Chưa có dữ liệu</span>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="mt-[20px]">
            <Label className="mb-[12px]">Địa chỉ</Label>
            {isUpdate ? (
              <Input
                type={"text"}
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            ) : (
              <div className="w-full px-3 py-[2px] border border-gray-300 rounded-md bg-gray-100 text-gray-800 cursor-default flex items-center min-h-[36px]">
                {profile.address || (
                  <span className="text-gray-400">Chưa có dữ liệu</span>
                )}
              </div>
            )}
          </div>

          {/* <button className="mt-[40px] border border-gray-300 px-[20px] py-[6px] rounded-[12px] cursor-pointer hover:bg-gray-200 transition duration-200">
            Đổi mật khẩu
          </button> */}
          <ChangePasswordDialog />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
