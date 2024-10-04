import { patchTeam } from '@/libs/patchTeam';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

/*
 * @useReviseTeam
 * 팀 정보를 수정하는 mutation 훅
 * 서버에 팀 정보를 PATCH 요청으로 업데이트하고,
 * 성공 시 그룹 및 사용자 데이터를 무효화하고 다시 가져옴
 */
export const useReviseTeam = () => {
  const queryClient = useQueryClient();

  /*
   * @mutation
   * 팀 수정 요청을 처리하는 mutation 함수
   * mutationFn: patchTeam API를 호출하여 팀 정보를 수정
   * onSuccess: 요청이 성공하면, 그룹과 유저의 캐시를 무효화하고 즉시 데이터를 다시 요청
   * onError: 요청이 실패하면 에러 메시지를 띄움
   *
   * @onSuccess
   * 요청이 성공하면 실행되는 함수
   * 그룹과 유저 데이터를 무효화하고, 새로운 데이터를 가져오도록 설정
   *
   * @onError
   * 요청이 실패하면 실행되는 함수
   * 실패 시 에러 메시지를 띄움
   */
  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { name: string; image: string | null };
    }) => patchTeam(id, data),
    onSuccess: async (_, { id }) => {
      // Promise.all이 좋은 선택지는 아님. 추후에 수정 예정
      await Promise.all([
          queryClient.invalidateQueries({ queryKey: ['groups', id] }),
          queryClient.invalidateQueries({ queryKey: ['user'] }),
        ]);

      toast.success('팀 정보가 성공적으로 수정되었습니다.');
    },
    onError: (error) => {
      toast.error('팀 정보를 수정하는 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};
