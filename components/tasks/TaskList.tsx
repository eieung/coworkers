import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';
import Button from '@/components/common/button';
import useModalStore from '@/store/useModalStore';
import DatePicker from '@/components/common/modal/DatePicker';
import { TaskListType, TaskType } from '@/types/taskListType';
import {
  patchTaskRequest,
  getTasksRequest,
  deleteTaskRequest,
} from '@/libs/taskListApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

interface TaskListProps {
  categories: TaskListType[];
  groupId: string;
  currentDate: string;
}

const TaskList = ({ categories, groupId, currentDate }: TaskListProps) => {
  const [activeCategory, setActiveCategory] = useState(() => {
    const storedCategory = JSON.parse(
      localStorage.getItem('activeCategory') || 'null',
    );
    return storedCategory || categories[0] || { id: 0, name: '' };
  });

  const router = useRouter();
  const { listId } = router.query;

  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (activeCategory && listId !== String(activeCategory.id)) {
      localStorage.setItem(
        'activeCategory',
        JSON.stringify({ id: activeCategory.id, name: activeCategory.name }),
      );

      router.push(
        {
          pathname: router.pathname,
          query: { ...router.query, listId: activeCategory.id },
        },
        undefined,
        { shallow: false },
      );
    }
  }, [activeCategory, router, listId]);

  const {
    data: tasks = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['tasks', groupId, activeCategory?.id, currentDate],
    queryFn: () =>
      getTasksRequest({
        groupId,
        taskListId: activeCategory?.id,
        date: currentDate,
      }),
    enabled: !!groupId && !!activeCategory?.id,
    select: (data) => data.tasks,
  });

  const toggleTaskMutation = useMutation<
    void,
    Error,
    { id: number; doneAt: string | null }
  >({
    mutationFn: ({ id, doneAt }) => {
      const newDoneAt = !doneAt;
      return patchTaskRequest({
        taskId: id,
        taskData: {
          done: newDoneAt,
        },
      });
    },
  });

  const toggleTask = (id: number, doneAt: string | null) => {
    toggleTaskMutation.mutate(
      {
        id,
        doneAt,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['tasks', groupId, activeCategory?.id, currentDate],
          });
        },
      },
    );
  };

  const editTaskMutation = useMutation<
    void,
    Error,
    { id: number; data: string }
  >({
    mutationFn: ({ id, data }) => {
      return patchTaskRequest({ taskId: id, taskData: { name: data } });
    },
  });

  const editTask = (id: number, data: string) => {
    editTaskMutation.mutate(
      { id, data },
      {
        onSuccess: () => {
          toast.success(`${data} 수정되었습니다!`);
          queryClient.invalidateQueries({
            queryKey: ['tasks', groupId, activeCategory?.id, currentDate],
          });
        },
        onError: (error) => {
          console.error('Error editing task:', error.message);
          toast.error('작업을 수정하는 도중 오류가 발생했습니다.');
        },
      },
    );
  };

  const deleteTaskMutation = useMutation<void, Error, number>({
    mutationFn: (id) => {
      return deleteTaskRequest({ groupId, taskId: id });
    },
  });

  const deleteTask = (id: number) => {
    deleteTaskMutation.mutate(id, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['tasks', groupId, activeCategory?.id, currentDate],
        });
        toast.success('할 일이 삭제되었습니다!');
      },
      onError: (error) => {
        console.error('Error deleting task:', error.message);
        toast.error('할 일을 삭제하는 도중 오류가 발생했습니다.');
      },
    });
  };

  const handleDatePickerModal = () => {
    openModal((close) => <DatePicker close={close} />);
  };

  return (
    <div className="mt-6 w-full sm:mt-4">
      <div className="mb-[22px] flex flex-wrap gap-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category)}
            className={`font-medium-16 relative flex-shrink-0 ${
              activeCategory.id === category.id
                ? 'text-text-tertiary'
                : 'text-text-default'
            }`}
          >
            {category.name}
            {activeCategory.id === category.id && (
              <span
                className="absolute bottom-[-5px] left-0 h-[1px] w-full rounded-[1.5px] bg-text-tertiary"
                style={{ transform: 'translateY(1px)' }}
              />
            )}
          </button>
        ))}
      </div>
      {tasks.length === 0 ? (
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
                onToggle={() => toggleTask(id, doneAt)}
                onEdit={(data) => editTask(id, data)}
                onDelete={() => deleteTask(id)}
              />
            );
          })}
        </div>
      )}
      <div className="fixed bottom-12 right-7 sm:bottom-[38px] md:bottom-6 md:right-6 md:flex md:justify-end lg:right-[calc((100vw-1200px)/2)]">
        <Button
          appearance="floating-solid"
          className="w-[125px]"
          onClick={handleDatePickerModal}
        >
          + 할 일 추가
        </Button>
      </div>
    </div>
  );
};

export default TaskList;
