import Image from 'next/image';
import kebabIcon from '@/assets/image/icon/kebab.svg';
import CircularProgressBar from '@/components/common/CircularProgressBar';

interface TaskProps {
  task: {
    name: string;
    doneBy: {
      user: {
        image: string;
        nickname: string;
      };
    };
    writer: {
      user: {
        image: string;
        nickname: string;
      };
    };
    commentCount: number;
    description: string;
    doneTasks: number;
    totalTasks: number;
  };
}
export default function Task({ task }: TaskProps) {
  // 진행 상황 비율을 계산
  const percentage = Math.round((task.doneTasks / task.totalTasks) * 100);

  return (
    <div className="mb-4 flex flex-row items-center justify-between rounded-xl bg-bg-secondary">
      <div className="flex flex-row items-center gap-x-3">
        <div className="h-10 w-4 rounded-l-xl bg-yellow-400"></div>
        <b className="font-medium-14 text-text-primary">{task.name}</b>
      </div>
      <div className="flex flex-row gap-x-1 pr-2">
        <div className="flex items-center gap-1 rounded-xl bg-bg-primary px-2">
          <div className="h-3 w-3">
            <CircularProgressBar
              percentage={percentage}
              pathColor="#10b981"
              trailColor="#f8fafc"
            />
          </div>
          <span className="font-14-regular text-brand-primary">
            {task.doneTasks}/{task.totalTasks}
          </span>
        </div>
        <Image src={kebabIcon} alt="케밥 아이콘" width={16} height={16} />
      </div>
    </div>
  );
}
