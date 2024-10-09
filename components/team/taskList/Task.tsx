import Image from 'next/image';
import Link from 'next/link';
import clsx from 'clsx';
import kebabIcon from '@/assets/image/icon/kebab.svg';
import doneTaskIcon from '@/assets/image/icon/progress.svg';
import deleteIcon from '@/assets/image/icon/delete.svg';
import CircularProgressBar from '@/components/common/CircularProgressBar';
import { useEffect, useRef, useState } from 'react';
import useModalStore from '@/store/useModalStore';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import {
  useDeleteTaskListMutation,
  useReviseTaskListMutation,
} from '@/queries/task-list';
import editIcon from '@/assets/image/icon/edit.svg';
import CustomInputModal from '@/components/common/modal/CustomInputModal';

interface TaskProps {
  name: string;
  totalTasks: number;
  completedTasks: number;
  displayIndex: number;
  groupId: string;
  taskListId: string;
  isAdmin: boolean;
}

export default function Task({
  name,
  totalTasks,
  completedTasks,
  displayIndex,
  groupId,
  taskListId,
  isAdmin = false,
}: TaskProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const openModal = useModalStore((state) => state.openModal);

  const deleteTaskListMutation = useDeleteTaskListMutation(groupId);
  const reviseTaskListMutation = useReviseTaskListMutation();

  const percentage =
    totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const bgColors = [
    'bg-point-purple',
    'bg-point-blue',
    'bg-point-cyan',
    'bg-point-pink',
    'bg-point-rose',
    'bg-point-orange',
    'bg-point-yellow',
  ];

  const bgColorClass = bgColors[displayIndex % bgColors.length];

  const handleKebabClick = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDeleteTaskListModal = () => {
    openModal((close) => (
      <ConfirmModal
        title="할 일 목록 삭제하기"
        description={'할 일 목록을 삭제합니다.\n정말 삭제하시겠어요?'}
        close={close}
        isAlert={true}
        confirmText="삭제하기"
        onConfirm={() => {
          deleteTaskListMutation.mutate(taskListId);
          close();
        }}
        buttonType="danger"
      />
    ));
  };

  const handleModifyTaskListModal = () => {
    openModal((close) => (
      <CustomInputModal
        close={close}
        title={'할 일 수정하기'}
        buttonText={'수정하기'}
        onAction={(value) => {
          reviseTaskListMutation.mutate({
            groupId,
            taskListId,
            data: { name: value },
          });
          close();
        }}
        initialData={name}
        placeholder={'수정할 내용을 입력해주세요'}
      />
    ));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="mb-4 flex flex-row items-center justify-between rounded-xl bg-bg-secondary">
      <Link
        href={`/groups/${groupId}/task-lists/${taskListId}`}
        className="flex-grow"
      >
        <div className="flex flex-row items-center gap-x-3">
          <div className={clsx('h-10 w-4 rounded-l-xl', bgColorClass)}></div>
          <b className="font-medium-14 text-text-primary">{name}</b>
        </div>
      </Link>

      <div className="flex flex-row gap-x-1 pr-2">
        <div className="flex items-center gap-x-1 rounded-xl bg-bg-primary px-2 py-1">
          {percentage === 100 ? (
            <Image src={doneTaskIcon} alt="할 일 완료" width={16} height={16} />
          ) : (
            <div className="flex h-4 w-4 items-center">
              <CircularProgressBar
                percentage={percentage}
                trailColor="#f8fafc"
                className="h-3 w-3"
              />
            </div>
          )}
          <span className="font-regular-14 w-[22px] text-brand-primary">
            {completedTasks}/{totalTasks}
          </span>
        </div>
        <div className="flex items-center gap-x-1" ref={menuRef}>
          {!isMenuOpen && (
            <button onClick={handleKebabClick}>
              <Image src={kebabIcon} alt="케밥 아이콘" width={16} height={16} />
            </button>
          )}

          {isMenuOpen && (
            <button
              className="mt-[1px] w-4"
              onClick={handleModifyTaskListModal}
            >
              <Image
                src={editIcon}
                alt="수정"
                width={12}
                className="ml-[2px]"
                height={12}
              />
            </button>
          )}
          {isAdmin && isMenuOpen && (
            <button
              className="flex w-4 items-center"
              onClick={handleDeleteTaskListModal}
            >
              <Image
                src={deleteIcon}
                alt="삭제"
                width={12}
                height={12}
                className="ml-[2px]"
              />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
