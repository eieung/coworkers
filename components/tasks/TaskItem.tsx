import Image from 'next/image';
import checkImg from '@/assets/image/icon/check.svg';
import commentImg from '@/assets/image/icon/comment.svg';
import calendarImg from '@/assets/image/icon/calendar.svg';
import repeatImg from '@/assets/image/icon/repeat.svg';
import kebabImg from '@/assets/image/icon/kebab.svg';
import Dropdown from '@/components/common/dropdown/Dropdown';
import useModalStore from '@/store/useModalStore';
import TaskListForm from '@/components/common/modal/TaskListForm';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import { Frequency } from '@/types/taskListType';

const frequencyText = {
  ONCE: '한번',
  DAILY: '매일 반복',
  WEEKLY: '매주 반복',
  MONTHLY: '매월 반복',
};

interface TaskItemProps {
  id: number;
  name: string;
  completed: boolean;
  commentCount: number;
  updatedAt: string;
  frequency: Frequency;
  onToggle: (id: number) => void;
  onEdit: (value: string, id: number) => void;
  onDelete: (id: number) => void;
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}년 ${month}월 ${day}일`;
};

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  name,
  completed,
  commentCount,
  updatedAt,
  frequency,
  onToggle,
  onEdit,
  onDelete,
}) => {
  const dropdownItems = [
    {
      label: '수정하기',
      onClick: () => handleOpenModal(),
    },
    {
      label: '삭제하기',
      onClick: () => {
        openModal((close) => (
          <ConfirmModal
            close={close}
            onConfirm={() => {
              onDelete(id);
              toast.success('삭제되었습니다!');
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

  const openModal = useModalStore((state) => state.openModal);

  const handleOpenModal = () => {
    openModal((close) => (
      <TaskListForm
        close={close}
        onAction={(value) => onEdit(value, id)}
        isEditMode={true}
        initialValue={name}
      />
    ));
  };

  return (
    <div className="flex w-full flex-col gap-[10px] rounded-lg bg-bg-secondary p-[12px_14px] text-text-primary">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <label className="flex h-6 w-6 cursor-pointer items-center justify-center">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => onToggle(id)}
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
        <div>
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
    </div>
  );
};

export default TaskItem;
