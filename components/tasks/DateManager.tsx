import leftImg from '@/assets/image/icon/arrow_left.svg';
import rightImg from '@/assets/image/icon/arrow_right.svg';
import calendarImg from '@/assets/image/icon/calendar.svg';
import CustomCalendar from '@/components/common/CustomCalendar';
import useClickOutside from '@/hooks/useClickOutside';
import clsx from 'clsx';
import Image from 'next/image';
import { memo, useRef, useState } from 'react';

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

interface DateManagerProps {
  currentDate: string;
  setCurrentDate: (date: string) => void;
}

const DateManager = memo(function DateManager({
  currentDate,
  setCurrentDate,
}: DateManagerProps) {
  const [isCalendarVisible, setCalendarVisible] = useState(false);
  const calendarRef = useRef<HTMLDivElement>(null);

  const adjustToLocalDate = (date: Date) => {
    const adjustedDate = new Date(date.getTime());
    adjustedDate.setHours(0, 0, 0, 0);
    return adjustedDate;
  };

  const handlePrevDate = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(prevDate.getDate() - 1);
    setCurrentDate(prevDate.toLocaleDateString('sv'));
  };

  const handleNextDate = () => {
    const nextDate = new Date(currentDate);
    nextDate.setDate(nextDate.getDate() + 1);
    setCurrentDate(nextDate.toLocaleDateString('sv'));
  };

  const toggleCalendar = () => {
    setCalendarVisible((prev) => !prev);
  };

  useClickOutside(calendarRef, () => {
    setCalendarVisible(false);
  });

  const date = new Date();
  date.setHours(date.getHours() + 9);
  const today = date.toISOString().split('T')[0];

  return (
    <div className="relative flex items-center gap-3">
      <h1 className="text-text-primary">
        {formatDate(adjustToLocalDate(new Date(currentDate)))}
      </h1>
      <div className="flex items-center gap-1">
        <div
          className={clsx(
            'absolute left-[50px] top-[-22px] flex items-center justify-center',
            today !== currentDate ? 'hidden' : '',
          )}
        >
          <h1 className="glow-text rounded-lg p-[2px] text-sm font-bold text-transparent">
            today
          </h1>
        </div>
        <button
          className="flex-center flex h-4 w-4 rounded-full bg-bg-secondary"
          onClick={handlePrevDate}
        >
          <Image src={leftImg} alt="왼쪽 화살표" width={12} height={12} />
        </button>
        <button
          className="flex-center flex h-4 w-4 rounded-full bg-bg-secondary"
          onClick={handleNextDate}
        >
          <Image src={rightImg} alt="오른쪽 화살표" width={12} height={12} />
        </button>
      </div>
      <button
        className="flex-center flex h-6 w-6 rounded-full bg-bg-secondary"
        onClick={toggleCalendar}
      >
        <Image src={calendarImg} alt="달력" width={12} height={12} />
      </button>
      {isCalendarVisible && (
        <div
          className="absolute left-0 top-10 z-20 w-[282px] rounded-3xl bg-bg-secondary shadow-lg"
          ref={calendarRef}
        >
          <CustomCalendar
            onDateSelect={(date) => {
              if (date) {
                setCurrentDate(
                  adjustToLocalDate(date).toLocaleDateString('sv'),
                );
                setCalendarVisible(false);
              }
            }}
          />
        </div>
      )}
    </div>
  );
});

export default DateManager;
