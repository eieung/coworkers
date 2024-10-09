import Image from 'next/image';
import checkImg from '@/assets/image/icon/check.svg';
import commentImg from '@/assets/image/icon/comment.svg';
import menuImg from '@/assets/image/icon/kebab.svg';
import moveImg from '@/assets/image/icon/arrows-move.svg';
import Dropdown from '@/components/common/dropdown/Dropdown';
import useModalStore from '@/store/useModalStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { TaskType } from '@/types/taskList';
import TaskDetail from '@/components/tasks/TaskDetail';
import CustomInputModal from '@/components/common/modal/CustomInputModal';
import DateAndFrequency from '@/components/tasks/DateAndFrequency';
import { useRouter } from 'next/router';
import { useGetTaskItem } from '@/queries/tasks/useTaskData';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

interface TaskItemProps {
  taskData: TaskType;
  completed: boolean;
  onToggle: () => void;
  onEdit: (data: string) => void;
  onDelete: () => void;
  onRecurringDelete: () => void;
}

const TaskItem = ({
  taskData,
  completed,
  onToggle,
  onEdit,
  onDelete,
  onRecurringDelete,
}: TaskItemProps) => {
  const { id: taskId, name, date, frequency, commentCount } = taskData;
  const { openModal, updateModal } = useModalStore((state) => ({
    openModal: state.openModal,
    updateModal: state.updateModal,
  }));

  const router = useRouter();

  const {
    data: taskdetailData = [],
    isLoading,
    error,
  } = useGetTaskItem(String(taskId));

  useEffect(() => {
    if (taskdetailData) {
      updateModal((close) => (
        <TaskDetail taskdetailData={taskdetailData} onClose={close} />
      ));
    }
  }, [taskdetailData, updateModal]);

  const handleOpenTaskDetailModal = () => {
    openModal((close) => {
      const handleModalClose = () => {
        close();

        const newQuery = { ...router.query };
        delete newQuery.task;

        router.replace(
          {
            pathname: router.pathname,
            query: newQuery,
          },
          undefined,
          { shallow: true },
        );
      };

      return (
        <>
          {taskdetailData && (
            <TaskDetail
              taskdetailData={taskdetailData}
              onClose={handleModalClose}
            />
          )}
        </>
      );
    });
    // 모달용 쿼리 추가
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, task: taskData.id },
      },
      undefined,
      { shallow: true },
    );
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
      label: '단일 삭제하기',
      onClick: () => {
        openModal((close) => (
          <ConfirmModal
            close={close}
            onConfirm={() => {
              onDelete();
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
              onRecurringDelete();
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

  return (
    <div
      className="relative flex w-full cursor-pointer flex-col gap-[10px] rounded-lg bg-bg-secondary p-[12px_14px] text-text-primary"
      onClick={handleOpenTaskDetailModal}
    >
      <motion.div
        className={clsx(
          'transition-none',
          'absolute left-0 top-0 z-0 h-full w-full',
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0 }}
        whileHover={{
          scale: [1, 1.2, 1],
          opacity: 1,
        }}
        transition={{
          duration: 1,
          ease: 'easeInOut',
        }}
      >
        <Image
          className="absolute top-1/2 -translate-y-1/2"
          style={{ left: 'calc(50% - 15px)' }}
          src={moveImg}
          alt="check"
          width={35}
          height={35}
        />
      </motion.div>
      <div className="flex items-center justify-between gap-2">
        <div className="z-10 flex items-center gap-2">
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
              <span className="flex-center flex h-6 w-6 rounded-md hover:bg-bg-tertiary">
                <Image src={menuImg} alt="메뉴더보기" width={16} height={16} />
              </span>
            }
            items={dropdownItems}
            className="font-regular-14 h-10 w-[120px]"
          />
        </div>
      </div>
      <DateAndFrequency date={date} frequency={frequency} />
    </div>
  );
};

export default TaskItem;
