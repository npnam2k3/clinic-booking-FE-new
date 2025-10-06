import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function SuccessDialog({ open, onOpenChange }) {
  const navigate = useNavigate();
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-[400px] text-center"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
      >
        <div className="flex flex-col items-center text-center">
          <CheckCircle2 className="mx-auto mb-4 text-green-600" size={48} />
          <h2 className="text-2xl font-bold">Thành công!</h2>
          <p className="text-gray-700 mt-2">
            Lịch khám của bạn đã được đặt thành công.
          </p>

          <Button
            className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white cursor-pointer"
            onClick={() => {
              onOpenChange(false);
              navigate("/");
            }}
          >
            Về trang chủ
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
