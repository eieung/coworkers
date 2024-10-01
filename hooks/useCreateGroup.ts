import { postGroup } from '@/libs/postGroup';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

/*
 * @useCreateGroup
 * 새 그룹을 생성하는 mutation 훅
 * 서버에 새 그룹 정보를 POST 요청으로 전송하고,
 * 성공 시 그룹 및 사용자 데이터를 무효화하고 다시 가져옴
 */
export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  /*
   * @mutation
   * 그룹 생성 요청을 처리하는 mutation 함수
   * mutationFn: createGroup API를 호출하여 새로운 그룹을 생성
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
    mutationFn: ({ name, image }: { name: string; image: string | null }) =>
      postGroup({ name, image }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['groups'] });
      await queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success('새 그룹이 성공적으로 생성되었습니다.');

      const newGroupId = data.id;
      router.push(`/groups/${newGroupId}`);
    },
    onError: (error) => {
      toast.error('그룹을 생성하는 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};
