import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { User } from '@/types/user';
import { useUserStore } from '@/store/authStore';
import { authAxiosInstance } from '@/services/axios';
import { queryOptions } from '../config';
import { toast } from 'react-toastify';

/**
 * 사용자 데이터를 가져오는 함수
 * @returns 사용자 데이터
 */
export const getUsers = () => {
  return authAxiosInstance.get<User>('user');
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
    staleTime: queryOptions.staleTime,
    gcTime: queryOptions.gcTime,
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

/**
 * 사용자 정보를 업데이트하는 함수
 * @param userData - 사용자 정보 객체
 * @returns 업데이트된 사용자 데이터
 */
const editUser = (userData: { nickname?: string; image?: string }) => {
  return authAxiosInstance.patch(`user`, userData);
};

/**
 * @useEditUsersMutation
 * 사용자 정보를 업데이트하는 뮤테이션 훅입니다.
 * @returns 사용자 정보 업데이트 상태와 메소드
 */
export const useEditUsersMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      userData,
    }: {
      userData: { nickname?: string; image?: string };
    }) => editUser(userData),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('사용자 정보가 업데이트되었습니다.');
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message ||
        '사용자 정보 업데이트 중 오류가 발생했습니다.';
      toast.error(errorMessage);
      console.error(error);
    },
  });
};

/**
 * 사용자 정보를 삭제하는 함수
 * @returns 삭제된 사용자 데이터
 */
const deleteUser = () => {
  return authAxiosInstance.delete(`user`);
};

/**
 * @useDeleteUserMutation
 * 사용자 정보를 삭제하는 뮤테이션 훅입니다.
 * @returns 사용자 삭제 상태와 메소드
 */
export const useDeleteUserMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => deleteUser(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] });
      toast.success('사용자가 삭제되었습니다.');
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.message || '사용자 삭제 중 오류가 발생했습니다.';
      toast.error(errorMessage);
      console.error(error);
    },
  });
};
