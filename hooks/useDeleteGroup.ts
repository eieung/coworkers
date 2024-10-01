import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteGroup } from '@/libs/deleteGroup';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

// TODO: 그룹 삭제 시 Header/List에 빈 값 들어가는 거 해결 필요

/*
 * @useDeleteGroup
 * 그룹을 삭제하는 mutation 훅
 * 서버에 그룹을 DELETE 요청으로 삭제하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */
export const useDeleteGroup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  /*
   * @mutation
   * 그룹 삭제 요청을 처리하는 mutation 함수
   * mutationFn: deleteGroup API를 호출하여 그룹을 삭제
   * onSuccess: 요청이 성공하면, 그룹 데이터를 무효화하고 페이지 이동
   * onError: 요청이 실패하면 에러 메시지를 띄움
   *
   * @onSuccess
   * 요청이 성공하면 실행되는 함수
   * 그룹 데이터를 무효화하고, 새로운 데이터를 가져오도록 설정
   *
   * @onError
   * 요청이 실패하면 실행되는 함수
   * 실패 시 에러 메시지를 띄움
   */
  return useMutation({
    mutationFn: (id: number) => deleteGroup(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['groups'] });
      await queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success('그룹이 성공적으로 삭제되었습니다.');
      router.push('/');
    },
    onError: (error) => {
      toast.error('그룹을 삭제하는 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};
