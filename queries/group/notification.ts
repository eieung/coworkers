import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { queryOptions } from '../config';

/**
 * fetchAPI는 주어진 URL로 요청을 보내고 응답을 처리하는 함수입니다.
 * @param url - 요청할 URL
 * @param options - 요청 옵션
 * @returns 응답 객체 전체를 반환 (status, data 등)
 */
const fetchAPI = async (url: string, options?: RequestInit) => {
  const response = await fetch(url, options);
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || '오류가 발생했습니다.');
  }
  return data;
};

/**
 * 공지사항을 가져오는 함수
 * @param groupId - 그룹 ID
 */
const getNotifications = (groupId: string) => {
  return fetchAPI(`/api/groups/${groupId}/notification`);
};

/**
 * @useNotificationsQuery
 * 공지사항 데이터를 가져오는 훅
 * @param groupId - 그룹 ID
 */
export const useNotificationsQuery = (groupId: string) => {
  return useQuery({
    queryKey: ['groups', groupId, 'notification'],
    queryFn: () => getNotifications(groupId),
    staleTime: queryOptions.staleTime,
    gcTime: queryOptions.gcTime,
    retry: 1,
  });
};

/**
 * 공지사항을 추가하는 함수
 * @param groupId - 그룹 ID
 * @param content - 추가할 공지 내용
 */
const addNotification = (groupId: string, content: string) => {
  return fetchAPI(`/api/groups/${groupId}/notification`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
      groupId,
    }),
  });
};

/**
 * @useAddNotificationMutation
 * 공지사항을 추가하는 mutation 훅
 */
export const useAddNotificationMutation = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (content: string) => addNotification(groupId, content),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });
    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};

/**
 * 공지사항을 수정하는 함수
 * @param groupId - 그룹 ID
 * @param id - 수정할 공지 ID
 * @param content - 수정할 내용
 */
const updateNotification = (groupId: string, id: string, content: string) => {
  return fetchAPI(`/api/groups/${groupId}/notification?id=${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
    }),
  });
};

/**
 * @useUpdateNotificationMutation
 * 공지사항을 수정하는 mutation 훅
 */
export const useUpdateNotificationMutation = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, content }: { id: string; content: string }) =>
      updateNotification(groupId, id, content),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });

    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};

/**
 * 공지사항을 삭제하는 함수
 * @param groupId - 그룹 ID
 * @param id - 삭제할 공지 ID
 */
const deleteNotification = (groupId: string, id: string) => {
  return fetchAPI(`/api/groups/${groupId}/notification?id=${id}`, {
    method: 'DELETE',
  });
};

/**
 * @useDeleteNotificationMutation
 * 공지사항을 삭제하는 mutation 훅
 */
export const useDeleteNotificationMutation = (groupId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteNotification(groupId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['groups'] });

    },
    onError: (error: any) => {
      console.error(error);
    },
  });
};
