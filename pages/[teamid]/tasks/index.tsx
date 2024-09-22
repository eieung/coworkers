import React, { useState } from 'react';
import AddNewTask from '@/components/tasks/AddNewTask';
import DateManager from '@/components/tasks/DateManager';
import TaskList from '@/components/tasks/TaskList';
import { getTaskListsId, getTasks } from '@/libs/taskListApi';
import { useQuery, useQueries } from '@tanstack/react-query';
import { useRouter } from 'next/router';
import { TaskListType } from '@/types/taskListType';

export default function TasksPage() {
  const router = useRouter();
  const { teamid: groupId } = router.query;

  // 날짜 상태 관리
  const [currentDate, setCurrentDate] = useState(
    new Date().toISOString().split('T')[0],
  );

  // taskListIds를 가져오는 쿼리
  const {
    data: taskListIds,
    isLoading: isTaskListLoading,
    isError: isTaskListError,
    error: taskListError,
  } = useQuery({
    queryKey: ['taskList', groupId],
    queryFn: () => getTaskListsId({ groupId }),
    enabled: !!groupId,
  });

  // 각 taskListId에 대한 tasks 쿼리
  const taskQueries = useQueries({
    queries: (taskListIds || []).map((taskListId: number) => ({
      queryKey: ['tasks', groupId, taskListId, currentDate],
      queryFn: () => getTasks({ groupId, taskListId, date: currentDate }),
      enabled: !!groupId && !!taskListId,
    })),
  });

  // taskQueries에서 data만 추출하여 tasksData 배열 생성
  const tasksData = taskQueries.reduce<TaskListType[]>((acc, query) => {
    if (query.data) {
      acc.push(query.data as TaskListType);
    }
    return acc;
  }, []);

  const isLoading =
    isTaskListLoading || taskQueries.some((query) => query.isLoading);
  const error = isTaskListError
    ? taskListError
    : taskQueries.find((query) => query.isError)?.error;

  if (isLoading)
    return <div>{error ? `Error: ${error.message}` : 'Loading...'}</div>;

  return (
    <section className="mt-10 sm:mt-6 md:mt-6">
      <h1 className="font-bold-20 text-text-primary">할 일</h1>
      <div className="mt-6 flex items-center justify-between">
        <DateManager
          currentDate={currentDate}
          setCurrentDate={setCurrentDate}
        />
        <AddNewTask groupId={groupId as string} />
      </div>
      <TaskList taskList={tasksData} />
    </section>
  );
}
