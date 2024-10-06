import { authAxiosInstance } from '@/libs/axios';

/**
 * 그룹 초대 링크용 토큰을 생성하는 함수
 * @param id - 초대할 그룹의 ID
 */
export const getInvitation = async (groupId: number) => {
  const response = await authAxiosInstance.get(`groups/${groupId}/invitation`);
  return response.data;
};
