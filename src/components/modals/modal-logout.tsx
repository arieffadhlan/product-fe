import { LogOut } from "lucide-react";
import { Button } from "../button";
import ModalContainer from "./modal-container";

interface Props {
  visible: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onClick: () => void;
}

export default function ModalLogout({ visible, setOpen, onClick }: Props) {
  return (
    <ModalContainer visible={visible} onClosed={() => setOpen(false)}>
      <div className="flex flex-col items-center gap-8 w-full p-8 rounded-t-xl bg-white sm:w-[480px] sm:rounded-xl">
        <div className="flex flex-row items-center justify-center w-16 h-16 rounded-full sm:w-[129px] sm:h-[129px]">
          <LogOut color="black" className="w-12 h-12 sm:w-[75px] sm:h-[75px]" />
        </div>
        <div className="flex flex-col items-center text-center gap-2">
          <p className="font-[600] text-[20px] text-[#1F1F1F] sm:text-[24px]">Sign Out</p>
          <p className="font-[400] text-[14px] text-[#595959] sm:text-[16px]">Are you sure you want to sign out?</p>
        </div>
        <div className="flex gap-3 w-full justify-center">
          <Button onClick={() => setOpen(false)} text="Cancel" variant="warningBordered" />
          <Button onClick={onClick} text="Yes, Sign Out" />
        </div>
      </div>
    </ModalContainer>
  );
}
