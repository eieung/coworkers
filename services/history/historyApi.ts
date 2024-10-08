import { authAxiosInstance } from '@/services/axios';

export const getHistoryRequest = async () => {
  const response = await authAxiosInstance.get(`/user/history`);
  return response.data;
};
