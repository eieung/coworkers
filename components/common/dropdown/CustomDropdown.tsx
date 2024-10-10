import { useState } from 'react';
import Dropdown from './Dropdown';
import toggleImg from '@/assets/image/icon/toggle.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';

/*
 * @component
 * CustomDropdown - trigger에 선택한 텍스트가 반영되는 드롭다운 컴포넌트
 *
 * @props
 * - trigger (optional): 드롭다운의 트리거로 사용할 React 노드입니다.
 * - items: 드롭다운에 표시할 항목의 리스트입니다. 각 항목은 label, href, onClick 속성을 가질 수 있습니다.
 * - defaultSelectedItem (optional): 드롭다운이 초기 렌더링 시 선택될 기본 항목입니다.
 *
 * @usage
 * <CustomDropdown
 *   items={[
 *     { label: '옵션 1', onClick: () => console.log('옵션 1 선택') },
 *     { label: '옵션 2', onClick: () => console.log('옵션 2 선택') },
 *   ]}
 *   defaultSelectedItem="옵션 1"
 * />
 */

interface CustomDropdownProps {
  trigger?: React.ReactNode;
  items: { label: string; href?: string; onClick?: () => void }[];
  defaultSelectedItem?: string | null;
}

export default function CustomDropdown({
  items,
  defaultSelectedItem = null,
}: CustomDropdownProps) {
  // 선택된 항목 상태 관리
  const [selectedItem, setSelectedItem] = useState<string>(
    defaultSelectedItem || items[0].label, // 기본 선택 항목 또는 첫 번째 항목
  );

  // 항목 선택 시 상태 업데이트
  const handleSelect = (label: string) => {
    setSelectedItem(label);
  };

  // 드롭다운 열린 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // boards 페이지 일때
  const router = useRouter();
  const isBoardsPage = router.pathname === '/boards';

  return (
    <div className="flex items-center">
      <Dropdown
        trigger={
          <>
            <div
              className={twMerge(
                'font-medium-14 flex h-11 items-center justify-between gap-2 rounded-xl p-[10px_12.5px]',
                !isBoardsPage
                  ? 'font-medium-14 w-[109px] bg-bg-darkBlue text-text-default'
                  : 'font-regular-14 w-[120px] bg-bg-tertiary text-text-primary', // /boards 페이지일 때 색상 변경
              )}
            >
              {selectedItem} {/* 현재 선택된 항목 표시 */}
              <Image
                className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} // 드롭다운이 열리면 아이콘 회전
                src={toggleImg}
                alt="토글"
                width={24}
                height={24}
              />
            </div>
          </>
        }
        items={items} // 드롭다운에 표시할 항목 리스트
        onSelect={handleSelect}
        className={twMerge(
          'font-medium-14 h-10',
          !isBoardsPage ? 'w-[109px]' : 'w-[120px]',
        )}
        onToggle={setIsOpen} // 드롭다운 열림 상태
      />
    </div>
  );
}
