import { fetchData } from '@/services/task/taskListApi';

export interface getCommentListParams {
  articleId: number;
  limit: number;
}

export const getCommentList = ({ articleId, limit }: getCommentListParams) => {
  return fetchData(`/articles/${articleId}/comments`, { limit }, 'GET');
};

export interface createCommentParams {
  limit?: number;
  articleId: number;
}
export interface createCommentRequestBody {
  content: string;
}

export const createArticleComment = (
  params: createCommentParams,
  data: createCommentRequestBody,
) => {
  return fetchData(
    `/articles/${params.articleId}/comments`,
    undefined,
    'POST',
    data,
  );
};
