import CustomInputModal from '@/components/common/modal/CustomInputModal';
import { addNewCategoryRequest, AddNewTaskParams } from '@/libs/taskListApi';
import useModalStore from '@/store/useModalStore';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export default function AddNewCategory({ groupId }: { groupId: string }) {
  const openModal = useModalStore((state) => state.openModal);
  const queryClient = useQueryClient();

  const uploadPostMutation = useMutation<void, Error, AddNewTaskParams>({
    mutationFn: ({ groupId, taskData }) =>
      addNewCategoryRequest({ groupId, taskData }),
    onSuccess: (_, variables) => {
      toast.success(`${variables.taskData.name} 목록이 생성되었습니다!`);
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
    onError: (error) => {
      const errorMessage = error.message || '목록 생성에 실패했습니다!';

      console.error('Error adding task list:', errorMessage);
      toast.error(errorMessage);
    },
  });

  const handleAddNewCategoryModal = () => {
    openModal((close) => (
      <CustomInputModal
        close={close}
        title={'새로운 목록 추가'}
        description={
          '할 일에 대한 목록을 추가하고\n목록별 할 일을 만들 수 있습니다.'
        }
        label={'목록 이름'}
        buttonText={'만들기'}
        onAction={(taskData) => {
          uploadPostMutation.mutate({ groupId, taskData: { name: taskData } });
        }}
        placeholder={'목록 이름을 입력해주세요'}
      />
    ));
  };

  return (
    <button
      className="font-regular-14 text-brand-primary"
      onClick={handleAddNewCategoryModal}
    >
      + 새로운 목록 추가하기
    </button>
  );
}
