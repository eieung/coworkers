import { postMypage } from '@/libs/postMypage';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/router';

interface PostGroupParams {
  image: string | null;
  name: string;
  email: null;
  password: string;
}

export const useCreateGroup = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  
  return useMutation({
    mutationFn: ({ image, name, email, password }: PostGroupParams) =>
      postMypage({ image, name, email, password }),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: ['mypage'] });
      await queryClient.invalidateQueries({ queryKey: ['user'] });

      toast.success('새로운 mypage api가 성공적으로 생성되었습니다.');

      const newUserId = data.id;
      router.push(`/mypage/${newUserId}`);
    },
    onError: (error) => {
      toast.error('mypage api를 생성하는 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};
