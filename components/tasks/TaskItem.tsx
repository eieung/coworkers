import Image from 'next/image';
import checkImg from '@/assets/image/icon/check.svg';
import commentImg from '@/assets/image/icon/comment.svg';
import calendarImg from '@/assets/image/icon/calendar.svg';
import repeatImg from '@/assets/image/icon/repeat.svg';
import kebabImg from '@/assets/image/icon/kebab.svg';
import Dropdown from '@/components/common/dropdown/Dropdown';
import useModalStore from '@/store/useModalStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { TaskType } from '@/types/taskListType';
import { useState } from 'react';
import TaskDetail from '@/components/tasks/TaskDetail';

import CustomInputModal from '@/components/common/modal/CustomInputModal';

const frequencyText = {
  ONCE: '한번',
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
};

interface TaskItemProps {
  taskData: TaskType;
  completed: boolean;
  onToggle: () => void;
  onEdit: (data: string) => void;
  onDelete: () => void;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

const TaskItem = ({
  taskData,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) => {
  const { name, updatedAt, frequency, commentCount } = taskData;
  const openModal = useModalStore((state) => state.openModal);

  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const openDetail = () => {
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
  };

  const dropdownItems = [
    {
      label: '수정하기',
      onClick: () => {
        openModal((close) => (
          <CustomInputModal
            close={close}
            title={'할 일 수정하기'}
            buttonText={'수정하기'}
            onAction={(data) => {
              onEdit(data);
            }}
            initialData={name}
            placeholder={'수정할 내용을 입력해주세요'}
          />
        ));
      },
    },
    {
      label: '삭제하기',
      onClick: () => {
        openModal((close) => (
          <ConfirmModal
            close={close}
            onConfirm={() => {
              onDelete();
            }}
            title={`'${name}'\n할 일을 정말 삭제하시겠어요?`}
            description={'삭제 후에는 되돌릴 수 없습니다.'}
            isAlert={true}
            confirmText={'삭제하기'}
            buttonType={'danger'}
          />
        ));
      },
    },
  ];

  return (
    <div
      className="flex w-full cursor-pointer flex-col gap-[10px] rounded-lg bg-bg-secondary p-[12px_14px] text-text-primary"
      onClick={openDetail}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label
            className="flex h-6 w-6 cursor-pointer items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={completed}
              onChange={() => onToggle()}
              className="sr-only"
            />
            <div
              className={`flex h-4 w-4 items-center justify-center rounded-md border ${
                completed
                  ? 'border-brand-tertiary bg-brand-tertiary'
                  : 'border-text-inverse'
              }`}
            >
              {completed && (
                <Image src={checkImg} alt="check" width={16} height={16} />
              )}
            </div>
          </label>
          <span
            className={`font-regular-14 ${completed ? 'line-through' : ''}`}
          >
            {name}
          </span>
          <span className="flex-center flex gap-[2px]">
            <Image
              className="ml-1"
              src={commentImg}
              alt="check"
              width={16}
              height={16}
            />
            <span className="font-regular-12 text-text-default">
              {commentCount}
            </span>
          </span>
        </div>
        <div onClick={(e) => e.stopPropagation()}>
          <Dropdown
            trigger={<Image src={kebabImg} alt="확장" width={16} height={16} />}
            items={dropdownItems}
          />
        </div>
      </div>
      <div className="font-regular-12 flex items-center gap-[6px] text-text-default">
        <Image src={calendarImg} alt="달력" width={16} height={16} />
        <div className="flex items-center">
          <span>{formatDate(updatedAt)}</span>
          <div className="mx-[10px] h-2 w-[1px] bg-bg-tertiary"></div>
          <Image src={repeatImg} alt="반복" width={16} height={16} />
        </div>
        <span>{frequencyText[frequency]}</span>
      </div>
      {isDetailOpen && <TaskDetail taskData={taskData} onClose={closeDetail} />}
    </div>
  );
};

export default TaskItem;
