import instance from '@/libs/axios';
import { TaskListType } from '@/types/taskListType';

interface GetTasksParams {
  groupId: string | string[] | undefined;
  taskListId: number;
  date?: string;
}

const getAccessToken = () => {
  if (typeof window !== 'undefined') {
    const userStorage = localStorage.getItem('user-storage');
    if (userStorage) {
      const parsedStorage = JSON.parse(userStorage);
      return parsedStorage.state?.accessToken;
    }
  }
  return null;
};

const fetchData = async (
  url: string,
  params?: any,
  method: 'GET' | 'POST' | 'DELETE' | 'PUT' = 'GET',
  data?: any,
) => {
  const token = getAccessToken();

  try {
    const response = await instance.request({
      url,
      method,
      params,
      data,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error(`Failed to ${method} data:`, error);
    throw error;
  }
};

export const getTasks = async ({
  groupId,
  taskListId,
  date,
}: GetTasksParams) => {
  const url = `/groups/${groupId}/task-lists/${taskListId}`;
  const params = date ? { date } : {};
  return await fetchData(url, params, 'GET');
};

export const getTaskListsId = async ({
  groupId,
}: {
  groupId: string | string[] | undefined;
}) => {
  const url = `/groups/${groupId}`;
  const data = await fetchData(url, undefined, 'GET');
  return data.taskLists.map((taskList: TaskListType) => taskList.id);
};

export interface AddNewTaskParams {
  groupId: string | string[] | undefined;
  taskData: {
    name: string;
  };
}

export const addNewTask = async ({
  groupId,
  taskData,
}: AddNewTaskParams): Promise<void> => {
  const url = `/groups/${groupId}/task-lists`;
  return await fetchData(url, undefined, 'POST', taskData);
};

export const deleteTask = async ({
  groupId,
  taskId,
}: {
  groupId: string | string[] | undefined;
  taskId: number;
}) => {
  const url = `/groups/${groupId}/tasks/${taskId}`;
  return await fetchData(url, undefined, 'DELETE');
};
