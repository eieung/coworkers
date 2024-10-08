import { useState } from 'react';
import Image from 'next/image';
import leftArrowImg from '@/assets/image/icon/triangle_arrow_left.svg';
import rightArrowImg from '@/assets/image/icon/triangle_arrow_right.svg';

interface CustomCalendarProps {
  onDateSelect: (date: Date | null) => void;
  disablePastDates?: boolean;
}

const CustomCalendar = ({
  onDateSelect,
  disablePastDates = false,
}: CustomCalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const today = new Date();
  today.setHours(0, 0, 0, 0);

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
    const normalizedDate = new Date(date);
    normalizedDate.setHours(0, 0, 0, 0);

    if (
      normalizedDate.getMonth() === currentMonth.getMonth() &&
      (normalizedDate >= today || !disablePastDates)
    ) {
      setSelectedDate(normalizedDate);
      onDateSelect(normalizedDate);
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
    <div className="w-full p-4">
      <header className="flex items-center justify-between py-[5px]">
        <button onClick={handlePrevMonth} type="button">
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
        <button onClick={handleNextMonth} type="button">
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
            className={`font-medium-14 p-2 ${
              date.getMonth() !== currentMonth.getMonth()
                ? 'cursor-default text-text-default' // 현재 월이 아닐 경우 기본 커서와 색상 적용
                : disablePastDates && date < today // disablePastDates가 true이고, date가 오늘보다 이전일 경우
                  ? 'cursor-default text-gray-400' // 선택 불가능 스타일 적용
                  : 'cursor-pointer hover:rounded-lg hover:bg-brand-primary hover:text-bg-secondary' // 선택 가능 스타일 적용
            } ${
              selectedDate?.toDateString() === date.toDateString()
                ? 'rounded-lg bg-point-blue text-bg-secondary' // 선택된 날짜 스타일 적용
                : ''
            } ${
              date.toDateString() === today.toDateString()
                ? selectedDate?.toDateString() === today.toDateString() // 오늘 날짜 선택된 경우
                  ? 'text-white'
                  : 'text-blue-500'
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
