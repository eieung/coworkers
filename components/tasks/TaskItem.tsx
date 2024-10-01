import Image from 'next/image';
import checkImg from '@/assets/image/icon/check.svg';
import commentImg from '@/assets/image/icon/comment.svg';
import menuImg from '@/assets/image/icon/kebab.svg';
import Dropdown from '@/components/common/dropdown/Dropdown';
import useModalStore from '@/store/useModalStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { TaskType } from '@/types/taskListType';
import TaskDetail from '@/components/tasks/TaskDetail';
import CustomInputModal from '@/components/common/modal/CustomInputModal';
import DateAndFrequency from '@/components/tasks/DateAndFrequency';

interface TaskItemProps {
  taskData: TaskType;
  completed: boolean;
  onToggle: () => void;
  onEdit: (data: string) => void;
  onDelete: () => void;
}

const TaskItem = ({
  taskData,
  completed,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) => {
  const { name, date, frequency, commentCount } = taskData;
  const openModal = useModalStore((state) => state.openModal);

  const handleOpenTaskDetailModal = () => {
    openModal((close) => <TaskDetail taskData={taskData} onClose={close} />);
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
      onClick={handleOpenTaskDetailModal}
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
            trigger={
              <Image src={menuImg} alt="메뉴더보기" width={16} height={16} />
            }
            items={dropdownItems}
          />
        </div>
      </div>
      <DateAndFrequency date={date} frequency={frequency} />
    </div>
  );
};

export default TaskItem;
