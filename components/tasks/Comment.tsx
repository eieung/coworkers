import { useEffect, useState } from 'react';
import { CommentType } from '@/types/taskListType';
import defaultUserImg from '@/assets/image/icon/member.svg';
import Image from 'next/image';
import { getElapsedTime } from '@/utils/common';
import menuImg from '@/assets/image/icon/kebab.svg';
import { getUser } from '@/utils/auth';
import Button from '@/components/common/button';
import Textarea from '@/components/common/Textarea';
import Dropdown from '@/components/common/dropdown/Dropdown';
import useModalStore from '@/store/useModalStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';
import {
  deleteCommentRequest,
  editCommentRequest,
} from '@/libs/task/taskCommentApi';
import { useForm } from 'react-hook-form';

interface CommentProps {
  taskId: number;
  comment: CommentType;
}

interface FormValues {
  comment: string;
}

export default function Comment({
  taskId,
  comment: {
    id: commentId,
    content,
    createdAt,
    user: { id: commentUserId, image, nickname },
  },
}: CommentProps) {
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const userImageContainer = image || defaultUserImg;
  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = useForm<FormValues>({
    defaultValues: { comment: content },
  });

  useEffect(() => {
    const user = getUser();
    if (user) {
      setCurrentUserId(user.id);
    }
  }, []);

  const handleCancel = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(false);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setValue('comment', content);
  };

  const handleDelete = async () => {
    try {
      await deleteCommentRequest({
        taskId: taskId,
        commentId: commentId,
      });
      toast.success('댓글이 삭제되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
    } catch (error) {
      console.error('댓글 삭제 중 오류 발생:', error);
      toast.error('댓글 삭제에 실패했습니다.');
    }
  };

  const onSubmit = async (data: FormValues) => {
    try {
      await editCommentRequest({
        taskId: taskId,
        commentId: commentId,
        commentData: { content: data.comment.trim() },
      });
      toast.success('댓글이 성공적으로 수정되었습니다.');
      queryClient.invalidateQueries({ queryKey: ['comments'] });
      setIsEditing(false);
    } catch (error) {
      console.error('댓글 수정 중 오류 발생:', error);
      toast.error('댓글 수정에 실패했습니다.');
    }
  };

  const dropdownItems = [
    {
      label: '수정하기',
      onClick: handleEdit,
    },
    {
      label: '삭제하기',
      onClick: () => {
        openModal((close) => (
          <ConfirmModal
            close={close}
            onConfirm={handleDelete}
            title={`코멘트를 정말 삭제하시겠어요?`}
            isAlert={true}
            confirmText={'삭제하기'}
            buttonType={'danger'}
          />
        ));
      },
    },
  ];

  return (
    <div className="font-regular-14 border-b border-bd-primary p-[16px_0]">
      <span className="flex items-center justify-between">
        {isEditing ? (
          <div className="w-full">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Textarea
                {...register('comment', {
                  required: '댓글을 입력해주세요.',
                  validate: (value) =>
                    value.trim() !== '' || '공백은 허용되지 않습니다.',
                })}
                onChange={async (event) => {
                  setValue('comment', event.target.value);
                  await trigger('comment');
                }}
                className="w-full rounded border border-gray-300 p-2"
                validationMessage={errors.comment ? errors.comment.message : ''}
                invalid={!!errors.comment}
              />
              <div className="font-bold-14 mt-2 flex items-center justify-end gap-2">
                <button
                  className="h-8 w-12 text-text-default"
                  onClick={handleCancel}
                >
                  취소
                </button>
                <Button
                  className="h-8 w-[74px] whitespace-nowrap bg-transparent px-0"
                  appearance={'outlined'}
                  type="submit"
                >
                  수정하기
                </Button>
              </div>
            </form>
          </div>
        ) : (
          <>
            <p>{content}</p>
            {Number(currentUserId) === commentUserId && (
              <div onClick={(e) => e.stopPropagation()}>
                <Dropdown
                  trigger={
                    <Image
                      src={menuImg}
                      alt="메뉴더보기"
                      width={16}
                      height={16}
                    />
                  }
                  items={dropdownItems}
                />
              </div>
            )}
          </>
        )}
      </span>
      {!isEditing && (
        <div className={'mt-4 flex items-center justify-between'}>
          <span className={'flex h-[32px] w-[32px] items-center gap-3'}>
            <img
              className="rounded-full"
              src={userImageContainer}
              alt="유저 이미지"
            />
            <span className="font-medium-14 whitespace-nowrap">{nickname}</span>
          </span>
          <span
            className="font-regular-14 text-text-secondary"
            title={new Date(createdAt).toLocaleString()}
          >
            {getElapsedTime(createdAt)}
          </span>
        </div>
      )}
    </div>
  );
}
