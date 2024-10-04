import { authAxiosInstance } from './axios';

/**
 * 할 일 목록을 생성하는 함수
 * @param id - 추가할 그룹의 ID
 * @param data - 생성할 할 일 목록의 제목
 */
export const postTaskList = async (
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
