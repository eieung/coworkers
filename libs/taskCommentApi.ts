import { fetchData } from '@/libs/taskListApi';

interface GetCommentsParams {
  taskId: number;
}

export const getCommentsRequest = async ({ taskId }: GetCommentsParams) => {
  const url = `/tasks/${taskId}/comments`;
  return await fetchData(url, undefined, 'GET');
};

export interface AddCommentParams {
  taskId: number;
  commentData: {
    content: string;
  };
}

export const addCommentRequest = async ({
  taskId,
  commentData,
}: AddCommentParams): Promise<void> => {
  const url = `/tasks/${taskId}/comments`;
  return await fetchData(url, undefined, 'POST', commentData);
};

export interface EditCommentParams {
  taskId: number;
  commentId: number;
  commentData: {
    content: string;
  };
}

export const editCommentRequest = async ({
  taskId,
  commentId,
  commentData,
}: EditCommentParams): Promise<void> => {
  const url = `/tasks/${taskId}/comments/${commentId}`;
  return await fetchData(url, undefined, 'PATCH', commentData);
};

export interface DeleteCommentParams {
  taskId: number;
  commentId: number;
}

export const deleteCommentRequest = async ({
  taskId,
  commentId,
}: DeleteCommentParams): Promise<void> => {
  const url = `/tasks/${taskId}/comments/${commentId}`;
  return await fetchData(url, undefined, 'DELETE');
};
