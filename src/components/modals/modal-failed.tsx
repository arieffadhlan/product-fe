import { X } from "lucide-react";
import { Button } from "../button";
import ModalContainer from "./modal-container";

type ModalFailedProps = {
  visible: boolean;
  message: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClose?: () => void;
};

export default function ModalFailed({ visible, message, setOpen, onClose = () => null }: ModalFailedProps) {
  const handleClose = () => {
    setOpen(false);
    onClose();
  };

  return (
    <ModalContainer visible={visible} onClosed={onClose}>
      <div className="flex flex-col min-w-[480px] max-w-[480px] rounded-xl w-full bg-white">
        <div className="flex flex-row gap-3 px-6 py-6 w-full">
          <div className="flex flex-row items-center justify-center w-8 h-8 rounded-full shrink-0 bg-[#FFB0B0]/30">
            <X color="#FF0000" size={20} />
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <p className="font-[700] text-[20px] leading-[24px] text-[#1F1F1F]">Failed</p>
            <p className="font-[400] text-[14px] leading-[22px] text-[#595959]">{message || ""}</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 px-5 py-3 w-full justify-end bg-grey-50/30 rounded-b-xl border-t border-neutral-4">
          <Button text="Close" onClick={handleClose} variant="default" size="md" />
        </div>
      </div>
    </ModalContainer>
  );
}
