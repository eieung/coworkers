import { authAxiosInstance } from '@/libs/axios';

/**
 * 이미지를 업로드하는 함수
 * @param file - 업로드할 이미지 파일
 * @returns 업로드된 이미지의 URL
 */
export const uploadImage = async (file: File): Promise<string> => {
const formData = new FormData();
  formData.append("image", file);

  const response = await authAxiosInstance.post('images/upload', formData);

  return response.data.url;
};
