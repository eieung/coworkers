import React from 'react';
import ConfirmModal from '@/components/common/modal/ConfirmModal';
import { toast } from 'react-toastify';
import { ACTION_TYPE, ModalUserActions } from '@/constants/modal';

interface LogoutProps {
  close: () => void;
}

export default function Logout({ close }: LogoutProps) {
  const { title, description } = ModalUserActions[ACTION_TYPE.LOGOUT];

  return (
    <ConfirmModal
      title={title}
      description={description}
      close={close}
      confirmText="로그아웃"
      onConfirm={() => {
        toast('로그아웃되었습니다!');
        close();
      }}
    />
  );
}
