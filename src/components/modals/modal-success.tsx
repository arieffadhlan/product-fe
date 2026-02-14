import { CheckCheck } from "lucide-react";
import { Button } from "../button";
import ModalContainer from "./modal-container";

type ModalSuccessProps = {
  visible: boolean;
  btnText?: string;
  heading?: string;
  message?: React.ReactNode;
  onClose: () => void;
};

export default function ModalSuccess({
  visible,
  message,
  heading = "Congratulations",
  btnText = "Close",
  onClose,
}: ModalSuccessProps) {
  return (
    <ModalContainer visible={visible} onClosed={onClose}>
      <div className="flex flex-col justify-center items-center min-w-[480px] max-w-[480px] rounded-xl w-full bg-white">
        <div className="flex flex-row gap-3 px-5 py-5 w-full">
          <div className="flex flex-row items-center justify-center w-8 h-8 rounded-full shrink-0 bg-[#B6E8D1]/30">
            <CheckCheck color="#12B569" size={20} />
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <p className="font-[700] text-[20px] leading-[24px] text-[#1F1F1F]">{heading}</p>
            <p className="font-[400] text-[14px] leading-[22px] text-[#595959]">{message}</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 px-5 py-3 w-full justify-end bg-grey-50/30 rounded-b-xl border-t border-neutral-4">
          <Button text={btnText} onClick={onClose} variant="default" size="md" />
        </div>
      </div>
    </ModalContainer>
  );
}
