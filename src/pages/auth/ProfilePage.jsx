import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, PencilLine, Phone, Save, X } from "lucide-react";
import ChangePasswordDialog from "@/components/custom/ChangePassword";
import { userAuthService } from "@/service/auth/userAuth.service";
import {userProfileValidate} from"@/untils/vaildate/user.validate";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);
  const [originalValue, setOriginalValue] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await userAuthService.profile();
        const data = res.data;
        setProfile({
          fullname: data.contact?.fullname || "",
          phone_number: data.contact?.phone_number || "",
          address: data.contact?.address || "",
          email: data.email,
          role: data.role?.role_name,
        });
      } catch (err) {
        console.error("Lỗi tải profile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleClickUpdate = () => {
    setOriginalValue(profile);
    setIsUpdate(true);
  };

  const handleClickCancel = () => {
    setProfile(originalValue);
    setIsUpdate(false);
  };

  const handleClickSave = async () => {
    const { isValid, errors } = userProfileValidate(profile);
    if (!isValid) {
      let message = Object.values(errors).join("\n");
      alert("❌ Dữ liệu không hợp lệ:\n" + message);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        fullname: profile.fullname,
        phone_number: profile.phone_number,
        address: profile.address,
      };

      const res = await userAuthService.updateProfile(payload);
      const updated = res.data;

      // setProfile({
      //   fullname: updated.contact?.fullname || "",
      //   phone_number: updated.contact?.phone_number || "",
      //   address: updated.contact?.address || "",
      // });

      setIsUpdate(false);
      alert("Cập nhật hồ sơ thành công!");
    } catch (err) {
      console.error("Lỗi cập nhật:", err);
      alert("Cập nhật thất bại. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };


  if (loading) {
    return <p className="text-center mt-10">Đang tải thông tin...</p>;
  }

  if (!profile) {
    return <p className="text-center mt-10 text-red-500">Không có dữ liệu hồ sơ.</p>;
  }

  return (
    <div className="max-w-[1000px] mx-auto">
      <h1 className="text-3xl font-bold mb-[12px]">Hồ sơ cá nhân</h1>
      <p className="text-gray-500">
        Quản lý thông tin cá nhân và cài đặt tài khoản
      </p>

      <div className="my-[50px] flex gap-x-[40px]">
        {/* show profile */}
        <div className="border border-gray-300 p-[20px] max-w-[400px] shadow rounded-[16px]">
          <h2 className="text-xl font-semibold mb-[8px]">
            {profile.fullname || "Người dùng"}
          </h2>
          <p className="text-gray-500 mb-[20px]">{profile.email}</p>
          <Badge className="bg-gray-200 text-gray-800">
            {profile.role || "Người dùng"}
          </Badge>
          <div className="flex items-center gap-x-[12px] mt-[24px]">
            <Phone size={16} />
            <span>{profile.phone_number || "Chưa có số điện thoại"}</span>
          </div>
          <div className="flex items-center gap-x-[12px] mt-[12px]">
            <MapPin size={16} />
            <span>{profile.address || "Chưa có địa chỉ"}</span>
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
                  disabled={loading}
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
                  type="text"
                  value={profile.fullname}
                  onChange={(e) =>
                    setProfile({ ...profile, fullname: e.target.value })
                  }
                />
              ) : (
                <div className="w-full px-3 py-[2px] border border-gray-300 rounded-md bg-gray-100 text-gray-800 flex items-center min-h-[36px]">
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
                  type="text"
                  value={profile.phone_number}
                  onChange={(e) =>
                    setProfile({ ...profile, phone_number: e.target.value })
                  }
                />
              ) : (
                <div className="w-full px-3 py-[2px] border border-gray-300 rounded-md bg-gray-100 text-gray-800 flex items-center min-h-[36px]">
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
                type="text"
                value={profile.address}
                onChange={(e) =>
                  setProfile({ ...profile, address: e.target.value })
                }
              />
            ) : (
              <div className="w-full px-3 py-[2px] border border-gray-300 rounded-md bg-gray-100 text-gray-800 flex items-center min-h-[36px]">
                {profile.address || (
                  <span className="text-gray-400">Chưa có dữ liệu</span>
                )}
              </div>
            )}
          </div>

          <ChangePasswordDialog />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
