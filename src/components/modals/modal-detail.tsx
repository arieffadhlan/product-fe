import { XIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../button";
import ModalContainer from "./modal-container";

export default function ModalDetail({
  heading,
  visible,
  onClose,
  children,
  className,
  hideBtnClose = false,
}: {
  heading: string;
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  hideBtnClose?: boolean;
}) {
  return (
    <ModalContainer visible={visible} onClosed={onClose}>
      <div className={cn("flex flex-col gap-6 min-w-[1000px] max-w-[1000px] p-6 rounded-xl bg-white", className)}>
        <div className="w-full flex justify-between items-center gap-4">
          <div className="font-[600] text-[18px] leading-[100%] text-[#313030]">{heading}</div>
          {!hideBtnClose && (
            <Button
              size="iconSm"
              icon={<XIcon size={20} color="#1F1F1F" />}
              onClick={onClose}
              variant="dangers"
              className="bg-[#F5F5F5] rounded-full hover:bg-[#E1E1E1] active:bg-[#E2E2E2]"
            />
          )}
        </div>
        {children}
      </div>
    </ModalContainer>
  );
}
