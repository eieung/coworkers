import {
  createNewTaskParams,
  createNewCategoryRequest,
  getTaskListsRequest,
  getTasksRequest,
  deleteTaskRequest,
  editTaskRequest,
  createTaskRequest,
  CreateTaskParams,
  getTaskItemRequest,
} from '@/libs/task/taskListApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useGetCategories = (groupId: string) => {
  return useQuery({
    queryKey: ['categories', groupId],
    queryFn: () => getTaskListsRequest({ groupId }),
    enabled: !!groupId,
  });
};

export const useCreateNewCategory = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, createNewTaskParams>({
    mutationFn: ({ groupId, taskData }) =>
      createNewCategoryRequest({ groupId, taskData }),
    onSuccess: (_, variables) => {
      toast.success(`${variables.taskData.name} 목록이 생성되었습니다!`);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      const errorMessage = error.message || '목록 생성에 실패했습니다!';
      console.error('Error adding task list:', errorMessage);
      toast.error(errorMessage);
    },
  });
};

export const useGetTasks = (
  groupId: string,
  taskListId: number | undefined,
  currentDate: string,
) => {
  return useQuery({
    queryKey: ['tasks', groupId, taskListId, currentDate],
    queryFn: () => {
      if (taskListId) {
        return getTasksRequest({
          groupId,
          taskListId,
          date: currentDate,
        });
      }
      return Promise.resolve({ tasks: [] });
    },
    enabled: !!groupId && !!taskListId,
    select: (data) => data.tasks,
  });
};

export const useGetTaskItem = (taskId: string | string[] | undefined) => {
  return useQuery({
    queryKey: ['taskItem', taskId],
    queryFn: () => {
      return getTaskItemRequest({ taskId });
    },
    enabled: !!taskId,
  });
};

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, CreateTaskParams>({
    mutationFn: ({ groupId, listId, taskData }) =>
      createTaskRequest({
        groupId,
        listId,
        taskData,
      }),
    onSuccess: (data, variables) => {
      toast.success('할 일이 생성되었습니다.');
      queryClient.invalidateQueries({
        queryKey: ['tasks', variables.groupId],
      });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: (error) => {
      console.error('할 일 생성 중 오류 발생:', error);
      toast.error('할 일 생성에 실패했습니다.');
    },
  });
};

export const useEditTask = (
  groupId: string,
  currentCategoryId: number | undefined,
  currentDate: string,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { id: number; data: string; doneAt: string | null }
  >({
    mutationFn: ({ id, data, doneAt }) =>
      editTaskRequest({
        taskId: id,
        taskData: { name: data, done: !!doneAt },
      }),
    onSuccess: (_, { data }) => {
      toast.success(`${data} 수정되었습니다!`);
      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId, currentCategoryId, currentDate],
      });
    },
    onError: (error) => {
      console.error('Error editing task:', error.message);
      toast.error('작업을 수정하는 도중 오류가 발생했습니다.');
    },
  });
};

export const useDeleteTask = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, number>({
    mutationFn: (taskId) => deleteTaskRequest({ groupId, taskId }),
    onSuccess: () => {
      toast.success('할 일이 삭제되었습니다!');
      queryClient.invalidateQueries({ queryKey: ['tasks', groupId] });
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: (error) => {
      const errorMessage =
        error.message || '할 일을 삭제하는 도중 오류가 발생했습니다.';
      console.error('Error deleting task:', errorMessage);
      toast.error(errorMessage);
    },
  });
};

export const useToggleTask = (
  groupId: string,
  currentCategoryId: number | undefined,
) => {
  const queryClient = useQueryClient();

  return useMutation<
    void,
    Error,
    { id: number; doneAt: string | null | boolean }
  >({
    mutationFn: ({ id, doneAt }) => {
      const newDoneAt = !doneAt;
      return editTaskRequest({
        taskId: id,
        taskData: {
          done: newDoneAt,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['tasks', groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ['taskItem'],
      });
    },
  });
};
