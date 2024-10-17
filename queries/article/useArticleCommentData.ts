import {
  getCommentList,
  getCommentListParams,
  createCommentParams,
  createCommentRequestBody,
  createArticleComment,
} from '@/services/article/articleCommentApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useGetArticleComments = (params: getCommentListParams) => {
  return useQuery({
    queryKey: ['article-comments'],
    queryFn: () => getCommentList(params),
    enabled: !!params.articleId && !isNaN(params.articleId),
  });
};

export const useCreateArticleComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      articleId,
      limit,
      ...data
    }: createCommentParams & createCommentRequestBody) =>
      createArticleComment({ articleId, limit }, data),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['articles', variables.articleId, variables.limit],
      });
      queryClient.invalidateQueries({
        queryKey: ['article-comments'],
      });
    },
    onError: (error) => {
      console.error('게시글 댓글 작성 중 오류 발생:', error);
      toast.error('게시글 댓글 작성에 실패했습니다.');
    },
  });
};
