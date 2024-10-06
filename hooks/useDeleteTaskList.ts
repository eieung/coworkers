import { deleteTaskList } from '@/libs/deleteTaskList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

/**
 * @useDeleteTaskList
 * 할 일 목록을 삭제하는 mutation 훅
 * 서버에 할 일 목록 삭제 DELETE 요청을 전송하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */

export const useDeleteTaskList = (groupId: number) => {
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
