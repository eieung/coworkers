import { getHistoryRequest } from '@/services/history/historyApi';
import { useQuery } from '@tanstack/react-query';
import { queryOptions } from '../config';

export const useGetHistory = () => {
  return useQuery({
    queryKey: ['history'],
    queryFn: () => {
      return getHistoryRequest();
    },
    staleTime: queryOptions.staleTime,
    gcTime: queryOptions.gcTime
  });
};
