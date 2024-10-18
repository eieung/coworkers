import { fetchData } from '@/services/task/taskListApi';

export const getArticleList = () => {
  return fetchData(`/articles`, undefined, 'GET');
};

export interface createArticleRequestBody {
  title: string;
  content: string;
  image?: string;
}

export const createArticle = (req: createArticleRequestBody) => {
  return fetchData(`/articles`, undefined, 'POST', req);
};

export interface getArticleDetailParams {
  articleId: number;
}

export const getArticleDetail = (params: getArticleDetailParams) => {
  return fetchData(`/articles/${params.articleId}`, undefined, 'GET');
};

export interface deleteArticleParams {
  articleId: number;
}

export const deleteArticle = (params: deleteArticleParams) => {
  return fetchData(`/articles/${params.articleId}`, undefined, 'DELETE');
};

export type EditArticleParams = {
  articleId: number;
  articleData: {
    image?: string;
    content?: string;
    title?: string;
  };
};

export const editArticle = ({ articleId, articleData }: EditArticleParams) => {
  return fetchData(`/articles/${articleId}`, undefined, 'PATCH', articleData);
};
