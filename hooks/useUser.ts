import { useQuery } from '@tanstack/react-query';
import { User } from '@/types/user';
import { authAxiosInstance } from '@/libs/axios';

/**
 * 사용자 데이터를 가져오는 함수
 * @returns 사용자 데이터
 */
const fetchUser = async (): Promise<User> => {
  const { data } = await authAxiosInstance.get('user');
  return data;
};

/**
 * useUser 훅
 * 주어진 accessToken을 통해 서버에서 사용자 데이터를 가져오는 훅입니다.
 * @param accessToken - 사용자의 인증 토큰
 * @returns 사용자 데이터와 로딩/에러 상태
 */

/**
 * 상세 설명:
 *
 * 1. **queryKey**:
 *    - 캐시를 구분하기 위한 고유 키
 *    - `['user']`로 설정하여 사용자 데이터를 캐싱하고 관리
 *    - 동일한 키로 여러 번 호출 시, 동일한 데이터를 캐시에서 빠르게 가져올 수 있음
 *
 * 2. **queryFn**:
 *    - 데이터를 가져오는 비동기 함수. `fetchUser` 함수를 호출하여 사용자 정보를 서버에서 가져옴
 *    - 이 함수는 React Query가 내부적으로 데이터를 요청할 때 호출
 *
 * 3. **enabled**:
 *    - 이 쿼리가 활성화될 조건을 정의
 *    - `!!accessToken`으로 설정하여 `accessToken`이 존재할 때만 쿼리가 활성화됨. 즉, 로그인된 사용자만 데이터를 가져옴
 *
 * 3. **staleTime**:
 *    - 5분이 지나기 전에는 캐시된 데이터를 그대로 사용하며, 이후에는 자동으로 새로운 데이터를 서버에서 요청
 *
 * 4. **retry**:
 *    - 데이터 요청이 실패했을 경우 재시도 횟수를 의미
 */

export const useUser = (accessToken: string | null) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: fetchUser,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};
