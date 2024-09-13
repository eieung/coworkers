import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';

interface DeleteAccountProps {
  close: () => void;
}

export default function DeleteAccount({ close }: DeleteAccountProps) {
  const { title, description, buttons } =
    ModalUserActions[ACTION_TYPE.DELETE_ACCOUNT];

  return (
    buttons && (
      <ConfirmModal
        title={title}
        description={description}
        close={close}
        isAlert={true}
        confirmText={buttons[1].children}
        buttonType="danger"
        onConfirm={() => {
          toast('탈퇴되었습니다!');
          close();
        }}
      />
    )
  );
}
