import useClickOutside from '@/hooks/useClickOutside';
import { TaskType } from '@/types/taskListType';
import { useRef } from 'react';
import closeImg from '@/assets/image/icon/x.svg';
import Image from 'next/image';

interface TaskDetailProps {
  taskData: TaskType;
  onClose: () => void;
}

export default function TaskDetail({
  taskData: { name },
  onClose,
}: TaskDetailProps) {
  const detailRef = useRef<HTMLDivElement>(null);
  useClickOutside(detailRef, () => {
    onClose();
  });

  const handleCloseClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    onClose();
  };

  return (
    <div
      className="fixed right-0 top-0 z-20 h-full w-2/5 cursor-default bg-bg-secondary p-10 shadow-lg"
      ref={detailRef}
    >
      <button onClick={handleCloseClick}>
        <Image src={closeImg} alt="Close" width={24} height={24} />
      </button>
      <div className="mt-4">{name}</div>
    </div>
  );
}
