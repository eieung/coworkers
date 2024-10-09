import { useEffect, useState } from 'react';
import { isSameDay } from 'date-fns';
import Image from 'next/image';
import CircularProgressBar from '@/components/common/CircularProgressBar';
import todoIcon from '@/assets/image/task/todo.svg';
import doneIcon from '@/assets/image/task/done.svg';
import { useGroupsQuery } from '@/queries/group';
import { useRouter } from 'next/router';
import TaskReportLoading from '@/components/common/skeleton/team/TaskReportLoading';

export default function TaskReport() {
  const router = useRouter();
  const { groupId } = router.query;

  const {
    data: groupResponse,
    isLoading,
    error,
  } = useGroupsQuery(groupId as string);
  const [todayTasksCount, setTodayTasksCount] = useState(0);
  const [doneTasksCount, setDoneTasksCount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  const groupData = groupResponse?.data;

  useEffect(() => {
    if (!groupData || isLoading || error) return;

    const today = new Date();

    let totalTasks = 0;
    let completedTasks = 0;

    groupData.taskLists.forEach((taskList) => {
      taskList.tasks.forEach((task) => {
        if (isSameDay(new Date(task.date), today)) {
          totalTasks++;
          if (task.doneAt !== null) {
            completedTasks++;
          }
        }
      });
    });

    setTodayTasksCount(totalTasks);
    setDoneTasksCount(completedTasks);

    const calcPercentage =
      totalTasks > 0 ? Math.floor((completedTasks / totalTasks) * 100) : 0;
    setPercentage(calcPercentage);
  }, [groupData, isLoading, error]);

  if (isLoading) return <TaskReportLoading />;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="mt-8">
      <strong className="font-medium-16 text-text-primary">리포트</strong>
      <div className="mt-4 flex flex-row items-center justify-between gap-x-10 rounded-xl bg-bg-secondary p-6">
        <div className="relative block w-[169px] min-w-[100px] md:hidden lg:hidden">
          <CircularProgressBar
            percentage={percentage}
            trailColor="#334155"
            showText={true}
          />
        </div>

        <div className="flex flex-row gap-x-16 sm:hidden">
          <div className="w-[168px]">
            <CircularProgressBar percentage={percentage} trailColor="#334155" />
          </div>
          <div className="flex flex-col justify-center gap-y-1">
            <p className="font-medium-14 text-text-primary">
              오늘의
              <br />
              진행상황
            </p>
            <span className="font-bold-40 text-gradient">{percentage}%</span>
          </div>
        </div>

        <div className="flex w-[400px] flex-col gap-y-4">
          <div className="flex w-full flex-row justify-between gap-x-3 rounded-xl bg-bg-tertiary p-4">
            <div className="flex flex-col">
              <span className="font-medium-12 mb-1 text-text-secondary">
                오늘의 할 일
              </span>
              <strong className="font-bold-24 text-brand-tertiary">
                {todayTasksCount}개
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
