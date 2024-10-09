import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskListType } from '@/types/taskList';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { authAxiosInstance } from '@/services/axios';
import { queryOptions } from '../config';

/**
 * TaskList 데이터를 가져오는 함수
 * @param groupId - 가져올 그룹의 ID
 * @param taskListId - 가져올 TaskList의 ID
 * @returns TaskList 데이터
 */
export const getTaskLists = (groupId: string, taskListId: string) => {
  return authAxiosInstance.get<TaskListType>(
    `groups/${groupId}/task-lists/${taskListId}`,
  );
};

/**
 * @useTaskListsQuery
 * 주어진 그룹 ID와 TaskList ID로 서버에서 TaskList 데이터를 가져오는 훅입니다.
 * @param groupId - 그룹 ID
 * @param taskListId - TaskList ID
 * @returns TaskList 데이터와 로딩/에러 상태
 */

export const useTaskListsQuery = (groupId: string, taskListId: string) => {
  return useQuery({
    queryKey: ['taskList', groupId, taskListId],
    queryFn: () => getTaskLists(groupId, taskListId),
    staleTime: queryOptions.staleTime,
    gcTime: queryOptions.gcTime,
    retry: 1,
  });
};

/**
 * 할 일 목록을 생성하는 함수
 * @param id - 추가할 그룹의 ID
 * @param data - 생성할 할 일 목록의 제목
 */
export const createTaskList = (groupId: string, data: { name: string }) => {
  return authAxiosInstance.post<{ data: TaskListType }>(
    `groups/${groupId}/task-lists`,
    data,
  );
};

/**
 * @useCreateTaskListMutation
 * 그룹에 새로운 할 일 목록을 추가하는 mutation 훅
 * 서버에 새 할 일 목록 POST 요청을 전송하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */
export const useCreateTaskListMutation = (groupId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string }) => createTaskList(groupId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });
      toast.success('할 일 목록이 성공적으로 생성되었습니다.');
    },
    onError: (error) => {
      toast.error('할 일 목록을 생성하는 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};

export const reviseTaskList = (
  groupId: string,
  taskListId: string,
  data: { name: string },
) => {
  return authAxiosInstance.patch(
    `groups/${groupId}/task-lists/${taskListId}`,
    data,
  );
};

export const useReviseTaskListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      taskListId,
      data,
    }: {
      groupId: string;
      taskListId: string;
      data: { name: string };
    }) => reviseTaskList(groupId, taskListId, data),
    onSuccess: (_, { groupId }) => {
      queryClient.invalidateQueries({ queryKey: ['groups', groupId] }),
        queryClient.invalidateQueries({
          queryKey: ['tasks'],
        });
      toast.success('할 일 목록이 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      toast.error('할 일 목록을 수정하는 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};

/**
 * 할 일 목록을 삭제하는 함수
 * @param groupId - 그룹 ID
 * @param taskListId - 삭제할 멤버의 사용자 ID
 */
export const deleteTaskList = (groupId: string, taskListId: string) => {
  return authAxiosInstance.delete(`groups/${groupId}/task-lists/${taskListId}`);
};

/**
 * @useDeleteTaskListMutation
 * 할 일 목록을 삭제하는 mutation 훅
 * 서버에 할 일 목록 삭제 DELETE 요청을 전송하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */

export const useDeleteTaskListMutation = (groupId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (taskListId: string) => deleteTaskList(groupId, taskListId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });

      toast.success('할 일 목록이 성공적으로 삭제되었습니다.');
      router.push(`/groups/${groupId}`);
    },
    onError: (error) => {
      toast.error('할 일 목록을 삭제하는 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};

export const reOrderTaskList = (
  groupId: string,
  taskListId: string,
  data: { displayIndex: number },
) => {
  return authAxiosInstance.patch(
    `groups/${groupId}/task-lists/${taskListId}/order`,
    data,
  );
};

export const reOrderTaskListMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      groupId,
      taskListId,
      data,
    }: {
      groupId: string;
      taskListId: string;
      data: { displayIndex: number };
    }) => reOrderTaskList(groupId, taskListId, data),
    onSuccess: async (_, { groupId }) => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });
    },
  });
};
