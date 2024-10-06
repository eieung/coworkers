import CustomInputModal from '@/components/common/modal/CustomInputModal';
import { useCreateNewCategory } from '@/queries/tasks/useTaskData';
import useModalStore from '@/store/useModalStore';

export default function AddNewCategory({ groupId }: { groupId: string }) {
  const openModal = useModalStore((state) => state.openModal);
  const uploadPostMutation = useCreateNewCategory(groupId);

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
    <div
      className="font-regular-14 cursor-pointer text-brand-primary"
      onClick={handleAddNewCategoryModal}
    >
      + 새로운 목록 추가하기
    </div>
  );
}
