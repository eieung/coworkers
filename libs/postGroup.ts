import { authAxiosInstance } from './axios';

/**
 * 그룹을 생성하는 함수
 * @param id - 추가할 그룹의 ID
 * @param data - 추가할 그룹의 데이터 (이름, 이미지)
 */
export const postGroup = async (data: {
  name: string;
  image: string | null;
}) => {
  const response = await authAxiosInstance.post(`groups`, data);
  return response.data;
};
