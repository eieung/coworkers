import { fetchData } from '@/services/task/taskListApi';

interface GetCommentsParams {
  taskId: number;
}

export const getCommentsRequest = ({ taskId }: GetCommentsParams) => {
  return fetchData(`/tasks/${taskId}/comments`, undefined, 'GET');
};

export interface createCommentParams {
  taskId: number;
  commentData: {
    content: string;
  };
}

export const createCommentRequest = ({
  taskId,
  commentData,
}: createCommentParams) => {
  return fetchData(`/tasks/${taskId}/comments`, undefined, 'POST', commentData);
};

export interface EditCommentParams {
  taskId: number;
  commentId: number;
  commentData: {
    content: string;
  };
}

export const editCommentRequest = ({
  taskId,
  commentId,
  commentData,
}: EditCommentParams) => {
  return fetchData(
    `/tasks/${taskId}/comments/${commentId}`,
    undefined,
    'PATCH',
    commentData,
  );
};

export interface DeleteCommentParams {
  taskId: number;
  commentId: number;
}

export const deleteCommentRequest = ({
  taskId,
  commentId,
}: DeleteCommentParams) => {
  return fetchData(
    `/tasks/${taskId}/comments/${commentId}`,
    undefined,
    'DELETE',
  );
};
