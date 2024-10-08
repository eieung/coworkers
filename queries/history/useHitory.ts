import { getHistoryRequest } from '@/services/history/historyApi';
import { useQuery } from '@tanstack/react-query';

export const useGetHistory = () => {
  return useQuery({
    queryKey: ['history'],
    queryFn: () => {
      return getHistoryRequest();
    },
  });
};
