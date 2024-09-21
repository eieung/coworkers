import leftImg from '@/assets/image/icon/arrow_left.svg';
import rightImg from '@/assets/image/icon/arrow_right.svg';
import calendarImg from '@/assets/image/icon/calendar.svg';
import Image from 'next/image';

const formatDate = (date: Date) => {
  const months = [
    '1월',
    '2월',
    '3월',
    '4월',
    '5월',
    '6월',
    '7월',
    '8월',
    '9월',
    '10월',
    '11월',
    '12월',
  ];
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const weekday = weekdays[date.getDay()];

  return `${month} ${day}일 (${weekday})`;
};

export default function DateManager() {
  const currentDate = formatDate(new Date());

  return (
    <div className="flex items-center gap-3">
      <h1 className="text-text-primary">{currentDate}</h1>
      <div className="flex items-center gap-1">
        <button className="flex-center flex h-4 w-4 rounded-full bg-bg-secondary">
          <Image src={leftImg} alt="왼쪽 화살표" width={12} height={12} />
        </button>
        <button className="flex-center flex h-4 w-4 rounded-full bg-bg-secondary">
          <Image src={rightImg} alt="오른쪽 화살표" width={12} height={12} />
        </button>
      </div>
      <button className="flex-center flex h-6 w-6 rounded-full bg-bg-secondary">
        <Image src={calendarImg} alt="달력" width={12} height={12} />
      </button>
    </div>
  );
}
