import { useState } from 'react';
import Image from 'next/image';
import leftArrowImg from '@/assets/image/icon/triangle_arrow_left.svg';
import rightArrowImg from '@/assets/image/icon/triangle_arrow_right.svg';

interface CustomCalendarProps {
  onDateSelect: (date: Date | null) => void;
}

const CustomCalendar = ({ onDateSelect }: CustomCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // 월의 첫 번째 날과 마지막 날 계산
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  };

  const getLastDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  };

  // 달력의 날짜 배열 생성
  const generateCalendar = (date: Date) => {
    const firstDay = getFirstDayOfMonth(date);
    const lastDay = getLastDayOfMonth(date);
    const days: Date[] = [];

    // 첫 주의 빈 공간 추가
    for (let i = 0; i < firstDay.getDay(); i++) {
      days.push(
        new Date(
          firstDay.getFullYear(),
          firstDay.getMonth(),
          i - firstDay.getDay() + 1,
        ),
      );
    }

    // 현재 월의 날짜 추가
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(firstDay.getFullYear(), firstDay.getMonth(), i));
    }

    // 다음 주의 빈 공간 추가
    for (let i = lastDay.getDay() + 1; i < 7; i++) {
      days.push(
        new Date(
          lastDay.getFullYear(),
          lastDay.getMonth() + 1,
          i - lastDay.getDay() + 1,
        ),
      );
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    if (date.getMonth() === currentMonth.getMonth()) {
      setSelectedDate(date);
      onDateSelect(date);
    }
  };

  const calendarDays = generateCalendar(currentMonth);

  const handlePrevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1),
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1),
    );
  };

  return (
    <div className="w-full rounded-xl border border-bd-primary p-4 hover:border-it-hover">
      <header className="flex items-center justify-between py-[5px]">
        <button onClick={handlePrevMonth}>
          <Image
            src={leftArrowImg}
            alt="Previous month"
            width={24}
            height={24}
          />
        </button>
        {/* 현재 연도 및 월 */}
        <h2 className="font-medium-14 text-text-inverse">
          {currentMonth.getFullYear()}년{' '}
          {currentMonth.toLocaleString('ko-KR', { month: 'long' })}
        </h2>
        <button onClick={handleNextMonth}>
          <Image src={rightArrowImg} alt="Next month" width={24} height={24} />
        </button>
      </header>
      <div className="font-semibold-14 grid grid-cols-7 text-center text-text-inverse">
        {/* 요일 헤더 */}
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-medium-14 py-[7.5px]">
            {day}
          </div>
        ))}
        {/* 날짜 */}
        {calendarDays.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            className={`font-medium-14 cursor-pointer p-2 ${
              date.getMonth() !== currentMonth.getMonth()
                ? 'text-text-default'
                : ''
            } ${
              selectedDate?.toDateString() === date.toDateString()
                ? 'rounded-lg bg-brand-primary text-bg-secondary'
                : ''
            }`}
          >
            {date.getDate()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
