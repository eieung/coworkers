import TaskListForm from '@/components/common/modal/TaskListForm';
import { addNewTask, AddNewTaskParams } from '@/libs/taskListApi';
import useModalStore from '@/store/useModalStore';
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function AddNewTask({ groupId }: { groupId: string }) {
  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();

  const uploadPostMutation: UseMutationResult<void, Error, AddNewTaskParams> =
    useMutation({
      mutationFn: ({ groupId, taskData }) => addNewTask({ groupId, taskData }),
      onSuccess: (data, variables) => {
        toast.success(`${variables.taskData.name} 목록이 생성되었습니다!`);
        queryClient.invalidateQueries({ queryKey: ['taskList'] });
      },
      onError: (error) => {
        console.error('Error adding task list:', error);
        toast.error('목록생성에 실패했습니다!');
      },
    });

  const handleAddNewTaskModal = () => {
    openModal((close) => (
      <TaskListForm
        close={close}
        onAction={(taskData) => {
          uploadPostMutation.mutate({ groupId, taskData: { name: taskData } });
        }}
      />
    ));
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
