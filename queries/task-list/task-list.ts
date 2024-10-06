import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { TaskListType } from '@/types/taskList';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { authAxiosInstance } from '@/services/axios';

/**
 * TaskList 데이터를 가져오는 함수
 * @param groupId - 가져올 그룹의 ID
 * @param taskListId - 가져올 TaskList의 ID
 * @returns TaskList 데이터
 */
const getTaskLists = async (
  groupId: number,
  taskListId: number,
): Promise<TaskListType> => {
  const { data } = await authAxiosInstance.get(
    `groups/${groupId}/task-lists/${taskListId}`,
  );
  return data;
};

/**
 * @useTaskListsQuery
 * 주어진 그룹 ID와 TaskList ID로 서버에서 TaskList 데이터를 가져오는 훅입니다.
 * @param groupId - 그룹 ID
 * @param taskListId - TaskList ID
 * @returns TaskList 데이터와 로딩/에러 상태
 */

export const useTaskListsQuery = (groupId: number, taskListId: number) => {
  return useQuery({
    queryKey: ['taskList', groupId, taskListId],
    queryFn: () => getTaskLists(groupId, taskListId),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

/**
 * 할 일 목록을 생성하는 함수
 * @param id - 추가할 그룹의 ID
 * @param data - 생성할 할 일 목록의 제목
 */
export const createTaskList = async (
  groupId: number,
  data: {
    name: string;
  },
) => {
  const response = await authAxiosInstance.post(
    `groups/${groupId}/task-lists`,
    data,
  );
  return response.data;
};

/**
 * @useCreateTaskListQuery
 * 그룹에 새로운 할 일 목록을 추가하는 mutation 훅
 * 서버에 새 할 일 목록 POST 요청을 전송하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */
export const useCreateTaskListQuery = (groupId: number) => {
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

/**
 * 할 일 목록을 삭제하는 함수
 * @param groupId - 그룹 ID
 * @param taskListId - 삭제할 멤버의 사용자 ID
 */
export const deleteTaskList = async (groupId: number, taskListId: number) => {
  const response = await authAxiosInstance.delete(
    `groups/${groupId}/task-lists/${taskListId}`,
  );
  return response.data;
};

/**
 * @useDeleteTaskListQuery
 * 할 일 목록을 삭제하는 mutation 훅
 * 서버에 할 일 목록 삭제 DELETE 요청을 전송하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */

export const useDeleteTaskListQuery = (groupId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (taskListId: number) => deleteTaskList(groupId, taskListId),
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