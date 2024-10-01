import Task from './Task';
import { useGroup } from '@/hooks/useGroup';

interface TaskListProps {
  groupId: number;
}

export default function TaskList({ groupId }: TaskListProps) {
  const { data, isLoading, error } = useGroup(groupId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading group data</div>;
  }

  const taskLists = data?.taskLists || [];

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4 pb-4 pt-6">
        <div className="flex gap-x-2">
          <b className="font-medium-16 text-text-primary">할 일 목록</b>
          <span className="font-regular-16 text-text-default">
            ({taskLists.length}개)
          </span>
        </div>
        <button className="font-regular-14 text-brand-primary">
          + 새로운 목록 추가하기
        </button>
      </div>
      {taskLists.map((taskList) => {
        const totalTasks = taskList.tasks.length;
        const completedTasks = taskList.tasks.filter(
          (task) => task.doneAt,
        ).length;

        return (
          <Task
            key={taskList.id}
            name={taskList.name}
            totalTasks={totalTasks}
            completedTasks={completedTasks}
            displayIndex={taskList.displayIndex}
            groupId={groupId}
            taskListId={taskList.id}
          />
        );
      })}
    </div>
  );
}
