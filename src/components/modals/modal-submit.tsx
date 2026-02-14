import { TriangleAlert } from "lucide-react";
import { Button } from "../button";
import ModalContainer from "./modal-container";

export default function ModalSubmit({
  visible,
  loading,
  heading = "Confirm!",
  message = "Are you sure about the data entered?",
  btnText = "Confirm",
  onSubmit = () => {},
  onCancel = () => {},
}: Readonly<{
  visible: boolean;
  loading: boolean;
  heading?: string;
  message?: string;
  btnText?: string;
  onSubmit?: () => void;
  onCancel?: () => void;
}>) {
  return (
    <ModalContainer visible={visible} onClosed={onCancel}>
      <div className="flex flex-col min-w-[480px] max-w-[480px] rounded-xl w-full bg-white">
        <div className="flex flex-row gap-3 px-6 py-6 w-full">
          <div className="flex flex-row items-center justify-center w-8 h-8 rounded-full shrink-0 bg-[#FDDDB3]/40">
            <TriangleAlert color="#F79009" size={20} className="-mt-0.5" />
          </div>
          <div className="flex flex-col gap-2 mt-1">
            <p className="font-[700] text-[20px] leading-[24px] text-[#1F1F1F]">{heading}</p>
            <p className="font-[400] text-[14px] leading-[22px] text-[#595959]">{message}</p>
          </div>
        </div>
        <div className="flex flex-row gap-3 px-5 py-3 w-full justify-end bg-grey-50/30 rounded-b-xl border-t border-neutral-4">
          <Button type="button" size="md" variant="outline" onClick={onCancel} disabled={loading} text="Cancel" />
          <Button
            type="button"
            size="md"
            variant="warning"
            onClick={onSubmit}
            disabled={loading}
            text={btnText}
            load={loading}
            className="min-w-[82px]"
          />
        </div>
      </div>
    </ModalContainer>
  );
}
