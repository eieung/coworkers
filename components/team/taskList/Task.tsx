import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import kebabIcon from '@/assets/image/icon/kebab.svg';
import doneTaskIcon from '@/assets/image/icon/progress.svg';
import CircularProgressBar from '@/components/common/CircularProgressBar';

interface TaskProps {
  name: string;
  totalTasks: number;
  completedTasks: number;
  displayIndex: number;
  groupId: number;
  taskListId: number;
}

export default function Task({
  name,
  totalTasks,
  completedTasks,
  displayIndex,
  groupId,
  taskListId,
}: TaskProps) {
  const percentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const bgColors = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
    'bg-point-rose',
    'bg-point-orange',
    'bg-point-yellow',
  ];

  /**
   * Task 순서에 따른 색상 구분
   * 수정 필요 함 (displayIndex로 구분하면 안 됨)
   */
  const bgColorClass = bgColors[displayIndex % bgColors.length];

  return (
    <div className="mb-4 flex flex-row items-center justify-between rounded-xl bg-bg-secondary">
      <Link
        href={`/groups/${groupId}/task-lists/${taskListId}`}
        className="flex-grow"
      >
        <div className="flex flex-row items-center gap-x-3">
          <div className={clsx('h-10 w-4 rounded-l-xl', bgColorClass)}></div>
          <b className="font-medium-14 text-text-primary">{name}</b>
        </div>
      </Link>

      <div className="flex flex-row gap-x-1 pr-2">
        <div className="flex items-center gap-x-1 rounded-xl bg-bg-primary px-2 py-1">
          {percentage === 100 ? (
            <Image src={doneTaskIcon} alt="할 일 완료" width={16} height={16} />
          ) : (
            <div className="flex h-4 w-4 items-center">
              <CircularProgressBar
                percentage={percentage}
                pathColor="#10b981"
                trailColor="#f8fafc"
                className="h-3 w-3"
              />
            </div>
          )}
          <span className="font-regular-14 w-[22px] text-brand-primary">
            {completedTasks}/{totalTasks}
          </span>
        </div>

        <Image src={kebabIcon} alt="케밥 아이콘" width={16} height={16} />
      </div>
    </div>
  );
}
