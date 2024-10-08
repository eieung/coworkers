import { useRouter } from 'next/router';
import Link from 'next/link';
import TaskItem from './TaskItem';
import useModalStore from '@/store/useModalStore';
import DatePicker from '@/components/common/modal/DatePicker';
import { TaskListType, TaskType } from '@/types/taskList';
import {
  useDeleteRecurringTask,
  useDeleteTask,
  useEditTask,
  useEditTaskIndex,
  useGetTasks,
  useToggleTask,
} from '@/queries/tasks/useTaskData';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from 'react-beautiful-dnd';
import { useState, useEffect } from 'react';

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
    data: initialTasks = [],
    isLoading,
    isError,
  } = useGetTasks(groupId, currentCategory?.id, currentDate);

  const [tasks, setTasks] = useState<TaskType[]>(initialTasks);
  const { mutate: toggleTask } = useToggleTask(groupId);
  const { mutate: deleteTask } = useDeleteTask(groupId);
  const editTaskIndexMutation = useEditTaskIndex(groupId, currentCategory?.id);
  const { mutate: editTask } = useEditTask(groupId, currentCategory?.id);
  const { mutate: deleteRecurringTask } = useDeleteRecurringTask(groupId);

  useEffect(() => {
    const sortedTasks = [...initialTasks].sort((a, b) => {
      return (a.displayIndex || 0) - (b.displayIndex || 0);
    });
    setTasks(sortedTasks);
  }, [initialTasks]);

  const handleDatePickerModal = () => {
    openModal((close) => <DatePicker close={close} />);
  };

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;
    if (destination.index === source.index) return;

    const reorderedTasks = Array.from(tasks);
    const [removed] = reorderedTasks.splice(source.index, 1);
    reorderedTasks.splice(destination.index, 0, removed);

    setTasks(reorderedTasks);

    editTaskIndexMutation.mutate({
      taskListId: currentCategory?.id as number,
      taskId: Number(draggableId),
      displayIndex: destination.index,
    });
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
              className={`font-medium-16 relative flex-shrink-0 transition duration-300 ease-in-out ${
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
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <div
                className="flex flex-col gap-4"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {tasks.map((taskData: TaskType, index: number) => {
                  const { id, doneAt, recurringId } = taskData;

                  return (
                    <Draggable key={id} draggableId={String(id)} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <TaskItem
                            taskData={taskData}
                            completed={!!doneAt}
                            onToggle={() => toggleTask({ id, doneAt })}
                            onEdit={(name) => editTask({ id, name, doneAt })}
                            onDelete={() => deleteTask(id)}
                            onRecurringDelete={() =>
                              deleteRecurringTask({ taskId: id, recurringId })
                            }
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
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
