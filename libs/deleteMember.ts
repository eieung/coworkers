import { authAxiosInstance } from '@/libs/axios';

/**
 * 그룹 멤버를 삭제하는 함수
 * @param groupId - 그룹 ID
 * @param memberUserId - 삭제할 멤버의 사용자 ID
 */
export const deleteMember = async (groupId: number, memberUserId: number) => {
  const response = await authAxiosInstance.delete(
    `groups/${groupId}/member/${memberUserId}`,
  );
  return response.data;
};
