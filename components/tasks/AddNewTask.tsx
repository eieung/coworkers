import TaskListForm from '@/components/common/modal/TaskListForm';
import useModalStore from '@/store/useModalStore';

export default function AddNewTask() {
  const openModal = useModalStore((state) => state.openModal);

  const handleAddNewTaskModal = () => {
    openModal((close) => <TaskListForm close={close} onAction={() => {}} />);
  };

  return (
    <button
      className="font-regular-14 text-brand-primary"
      onClick={handleAddNewTaskModal}
    >
      + 새로운 목록 추가하기
    </button>
  );
}
