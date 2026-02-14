import { XIcon } from "lucide-react";
import { cn } from "@/utils/cn";
import { Button } from "../button";
import ModalContainer from "./modal-container";

export default function ModalAction({
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
          <div className="font-[600] text-[18px] leading-[100%] text-[#000000]">{heading}</div>
          {!hideBtnClose && (
            <Button
              icon={<XIcon size={20} />}
              onClick={onClose}
              variant="dangers"
              className="w-10 h-10 p-2 rounded-full"
            />
          )}
        </div>
        {children}
      </div>
    </ModalContainer>
  );
}
