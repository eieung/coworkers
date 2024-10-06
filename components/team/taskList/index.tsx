import useModalStore from '@/store/useModalStore';
import Task from './Task';
import TaskListForm from '@/components/common/modal/TaskListForm';
import { useGroupsQuery } from '@/queries/group/group';
import { useCreateTaskListQuery } from '@/queries/task-list/task-list';

interface TaskListProps {
  groupId: number;
  isAdmin: boolean;
}

export default function TaskList({ groupId, isAdmin }: TaskListProps) {
  const { data, isLoading, error } = useGroupsQuery(groupId);
  const openModal = useModalStore((state) => state.openModal);
  const createTaskListMutation = useCreateTaskListQuery(groupId);

  if (isLoading) {
    return <div>스켈레톤 구현 해야 함</div>;
  }

  if (error) {
    return <div>에러 처리 해야 함</div>;
  }

  const taskLists = data?.taskLists || [];

  const handleCreateTaskList = () => {
    openModal((close) => (
      <TaskListForm
        close={close}
        onAction={(value) => {
          createTaskListMutation.mutate(
            { name: value },
            {
              onSuccess: () => {
                console.log('새로운 목록 생성됨:', value);
              },
              onError: (error) => {
                console.error('목록 생성 중 오류 발생:', error);
              },
            },
          );
        }}
      />
    ));
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between py-4 pb-4 pt-6">
        <div className="flex gap-x-2">
          <b className="font-medium-16 text-text-primary">할 일 목록</b>
          <span className="font-regular-16 text-text-default">
            ({taskLists.length}개)
          </span>
        </div>
        {isAdmin && (
          <button
            className="font-regular-14 text-brand-primary"
            onClick={handleCreateTaskList}
          >
            + 새로운 목록 추가하기
          </button>
        )}
      </div>
      {taskLists.length === 0 ? (
        <p className="font-medium-14 py-6 text-center text-text-default">
          아직 할 일 목록이 없습니다.
        </p>
      ) : (
        taskLists.map((taskList) => {
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
              isAdmin={isAdmin}
            />
          );
        })
      )}
    </div>
  );
}
