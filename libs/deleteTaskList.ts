import { authAxiosInstance } from '@/libs/axios';

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
