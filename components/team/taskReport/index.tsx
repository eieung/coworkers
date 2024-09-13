import CircularProgressBar from '@/components/common/CircularProgressBar';
import Image from 'next/image';
import todoIcon from '@/assets/image/task/todo.svg';
import doneIcon from '@/assets/image/task/done.svg';
import taskListData from '@/data/taskListMockData';

export default function TaskReport() {
  // 총 할 일 수를 계산
  // acc는 누적 값이며, task는 현재 처리 중인 작업을 나타냄
  const totalTasksCount = taskListData.tasks.reduce(
    (acc, task) => acc + task.totalTasks, // acc는 이전까지의 총합, task는 현재 작업
    0, // 초기 누적 값은 0
  );

  // 완료된 할 일 수를 계산
  // acc는 누적 값이며, task는 현재 처리 중인 작업을 나타냄
  const doneTasksCount = taskListData.tasks.reduce(
    (acc, task) => acc + task.doneTasks, // acc는 이전까지의 총합, task는 현재 작업
    0, // 초기 누적 값은 0
  );

  // 진행 상황 비율을 계산
  const percentage =
    totalTasksCount > 0
      ? Math.floor((doneTasksCount / totalTasksCount) * 100) // 진행 비율을 계산 후, 정수로 내림
      : 0; // 총 할 일이 0인 경우 비율을 0으로 설정

  return (
    <div className="mt-8">
      <strong className="font-medium-16 text-text-primary">리포트</strong>
      <div className="mt-4 flex flex-row items-center justify-between gap-x-10 rounded-xl bg-bg-secondary p-6">
        <div className="flex w-[168px] min-w-[112px] flex-col items-center gap-y-1">
          <CircularProgressBar
            percentage={percentage}
            useGradient
            trailColor="#334155"
            showText={true}
          />
        </div>
        <div className="flex w-[400px] flex-col gap-y-4">
          <div className="flex w-full flex-row justify-between gap-x-3 rounded-xl bg-bg-tertiary p-4">
            <div className="flex flex-col">
              <span className="font-medium-12 mb-1 text-text-secondary">
                오늘의 할 일
              </span>
              <strong className="font-bold-24 text-brand-tertiary">
                {totalTasksCount}개
              </strong>
            </div>
            <Image src={todoIcon} alt="오늘의 할 일" width={40} height={40} />
          </div>

          <div className="flex w-full flex-row justify-between gap-x-3 rounded-xl bg-bg-tertiary p-4">
            <div className="flex flex-col">
              <span className="font-medium-12 mb-1 text-text-secondary">
                한 일
              </span>
              <strong className="font-bold-24 text-brand-tertiary">
                {doneTasksCount}개
              </strong>
            </div>
            <Image src={doneIcon} alt="한 일" width={40} height={40} />
          </div>
        </div>
      </div>
    </div>
  );
}
