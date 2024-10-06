import { useQueryClient } from '@tanstack/react-query';
import { useUserStore } from '@/store/authStore';

export const useAuth = () => {
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
