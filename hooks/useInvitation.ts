import { useQuery } from '@tanstack/react-query';
import { getInvitation } from '@/libs/getInvitation';

/**
 * @useInvitation
 * 그룹 초대 링크용 토큰을 가져오는 훅
 * 그룹 ID를 받아서 해당 그룹의 초대 토큰을 반환
 */
export const useInvitation = (groupId: number) => {
  return useQuery({
    queryKey: ['invitation', groupId],
    queryFn: () => getInvitation(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 5, // 이거 공용으로 빼기
    retry: 1,
  });
};
