import { authAxiosInstance } from "@/services/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

/**
 * 이미지를 업로드하는 함수
 * @param file - 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (file: File): Promise<string> => {
  const formData = new FormData();
  formData.append('image', file);

  const response = await authAxiosInstance.post('images/upload', formData);

  return response.data.url;
};

export const useUploadImageQuery = () => {
  return useMutation({
    mutationFn: (file: File) => uploadImage(file),
    onSuccess: () => {
      toast.success('이미지가 성공적으로 업로드되었습니다.');
    },
    onError: (error) => {
      toast.error('이미지 업로드 중 오류가 발생했습니다.');
      console.error(error);
    },
  });
};