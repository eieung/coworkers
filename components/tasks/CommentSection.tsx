import inputArrowDefaultImg from '@/assets/image/icon/input-arrow-default.svg';
import inputArrowActiveImg from '@/assets/image/icon/input-arrow-active.svg';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  AddCommentParams,
  addCommentRequest,
  getCommentsRequest,
} from '@/libs/task/taskCommentApi';
import { toast } from 'react-toastify';
import { CommentType } from '@/types/taskListType';
import Comment from '@/components/tasks/Comment';
import Textarea from '@/components/common/Textarea';

interface FormData {
  comment: string;
}

interface CommentSectionProps {
  taskId: number;
}

export default function CommentSection({ taskId }: CommentSectionProps) {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormData>({
    mode: 'onChange',
    defaultValues: {
      comment: '',
    },
  });

  const queryClient = useQueryClient();

  const { data: comments = [] } = useQuery({
    queryKey: ['comments', taskId],
    queryFn: () => getCommentsRequest({ taskId }),
    enabled: !!taskId,
  });

  const sortedComments = [...comments].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const addCommentMutation = useMutation<void, Error, AddCommentParams>({
    mutationFn: ({ taskId, commentData }) =>
      addCommentRequest({
        taskId,
        commentData,
      }),
  });

  const onSubmit = (data: FormData) => {
    addCommentMutation.mutate(
      {
        taskId,
        commentData: {
          content: data.comment.trim(),
        },
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ['comments'],
          });
          toast.success('댓글이 성공적으로 추가되었습니다.');
          reset();
        },
        onError: (error) => {
          console.error('댓글 추가 중 오류 발생:', error);
          toast.error('댓글 추가에 실패했습니다.');
        },
      },
    );
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="h-[1px] w-full bg-bd-primary"></div>
        <span className="flex gap-2">
          <div className="flex flex-grow flex-col">
            <Controller
              name="comment"
              control={control}
              rules={{
                required: '댓글을 입력해주세요',
              }}
              render={({ field }) => (
                <Textarea
                  {...field}
                  className="font-regular-14 w-full border-none p-[15px]"
                  placeholder="댓글을 달아주세요"
                  onChange={field.onChange}
                  height={'44px'}
                  onBlur={(e) => {
                    field.onChange(e.target.value.trim());
                  }}
                />
              )}
            />
          </div>
          <button type="submit" disabled={!isValid}>
            <Image
              className="flex-grow-0"
              src={!isValid ? inputArrowDefaultImg : inputArrowActiveImg}
              alt="입력 화살표"
              width={24}
              height={24}
            />
          </button>
        </span>
        <div className="mb-4 h-[1px] w-full bg-bd-primary"></div>
        {sortedComments.length === 0 && (
          <p className="flex-center font-regular-14 my-[100px] flex text-text-default sm:my-[150px] md:my-[250px]">
            아직 댓글이 없습니다.
            <br /> 댓글을 추가해보세요.
          </p>
        )}
      </form>
      {sortedComments.map((comment: CommentType) => (
        <Comment key={comment.id} taskId={taskId} comment={comment} />
      ))}
    </>
  );
}
