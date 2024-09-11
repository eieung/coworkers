import { useState } from 'react';

interface DropdownProps {
  trigger: React.ReactNode; // 트리거를 React 컴포넌트로 받음 (버튼, 이미지 등)
  items: { label: string, href?: string, onClick?: () => void }[]; // 드롭다운 항목 리스트
}

export default function Dropdown({ trigger, items }: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="flex items-center gap-x-2">
        {trigger}
      </button>

      {isOpen && (
        <ul className="absolute right-0 mt-2 w-48 bg-bg-secondary text-white rounded-xl border border-bd-primary">
          {items.map((item, index) => (
            <li
              key={index}
              className="bg-bg-secondary flex-center p-3 hover:bg-gray-600 rounded-b-lg"
              onClick={item.onClick}
            >
              {item.href ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span className={item.onClick ? "cursor-pointer" : ""}>{item.label}</span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}