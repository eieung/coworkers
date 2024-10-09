import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { authAxiosInstance } from '@/services/axios';

/**
 * 그룹 멤버를 삭제하는 함수
 * @param groupId - 그룹 ID
 * @param memberUserId - 삭제할 멤버의 사용자 ID
 */
export const deleteMember = (groupId: string, memberUserId: string) => {
  return authAxiosInstance.delete(`groups/${groupId}/member/${memberUserId}`);
};

/**
 * @useDeleteMemberMutation
 * 그룹 멤버를 삭제하는 mutation 훅
 * 서버에 그룹 멤버 삭제 DELETE 요청을 전송하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */
export const useDeleteMemberMutation = (groupId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (memberUserId: string) => deleteMember(groupId, memberUserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });

      toast.success('멤버가 성공적으로 삭제되었습니다.');
      // 왜 강제로 리다이렉트 주소를 정해주지 않으면 루트 페이지로 이동하는지?
      router.push(`/groups/${groupId}`);
    },
    onError: (error) => {
      toast.error('멤버를 삭제하는 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};

export const useLeaveTeamMutation = (groupId: string) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (memberUserId: string) => deleteMember(groupId, memberUserId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });
      await queryClient.invalidateQueries({ queryKey: ['user'] });

      const userData = queryClient.getQueryData<{
        data: { memberships: any[] };
      }>(['user']);
      const memberships = userData?.data?.memberships ?? [];

      if (memberships.length > 0) {
        const firstGroupId = memberships[0].group.id;
        router.push(`/groups/${firstGroupId}`);
      } else {
        router.push('/get-started-team');
      }

      toast.success('팀에서 탈퇴되었습니다.');
    },
    onError: (error) => {
      toast.error('팀에서 탈퇴 중 에러가 발생했습니다.');
      console.error(error);
    },
  });
};
