import { createPortal } from "react-dom";

interface ModalContainerProps extends React.ComponentProps<"dialog"> {
  onClosed: () => void;
  visible: boolean;
  children: React.ReactNode;
}
export default function ModalContainer({ visible, children, className, onClosed }: ModalContainerProps) {
  if (!visible) return null;

  return createPortal(
    <dialog open={visible} className="fixed z-50 top-0 left-0 w-[100dvw] h-[100dvh] p-0 m-0 bg-transparent">
      <div
        className={`absolute z-[50] bottom-0 left-0 top-0 w-full h-full bg-black opacity-50 inline-flex`}
        onClick={onClosed}
      ></div>
      <div
        className={`absolute z-[60] bottom-0 left-0 w-full sm:w-auto sm:bottom-auto sm:top-1/2 sm:left-1/2 sm:-translate-x-1/2 sm:-translate-y-1/2 ${className}`}
      >
        {children}
      </div>
    </dialog>,
    document.body
  );
}
