import calendarImg from '@/assets/image/icon/calendar.svg';
import repeatImg from '@/assets/image/icon/repeat.svg';
import timeImg from '@/assets/image/icon/time.svg';
import { Frequency } from '@/types/taskList';
import { formatDate, formatTime } from '@/utils/common';
import Image from 'next/image';

const frequencyText = {
  ONCE: '한번',
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
};

interface DateAndFrequencyProps {
  frequency: Frequency;
  date: string;
  isTaskDetail?: boolean;
}

export default function DateAndFrequency({
  frequency,
  date,
  isTaskDetail = false,
}: DateAndFrequencyProps) {
  return (
    <div className="font-regular-12 flex items-center gap-[6px] text-text-default">
      <Image src={calendarImg} alt="달력" width={16} height={16} />
      <div className="flex items-center">
        <span>{formatDate(date)}</span>
        <div className="mx-[10px] h-2 w-[1px] bg-bg-tertiary"></div>
        {isTaskDetail && (
          <>
            <Image src={timeImg} alt="시계" width={16} height={16} />
            <span className="ml-[6px]">{formatTime(date)}</span>
            <div className="mx-[10px] h-2 w-[1px] bg-bg-tertiary"></div>
          </>
        )}
        <Image src={repeatImg} alt="반복" width={16} height={16} />
      </div>
      <span>{frequencyText[frequency]}</span>
    </div>
  );
}
