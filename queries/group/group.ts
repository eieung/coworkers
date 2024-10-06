import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GroupResponse } from '@/types/group';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { authAxiosInstance } from '@/services/axios';

/**
 * 그룹 데이터를 가져오는 함수
 * @param id - 가져올 그룹의 ID
 * @returns 그룹 데이터
 */
const getGroups = async (id: number): Promise<GroupResponse> => {
  const { data } = await authAxiosInstance.get(`groups/${id}`);
  return data;
};

/**
 * @useGroupsQuery
 * 주어진 그룹 ID로 서버에서 그룹 데이터를 가져오는 훅입니다.
 * @param id - 그룹 ID
 * @returns 그룹 데이터와 로딩/에러 상태
 */

/**
 * 상세 설명:
 *
 * 1. **queryKey**:
 *    - 캐시를 구분하기 위한 고유 키
 *    - `['groups', id]`로 설정하여 그룹 ID별로 데이터를 캐싱하고 분리
 *    - 동일한 `id`로 여러 번 호출 시, 동일한 데이터를 캐시에서 빠르게 가져올 수 있음
 *
 * 2. **queryFn**:
 *    - 데이터를 가져오는 비동기 함수. `fetchGroup` 함수를 호출하여 해당 `id`에 대한 그룹 정보를 서버에서 가져옴
 *    - 이 함수는 React Query가 내부적으로 데이터를 요청할 때 호출
 *
 * 3. **staleTime**:
 *    - 5분이 지나기 전에는 캐시된 데이터를 그대로 사용하며, 이후에는 자동으로 새로운 데이터를 서버에서 요청
 *
 * 4. **retry**:
 *    - 데이터 요청이 실패했을 경우 재시도 횟수를 의미
 */

export const useGroupsQuery = (id: number) => {
  return useQuery({
    queryKey: ['groups', id],
    queryFn: () => getGroups(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

/**
 * 그룹을 생성하는 함수
 * @param id - 추가할 그룹의 ID
 * @param data - 추가할 그룹의 데이터 (이름, 이미지)
 */
export const createGroup = async (data: {
  name: string;
  image: string | null;
}) => {
  const response = await authAxiosInstance.post(`groups`, data);
  return response.data;
};

/**
 * @useCreateGroupQuery
 * 새 그룹을 생성하는 mutation 훅
 * 서버에 새 그룹 정보를 POST 요청으로 전송하고,
 * 성공 시 그룹 및 사용자 데이터를 무효화하고 다시 가져옴
 */
export const useCreateGroupQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  /**
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
      createGroup({ name, image }),
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

/**
 * 팀 정보를 삭제하는 함수
 * @param id - 삭제할 그룹의 ID
 */
export const deleteGroup = async (id: number) => {
  const response = await authAxiosInstance.delete(`/groups/${id}`);
  return response;
};

// TODO: 그룹 삭제 시 Header/List에 빈 값 들어가는 거 해결 필요
/**
 * @useDeleteGroupQuery
 * 그룹을 삭제하는 mutation 훅
 * 서버에 그룹을 DELETE 요청으로 삭제하고,
 * 성공 시 그룹 데이터를 무효화하고 다시 가져옴
 */
export const useDeleteGroupQuery = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

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

/**
 * 팀 정보를 수정하는 함수
 * @param id - 수정할 그룹의 ID
 * @param data - 수정할 팀 데이터 (이름, 이미지)
 */
export const reviseGroup = async (
  id: number,
  data: { name: string; image: string | null },
) => {
  const response = await authAxiosInstance.patch(`groups/${id}`, data);
  return response.data;
};

/**
 * @usereviseGroupQuery
 * 팀 정보를 수정하는 mutation 훅
 * 서버에 팀 정보를 PATCH 요청으로 업데이트하고,
 * 성공 시 그룹 및 사용자 데이터를 무효화하고 다시 가져옴
 */
export const usereviseGroupQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: { name: string; image: string | null };
    }) => reviseGroup(id, data),
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

