import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteMember } from '@/libs/deleteMember';
import { useRouter } from 'next/router';

/*
 * @useDeleteMember
 * 그룹 멤버를 삭제하는 mutation 훅
 * 서버에 그룹 멤버 삭제 DELETE 요청을 전송하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */
export const useDeleteMember = (groupId: number) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: (memberUserId: number) => deleteMember(groupId, memberUserId),
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
