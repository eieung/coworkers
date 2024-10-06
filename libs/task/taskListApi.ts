import { authAxiosInstance } from '@/libs/axios';
import { TaskDataType, TaskListType } from '@/types/taskList';
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
      data,
      params,
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

export interface GetTasksParams {
  groupId: string | string[] | undefined;
  taskListId: number;
  date?: string;
}

export const getTasksRequest = ({
  groupId,
  taskListId,
  date,
}: GetTasksParams) => {
  return fetchData(
    `/groups/${groupId}/task-lists/${taskListId}`,
    date ? { date } : {},
    'GET',
  );
};

export interface GetTaskItemRequestParams {
  taskId: string | string[] | undefined;
}

export const getTaskItemRequest = ({ taskId }: GetTaskItemRequestParams) => {
  return fetchData(
    `/groups/{groupId}/task-lists/{taskListId}/tasks/${taskId}`,
    undefined,
    'GET',
  );
};

export interface GetTaskListsParams {
  groupId: string | string[] | undefined;
}

export const getTaskListsRequest = async ({ groupId }: GetTaskListsParams) => {
  const data = await fetchData(`/groups/${groupId}`, undefined, 'GET');
  return data.taskLists.map((taskList: TaskListType) => ({
    id: taskList.id,
    name: taskList.name,
  }));
};

export interface createNewTaskParams {
  groupId: string | string[] | undefined;
  taskData: {
    name: string;
  };
}

export const createNewCategoryRequest = ({
  groupId,
  taskData,
}: createNewTaskParams) => {
  return fetchData(
    `/groups/${groupId}/task-lists`,
    undefined,
    'POST',
    taskData,
  );
};

export interface CreateTaskParams {
  groupId: string | string[] | undefined;
  listId: string | string[] | undefined;
  taskData: TaskDataType;
}

export const createTaskRequest = ({
  groupId,
  listId,
  taskData,
}: CreateTaskParams) => {
  return fetchData(
    `/groups/${groupId}/task-lists/${listId}/recurring`,
    undefined,
    'POST',
    taskData,
  );
};

export interface DeleteTaskParams {
  groupId: string | string[] | undefined;
  taskId: number;
}

export const deleteTaskRequest = ({ groupId, taskId }: DeleteTaskParams) => {
  return fetchData(
    `/groups/${groupId}/task-lists/{taskListId}/tasks/${taskId}`,
    undefined,
    'DELETE',
  );
};

export interface PatchTaskParams {
  taskId: number;
  taskData: {
    name?: string;
    description?: string;
    done?: boolean;
  };
}

export const editTaskRequest = ({ taskId, taskData }: PatchTaskParams) => {
  return fetchData(
    `/groups/groupId/task-lists/taskListId/tasks/${taskId}`,
    undefined,
    'PATCH',
    taskData,
  );
};
