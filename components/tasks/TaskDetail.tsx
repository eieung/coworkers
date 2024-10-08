import { useEffect, useState } from 'react';
import { TaskType } from '@/types/taskList';
import menuImg from '@/assets/image/icon/kebab.svg';
import Image from 'next/image';
import Modal from '@/components/common/modal';
import defaultUserImg from '@/assets/image/icon/member.svg';
import DateAndFrequency from '@/components/tasks/DateAndFrequency';
import checkImg from '@/assets/image/icon/check-light-green.svg';
import CommentSection from '@/components/tasks/CommentSection';
import { formatDate } from '@/utils/common';
import Button from '@/components/common/button';
import whiteCheckImg from '@/assets/image/icon/check.svg';
import clsx from 'clsx';
import {
  useDeleteRecurringTask,
  useDeleteTask,
  useEditTask,
  useToggleTask,
} from '@/queries/tasks/useTaskData';
import { useParams } from 'next/navigation';
import { useRouter } from 'next/router';
import Dropdown from '@/components/common/dropdown/Dropdown';
import useModalStore from '@/store/useModalStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { useForm, Controller } from 'react-hook-form';
import Input from '@/components/common/Input';
import Textarea from '@/components/common/Textarea';

interface TaskDetailProps {
  onClose: () => void;
  taskdetailData: TaskType;
}

interface FormData {
  name: string;
  description: string;
}

export default function TaskDetail({
  taskdetailData,
  onClose,
}: TaskDetailProps) {
  const {
    name: initialName,
    description: initialDescription,
    writer,
    updatedAt,
    frequency,
    doneAt,
    recurringId,
  } = taskdetailData;

  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: initialName,
      description: initialDescription,
    },
  });

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const [description, setDescription] = useState(initialDescription);

  const isComplete = !!doneAt;
  const { id = 0, image, nickname = 'Anonymous' } = writer || {};
  const userImageContainer = image || defaultUserImg;
  const buttonType = isComplete ? 'floating-outlined' : 'floating-solid';

  const { openModal } = useModalStore((state) => ({
    openModal: state.openModal,
  }));

  const { groupId, listId } = useParams();
  const router = useRouter();
  const { task: taskId } = router.query;

  const toggleTaskMutation = useToggleTask(groupId as string);
  const deleteTaskMutation = useDeleteTask(groupId as string);
  const deleteRecurringTaskMutation = useDeleteRecurringTask(groupId as string);
  const editTaskMutation = useEditTask(groupId as string, Number(listId));

  useEffect(() => {
    setValue('name', initialName);
    setValue('description', initialDescription);
    setName(initialName);
    setDescription(initialDescription);
  }, [initialName, initialDescription, setValue]);

  const handleToggleTask = () => {
    toggleTaskMutation.mutate({ id: Number(taskId), doneAt: isComplete });
  };

  const dropdownItems = [
    {
      label: '수정하기',
      onClick: () => setIsEditing(true),
    },
    {
      label: '단일 삭제하기',
      onClick: () => {
        openModal((close) => (
          <ConfirmModal
            close={close}
            onConfirm={() => {
              deleteTaskMutation.mutate(Number(taskId));
              close();
            }}
            title={`'${name}'\n할 일 단일 항목을 정말 삭제하시겠어요?`}
            description={
              '단일 항목만 삭제합니다.\n삭제 후에는 되돌릴 수 없습니다.'
            }
            isAlert={true}
            confirmText={'삭제하기'}
            buttonType={'danger'}
          />
        ));
      },
    },
    {
      label: '반복 삭제하기',
      onClick: () => {
        openModal((close) => (
          <ConfirmModal
            close={close}
            onConfirm={() => {
              deleteRecurringTaskMutation.mutate({
                taskId: Number(taskId),
                recurringId,
              });
              close();
            }}
            title={`'${name}'\n할 일 반복 전부를 정말 삭제하시겠어요?`}
            description={
              '반복 설정된 할 일이 전부 삭제됩니다.\n삭제 후에는 되돌릴 수 없습니다.'
            }
            isAlert={true}
            confirmText={'삭제하기'}
            buttonType={'danger'}
          />
        ));
      },
    },
  ];

  const handleBlur = (fieldName: keyof FormData) => {
    const trimmedValue = getValues(fieldName)?.trim();
    setValue(fieldName, trimmedValue);
  };

  const handleSave = ({ name, description }: FormData) => {
    editTaskMutation.mutate({
      id: Number(taskId),
      name,
      description,
      doneAt,
    });
    setIsEditing(false);
  };

  return (
    <Modal
      onClose={onClose}
      showCloseIcon={true}
      className={
        'bottom-0 right-0 h-[calc(100vh-60px)] w-2/5 cursor-default p-10 text-text-primary sm:w-full md:w-3/5'
      }
      isCustom={true}
      backgroundOpacity={'opacity-0'}
    >
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex w-full flex-col">
              {isComplete && (
                <span className="mb-3 flex items-center gap-[6px]">
                  <Image src={checkImg} alt="체크" width={16} height={16} />
                  <h3 className="font-medium-12 text-brand-tertiary">완료</h3>
                </span>
              )}
              <h1
                className={`font-bold-20 w-full ${
                  isComplete && !isEditing ? 'line-through' : ''
                }`}
              >
                {isEditing ? (
                  <div className="flex flex-col">
                    <Controller
                      control={control}
                      name="name"
                      rules={{ required: '이름을 입력하세요' }}
                      render={({ field }) => (
                        <Input
                          className="w-full"
                          {...field}
                          validationMessage={
                            errors.name ? errors.name.message : ''
                          }
                          invalid={!!errors.name}
                          onBlur={() => {
                            handleBlur('name');
                            field.onBlur();
                          }}
                        />
                      )}
                    />
                  </div>
                ) : (
                  name
                )}
              </h1>
            </div>
            <div onClick={(e) => e.stopPropagation()}>
              {!isEditing && (
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
              )}
            </div>
          </div>
          <span>
            <div className={'flex items-center justify-between'}>
              <span className={'flex h-[32px] w-[32px] items-center gap-3'}>
                <img
                  className="rounded-full"
                  src={userImageContainer}
                  alt="유저 이미지"
                />
                <span className="font-medium-14 whitespace-nowrap">
                  {nickname}
                </span>
              </span>
              <span className="font-regular-14 text-text-secondary">
                {formatDate(updatedAt, 'dot')}
              </span>
            </div>
          </span>
          <DateAndFrequency
            date={updatedAt}
            frequency={frequency}
            isTaskDetail={true}
          />
        </div>
        <div className="font-regular-14 mt-6">
          {isEditing ? (
            <Controller
              control={control}
              name="description"
              rules={{ required: '설명을 입력하세요' }}
              render={({ field }) => (
                <Textarea
                  className="w-full"
                  {...field}
                  validationMessage={
                    errors.description ? errors.description.message : ''
                  }
                  invalid={!!errors.description}
                  onBlur={() => {
                    handleBlur('description');
                    field.onBlur();
                  }}
                  value={field.value}
                />
              )}
            />
          ) : (
            description
          )}
        </div>
        {isEditing && (
          <div className="font-bold-14 mt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              className="h-8 w-12 text-text-default"
              onClick={() => setIsEditing(false)}
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
        )}
      </form>
      <div className="mt-28">
        <CommentSection taskId={Number(taskId)} />
      </div>
      <div className="fixed bottom-[64px] right-10 flex justify-end">
        <Button
          appearance={buttonType}
          className={clsx('h-[40px]', isComplete ? 'w-[138px]' : 'w-[111px]')}
          onClick={handleToggleTask}
        >
          <div className="flex-center flex gap-1 whitespace-nowrap">
            <Image
              src={isComplete ? checkImg : whiteCheckImg}
              alt={'체크'}
              width={16}
              height={16}
            />
            {isComplete ? '완료 취소하기' : '완료하기'}
          </div>
        </Button>
      </div>
    </Modal>
  );
}
