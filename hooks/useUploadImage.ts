import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/libs/uploadImage';
import { toast } from 'react-toastify';

export const useUploadImage = () => {
  return useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: (data) => {
      toast.success('이미지가 성공적으로 업로드되었습니다.');
    },
    onError: (error) => {
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};
