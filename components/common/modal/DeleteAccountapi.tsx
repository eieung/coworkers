import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';
import { publicAxiosInstance } from '@/services/axios'; // axios 인스턴스 import

interface DeleteAccountProps {
  close: () => void;
  name: string; // name을 prop으로 추가
}

export default function DeleteAccount({ close, name }: DeleteAccountProps) {
  const { title, description, buttons } = ModalUserActions[ACTION_TYPE.DELETE_ACCOUNT];

  const handleDelete = async () => {
    try {
      const response = await publicAxiosInstance.delete('/user/delete', { data: { name } });

      if (response.status === 200) {
        toast('탈퇴되었습니다!');
        close();
      } else {
        toast.error('탈퇴 실패. 다시 시도해 주세요.');
      }
    } catch (error) {
      toast.error('오류가 발생했습니다. 다시 시도해 주세요.');
      console.error('계정 삭제 오류:', error);
    }
  };

  return (
    buttons && (
      <ConfirmModal
        title={title}
        description={description}
        close={close}
        isAlert={true}
        confirmText={buttons[1].children as string}
        buttonType="danger"
        onConfirm={handleDelete} // onConfirm에 handleDelete 함수 전달
      />
    )
  );
}
