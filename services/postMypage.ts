import { authAxiosInstance } from './axios';

export const postMypage = async (data: {
  name: string;
  image: string | null;
  email: string | null;
  password: string;
}) => {
  const response = await authAxiosInstance.post(`mypage`, data);
  return response.data;
};
