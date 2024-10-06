import { useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { useUserStore } from '@/store/authStore';
import { authAxiosInstance } from '@/services/axios';

/**
 * 사용자 데이터를 가져오는 함수
 * @returns 사용자 데이터
 */
const getUsers = async (): Promise<User> => {
  const { data } = await authAxiosInstance.get('user');
  return data;
};

/**
 * @useUsersQuery
 * 주어진 accessToken을 통해 서버에서 사용자 데이터를 가져오는 훅입니다.
 * @param accessToken - 사용자의 인증 토큰
 * @returns 사용자 데이터와 로딩/에러 상태
 */

export const useUsersQuery = (accessToken: string | null) => {
  return useQuery({
    queryKey: ['user'],
    queryFn: getUsers,
    enabled: !!accessToken,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
};

export const useAuthQuery = () => {
  const queryClient = useQueryClient();
  const { clearUser, accessToken } = useUserStore();

  const logout = () => {
    clearUser();

    queryClient.invalidateQueries({ queryKey: ['user'] });
  };

  return {
    logout,
    accessToken,
  };
};
