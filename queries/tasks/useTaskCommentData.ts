import {
  createCommentParams,
  createCommentRequest,
  deleteCommentRequest,
  editCommentRequest,
  getCommentsRequest,
} from '@/services/task/taskCommentApi';
import {} from '@/services/task/taskListApi';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { queryOptions } from '../config';

export const useGetComments = (taskId: number) => {
  return useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => getCommentsRequest({ taskId }),
    enabled: !!taskId,
    staleTime: queryOptions.staleTime,
    gcTime: queryOptions.gcTime
  });
};

export const useCreateComment = (taskId: number) => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, createCommentParams>({
    mutationFn: ({ commentData }) =>
      createCommentRequest({ taskId, commentData }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['comments', taskId] });
      toast.success('댓글이 성공적으로 추가되었습니다.');
    },
    onError: (error) => {
      console.error('댓글 추가 중 오류 발생:', error);
      toast.error('댓글 추가에 실패했습니다.');
    },
  });
};

export const useEditComment = (taskId: number, commentId: number) => {
  const queryClient = useQueryClient();

  const handleEdit = async (content: string) => {
    try {
      await editCommentRequest({
        taskId,
        commentId,
        commentData: { content: content.trim() },
      });
      toast.success('댓글이 성공적으로 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
      toast.error('댓글 수정에 실패했습니다.');
    }
  };

  return handleEdit;
};

export const useDeleteComment = (taskId: number, commentId: number) => {
  const queryClient = useQueryClient();

  const handleDelete = async () => {
    try {
      await deleteCommentRequest({
        taskId,
        commentId,
      });
      toast.success('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
      toast.error('댓글 삭제에 실패했습니다.');
    }
  };

  return handleDelete;
};
