import { authAxiosInstance } from '@/libs/axios';

/**
 * 팀 정보를 삭제하는 함수
 * @param id - 삭제할 그룹의 ID
 */
export const deleteGroup = async (id: number) => {
  const response = await authAxiosInstance.delete(`/groups/${id}`);
  return response;
};
