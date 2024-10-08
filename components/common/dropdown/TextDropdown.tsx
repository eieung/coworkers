import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import toggleImg from '@/assets/image/icon/toggle.svg';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { twMerge } from 'tailwind-merge';
import axios from 'axios';

interface TextDropdownProps {
  trigger?: React.ReactNode;
  apiUrl: string; // API URL을 prop으로 받음
  defaultSelectedItem?: string | null;
}

export default function TextDropdown({
  apiUrl,
  defaultSelectedItem = null,
}: TextDropdownProps) {
  const [items, setItems] = useState<{ label: string; href?: string; onClick?: () => void }[]>([]);
  const [selectedItem, setSelectedItem] = useState<string>(defaultSelectedItem || '');
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const isBoardsPage = router.pathname === '/boards';

  // API 호출하여 항목 가져오기
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(apiUrl); // Swagger API 호출  
        const fetchedItems = response.data; // API로부터 가져온 데이터
        setItems(fetchedItems); // 상태 업데이트
        if (defaultSelectedItem === null && fetchedItems.length > 0) {
          setSelectedItem(fetchedItems[0].label); // 첫 번째 항목으로 기본 선택
        }
      } catch (error) {
        console.error('API 호출 실패:', error);
      }
    };

    fetchItems();
  }, [apiUrl, defaultSelectedItem]);

  // 항목 선택 시 상태 업데이트
  const handleSelect = (label: string) => {
    setSelectedItem(label);
  };

<<<<<<< HEAD
=======
  // 드롭다운 열린 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // boards 페이지 일때
  const router = useRouter();
  const isBoardsPage = router.pathname === '/boards';

>>>>>>> develop
  return (
    <div className="flex items-center">
      <Dropdown
        trigger={
<<<<<<< HEAD
          <div
            className={twMerge(
              'font-medium-14 flex h-11 items-center justify-between gap-2 rounded-xl p-[10px_12.5px]',
              !isBoardsPage
                ? 'font-medium-14 w-[109px] bg-bg-dropdown text-text-default'
                : 'font-regular-14 w-[120px] bg-bg-tertiary text-text-primary',
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
=======
          <>
            <div
              className={twMerge(
                'font-medium-14 flex h-11 items-center justify-between gap-2 rounded-xl p-[10px_12.5px]',
                !isBoardsPage
                  ? 'font-medium-14 bg-bg-darkBlue w-[109px] text-text-default'
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
>>>>>>> develop
        }
        items={items.map(item => ({
          label: item.label,
          onClick: () => handleSelect(item.label),
        }))} // 드롭다운에 표시할 항목 리스트
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
