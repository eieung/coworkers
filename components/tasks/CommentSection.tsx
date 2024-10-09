import inputArrowDefaultImg from '@/assets/image/icon/input-arrow-default.svg';
import inputArrowActiveImg from '@/assets/image/icon/input-arrow-active.svg';
import Image from 'next/image';
import { Controller, useForm } from 'react-hook-form';
import { CommentType } from '@/types/taskList';
import Comment from '@/components/tasks/Comment';
import Textarea from '@/components/common/Textarea';
import {
  useCreateComment,
  useGetComments,
} from '@/queries/tasks/useTaskCommentData';
import Loader from '@/components/common/Loader';

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

  const { data: comments = null, isLoading, isError } = useGetComments(taskId);

  const sortedComments = comments
    ? [...comments].sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )
    : [];

  const createCommentMutation = useCreateComment(taskId);

  const onSubmit = (data: FormData) => {
    createCommentMutation.mutate({
      taskId,
      commentData: {
        content: data.comment.trim(),
      },
    });
    reset();
  };

  if (isLoading)
    return (
      <div className="flex-center flex h-[300px]">
        <Loader />
      </div>
    );

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-[1px] h-[1px] w-full bg-bd-primary"></div>
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
        <div className="mb-4 mt-[1px] h-[1px] w-full bg-bd-primary"></div>
        {comments && sortedComments.length === 0 && (
          <p className="flex-center font-regular-14 my-[100px] flex text-text-default sm:my-[150px] md:my-[100px]">
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
