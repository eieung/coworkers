import { useEffect, useState } from 'react';
import { isSameDay } from 'date-fns';
import Image from 'next/image';
import CircularProgressBar from '@/components/common/CircularProgressBar';
import todoIcon from '@/assets/image/task/todo.svg';
import doneIcon from '@/assets/image/task/done.svg';
import { useGroup } from '@/hooks/useGroup';

interface TaskReportProps {
  groupId: number;
}

export default function TaskReport({ groupId }: TaskReportProps) {
  const { data: groupData, isLoading, error } = useGroup(groupId);
  const [todayTasksCount, setTodayTasksCount] = useState(0);
  const [doneTasksCount, setDoneTasksCount] = useState(0);
  const [percentage, setPercentage] = useState(0);

  /*
   * @ 설명:
   * - 이 `useEffect` 훅은 `groupData`, `isLoading`, 또는 `error` 값이 변경될 때 실행됨.
   * - **groupData**가 없거나 로딩 중이거나 에러가 발생한 경우, 함수가 바로 종료됨.
   *
   * 1. **today**:
   *    - 현재 날짜를 `today` 변수에 저장함.
   *
   * 2. **totalTasks**와 **completedTasks**:
   *    - `totalTasks`: 오늘의 작업 수를 저장할 변수.
   *    - `completedTasks`: 완료된 작업 수를 저장할 변수.
   *
   * 3. **groupData.taskLists**:
   *    - `groupData`에 포함된 모든 taskList를 순회하면서 각 taskList 안의 tasks를 검사함.
   *
   * 4. **isSameDay**:
   *    - 각 작업의 `updatedAt` 속성을 오늘 날짜와 비교하여 오늘의 작업인지 확인함.
   *    - 오늘의 작업이면 `totalTasks`를 1 증가시킴.
   *
   * 5. **task.doneAt**:
   *    - 작업이 완료되었는지 (`doneAt`이 `null`이 아닌지) 확인하여 완료된 작업이면 `completedTasks`를 1 증가시킴.
   *
   * 6. **setTodayTasksCount**와 **setDoneTasksCount**:
   *    - 오늘의 작업 수와 완료된 작업 수를 상태로 업데이트함.
   *
   * 7. **calcPercentage**:
   *    - 오늘의 작업 중 완료된 작업의 퍼센트를 계산함.
   *    - 작업이 있을 경우, 완료된 작업 수의 퍼센트를 계산해 `setPercentage`로 상태를 업데이트함.
   *    - 작업이 없으면 퍼센트는 0%로 설정됨.
   *
   * @ Dependencies:
   * - 이 훅은 `groupData`, `isLoading`, `error`의 변경 사항에 반응하여 실행됨.
   * - 이 세 가지 중 하나라도 변경되면 다시 실행되어 오늘의 작업 수를 계산하고 퍼센트를 업데이트함.
   *
   * 09/30 (수정): swagger에서 date 설정 하는 부분으로 접근 가능할 것 같아서 리팩토링 예정.
   */

  useEffect(() => {
    if (!groupData || isLoading || error) return;

    const today = new Date();
    let totalTasks = 0;
    let completedTasks = 0;

    groupData.taskLists.forEach((taskList) => {
      taskList.tasks.forEach((task) => {
        if (isSameDay(new Date(task.updatedAt), today)) {
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

  if (isLoading) return <div>로딩 중 . . . . . . .</div>;
  if (error) return <div>에러 발생</div>;

  return (
    <div className="mt-8">
      <strong className="font-medium-16 text-text-primary">리포트</strong>
      <div className="mt-4 flex flex-row items-center gap-x-10 rounded-xl bg-bg-secondary p-6">
        <div className="flex w-[168px] min-w-[112px] flex-col items-center">
          <CircularProgressBar
            percentage={percentage}
            useGradient
            trailColor="#334155"
            showText={true}
          />
          <span className="font-medium-14 mt-3 text-text-primary">
            오늘의 진척도
          </span>
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
