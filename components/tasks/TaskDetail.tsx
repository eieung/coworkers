import { TaskType } from '@/types/taskListType';
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

interface TaskDetailProps {
  taskData: TaskType;
  onClose: () => void;
}

export default function TaskDetail({ taskData, onClose }: TaskDetailProps) {
  const {
    id: taskId,
    name,
    description,
    writer,
    updatedAt,
    frequency,
    doneAt,
  } = taskData;
  const isComplete = !!doneAt;
  const { id = 0, image, nickname = 'Anonymous' } = writer || {};
  const userImageContainer = image || defaultUserImg;
  const buttonType = isComplete ? 'floating-outlined' : 'floating-solid';

  return (
    <Modal
      onClose={onClose}
      title={name}
      showCloseIcon={true}
      description={description}
      className={
        'bottom-0 right-0 h-[calc(100vh-60px)] w-2/5 cursor-default p-10 text-text-primary sm:w-full md:w-3/5'
      }
      isCustom={true}
      backgroundOpacity={'opacity-0'}
    >
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <div>
            {isComplete && (
              <span className="mb-3 flex items-center gap-[6px]">
                <Image src={checkImg} alt="체크" width={16} height={16} />
                <h3 className="font-medium-12 text-brand-tertiary">완료</h3>
              </span>
            )}
            <h1 className={`font-bold-20 ${isComplete ? 'line-through' : ''}`}>
              {name}
            </h1>
          </div>
          <Image src={menuImg} alt="메뉴" width={24} height={24} />
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
      <div className="font-regular-14 mt-6">{description}</div>
      <div className="mt-28">
        <CommentSection taskId={taskId} />
      </div>
      <div className="fixed bottom-[64px] right-10 flex justify-end">
        <Button
          appearance={buttonType}
          className={clsx('h-[40px]', isComplete ? 'w-[138px]' : 'w-[111px]')}
        >
          <div className="flex-center flex gap-1">
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
