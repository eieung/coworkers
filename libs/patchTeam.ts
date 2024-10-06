import { authAxiosInstance } from '@/libs/axios';

/**
 * 팀 정보를 수정하는 함수
 * @param id - 수정할 그룹의 ID
 * @param data - 수정할 팀 데이터 (이름, 이미지)
 */
export const patchTeam = async (id: number, data: { name: string; image: string | null }) => {
  const response = await authAxiosInstance.patch(`groups/${id}`, data);
  return response.data;
};
