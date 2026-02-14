import { useState } from "react";

interface ItemProps {
  content: React.ReactNode;
  onClick: () => void;
}

interface ButtonProps {
  data: ItemProps[];
  wrap: React.ReactNode;
}

const ButtonDropdown: React.FC<ButtonProps> = ({ data, wrap }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleSelected = (click: ItemProps) => {
    setIsOpen(false);
    click.onClick();
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown}>{wrap}</button>
      {isOpen && (
        <div className="absolute z-10 right-0 flex flex-col gap-1 w-full p-3 mt-2 rounded-lg bg-white shadow-lg">
          {data.map((item, index) => (
            <button
              key={index}
              onClick={() => handleSelected(item)}
              className="cursor-pointer flex items-center w-full px-4 py-2 rounded-lg text-sm text-[#131313] bg-[#F0F1F3]"
            >
              {item.content}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ButtonDropdown;
