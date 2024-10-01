import { authAxiosInstance } from './axios';

export const postGroup = async (data: {
  name: string;
  image: string | null;
}) => {
  const response = await authAxiosInstance.post(`groups`, data);
  return response.data;
};
