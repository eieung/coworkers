import { authAxiosInstance } from '@/libs/axios';
import { TaskListType } from '@/types/taskListType';
import { AxiosError } from 'axios';

export interface ErrorResponse {
  message: string;
}

export const fetchData = async (
  url: string,
  params?: any,
  method: 'GET' | 'POST' | 'DELETE' | 'PATCH' = 'GET',
  data?: any,
) => {
  try {
    const response = await authAxiosInstance.request({
      url,
      method,
      params,
      data,
    });

    return response.data;
  } catch (error) {
    const axiosError = error as AxiosError<ErrorResponse>;

    if (axiosError.response) {
      const errorMessage =
        axiosError.response.data?.message || '알 수 없는 오류가 발생했습니다.';
      console.error(`Failed to ${method} data:`, errorMessage);
      throw axiosError;
    } else {
      console.error(`Failed to ${method} data:`, error);
      throw error;
    }
  }
};

interface GetTasksParams {
  groupId: string | string[] | undefined;
  taskListId: number;
  date?: string;
}

export const getTasksRequest = async ({
  groupId,
  taskListId,
  date,
}: GetTasksParams) => {
  const url = `/groups/${groupId}/task-lists/${taskListId}`;
  const params = date ? { date } : {};
  return await fetchData(url, params, 'GET');
};

export const getTaskListsRequest = async ({
  groupId,
}: {
  groupId: string | string[] | undefined;
}) => {
  const url = `/groups/${groupId}`;
  const data = await fetchData(url, undefined, 'GET');

  return data.taskLists.map((taskList: TaskListType) => ({
    id: taskList.id,
    name: taskList.name,
  }));
};

export interface AddNewTaskParams {
  groupId: string | string[] | undefined;
  taskData: {
    name: string;
  };
}

export const addNewCategoryRequest = async ({
  groupId,
  taskData,
}: AddNewTaskParams): Promise<void> => {
  const url = `/groups/${groupId}/task-lists`;
  return await fetchData(url, undefined, 'POST', taskData);
};

export const deleteTaskRequest = async ({
  groupId,
  taskId,
}: {
  groupId: string | string[] | undefined;
  taskId: number;
}) => {
  const url = `/groups/${groupId}/task-lists/{taskListId}/tasks/${taskId}`;
  return await fetchData(url, undefined, 'DELETE');
};

export const patchTaskRequest = async ({
  taskId,
  taskData,
}: {
  taskId: number;
  taskData: {
    name?: string;
    description?: string;
    done?: boolean;
  };
}) => {
  const url = `/groups/{groupId}/task-lists/{taskListId}/tasks/${taskId}`;
  return await fetchData(url, undefined, 'PATCH', taskData);
};
