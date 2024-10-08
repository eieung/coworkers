import { authAxiosInstance } from './axios';

export const getMypage = async () => {
  const response = await authAxiosInstance.get(`mypage`);
  return response.data;
};