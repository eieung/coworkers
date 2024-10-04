import { postTaskList } from '@/libs/postTaskList';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

/**
 * @useCreateTaskList
 * 그룹에 새로운 할 일 목록을 추가하는 mutation 훅
 * 서버에 새 할 일 목록 POST 요청을 전송하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */
export const useCreateTaskList = (groupId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: { name: string }) => postTaskList(groupId, data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups', groupId] });
      toast.success('할 일 목록이 성공적으로 생성되었습니다.');
    },
    onError: (error) => {
      toast.error('할 일 목록을 생성하는 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};
