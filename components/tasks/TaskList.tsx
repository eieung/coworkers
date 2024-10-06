import { useRouter } from 'next/router';
import Link from 'next/link';
import TaskItem from './TaskItem';
import useModalStore from '@/store/useModalStore';
import DatePicker from '@/components/common/modal/DatePicker';
import { TaskListType, TaskType } from '@/types/taskList';
import {
  useDeleteTask,
  useEditTask,
  useGetTasks,
  useToggleTask,
} from '@/queries/tasks/useTaskData';

interface TaskListProps {
  categories: TaskListType[];
  groupId: string;
  currentDate: string;
}

const TaskList = ({ categories, groupId, currentDate }: TaskListProps) => {
  const router = useRouter();
  const { listId } = router.query;

  const currentCategory = categories.find(
    (category) => String(category.id) === listId,
  );

  const openModal = useModalStore((state) => state.openModal);

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useGetTasks(groupId, currentCategory?.id, currentDate);

  const { mutate: editTask } = useEditTask(
    groupId,
    currentCategory?.id,
    currentDate,
  );

  const { mutate: toggleTask } = useToggleTask(groupId, currentCategory?.id);

  const { mutate: deleteTask } = useDeleteTask(groupId);

  const handleDatePickerModal = () => {
    openModal((close) => <DatePicker close={close} />);
  };

  return (
    <div className="mt-6 w-full sm:mt-4">
      <div className="mb-[22px] flex flex-wrap gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            href={`/groups/${groupId}/task-lists/${category.id}`}
            shallow={false}
          >
            <span
              className={`font-medium-16 relative flex-shrink-0 ${
                String(category.id) === listId
                  ? 'text-text-tertiary'
                  : 'text-text-default'
              }`}
            >
              {category.name}
              {String(category.id) === listId && (
                <span
                  className="absolute bottom-[-5px] left-0 h-[1px] w-full rounded-[1.5px] bg-text-tertiary"
                  style={{ transform: 'translateY(1px)' }}
                />
              )}
            </span>
          </Link>
        ))}
      </div>
      {currentCategory && tasks.length === 0 ? (
        <div className="flex-center font-regular-14 my-[250px] flex text-text-default sm:my-[150px] md:my-[250px]">
          아직 할 일 목록이 없습니다.
          <br />
          새로운 목록을 추가해주세요.
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {tasks.map((taskData: TaskType) => {
            const { id, doneAt } = taskData;

            return (
              <TaskItem
                key={id}
                taskData={taskData}
                completed={!!doneAt}
                onToggle={() => toggleTask({ id, doneAt })}
                onEdit={(data) => editTask({ id, data, doneAt })}
                onDelete={() => deleteTask(id)}
              />
            );
          })}
        </div>
      )}
      <div className="fixed bottom-12 right-7 sm:bottom-[38px] md:bottom-6 md:right-6 md:flex md:justify-end lg:right-[calc((100vw-1200px)/2)]">
        <div
          className="flex-center flex h-12 w-[125px] cursor-pointer rounded-[40px] bg-brand-primary text-white shadow-floating hover:bg-it-hover active:bg-it-pressed disabled:bg-it-inactive"
          onClick={handleDatePickerModal}
        >
          + 할 일 추가
        </div>
      </div>
    </div>
  );
};

export default TaskList;
