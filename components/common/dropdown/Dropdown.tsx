import useClickOutside from '@/hooks/useClickOutside';
import { useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

interface DropdownProps {
  trigger: React.ReactNode; // 트리거를 React 컴포넌트로 받음 (버튼, 이미지 등)
  items: { label: string; href?: string; onClick?: () => void }[]; // 드롭다운 항목 리스트
  className?: string; // 메뉴 전체 스타일
  itemClassName?: string; // 각 메뉴의 스타일
  onSelect?: (label: string) => void; // trigger에 선택된 text 보이게 할 때
  onToggle?: (isOpen: boolean) => void; // 열린 상태인지 부모에서 상태 확인용
}

export default function Dropdown({
  trigger,
  items,
  className,
  itemClassName,
  onSelect,
  onToggle = () => {},
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 외부 클릭시 드롭다운 닫기
  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
    onToggle(false);
  });

  // 메뉴 클릭 시 드롭다운 닫기
  const handleItemClick = (label: string, onClick?: () => void) => {
    if (onSelect) onSelect(label);
    if (onClick) {
      onClick();
    }
    setIsOpen(false);
    onToggle(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          onToggle(!isOpen);
        }}
        className="flex items-center gap-x-2"
      >
        {trigger}
      </button>

      {isOpen && (
        <ul
          className={twMerge(
            'absolute right-0 z-20 mt-2 w-48 rounded-xl border border-bd-primary bg-bg-secondary text-white',
            className,
          )}
        >
          {items.map((item, index) => (
            <li
              key={index}
              className={twMerge(
                'flex-center bg-bg-secondary p-3 hover:bg-gray-600',
                index === 0 ? 'rounded-t-lg' : '',
                index === items.length - 1 ? 'rounded-b-lg' : '',
                itemClassName,
              )}
              onClick={() => handleItemClick(item.label, item.onClick)} // 메뉴 클릭 시 드롭다운 닫기
            >
              {item.href ? (
                <a href={item.href}>{item.label}</a>
              ) : (
                <span className={item.onClick ? 'cursor-pointer' : ''}>
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
