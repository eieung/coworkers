import {
  createArticle,
  createArticleRequestBody,
  createLike,
  CreateLikeParams,
  deleteArticle,
  deleteArticleParams,
  deleteLike,
  DeleteLikeParams,
  editArticle,
  EditArticleParams,
  getArticleDetail,
  getArticleDetailParams,
  getArticleList,
} from '@/services/article/articleApi';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useGetArticleList = () => {
  return useQuery({
    queryKey: ['articles'],
    queryFn: () => getArticleList(),
  });
};

export const useGetArticleDetail = (params: getArticleDetailParams) => {
  return useQuery({
    queryKey: ['articles', params.articleId],
    queryFn: () => getArticleDetail(params),
    enabled: !!params.articleId && !isNaN(params.articleId),
  });
};
export const useCreateArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (req: createArticleRequestBody) => createArticle(req),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
    onError: (error) => {
      console.error('게시글 작성 중 오류 발생:', error);
      toast.error('게시글 작성에 실패했습니다.');
    },
  });
};

export const useDeleteArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: deleteArticleParams) => deleteArticle(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
    onError: (error) => {
      console.error('게시글 삭제 중 오류 발생:', error);
      toast.error('게시글 삭제에 실패했습니다.');
    },
  });
};

export const useEditArticle = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: EditArticleParams) => editArticle(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
      toast.success('게시글이 수정되었습니다.');
    },
    onError: (error) => {
      console.error('게시글 수정 중 오류 발생:', error);
      toast.error('게시글 수정에 실패했습니다.');
    },
  });
};

export const useCreateLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: CreateLikeParams) => createLike(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
    onError: (error) => {
      console.error('즐겨찾기 중 오류 발생:', error);
      toast.error('즐겨찾기에 실패했습니다.');
    },
  });
};

export const useDeleteLike = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (params: DeleteLikeParams) => deleteLike(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['articles'],
      });
    },
    onError: (error) => {
      console.error('즐겨찾기 삭제 중 오류 발생:', error);
      toast.error('즐겨찾기 삭제에 실패했습니다.');
    },
  });
};
